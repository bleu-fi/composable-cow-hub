import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Address, PublicClient } from "viem";

import { composableCowAbi } from "#/lib/abis/composableCow";
import { COMPOSABLE_COW_ADDRESS } from "#/lib/contracts";
import { getCowOrders } from "#/lib/cowApi/fetchCowOrder";
import { UserStopLossOrdersQuery } from "#/lib/gql/generated";
import { composableCowSubgraph } from "#/lib/gql/sdk";
import { ChainId, publicClientsFromIds } from "#/lib/publicClients";
import { ArrElement, GetDeepProp } from "#/utils";

type StopLossOrderTypeRaw = ArrElement<
  GetDeepProp<UserStopLossOrdersQuery, "items">
>;

export interface StopLossOrderType extends StopLossOrderTypeRaw {
  status?: string;
}

export interface CowOrder {
  appData: string
  availableBalance: string
  buyAmount: string
  buyToken: string
  buyTokenBalance: string
  class: string
  creationDate: string
  executedBuyAmount:string
  executedFeeAmount: string
  executedSellAmount: string
  executedSellAmountBeforeFees: string
  executedSurplusFee: string
  feeAmount: string
  fullAppData: string
  fullFeeAmount: string
  interactions: {
    pre: Array<string>
    post: Array<string>
  }
  invalidated: boolean
  isLiquidityOrder: boolean
  kind: string
  owner: string
  partiallyFillable: boolean
  receiver: string
  sellAmount: string
  sellToken: string
  sellTokenBalance: string
  settlementContract: string
  signature: string
  signingScheme: string
  solverFee: string
  status: string
  uid: string
  validTo: number
}


gql(
  `query UserStopLossOrders($user: String!) {
    orders(where: {stopLossParametersId_not: null, user_in: [$user]} orderBy: "blockTimestamp" orderDirection: "desc") {
      items {
        blockNumber
        blockTimestamp
        chainId
        decodedSuccess
        handler
        id
        user
        hash
        staticInput
        stopLossParameters {
          appData
          buyTokenPriceOracle
          id
          isPartiallyFillable
          isSellOrder
          maxTimeSinceLastOracleUpdate
          orderId
          sellTokenPriceOracle
          strike
          to
          tokenAmountIn
          tokenAmountOut
          tokenIn {
            address
            decimals
            name
            symbol
          }
          tokenOut {
            address
            decimals
            name
            symbol
          }
          validityBucketSeconds
        }
      }
    }
  } 
  `,
);


export function useUserOrders() {
  const { safe } = useSafeAppsSDK();
  const [loaded, setLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState<StopLossOrderType[]>([]);

  const reload = ({ showSpinner }: { showSpinner: boolean }) => {
    setLoaded(!showSpinner);
    setRetryCount(retryCount + 1);
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const [processedOrders] = await Promise.all([
          getProcessedStopLossOrders({
            chainId: safe.chainId as ChainId,
            address: safe.safeAddress as Address,
          }),
        ]);
        if (processedOrders !== undefined) {
          setOrders([...processedOrders]);
        } else {
          setOrders([]);
        }
        setError(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setError(true);
      }
      setLoaded(true);
    }

    loadOrders();
  }, [safe, retryCount]);

  return { orders, loaded, error, reload };
}

async function getProcessedStopLossOrders({ chainId, address }: {chainId: ChainId, address: Address}) {
  const publicClient = publicClientsFromIds[chainId];
  const rawOrdersData = await composableCowSubgraph.UserStopLossOrders({ user: `${address}-${chainId}`, });
  const cowOrders = await getCowOrders(address, chainId);

  if (!rawOrdersData?.orders?.items) {
    return [];
  }

  const singleOrders = await publicClient.multicall({
    contracts:  rawOrdersData.orders.items.map(order => ({
      address: COMPOSABLE_COW_ADDRESS,
      abi: composableCowAbi,
      functionName: "singleOrders",
      args: [address, order.hash],
    })),
  })

  const orders = rawOrdersData.orders.items.map((order, index) => {
    const singleOrderResult = singleOrders[index];
    const cowOrderMatch = cowOrders.find(cowOrder => cowOrder.appData === order.stopLossParameters?.appData);
    const status = getOrderStatus({ cowOrderMatch, singleOrder:singleOrderResult.result });
    return {
      ...order,
      status: status,
    };
  });
  return orders 
}


function getOrderStatus({cowOrderMatch, singleOrder}: {cowOrderMatch: CowOrder | undefined, singleOrder: Address | undefined}) {
  if ((cowOrderMatch && cowOrderMatch.status !== "fulfilled" && !singleOrder) || (!cowOrderMatch && !singleOrder)) {
    return "cancelled"
  } else if (cowOrderMatch) {
    return cowOrderMatch.status === "open" ? "posted" : cowOrderMatch.status
  } else {
    return "created"
  }
}


export async function getSingleOrder(
  orderHash: Address,
  userAddress: Address,
  publicClient: PublicClient,
) {
  return publicClient.readContract({
    address: COMPOSABLE_COW_ADDRESS,
    abi: composableCowAbi,
    functionName: "singleOrders",
    args: [userAddress, orderHash],
  });
}

