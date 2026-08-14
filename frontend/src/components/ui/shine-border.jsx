import { cn } from "@/lib/utils";

export function ShineBorder({
  borderWidth = 3,
  duration = 6,
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  className = "",
}) {
  const colors = Array.isArray(shineColor)
    ? [...shineColor, shineColor[0]].join(", ")
    : shineColor;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-[3px] z-30 rounded-[inherit] overflow-hidden p-[3px]",
        className
      )}
    >
      <div
        className="absolute -inset-[150%] size-[400%] animate-shine-spin opacity-100"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${colors})`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: `${borderWidth}px`,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
}

export default ShineBorder;
