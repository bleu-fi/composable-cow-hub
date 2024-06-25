"use client";

import { Button, Card, CardContent, CardTitle } from "@bleu/ui";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useForm } from "react-hook-form";

import { useSwapContext } from "#/contexts/swapContext";
import { ChainId } from "#/lib/publicClients";
import { generateSwapSchema } from "#/lib/schema";
import { SwapData } from "#/lib/types";

import { AdvancedSettingsAlert } from "./AdvancedSettingsAlert";
import { AdvancedSettingsDialog } from "./AdvancedSettingsDialog";
import { InvertTokensSeparator } from "./InvertTokensSeparator";
import { OrderTypeSwitch } from "./OrderTypeSwitch";
import { PriceInputCard } from "./PriceInputCard";
import { TokenInputCard } from "./TokenInputCard";
import { Form } from "./ui/form";

export function SwapCard() {
  const {
    safe: { chainId },
  } = useSafeAppsSDK();
  const formSchema = generateSwapSchema(chainId as ChainId);
  const { addDraftOrder, setReviewOrdersDialogOpen } = useSwapContext();
  const form = useForm<SwapData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isSellOrder: true,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form
      {...form}
      onSubmit={(data) => {
        addDraftOrder(data);
        setReviewOrdersDialogOpen(true);
      }}
      className="w-full"
    >
      <Card className="bg-foreground text-background w-full p-5 rounded-md overflow-auto">
        <CardTitle className="w-full flex justify-between">
          <OrderTypeSwitch />
          <AdvancedSettingsDialog />
        </CardTitle>
        <CardContent className="flex flex-col gap-4 py-5 px-0">
          <TokenInputCard side="Sell" />
          <div className="flex gap-2 justify-between">
            <PriceInputCard fieldName="strikePrice" showMarketPrice />
            <PriceInputCard fieldName="limitPrice" />
          </div>
          <InvertTokensSeparator />
          <TokenInputCard side="Buy" />
          <AdvancedSettingsAlert />
          <Button
            className="rounded-md"
            type="submit"
            loading={isSubmitting}
            loadingText="Validating..."
          >
            Review stop-loss order
          </Button>
        </CardContent>
      </Card>
    </Form>
  );
}
