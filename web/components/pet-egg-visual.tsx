import { useId } from "react";

import { decodePetEggGenome, type PetEggGenomeTraits } from "@/lib/pet-egg-genome";

type LegacyEggTraits = { color: string; size: string; shape: string; material: string };
type Palette = { base: string; shade: string; glow: string; aura: string };

const palettes: Record<string, Palette> = {
  red: { base: "#ff6b5f", shade: "#a9283b", glow: "#ffd0c8", aura: "#ff765f" },
  orange: { base: "#ff9c42", shade: "#a94a19", glow: "#ffe0ad", aura: "#ffb34f" },
  yellow: { base: "#f3d64e", shade: "#997918", glow: "#fff8b8", aura: "#ffe76a" },
  green: { base: "#50c98c", shade: "#18785c", glow: "#c9f5dc", aura: "#65e6a9" },
  blue: { base: "#55a7ff", shade: "#3159b8", glow: "#c9ecff", aura: "#63c9ff" },
  cyan: { base: "#4bd6d4", shade: "#177e91", glow: "#c9ffff", aura: "#66f5ef" },
  purple: { base: "#a879ef", shade: "#6340a9", glow: "#ead9ff", aura: "#b888ff" },
  magenta: { base: "#e66cc5", shade: "#8e337d", glow: "#ffd8f6", aura: "#fa85d8" },
  white: { base: "#f5f1e8", shade: "#9f9bad", glow: "#ffffff", aura: "#e9f4ff" },
  black: { base: "#3b3845", shade: "#15131b", glow: "#aaa4c3", aura: "#756c91" },
  brown: { base: "#a96f4e", shade: "#593829", glow: "#e8bb91", aura: "#c98b62" },
  silver: { base: "#bfc8d5", shade: "#687384", glow: "#f6fbff", aura: "#cedff3" },
  gold: { base: "#f4bd45", shade: "#a76b12", glow: "#fff0ae", aura: "#ffd15a" },
};

const elementColors: Record<string, string> = {
  fire: "#ff603e", water: "#36a9e8", earth: "#99704a", air: "#d8f5ff",
  nature: "#63c66d", ice: "#b9efff", thunder: "#ffe249", light: "#fff5b0",
  shadow: "#665184", cosmic: "#d776ff", metal: "#c5d0dd", void: "#44235c",
};

const defaults: PetEggGenomeTraits = {
  color: "yellow", material: "crystal", style: "storybook", archetype: "spirit",
  element: "light", temperament: "curious", signature: "none", pattern: "solid", habitat: "forest",
};

const traitOrder = {
  material: ["crystal", "porcelain", "metal", "wood", "stone", "glass", "jelly", "fur", "leaf", "hologram", "volcanic", "nebula"],
  style: ["pixel", "chibi", "anime", "voxel", "watercolor", "ink", "retro", "flat", "low-poly", "holo-tech", "clay", "storybook"],
  archetype: ["mammal", "avian", "reptile", "aquatic", "insect", "botanical", "golem", "spirit", "dragon", "alien", "ooze", "hybrid"],
  temperament: ["brave", "gentle", "curious", "mischievous", "loyal", "shy", "wise", "playful", "rebellious", "dreamy", "calm", "energetic"],
  signature: ["none", "horns", "wings", "crystal-crest", "antennae", "leaf-mantle", "flame-plume", "orbiting-orb", "scarf", "goggles", "backpack", "royal-crown"],
  pattern: ["solid", "stripes", "spots", "gradient", "constellation", "runes", "mosaic", "flames", "waves", "vines", "cracks", "circuit"],
  habitat: ["forest", "ocean", "desert", "mountain", "cloudscape", "volcano", "icefield", "urban", "ruins", "starfield", "wetland", "arcane-lab"],
} as const;

export function parseEggTraits(value: string): LegacyEggTraits {
  const entries = Object.fromEntries(value.split("|").map((item) => item.split(":")));
  return { color: entries.color ?? "gold", size: entries.size ?? "medium", shape: entries.shape ?? "oval", material: entries.material ?? "ceramic" };
}

function shellPath(style: string, legacyShape?: string) {
  if (["pixel", "voxel", "low-poly"].includes(style) || legacyShape === "angular") return "M50 8 77 29 88 68 67 96 33 96 12 68 23 29Z";
  if (["chibi", "clay"].includes(style) || legacyShape === "round") return "M50 18C29 18 17 39 17 61c0 23 14 35 33 35s33-12 33-35C83 39 71 18 50 18Z";
  return "M50 7C31 7 14 40 14 66c0 20 15 32 36 32s36-12 36-32C86 40 69 7 50 7Z";
}

function Signature({ kind, color, index }: { kind: string; color: string; index: number }) {
  if (kind === "none") return null;
  const content = kind === "wings"
    ? <path d="M18 47C4 35 1 54 15 67M82 47c14-12 17 7 3 20" fill={color} stroke={color} strokeWidth="2" />
    : ["horns", "crystal-crest", "flame-plume", "royal-crown"].includes(kind)
      ? <path d="m34 25 5-18 11 12L60 5l6 20" fill={color} stroke={color} strokeLinejoin="round" strokeWidth="2" />
      : kind === "antennae"
        ? <path d="M39 24C33 10 26 11 27 4M61 24C67 10 74 11 73 4" fill="none" stroke={color} strokeLinecap="round" strokeWidth="3" />
        : kind === "orbiting-orb"
          ? <><ellipse cx="50" cy="54" rx="48" ry="19" fill="none" stroke={color} strokeWidth="2" /><circle cx="91" cy="45" r="5" fill={color} /></>
          : ["scarf", "leaf-mantle"].includes(kind)
            ? <path d="M20 68c20 9 40 9 60 0l-5 14c-17 6-33 6-50 0Z" fill={color} opacity=".9" />
            : kind === "goggles"
              ? <><circle cx="38" cy="53" r="9" fill="none" stroke={color} strokeWidth="4" /><circle cx="62" cy="53" r="9" fill="none" stroke={color} strokeWidth="4" /><path d="M47 53h6" stroke={color} strokeWidth="3" /></>
              : <path d="M69 61h14v28H69zM72 57h8" fill={color} stroke={color} strokeWidth="2" />;
  return <g transform={`rotate(${(index - 6) * 0.7} 50 54)`}>{content}</g>;
}

function Face({ temperament, color, index }: { temperament: string; color: string; index: number }) {
  const shy = temperament === "shy" || temperament === "dreamy";
  const lively = ["playful", "energetic", "mischievous"].includes(temperament);
  const eyeOffset = (index % 3) - 1;
  return <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="3">
    {shy ? <><path d="M32 59q6 5 12 0M56 59q6 5 12 0" /></> : <><circle cx={38 - eyeOffset} cy="55" r={lively ? 4 : 3} fill={color} /><circle cx={62 + eyeOffset} cy="55" r={lively ? 4 : 3} fill={color} /></>}
    <path d={lively ? "M42 70q8 10 16 0" : temperament === "rebellious" ? "M42 74q8-6 16 0" : "M43 70q7 6 14 0"} />
  </g>;
}

export function PetEggVisual({ genomeCode, traits, className = "" }: { genomeCode?: string; traits: string; className?: string }) {
  const legacy = parseEggTraits(traits);
  const genome = genomeCode ? decodePetEggGenome(genomeCode) : null;
  const parsed = genome ?? { ...defaults, color: legacy.color, material: legacy.material };
  const palette = palettes[parsed.color] ?? palettes.gold;
  const scale = legacy.size === "small" ? 0.84 : legacy.size === "large" ? 1.04 : 0.94;
  const fallbackId = useId().replaceAll(":", "");
  const id = genomeCode ? genomeCode.replaceAll("-", "").toLowerCase() : fallbackId;
  const patternId = `egg-pattern-${id}`;
  const glowId = `egg-glow-${id}`;
  const element = elementColors[parsed.element] ?? palette.aura;
  const materialIndex = traitOrder.material.indexOf(parsed.material as never);
  const styleIndex = traitOrder.style.indexOf(parsed.style as never);
  const archetypeIndex = traitOrder.archetype.indexOf(parsed.archetype as never);
  const temperamentIndex = traitOrder.temperament.indexOf(parsed.temperament as never);
  const signatureIndex = traitOrder.signature.indexOf(parsed.signature as never);
  const patternIndex = traitOrder.pattern.indexOf(parsed.pattern as never);
  const habitatIndex = traitOrder.habitat.indexOf(parsed.habitat as never);
  const dash = parsed.pattern === "solid" ? undefined : `${1 + patternIndex % 7} ${3 + patternIndex % 5}`;
  const habitatHeight = 9 + habitatIndex;

  return <svg className={className} viewBox="0 0 100 112" role="img" aria-label={`${parsed.color} ${parsed.material} ${parsed.style} pet egg`}>
    <defs>
      <radialGradient id={glowId}><stop stopColor={element} stopOpacity=".75" /><stop offset="1" stopColor={element} stopOpacity="0" /></radialGradient>
      <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform={parsed.pattern === "waves" ? "rotate(20)" : undefined}>
        <path d="M0 6h12" stroke={palette.glow} strokeWidth={parsed.pattern === "stripes" ? 5 : 2} strokeDasharray={dash} opacity={parsed.pattern === "solid" ? "0" : ".58"} />
      </pattern>
    </defs>
    <circle cx="50" cy="55" r="48" fill={`url(#${glowId})`} opacity=".45" />
    <path d={`M24 102q26 -${habitatHeight} 52 0Z`} fill={palette.shade} opacity=".25" />
    <ellipse cx="50" cy="104" rx="31" ry="6" fill="currentColor" opacity=".12" />
    <g transform={`translate(${50 - 50 * scale} ${54 - 54 * scale}) scale(${scale})`}>
      <circle cx="50" cy="57" r="43" fill="none" stroke={element} strokeDasharray={dash ?? "2 10"} strokeLinecap="round" strokeWidth="2" opacity=".75" />
      <path d={shellPath(parsed.style, genome ? undefined : legacy.shape)} fill={palette.base} stroke={palette.shade} strokeWidth={2.5 + styleIndex * 0.16} transform={`rotate(${(styleIndex - 5.5) * 0.25} 50 55)`} />
      <path d={shellPath(parsed.style, genome ? undefined : legacy.shape)} fill={`url(#${patternId})`} transform={`rotate(${(styleIndex - 5.5) * 0.25} 50 55)`} />
      <ellipse cx="50" cy="61" rx={25 + materialIndex * 0.45} ry={31 - materialIndex * 0.25} fill="none" stroke={palette.glow} strokeDasharray={`${2 + materialIndex % 4} ${4 + materialIndex % 5}`} strokeWidth="1.2" opacity=".36" />
      {parsed.material === "crystal" || parsed.material === "glass" ? <path d="M50 8 36 48 14 66M50 8l14 40 22 18M36 48l14 49 14-49Z" fill="none" stroke={palette.glow} strokeWidth="3" opacity=".8" /> : null}
      {parsed.material === "metal" || parsed.material === "hologram" ? <path d="M19 45c20 9 42 9 62 0M16 70c23 8 45 8 68 0" fill="none" stroke={palette.glow} strokeWidth="4" opacity=".65" /> : null}
      {parsed.material === "wood" || parsed.material === "leaf" ? <path d="M31 25c16 13 2 23 15 36s-2 24 10 34M62 20c-12 16 5 24-7 37s4 20-5 36" fill="none" stroke={palette.shade} strokeWidth="2.5" opacity=".55" /> : null}
      {parsed.material === "porcelain" || parsed.material === "jelly" || parsed.material === "fur" ? <path d="M31 27C23 39 20 51 21 63" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="7" opacity={parsed.material === "jelly" ? ".3" : ".55"} /> : null}
      <path d={parsed.archetype === "avian" ? "m45 38 5-10 5 10-5 5Z" : parsed.archetype === "aquatic" ? "M40 38q10-12 20 0-10 8-20 0Z" : parsed.archetype === "botanical" ? "M50 43q-12-10 0-18 12 8 0 18Z" : parsed.archetype === "dragon" ? "m41 40 9-15 9 15-9-5Z" : "M43 37l7-9 7 9-7 6Z"} fill={element} opacity=".92" transform={`rotate(${archetypeIndex * 17} 50 35)`} />
      <Face temperament={parsed.temperament} color={palette.shade} index={temperamentIndex} />
      <Signature kind={parsed.signature} color={palette.glow} index={signatureIndex} />
      <circle cx="68" cy="28" r="4" fill={palette.glow} opacity=".78" />
    </g>
  </svg>;
}
