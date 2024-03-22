import { tomatoDark } from "@radix-ui/colors";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { IStopLossConditionData } from "#/lib/types";
import { formatNumber } from "#/utils";

import { Tooltip } from "../Tooltip";
import { BaseNode } from ".";

export function StopLossNode({
  selected,
  data,
}: {
  selected: boolean;
  data: IStopLossConditionData;
}) {
  return (
    <BaseNode selected={selected} isStart>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2  items-center">
          <span className="text-sm font-bold">Stop Loss Condition</span>
          {data.error && (
            <a href={"https://data.chain.link/feeds"} target="_blank">
              <Tooltip content={data.error}>
                <ExclamationTriangleIcon
                  className="size-3"
                  color={tomatoDark.tomato10}
                />
              </Tooltip>
            </a>
          )}
        </div>
        <span className="text-xs text-gray-500">
          If the sell token price falls bellow{" "}
          {formatNumber(data.strikePrice, 4, "decimal", "standard", 0.0001)}
        </span>
      </div>
    </BaseNode>
  );
}
