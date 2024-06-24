import {
  cn,
  FormMessage,
  Input as InputPrimitive,
  Label,
  Tooltip,
} from "@bleu/ui";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React, { HTMLProps } from "react";
import { FieldError, RegisterOptions, useFormContext } from "react-hook-form";

interface IInput extends Omit<HTMLProps<HTMLInputElement>, "name"> {
  name: string;
  validation?: RegisterOptions;
  tooltipText?: string;
  tooltipLink?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({
    name,
    label,
    validation,
    tooltipText,
    tooltipLink,
    className,
    ...props
  }: IInput) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    if (!name) {
      throw new Error("Input component requires a name prop");
    }

    const error = errors[name] as FieldError | undefined;
    const errorMessage = error?.message;

    return (
      <div className="flex flex-col">
        {label && (
          <div className="flex flex-row gap-x-2 items-center mb-2">
            <Label className="block text-sm text-background">{label}</Label>
            {tooltipText && (
              <Tooltip content={tooltipText}>
                {tooltipLink ? (
                  <a
                    href={tooltipLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InfoCircledIcon className="text-background" />
                  </a>
                ) : (
                  <InfoCircledIcon className="text-background" />
                )}
              </Tooltip>
            )}
          </div>
        )}
        <InputPrimitive
          {...props}
          {...register(name, validation)}
          className={cn(
            "w-full shadow-none rounded-none focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground/70 bg-foreground border border-background",
            className
          )}
        />

        {errorMessage && (
          <FormMessage className="mt-1 text-sm text-destructive">
            <span>{errorMessage}</span>
          </FormMessage>
        )}
      </div>
    );
  }
);
