import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Node, useNodes, useReactFlow } from "reactflow";
import { Address } from "viem";

import { FALLBACK_STATES, useFallbackState } from "#/hooks/useFallbackState";
import { useRawTxData } from "#/hooks/useRawTxData";
import { calculateSellAmount } from "#/lib/calculateAmounts";
import {
  setDomainVerifierArgs,
  setFallbackHandlerArgs,
  TRANSACTION_TYPES,
} from "#/lib/transactionFactory";
import { IHooks, INodeData, IStopLossRecipeData } from "#/lib/types";

import { AlertCard } from "../AlertCard";
import { Checkbox } from "../Checkbox";
import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { MultiSendMenu } from "./MultiSendMenu";
import { StopLossConditionMenu } from "./StopLossConditionMenu";
import { StopLossRecipeMenu } from "./StopLossRecipeMenu";
import { SwapMenu } from "./SwapMenu";

const nodeMenus = {
  stopLoss: StopLossConditionMenu,
  swap: SwapMenu,
  hookMultiSend: MultiSendMenu,
};

const spender = "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110" as Address;

export default function Menu() {
  const {
    safe: { chainId },
  } = useSafeAppsSDK();
  const [recipeData, setRecipeData] = useState<IStopLossRecipeData>();
  const nodes = useNodes<INodeData>();
  const selected = nodes.find((node) => node.selected);

  useEffect(() => {
    const recipeData = {
      ...(nodes.find((node) => node.id === "condition")
        ?.data as IStopLossRecipeData),
      ...(nodes.find((node) => node.id === "swap")
        ?.data as IStopLossRecipeData),
    };
    const hooksData = nodes
      .filter((node) => node.type?.includes("hook"))
      .reduce((acc, node) => {
        return [...acc, node.data as IHooks];
      }, [] as IHooks[]);

    setRecipeData({
      ...recipeData,
      chainId,
      preHooks: hooksData,
    } as IStopLossRecipeData);
  }, [nodes]);

  if (!recipeData) {
    return <Spinner />;
  }

  if (!selected || !nodeMenus[selected?.type as keyof typeof nodeMenus]) {
    return <DefaultMenu data={recipeData} />;
  }

  return <SelectedMenu data={recipeData} selected={selected} />;
}

function DefaultMenu({ data }: { data: IStopLossRecipeData }) {
  const {
    safe: { safeAddress },
  } = useSafeAppsSDK();
  const { sendTransactions } = useRawTxData();
  const { fallbackState, domainSeparator } = useFallbackState();
  const needFallbackSetting =
    fallbackState === FALLBACK_STATES.HAS_NOTHING ||
    fallbackState === FALLBACK_STATES.HAS_EXTENSIBLE_FALLBACK;
  const [fallbackSetupApprove, setFallbackSetupApprove] = useState(false);

  if (!domainSeparator) {
    return <Spinner />;
  }

  const createOrder = async () => {
    const setFallbackTx = {
      type: TRANSACTION_TYPES.SET_FALLBACK_HANDLER,
      safeAddress,
    } as setFallbackHandlerArgs;
    const setDomainVerifierTx = {
      type: TRANSACTION_TYPES.SET_DOMAIN_VERIFIER,
      safeAddress,
      domainSeparator,
    } as setDomainVerifierArgs;

    const setupTxs = (() => {
      switch (fallbackState) {
        case FALLBACK_STATES.HAS_NOTHING:
          return [setFallbackTx, setDomainVerifierTx];
        case FALLBACK_STATES.HAS_EXTENSIBLE_FALLBACK:
          return [setDomainVerifierTx];
        default:
          return [];
      }
    })();

    const rawTxs = [
      ...setupTxs,
      {
        type: TRANSACTION_TYPES.ERC20_APPROVE as const,
        token: data.tokenSell,
        amount: sellAmount,
        spender,
      },
      {
        type: TRANSACTION_TYPES.STOP_LOSS_ORDER as const,
        ...data,
      },
    ];
    await sendTransactions(rawTxs);
  };

  const sellAmount = calculateSellAmount(data);
  return (
    <div>
      <div className="flex flex-col m-2 w-full max-h-[40rem] overflow-y-scroll gap-y-2">
        <StopLossRecipeMenu data={data} />
        {needFallbackSetting && (
          <AlertCard style="warning" title="Fallback Setting">
            <span>
              To create the order you need to set the Composable CoW as the
              domain verifier and the Extensible Fallback as the fallback
              handler.
            </span>
            <Checkbox
              id="setFallbackHandler"
              checked={fallbackSetupApprove}
              onChange={() => setFallbackSetupApprove(!fallbackSetupApprove)}
              label="Approve fallback setup"
            />
          </AlertCard>
        )}
        <Button
          type={"submit"}
          disabled={needFallbackSetting && !fallbackSetupApprove}
          onClick={createOrder}
          className="bg-blue9 hover:bg-blue7"
        >
          Create Order
        </Button>
      </div>
    </div>
  );
}

function SelectedMenu({
  selected,
  data,
}: {
  selected: Node<INodeData>;
  data: IStopLossRecipeData;
}) {
  const form = useForm<FieldValues>({ defaultValues: selected.data });

  const { setNodes, getNodes } = useReactFlow();
  const MenuComponent = nodeMenus[selected?.type as keyof typeof nodeMenus];

  const onSubmit = (formData: FieldValues) => {
    const newNodes = getNodes().map((node) => {
      if (node.id === selected.id) {
        return {
          ...node,
          data: { ...node.data, ...formData },
          selected: false,
        };
      }
      return node;
    });
    setNodes(newNodes);
  };

  return (
    <Form {...form} onSubmit={onSubmit}>
      <div className="m-2 w-full max-h-[50rem] overflow-y-scroll">
        <MenuComponent data={data} form={form} />
        <Button type="submit" className="bg-blue9 hover:bg-blue7 my-2">
          Save
        </Button>
      </div>
    </Form>
  );
}
