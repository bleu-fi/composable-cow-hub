import { zodResolver } from "@hookform/resolvers/zod";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Address, formatUnits } from "viem";

import { useSafeBalances } from "#/hooks/useSafeBalances";
import { ChainId } from "#/lib/publicClients";
import { generateSwapSchema } from "#/lib/schema";
import { ISwapData, TIME_OPTIONS } from "#/lib/types";
import { convertAndRoundDown, formatNumber } from "#/lib/utils";

import Button from "../Button";
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
import { Select, SelectItem } from "../Select";
import { TokenSelect } from "../TokenSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Form, FormMessage } from "../ui/form";

export function SwapMenu({
  data,
  onSubmit,
  defaultValues,
}: {
  data: ISwapData;
  defaultValues: FieldValues;
  onSubmit: (data: FieldValues) => void;
}) {
  const { fetchBalance } = useSafeBalances();
  const {
    safe: { chainId },
  } = useSafeAppsSDK();
  const schema = generateSwapSchema({ chainId: chainId as ChainId });
  const form = useForm<typeof schema._type>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const formData = watch();

  const amountDecimals = formData.isSellOrder
    ? formData.tokenSell.decimals
    : formData.tokenBuy.decimals;
  const amountAddress = formData.isSellOrder
    ? formData.tokenSell.address
    : formData.tokenBuy.address;

  const walletAmount = formatUnits(
    BigInt(fetchBalance((amountAddress || "0x") as Address)),
    amountDecimals
  );

  return (
    <Form {...form} onSubmit={onSubmit}>
      <div className="m-2 w-full max-h-[39rem] overflow-y-scroll">
        <div>
          <span className="text-md font-bold mb-3">Swap</span>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-1">
              <Input
                name="amount"
                label={`Amount to ${formData.isSellOrder ? "sell" : "buy"}`}
                type="number"
                step={1 / 10 ** amountDecimals}
              />
              <div className="flex gap-x-1 text-xs">
                <span className="text-slate10">
                  <span>
                    Wallet Balance:{" "}
                    {formatNumber(
                      walletAmount,
                      4,
                      "decimal",
                      "standard",
                      0.0001
                    )}
                  </span>
                </span>
                <button
                  type="button"
                  className="text-blue9 outline-none hover:text-amber9"
                  onClick={() => {
                    setValue("amount", convertAndRoundDown(walletAmount));
                  }}
                >
                  Max
                </button>
              </div>
            </div>
            <TokenSelect
              selectedToken={data.tokenSell}
              tokenType="sell"
              onSelectToken={(newToken) => {
                setValue("tokenSell", newToken);
              }}
            />
            {errors.tokenSell && (
              <FormMessage className="h-6 text-sm text-tomato10">
                <span>{errors.tokenSell.message}</span>
              </FormMessage>
            )}
            <TokenSelect
              selectedToken={data.tokenBuy}
              tokenType="buy"
              onSelectToken={(newToken) => {
                setValue("tokenBuy", newToken);
              }}
            />
            {errors.tokenBuy && (
              <FormMessage className="h-6 text-sm text-tomato10">
                <span>{errors.tokenBuy.message}</span>
              </FormMessage>
            )}
            <Accordion className="w-full" type="single" collapsible>
              <AccordionItem value="advancedOptions" key="advancedOption">
                <AccordionTrigger>Advanced Options</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-2 mx-2">
                    <Input
                      name="allowedSlippage"
                      label={`Allowed Slippage (%)`}
                      type="number"
                    />
                    <Input name="receiver" label="Receiver" />
                    <Checkbox
                      id="isPartiallyFillable"
                      checked={formData.isPartiallyFillable}
                      label="Is Partially Fillable"
                      onChange={() =>
                        setValue(
                          "isPartiallyFillable",
                          !formData.isPartiallyFillable
                        )
                      }
                    />
                    <Checkbox
                      id="isSellOrder"
                      checked={formData.isSellOrder}
                      label="Is Sell Order"
                      onChange={() =>
                        setValue("isSellOrder", !formData.isSellOrder)
                      }
                    />
                    <div className="flex flex-col">
                      <label className="mb-2 block text-sm text-slate12">
                        Validity Bucket Time
                      </label>
                      <Controller
                        control={control}
                        name="validityBucketTime"
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            onValueChange={onChange}
                            value={value}
                            ref={ref}
                          >
                            {Object.entries(TIME_OPTIONS).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={String(value)}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <Button type="submit" className="my-2 w-full">
          Save
        </Button>
      </div>
    </Form>
  );
}
