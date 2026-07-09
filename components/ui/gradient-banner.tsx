import { bannerStyle } from "@/lib/format";

export function GradientBanner({
  hue,
  className = "",
}: {
  hue: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`gradient-banner w-full ${className}`}
      style={bannerStyle(hue)}
    />
  );
}
