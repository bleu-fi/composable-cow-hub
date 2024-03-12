import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
};

export type CowAmmParameters = {
  __typename?: 'CowAmmParameters';
  appData: Scalars['String']['output'];
  id: Scalars['String']['output'];
  minTradedToken0: Scalars['BigInt']['output'];
  orderId: Scalars['String']['output'];
  priceOracle: Scalars['String']['output'];
  priceOracleData: Scalars['String']['output'];
  token0: Token;
  token0Id: Scalars['String']['output'];
  token1: Token;
  token1Id: Scalars['String']['output'];
};

export type CowAmmParametersFilter = {
  appData?: InputMaybe<Scalars['String']['input']>;
  appData_gt?: InputMaybe<Scalars['String']['input']>;
  appData_gte?: InputMaybe<Scalars['String']['input']>;
  appData_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  appData_lt?: InputMaybe<Scalars['String']['input']>;
  appData_lte?: InputMaybe<Scalars['String']['input']>;
  appData_not?: InputMaybe<Scalars['String']['input']>;
  appData_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  minTradedToken0?: InputMaybe<Scalars['BigInt']['input']>;
  minTradedToken0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minTradedToken0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minTradedToken0_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  minTradedToken0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minTradedToken0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minTradedToken0_not?: InputMaybe<Scalars['BigInt']['input']>;
  minTradedToken0_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  priceOracle?: InputMaybe<Scalars['String']['input']>;
  priceOracleData?: InputMaybe<Scalars['String']['input']>;
  priceOracleData_gt?: InputMaybe<Scalars['String']['input']>;
  priceOracleData_gte?: InputMaybe<Scalars['String']['input']>;
  priceOracleData_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  priceOracleData_lt?: InputMaybe<Scalars['String']['input']>;
  priceOracleData_lte?: InputMaybe<Scalars['String']['input']>;
  priceOracleData_not?: InputMaybe<Scalars['String']['input']>;
  priceOracleData_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  priceOracle_gt?: InputMaybe<Scalars['String']['input']>;
  priceOracle_gte?: InputMaybe<Scalars['String']['input']>;
  priceOracle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  priceOracle_lt?: InputMaybe<Scalars['String']['input']>;
  priceOracle_lte?: InputMaybe<Scalars['String']['input']>;
  priceOracle_not?: InputMaybe<Scalars['String']['input']>;
  priceOracle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token0Id?: InputMaybe<Scalars['String']['input']>;
  token0Id_contains?: InputMaybe<Scalars['String']['input']>;
  token0Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token0Id_not?: InputMaybe<Scalars['String']['input']>;
  token0Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token0Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1Id?: InputMaybe<Scalars['String']['input']>;
  token1Id_contains?: InputMaybe<Scalars['String']['input']>;
  token1Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token1Id_not?: InputMaybe<Scalars['String']['input']>;
  token1Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token1Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1Id_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type CowAmmParametersPage = {
  __typename?: 'CowAmmParametersPage';
  items?: Maybe<Array<CowAmmParameters>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Order = {
  __typename?: 'Order';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  cowAmmParameters?: Maybe<CowAmmParameters>;
  cowAmmParametersId?: Maybe<Scalars['String']['output']>;
  decodedSuccess: Scalars['Boolean']['output'];
  handler: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  salt: Scalars['String']['output'];
  staticInput: Scalars['String']['output'];
  stopLossParameters?: Maybe<StopLossParameters>;
  stopLossParametersId?: Maybe<Scalars['String']['output']>;
  user: Scalars['String']['output'];
};

export type OrderFilter = {
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  cowAmmParametersId?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_contains?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_ends_with?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cowAmmParametersId_not?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_not_contains?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cowAmmParametersId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  cowAmmParametersId_starts_with?: InputMaybe<Scalars['String']['input']>;
  decodedSuccess?: InputMaybe<Scalars['Boolean']['input']>;
  decodedSuccess_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  decodedSuccess_not?: InputMaybe<Scalars['Boolean']['input']>;
  decodedSuccess_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  handler?: InputMaybe<Scalars['String']['input']>;
  handler_gt?: InputMaybe<Scalars['String']['input']>;
  handler_gte?: InputMaybe<Scalars['String']['input']>;
  handler_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handler_lt?: InputMaybe<Scalars['String']['input']>;
  handler_lte?: InputMaybe<Scalars['String']['input']>;
  handler_not?: InputMaybe<Scalars['String']['input']>;
  handler_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  salt?: InputMaybe<Scalars['String']['input']>;
  salt_gt?: InputMaybe<Scalars['String']['input']>;
  salt_gte?: InputMaybe<Scalars['String']['input']>;
  salt_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  salt_lt?: InputMaybe<Scalars['String']['input']>;
  salt_lte?: InputMaybe<Scalars['String']['input']>;
  salt_not?: InputMaybe<Scalars['String']['input']>;
  salt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  staticInput?: InputMaybe<Scalars['String']['input']>;
  staticInput_gt?: InputMaybe<Scalars['String']['input']>;
  staticInput_gte?: InputMaybe<Scalars['String']['input']>;
  staticInput_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  staticInput_lt?: InputMaybe<Scalars['String']['input']>;
  staticInput_lte?: InputMaybe<Scalars['String']['input']>;
  staticInput_not?: InputMaybe<Scalars['String']['input']>;
  staticInput_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stopLossParametersId?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_contains?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_ends_with?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stopLossParametersId_not?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_not_contains?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stopLossParametersId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  stopLossParametersId_starts_with?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type OrderPage = {
  __typename?: 'OrderPage';
  items?: Maybe<Array<Order>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  cowAmmParameters?: Maybe<CowAmmParameters>;
  cowAmmParameterss?: Maybe<CowAmmParametersPage>;
  order?: Maybe<Order>;
  orders?: Maybe<OrderPage>;
  stopLossParameters?: Maybe<StopLossParameters>;
  stopLossParameterss?: Maybe<StopLossParametersPage>;
  token?: Maybe<Token>;
  tokens?: Maybe<TokenPage>;
  user?: Maybe<User>;
  users?: Maybe<UserPage>;
};


export type QueryCowAmmParametersArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCowAmmParameterssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CowAmmParametersFilter>;
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderFilter>;
};


export type QueryStopLossParametersArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStopLossParameterssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StopLossParametersFilter>;
};


export type QueryTokenArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TokenFilter>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilter>;
};

export type StopLossParameters = {
  __typename?: 'StopLossParameters';
  appData: Scalars['String']['output'];
  buyTokenPriceOracle: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isPartiallyFillable: Scalars['Boolean']['output'];
  isSellOrder: Scalars['Boolean']['output'];
  maxTimeSinceLastOracleUpdate: Scalars['BigInt']['output'];
  orderId: Scalars['String']['output'];
  sellTokenPriceOracle: Scalars['String']['output'];
  strike: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  tokenAmountIn: Scalars['BigInt']['output'];
  tokenAmountOut: Scalars['BigInt']['output'];
  tokenIn: Token;
  tokenInId: Scalars['String']['output'];
  tokenOut: Token;
  tokenOutId: Scalars['String']['output'];
  validityBucketSeconds: Scalars['BigInt']['output'];
};

export type StopLossParametersFilter = {
  appData?: InputMaybe<Scalars['String']['input']>;
  appData_gt?: InputMaybe<Scalars['String']['input']>;
  appData_gte?: InputMaybe<Scalars['String']['input']>;
  appData_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  appData_lt?: InputMaybe<Scalars['String']['input']>;
  appData_lte?: InputMaybe<Scalars['String']['input']>;
  appData_not?: InputMaybe<Scalars['String']['input']>;
  appData_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  buyTokenPriceOracle?: InputMaybe<Scalars['String']['input']>;
  buyTokenPriceOracle_gt?: InputMaybe<Scalars['String']['input']>;
  buyTokenPriceOracle_gte?: InputMaybe<Scalars['String']['input']>;
  buyTokenPriceOracle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  buyTokenPriceOracle_lt?: InputMaybe<Scalars['String']['input']>;
  buyTokenPriceOracle_lte?: InputMaybe<Scalars['String']['input']>;
  buyTokenPriceOracle_not?: InputMaybe<Scalars['String']['input']>;
  buyTokenPriceOracle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  isPartiallyFillable?: InputMaybe<Scalars['Boolean']['input']>;
  isPartiallyFillable_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isPartiallyFillable_not?: InputMaybe<Scalars['Boolean']['input']>;
  isPartiallyFillable_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isSellOrder?: InputMaybe<Scalars['Boolean']['input']>;
  isSellOrder_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isSellOrder_not?: InputMaybe<Scalars['Boolean']['input']>;
  isSellOrder_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  maxTimeSinceLastOracleUpdate?: InputMaybe<Scalars['BigInt']['input']>;
  maxTimeSinceLastOracleUpdate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  maxTimeSinceLastOracleUpdate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  maxTimeSinceLastOracleUpdate_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  maxTimeSinceLastOracleUpdate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  maxTimeSinceLastOracleUpdate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  maxTimeSinceLastOracleUpdate_not?: InputMaybe<Scalars['BigInt']['input']>;
  maxTimeSinceLastOracleUpdate_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  orderId_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not?: InputMaybe<Scalars['String']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['String']['input']>;
  orderId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  orderId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  orderId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  orderId_starts_with?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle_gt?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle_gte?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sellTokenPriceOracle_lt?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle_lte?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle_not?: InputMaybe<Scalars['String']['input']>;
  sellTokenPriceOracle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  strike?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  strike_lt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_lte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenAmountIn?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountIn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountIn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountIn_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenAmountIn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountIn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountIn_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountIn_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenAmountOut?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountOut_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountOut_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountOut_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenAmountOut_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountOut_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountOut_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenAmountOut_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenInId?: InputMaybe<Scalars['String']['input']>;
  tokenInId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenInId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenInId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenInId_not?: InputMaybe<Scalars['String']['input']>;
  tokenInId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenInId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenInId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenInId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenInId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenOutId?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenOutId_not?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenOutId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenOutId_starts_with?: InputMaybe<Scalars['String']['input']>;
  validityBucketSeconds?: InputMaybe<Scalars['BigInt']['input']>;
  validityBucketSeconds_gt?: InputMaybe<Scalars['BigInt']['input']>;
  validityBucketSeconds_gte?: InputMaybe<Scalars['BigInt']['input']>;
  validityBucketSeconds_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  validityBucketSeconds_lt?: InputMaybe<Scalars['BigInt']['input']>;
  validityBucketSeconds_lte?: InputMaybe<Scalars['BigInt']['input']>;
  validityBucketSeconds_not?: InputMaybe<Scalars['BigInt']['input']>;
  validityBucketSeconds_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type StopLossParametersPage = {
  __typename?: 'StopLossParametersPage';
  items?: Maybe<Array<StopLossParameters>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Token = {
  __typename?: 'Token';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type TokenFilter = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type TokenPage = {
  __typename?: 'TokenPage';
  items?: Maybe<Array<Token>>;
  pageInfo?: Maybe<PageInfo>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  orders?: Maybe<OrderPage>;
};


export type UserOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFilter = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type UserPage = {
  __typename?: 'UserPage';
  items?: Maybe<Array<User>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserStopLossOrdersQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type UserStopLossOrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'OrderPage', items?: Array<{ __typename?: 'Order', blockNumber: any, blockTimestamp: any, chainId: number, decodedSuccess: boolean, handler: string, id: string, user: string, hash: string, staticInput: string, stopLossParameters?: { __typename?: 'StopLossParameters', appData: string, buyTokenPriceOracle: string, id: string, isPartiallyFillable: boolean, isSellOrder: boolean, maxTimeSinceLastOracleUpdate: any, orderId: string, sellTokenPriceOracle: string, strike: any, to: string, tokenAmountIn: any, tokenAmountOut: any, validityBucketSeconds: any, tokenIn: { __typename?: 'Token', address: string, decimals: number, name: string, symbol: string }, tokenOut: { __typename?: 'Token', address: string, decimals: number, name: string, symbol: string } } | null }> | null } | null };


export const UserStopLossOrdersDocument = gql`
    query UserStopLossOrders($user: String!) {
  orders(
    where: {stopLossParametersId_not: null, user_in: [$user]}
    orderBy: "blockTimestamp"
    orderDirection: "desc"
  ) {
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
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UserStopLossOrders(variables: UserStopLossOrdersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserStopLossOrdersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserStopLossOrdersQuery>(UserStopLossOrdersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserStopLossOrders', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;