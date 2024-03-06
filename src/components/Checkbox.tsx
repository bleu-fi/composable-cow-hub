import { slateDarkA } from "@radix-ui/colors";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

import { Tooltip } from "./Tooltip";

interface ICheckbox {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  tooltipText?: string;
  tooltipLink?: string;
}

export function Checkbox({
  id,
  checked,
  onChange,
  label,
  tooltipLink,
  tooltipText,
}: ICheckbox) {
  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        className="flex size-[15px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-slate12 focus:shadow-[0_0_0_2px_black]"
        checked={checked}
        onClick={() => onChange()}
        id={id}
      >
        <CheckboxPrimitive.Indicator className="text-slate3">
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label htmlFor={id} className="pl-[15px] text-[15px] leading-8">
        {label}
      </label>
      {tooltipText && (
        <Tooltip content={tooltipText}>
          {tooltipLink ? (
            <a href={tooltipLink} target="_blank">
              <InfoCircledIcon color={slateDarkA.slateA11} />
            </a>
          ) : (
            <InfoCircledIcon color={slateDarkA.slateA11} />
          )}
        </Tooltip>
      )}
    </div>
  );
}
