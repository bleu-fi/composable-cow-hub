import { CodegenConfig } from "@graphql-codegen/cli";
import { gnosis, mainnet, sepolia } from "viem/chains";

export enum Subgraph {
  ComposableCow = "composable-cow",
  BalancerGauges = "balancer-gauges",
}

export type SupportedChains =
  | typeof mainnet.id
  | typeof gnosis.id
  | typeof sepolia.id;

export const SUBGRAPHS = {
  [Subgraph.BalancerGauges]: {
    name: Subgraph.BalancerGauges,
    endpoints() {
      return {
        [mainnet.id]: `https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges`,
        [gnosis.id]: `https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-gnosis-chain`,
        [sepolia.id]: `https://api.studio.thegraph.com/proxy/24660/balancer-gauges-sepolia/version/latest/`,
      };
    },
    endpointFor(network: SupportedChains) {
      return this.endpoints()[network];
    },
  },
  [Subgraph.ComposableCow]: {
    name: Subgraph.ComposableCow,
    endpoints() {
      return {
        [mainnet.id]: `https://composable-cow-api.up.railway.app/`,
        [gnosis.id]: `https://composable-cow-api.up.railway.app/`,
        [sepolia.id]: `https://composable-cow-api.up.railway.app/`,
      };
    },
    endpointFor(network: SupportedChains) {
      return this.endpoints()[network];
    },
  },
};

const generates = Object.assign(
  {},
  ...Object.values(SUBGRAPHS).map(({ name, endpoints }) =>
    Object.fromEntries(
      Object.entries(endpoints())
        .map(([network, endpoint]) => [
          [
            `./src/lib/gql/${name}/__generated__/${network}.ts`,
            {
              schema: endpoint,
              documents: [`src/lib/gql/${name}/*.ts`],
              plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
                "plugin-typescript-swr",
              ],
            },
          ],
          [
            `./src/lib/gql/${name}/__generated__/${network}.server.ts`,
            {
              schema: endpoint,
              documents: [`src/lib/gql/${name}/*.ts`],
              plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
              ],
            },
          ],
        ])
        .flat(1)
    )
  )
);

const config: CodegenConfig = {
  config: {
    autogenSWRKey: true,
    enumsAsTypes: true,
    futureProofEnums: true,
  },
  generates,
};

export default config;
