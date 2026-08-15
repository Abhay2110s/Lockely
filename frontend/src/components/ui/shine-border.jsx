import { cn } from "@/lib/utils";

export function ShineBorder({
  borderWidth = 3,
  duration = 6,
  shineColor = ["#FF0055", "#FF5000", "#FFCC00", "#00E676", "#00B0FF", "#7C4DFF", "#FF0055"],
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
          // CSS custom property -- overrides the duration in the .animate-shine-spin animation shorthand
          "--shine-duration": `${duration}s`,
        }}
      />
    </div>
  );
}

export default ShineBorder;
