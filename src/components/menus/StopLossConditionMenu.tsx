import { IStopLossRecipeData, timeOptionsValues } from "@/lib/types";
import { Input } from "../Input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Controller, UseFormReturn } from "react-hook-form";
import { Select, SelectItem } from "../Select";

export function StopLossConditionMenu({
  data,
  form,
}: {
  data: IStopLossRecipeData;
  form: UseFormReturn;
}) {
  const { control } = form;

  return (
    <div>
      <span className="text-md font-bold mb-3">Stop Loss Condition</span>
      <Input
        name="strikePrice"
        label="Strike Price"
        type="number"
        step={1e-18}
      />
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="advancedOptions" key="advancedOption">
          <AccordionTrigger>Advanced Options</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-y-2 mx-2">
              <Input
                name="tokenSellOracle"
                label={`${data.tokenSell?.symbol} Oracle`}
              />
              <Input
                name="tokenBuyOracle"
                label={`${data.tokenBuy?.symbol} Oracle`}
              />
              <Input
                name="maxTimeSinceLastOracleUpdate"
                label="Max Time Since Last Oracle Update"
              />
              <div className="flex flex-col">
                <label className="mb-2 block text-sm">
                  Maximium Time Since Last Oracle Update
                </label>
                <Controller
                  control={control}
                  name="validityBucketTime"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select onValueChange={onChange} value={value} ref={ref}>
                      {timeOptionsValues.map((timeOption) => (
                        <SelectItem key={timeOption} value={timeOption}>
                          {timeOption}
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
  );
}
