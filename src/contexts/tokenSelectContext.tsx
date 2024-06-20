"use client";

import React from "react";

import { cowTokenList } from "#/lib/cowTokenList";
import { ChainId } from "#/lib/publicClients";
import { IToken } from "#/lib/types";

interface ITokenWithChainId extends IToken {
  chainId: ChainId;
}

interface ITokenSelectContext {
  getTokenList: (chainId: ChainId) => IToken[];
  addImportedToken: (token: IToken, chainId: ChainId) => void;
}

export const TokenSelectContext = React.createContext<ITokenSelectContext>(
  {} as ITokenSelectContext
);

function fetchFromLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const item = localStorage.getItem(key) as string;
  if (!item) return null;

  return JSON.parse(item);
}

export const TokenSelectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (typeof window === "undefined" || !window.localStorage) return;

  const [importedTokenList, setImportedTokenList] = React.useState<
    ITokenWithChainId[]
  >(fetchFromLocalStorage("importedTokens") || []);

  function getTokenList(chainId: ChainId) {
    return [
      ...(cowTokenList.filter(
        (token) => token.chainId === chainId
      ) as IToken[]),
      ...importedTokenList,
    ];
  }

  function addImportedToken(token: IToken, chainId: ChainId) {
    const newImportedTokenList = [...importedTokenList, { ...token, chainId }];
    setImportedTokenList(newImportedTokenList);
    localStorage.setItem(
      "importedTokens",
      JSON.stringify(newImportedTokenList)
    );
  }

  return (
    <TokenSelectContext.Provider
      value={{
        getTokenList,
        addImportedToken,
      }}
    >
      {children}
    </TokenSelectContext.Provider>
  );
};

export const useTokenSelect = () => React.useContext(TokenSelectContext);
