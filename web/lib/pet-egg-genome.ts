export type PetEggGenomeTraits = {
  color: string;
  material: string;
  style: string;
  archetype: string;
  element: string;
  temperament: string;
  signature: string;
  pattern: string;
  habitat: string;
};

const traitValues = [
  { R: "red", O: "orange", Y: "yellow", G: "green", B: "blue", C: "cyan", P: "purple", M: "magenta", W: "white", K: "black", N: "brown", S: "silver" },
  { C: "crystal", P: "porcelain", M: "metal", W: "wood", S: "stone", G: "glass", J: "jelly", F: "fur", L: "leaf", H: "hologram", V: "volcanic", N: "nebula" },
  { P: "pixel", C: "chibi", A: "anime", V: "voxel", W: "watercolor", I: "ink", R: "retro", F: "flat", L: "low-poly", H: "holo-tech", K: "clay", S: "storybook" },
  { M: "mammal", A: "avian", R: "reptile", Q: "aquatic", I: "insect", B: "botanical", G: "golem", S: "spirit", D: "dragon", X: "alien", O: "ooze", H: "hybrid" },
  { F: "fire", W: "water", E: "earth", A: "air", N: "nature", I: "ice", T: "thunder", L: "light", D: "shadow", C: "cosmic", M: "metal", V: "void" },
  { B: "brave", G: "gentle", C: "curious", M: "mischievous", L: "loyal", S: "shy", W: "wise", P: "playful", R: "rebellious", D: "dreamy", K: "calm", E: "energetic" },
  { N: "none", H: "horns", W: "wings", C: "crystal-crest", A: "antennae", L: "leaf-mantle", F: "flame-plume", O: "orbiting-orb", S: "scarf", G: "goggles", B: "backpack", R: "royal-crown" },
  { S: "solid", T: "stripes", P: "spots", G: "gradient", C: "constellation", R: "runes", M: "mosaic", F: "flames", W: "waves", L: "vines", K: "cracks", H: "circuit" },
  { F: "forest", O: "ocean", D: "desert", M: "mountain", C: "cloudscape", V: "volcano", I: "icefield", U: "urban", R: "ruins", S: "starfield", W: "wetland", A: "arcane-lab" },
] as const;

const traitKeys = ["color", "material", "style", "archetype", "element", "temperament", "signature", "pattern", "habitat"] as const;

export function decodePetEggGenome(code: string): PetEggGenomeTraits | null {
  const match = /^QDG1-([A-Z]{3})-([A-Z]{3})-([A-Z]{3})-[2-9A-HJ-NP-Z]{2}$/.exec(code);
  if (!match) return null;
  const payload = `${match[1]}${match[2]}${match[3]}`;
  const entries = traitKeys.map((key, index) => {
    const value = (traitValues[index] as Record<string, string>)[payload[index]];
    return value ? [key, value] : null;
  });
  if (entries.some((entry) => entry === null)) return null;
  return Object.fromEntries(entries as [string, string][]) as PetEggGenomeTraits;
}
