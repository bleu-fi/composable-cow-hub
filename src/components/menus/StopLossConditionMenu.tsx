import { zodResolver } from "@hookform/resolvers/zod";
import { slateDarkA } from "@radix-ui/colors";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useReactFlow } from "reactflow";

import { ChainId } from "#/lib/publicClients";
import { generateStopLossConditionSchema } from "#/lib/schema";
import { IStopLossRecipeData, TIME_OPTIONS } from "#/lib/types";
import { buildBlockExplorerAddressURL } from "#/lib/utils";

import Button from "../Button";
import { Input } from "../Input";
import { Select, SelectItem } from "../Select";
import { Tooltip } from "../Tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Form, FormLabel } from "../ui/form";

const ORACLE_TOOLTIP_TEXT =
  "Please take care when manually editing the address of the oracle contract, as it will determine if the order is ready to be posted and its price.";
const MAX_TIME_SINCE_LAST_ORACLE_UPDATE_TOOLTIP_TEXT =
  "If both oracle has not been updated within this time, the order will not be posted.";

export function StopLossConditionMenu({
  id,
  data,
  defaultValues,
}: {
  id: string;
  data: IStopLossRecipeData;
  defaultValues: FieldValues;
}) {
  const {
    safe: { chainId },
  } = useSafeAppsSDK();
  const stopLossConditionSchema = generateStopLossConditionSchema({
    chainId: chainId as ChainId,
  });
  const form = useForm<typeof stopLossConditionSchema._type>({
    resolver: zodResolver(stopLossConditionSchema),
    defaultValues,
  });
  const { control } = form;

  const { setNodes, getNodes } = useReactFlow();

  const onSubmit = (formData: FieldValues) => {
    const newNodes = getNodes().map((node) => {
      if (node.id === id) {
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
      <div className="m-2 w-full max-h-[39rem] overflow-y-scroll">
        <div>
          <span className="text-md font-bold mb-3">Stop Loss Condition</span>
          <Input
            name="strikePrice"
            label={`Strike Price (${data.tokenSell?.symbol}/${data.tokenBuy?.symbol})`}
            type="number"
            step={1e-18}
            tooltipText="If the price of the selling relative to the buying tokens is less than this value"
          />
          <Accordion className="w-full" type="single" collapsible>
            <AccordionItem value="advancedOptions" key="advancedOption">
              <AccordionTrigger>Advanced Options</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-2 mx-2">
                  <Input
                    name="tokenSellOracle"
                    label={`${data.tokenSell?.symbol} Oracle`}
                    tooltipLink={
                      data.tokenSellOracle
                        ? buildBlockExplorerAddressURL({
                            chainId,
                            address: data.tokenSellOracle,
                          })?.url
                        : undefined
                    }
                    tooltipText={ORACLE_TOOLTIP_TEXT}
                  />
                  <Input
                    name="tokenBuyOracle"
                    label={`${data.tokenBuy?.symbol} Oracle`}
                    tooltipLink={
                      data.tokenBuyOracle
                        ? buildBlockExplorerAddressURL({
                            chainId,
                            address: data.tokenBuyOracle,
                          })?.url
                        : undefined
                    }
                    tooltipText={ORACLE_TOOLTIP_TEXT}
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <FormLabel className="mb-2 block text-sm text-slate12">
                        Max time since last oracle update
                      </FormLabel>
                      <Tooltip
                        content={MAX_TIME_SINCE_LAST_ORACLE_UPDATE_TOOLTIP_TEXT}
                      >
                        <InfoCircledIcon color={slateDarkA.slateA11} />
                      </Tooltip>
                    </div>
                    <Controller
                      control={control}
                      name="maxTimeSinceLastOracleUpdate"
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          onValueChange={onChange}
                          value={value}
                          ref={ref}
                        >
                          {Object.entries(TIME_OPTIONS).map(([key, value]) => (
                            <SelectItem key={key} value={String(value)}>
                              {key}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Button type="submit" className="my-2 w-full">
          Save
        </Button>
      </div>
    </Form>
  );
}
