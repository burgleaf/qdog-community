type SiteLogoProps = {
  size?: number;
  className?: string;
};

export function SiteLogo({ size = 28, className = "" }: SiteLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-center bg-no-repeat ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: "url('/icon.svg')",
        backgroundSize: "140%",
      }}
    />
  );
}
