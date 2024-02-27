"use client";

import { ClockIcon } from "@radix-ui/react-icons";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { NetworksContextProvider } from "#/contexts/networks";

import Button from "./Button";
import { Header } from "./Header";
import { ToastProvider } from "./Toast";

function HistoryButton() {
  return (
    <Link href="/history">
      <Button>
        <span className="flex items-center gap-x-2">
          <ClockIcon />
          History
        </span>
      </Button>
    </Link>
  );
}

export function RootLayout({ children }: React.PropsWithChildren) {
  const path = usePathname();
  return (
    <SafeProvider loader={<SafeLoader />}>
      <ToastProvider>
        <NetworksContextProvider>
          <Header linkUrl={"/builder"} imageSrc={"/assets/stoploss.svg"}>
            {path !== "/history" && <HistoryButton />}
          </Header>
          <div className="size-full bg-blue1">{children}</div>
        </NetworksContextProvider>
      </ToastProvider>
    </SafeProvider>
  );
}

function SafeLoader() {
  return (
    <div className="bg-blue1 flex size-full flex-col justify-center items-center px-12 py-16 md:py-20 text-slate12">
      <div className="text-center text-3xl">This is a Safe (wallet) App</div>
      <p className="text-xl">
        To access please use this
        <Link
          target="_blank"
          href="https://app.safe.global/share/safe-app?appUrl=https%3A%2F%2Fcow-tools-bleu-fi.vercel.app&chain=gor"
          className="text-amber9"
        >
          {" "}
          link{" "}
        </Link>
        with your safe account connected
      </p>
    </div>
  );
}
