import { useId } from "react";

import { decodePetEggGenome, type PetEggGenomeTraits } from "@/lib/pet-egg-genome";

type LegacyEggTraits = { color: string; size: string; shape: string; material: string };
type Palette = { base: string; light: string; shade: string; deep: string; energy: string };

const palettes: Record<string, Palette> = {
  red: { base: "#f35d68", light: "#ffb3a9", shade: "#a92747", deep: "#4b1329", energy: "#ff887b" },
  orange: { base: "#f58a3a", light: "#ffd09b", shade: "#a54320", deep: "#4b2118", energy: "#ffb74f" },
  yellow: { base: "#e8c83f", light: "#fff5a2", shade: "#94711b", deep: "#453616", energy: "#ffe66a" },
  green: { base: "#42b97b", light: "#a9f0ca", shade: "#17684f", deep: "#0f382f", energy: "#61e3a1" },
  blue: { base: "#4c8df4", light: "#acd9ff", shade: "#304da0", deep: "#172b61", energy: "#65c8ff" },
  cyan: { base: "#37c3c4", light: "#b5ffff", shade: "#16788b", deep: "#123d50", energy: "#5df2e8" },
  purple: { base: "#9569e4", light: "#d9c7ff", shade: "#57369d", deep: "#2f205d", energy: "#b78bff" },
  magenta: { base: "#d55aad", light: "#ffc7ec", shade: "#82316d", deep: "#461c41", energy: "#f27bd0" },
  white: { base: "#e9e8e4", light: "#ffffff", shade: "#9195a4", deep: "#484d5c", energy: "#d8ecff" },
  black: { base: "#343441", light: "#9492aa", shade: "#1c1b26", deep: "#0d0c13", energy: "#8f83bd" },
  brown: { base: "#996244", light: "#e2ae82", shade: "#573426", deep: "#2f1d18", energy: "#c8895f" },
  silver: { base: "#aeb9c8", light: "#f3f8ff", shade: "#667386", deep: "#343d4d", energy: "#c8ddf5" },
  gold: { base: "#e9ad3f", light: "#ffe79a", shade: "#946018", deep: "#463015", energy: "#ffd45c" },
};

const elementColors: Record<string, string> = {
  fire: "#ff6548", water: "#42b8f5", earth: "#bd8b5d", air: "#d7f7ff",
  nature: "#72d877", ice: "#b7efff", thunder: "#ffe45c", light: "#fff2a1",
  shadow: "#8970ad", cosmic: "#d982ff", metal: "#d2dde8", void: "#6d3f91",
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
  if (["pixel", "voxel", "low-poly"].includes(style) || legacyShape === "angular") {
    return "M90 15 119 39 140 82 151 141 137 179 112 202 90 208 68 202 43 179 29 141 40 82 61 39Z";
  }
  if (["chibi", "clay"].includes(style) || legacyShape === "round") {
    return "M90 29C57 29 34 79 34 137c0 45 23 70 56 70s56-25 56-70C146 79 123 29 90 29Z";
  }
  return "M90 14C56 14 28 79 28 139c0 43 25 69 62 69s62-26 62-69C152 79 124 14 90 14Z";
}

function CoreSeal({ index, energy }: { index: number; energy: string }) {
  const rotation = index * 17;
  return <g transform={`rotate(${rotation} 90 122)`}>
    <path d="M90 91 113 105 113 133 90 147 67 133 67 105Z" fill="none" stroke={energy} strokeWidth="2.2" opacity=".82" />
    <path d="M90 99 105 108 105 127 90 136 75 127 75 108Z" fill="none" stroke={energy} strokeDasharray={`${3 + index % 5} 4`} strokeWidth="1.4" opacity=".64" />
    <circle cx="90" cy="118" r={5 + index % 4} fill={energy} opacity=".88" />
  </g>;
}

export function PetEggVisual({ genomeCode, traits, className = "" }: { genomeCode?: string; traits: string; className?: string }) {
  const legacy = parseEggTraits(traits);
  const genome = genomeCode ? decodePetEggGenome(genomeCode) : null;
  const parsed = genome ?? { ...defaults, color: legacy.color, material: legacy.material };
  const palette = palettes[parsed.color] ?? palettes.gold;
  const fallbackId = useId().replaceAll(":", "");
  const id = genomeCode ? genomeCode.replaceAll("-", "").toLowerCase() : fallbackId;
  const shell = shellPath(parsed.style, genome ? undefined : legacy.shape);
  const materialIndex = Math.max(0, traitOrder.material.indexOf(parsed.material as never));
  const styleIndex = Math.max(0, traitOrder.style.indexOf(parsed.style as never));
  const archetypeIndex = Math.max(0, traitOrder.archetype.indexOf(parsed.archetype as never));
  const temperamentIndex = Math.max(0, traitOrder.temperament.indexOf(parsed.temperament as never));
  const signatureIndex = Math.max(0, traitOrder.signature.indexOf(parsed.signature as never));
  const patternIndex = Math.max(0, traitOrder.pattern.indexOf(parsed.pattern as never));
  const habitatIndex = Math.max(0, traitOrder.habitat.indexOf(parsed.habitat as never));
  const energy = elementColors[parsed.element] ?? palette.energy;
  const shellId = `shell-${id}`;
  const fillId = `fill-${id}`;
  const shineId = `shine-${id}`;
  const glowId = `glow-${id}`;
  const patternId = `pattern-${id}`;
  const dash = `${2 + patternIndex % 6} ${4 + (patternIndex * 2) % 7}`;
  const tilt = (styleIndex - 5.5) * 0.18;
  const scale = legacy.size === "small" ? 0.91 : legacy.size === "large" ? 1.03 : 0.97;

  return <svg className={className} viewBox="0 0 180 224" role="img" aria-label={genomeCode ? `QDog Cyber Egg ${genomeCode}` : "QDog Cyber Egg"}>
    <defs>
      <clipPath id={shellId}><path d={shell} /></clipPath>
      <linearGradient id={fillId} x1=".12" y1=".05" x2=".88" y2=".95">
        <stop stopColor={palette.light} /><stop offset=".34" stopColor={palette.base} /><stop offset="1" stopColor={palette.deep} />
      </linearGradient>
      <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#fff" stopOpacity=".72" /><stop offset=".38" stopColor="#fff" stopOpacity=".08" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={glowId}><stop stopColor={energy} stopOpacity=".65" /><stop offset="1" stopColor={energy} stopOpacity="0" /></radialGradient>
      <pattern id={patternId} width={12 + patternIndex} height={10 + patternIndex % 5} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternIndex * 11})`}>
        <path d={`M0 ${3 + patternIndex % 4}h24`} stroke={palette.light} strokeDasharray={dash} strokeWidth={patternIndex === 1 ? 4 : 1.4} opacity={parsed.pattern === "solid" ? "0" : ".42"} />
      </pattern>
    </defs>

    <ellipse cx="90" cy="114" rx="82" ry="92" fill={`url(#${glowId})`} opacity=".38" />
    <ellipse cx="90" cy="211" rx={47 + habitatIndex} ry="8" fill={palette.deep} opacity=".14" />
    <g transform={`translate(${90 - 90 * scale} ${111 - 111 * scale}) scale(${scale}) rotate(${tilt} 90 111)`}>
      <ellipse cx="90" cy="123" rx="73" ry="83" fill="none" stroke={energy} strokeDasharray={`${4 + temperamentIndex} ${11 + signatureIndex}`} strokeLinecap="round" strokeWidth="1.8" opacity=".48" />
      <ellipse cx="90" cy="123" rx="66" ry="76" fill="none" stroke={energy} strokeDasharray="2 12" strokeLinecap="round" strokeWidth="1.2" opacity=".72" />
      <path d={shell} fill={`url(#${fillId})`} stroke={palette.deep} strokeWidth="4" />
      <g clipPath={`url(#${shellId})`}>
        <rect x="20" y="10" width="140" height="204" fill={`url(#${patternId})`} />
        <path d={`M31 ${69 + materialIndex}Q90 ${45 - materialIndex} 149 ${69 + materialIndex}`} fill="none" stroke={palette.light} strokeDasharray={`${5 + materialIndex} 7`} strokeWidth="2" opacity=".55" />
        <path d={`M35 ${158 - materialIndex}Q90 ${184 + materialIndex} 145 ${158 - materialIndex}`} fill="none" stroke={energy} strokeDasharray={`${3 + signatureIndex} 6`} strokeWidth="2.2" opacity=".48" />
        <path d="M47 41C36 73 34 120 43 161" fill="none" stroke={`url(#${shineId})`} strokeLinecap="round" strokeWidth="18" opacity=".46" />
        {parsed.material === "crystal" || parsed.material === "glass" ? <path d="M90 16 65 90 30 140M90 16l26 75 35 50M65 90l25 116 26-115Z" fill="none" stroke={palette.light} strokeWidth="2.2" opacity=".48" /> : null}
        {parsed.material === "metal" || parsed.material === "hologram" ? <><path d="M29 97h122M30 153h120" stroke={palette.light} strokeWidth="5" opacity=".28" /><path d="M90 32v160" stroke={energy} strokeDasharray="3 9" strokeWidth="1.5" opacity=".52" /></> : null}
        {parsed.material === "wood" || parsed.material === "leaf" ? <path d="M58 38c22 30-8 47 14 74s-5 45 12 82M111 37c-20 31 9 49-12 75s7 44-8 82" fill="none" stroke={palette.deep} strokeWidth="2" opacity=".35" /> : null}
        <CoreSeal index={archetypeIndex} energy={energy} />
        <g transform={`rotate(${signatureIndex * 13} 90 62)`} opacity=".76">
          <circle cx="90" cy="62" r={8 + signatureIndex % 5} fill="none" stroke={energy} strokeWidth="2" />
          <path d="M90 47v30M75 62h30" stroke={energy} strokeDasharray={`${2 + signatureIndex % 4} 4`} strokeWidth="1.4" />
        </g>
      </g>
      <path d={shell} fill="none" stroke={palette.light} strokeWidth="1.2" opacity=".7" transform="scale(.965) translate(3.2 4)" />
      <circle cx="90" cy="118" r="2.5" fill="#fff" opacity=".9" />
    </g>
  </svg>;
}
