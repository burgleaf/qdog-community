type EggTraits = {
  color: string;
  size: string;
  shape: string;
  material: string;
};

const palettes: Record<string, { base: string; shade: string; glow: string }> = {
  red: { base: "#ff6b5f", shade: "#b83240", glow: "#ffd0c8" },
  blue: { base: "#55a7ff", shade: "#3159b8", glow: "#c9ecff" },
  green: { base: "#50c98c", shade: "#18785c", glow: "#c9f5dc" },
  gold: { base: "#f4bd45", shade: "#a76b12", glow: "#fff0ae" },
  purple: { base: "#a879ef", shade: "#6340a9", glow: "#ead9ff" },
};

export function parseEggTraits(value: string): EggTraits {
  const entries = Object.fromEntries(
    value.split("|").map((item) => {
      const [key, trait] = item.split(":");
      return [key, trait];
    }),
  );
  return {
    color: entries.color ?? "gold",
    size: entries.size ?? "medium",
    shape: entries.shape ?? "oval",
    material: entries.material ?? "ceramic",
  };
}

export function PetEggVisual({ traits, className = "" }: { traits: string; className?: string }) {
  const parsed = parseEggTraits(traits);
  const palette = palettes[parsed.color] ?? palettes.gold;
  const scale = parsed.size === "small" ? 0.82 : parsed.size === "large" ? 1.08 : 0.94;
  const shell = parsed.shape === "round"
    ? "M50 18C29 18 17 39 17 61c0 23 14 35 33 35s33-12 33-35C83 39 71 18 50 18Z"
    : parsed.shape === "angular"
      ? "M50 8 77 29 88 68 67 96 33 96 12 68 23 29Z"
      : "M50 7C31 7 14 40 14 66c0 20 15 32 36 32s36-12 36-32C86 40 69 7 50 7Z";

  return (
    <svg className={className} viewBox="0 0 100 112" role="img" aria-label={`${parsed.color} ${parsed.material} pet egg`}>
      <ellipse cx="50" cy="104" rx="31" ry="6" fill="currentColor" opacity="0.12" />
      <g transform={`translate(${50 - 50 * scale} ${54 - 54 * scale}) scale(${scale})`}>
        <path d={shell} fill={palette.base} stroke={palette.shade} strokeWidth="3" />
        {parsed.material === "crystal" ? (
          <>
            <path d="M50 8 36 48 14 66M50 8l14 40 22 18M36 48l14 49 14-49Z" fill="none" stroke={palette.glow} strokeWidth="3" opacity="0.85" />
            <path d="m36 48 28 0-14 49Z" fill={palette.shade} opacity="0.18" />
          </>
        ) : null}
        {parsed.material === "metal" ? (
          <>
            <path d="M19 49c20 8 42 8 62 0M16 68c23 9 45 9 68 0" fill="none" stroke={palette.glow} strokeWidth="5" opacity="0.72" />
            <circle cx="50" cy="59" r="6" fill={palette.shade} stroke={palette.glow} strokeWidth="2" />
          </>
        ) : null}
        {parsed.material === "wood" ? (
          <>
            <path d="M31 25c16 13 2 23 15 36s-2 24 10 34M62 20c-12 16 5 24-7 37s4 20-5 36" fill="none" stroke={palette.shade} strokeWidth="2.5" opacity="0.55" />
            <path d="M23 70c18-7 36-7 55 0" fill="none" stroke={palette.glow} strokeWidth="2" opacity="0.55" />
          </>
        ) : null}
        {parsed.material === "ceramic" ? (
          <>
            <path d="M33 26c-9 12-13 25-12 38" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="7" opacity="0.55" />
            <path d="M67 83c-10 8-24 9-34 3" fill="none" stroke={palette.shade} strokeLinecap="round" strokeWidth="3" opacity="0.35" />
          </>
        ) : null}
        <circle cx="66" cy="31" r="4" fill={palette.glow} opacity="0.78" />
      </g>
    </svg>
  );
}
