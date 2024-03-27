import cn from "clsx";

enum SpinnerSize {
  sm = 6,
  md = 12,
  lg = 20,
}

export enum SpinnerColor {
  highlight = "highlight",
  primary = "primary",
}

export function Spinner({
  size = "md",
  color = "highlight",
}: {
  size?: keyof typeof SpinnerSize;
  color?: keyof typeof SpinnerColor;
}) {
  const SpinnerSizeNumber = SpinnerSize[size];
  const SpinnerColorString = SpinnerColor[color];
  return (
    <div
      className={cn("flex w-full flex-col items-center rounded-3xl", {
        "px-12 py-16 md:py-20": SpinnerSizeNumber === SpinnerSize.md,
      })}
    >
      <div
        className={cn(
          "border-6 mx-2 animate-spin rounded-full border-2 border-solid",
          {
            "h-4 w-4": SpinnerSizeNumber === SpinnerSize.sm,
            "h-12 w-12": SpinnerSizeNumber === SpinnerSize.md,
            "h-20 w-20": SpinnerSizeNumber === SpinnerSize.lg,
          },
          {
            "border-highlight": SpinnerColorString === SpinnerColor.highlight,
            "border-primary": SpinnerColorString === SpinnerColor.primary,
          }
        )}
      />
    </div>
  );
}
