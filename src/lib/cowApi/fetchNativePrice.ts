import { Address } from "viem";
import { ChainId } from "../publicClients";
import { COW_API_URL_BY_CHAIN_ID } from "./api";

export interface INativePrice {
  price: number;
}

export async function getNativePrice(
  tokenAddress: Address,
  chainId: ChainId
): Promise<number> {
  const url = COW_API_URL_BY_CHAIN_ID[chainId];

  return fetch(`${url}/api/v1/token/${tokenAddress}/native_price`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json() as Promise<INativePrice>)
    .then((data) => data.price);
}
