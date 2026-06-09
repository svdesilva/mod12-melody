const mod = (n: number, m: number): number => ((n % m) + m) % m;

const parseSet = (raw: string): number[] => {
  const pcs = raw
    .split(/[\s,]+/g)
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => Number(x));
  if (pcs.some((n) => !Number.isInteger(n))) {
    throw new Error("Pitch classes must be integers.");
  }
  const normalized = pcs.map((n) => mod(n, 12));
  const unique = Array.from(new Set(normalized)).sort((a, b) => a - b);
  if (unique.length === 0) {
    throw new Error("Provide at least one pitch class, e.g. 0 4 7");
  }
  return unique;
};

const intervalClass = (a: number, b: number): number => {
  const d = mod(b - a, 12);
  if (d === 0) return 0;
  return Math.min(d, 12 - d);
};

const intervalVector = (set: number[]): [number, number, number, number, number, number] => {
  const vec: [number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < set.length; i += 1) {
    for (let j = i + 1; j < set.length; j += 1) {
      const ic = intervalClass(set[i], set[j]);
      if (ic >= 1 && ic <= 6) vec[ic - 1] += 1;
    }
  }
  return vec;
};

const invert = (set: number, n: number): number => mod(-set + n, 12);

const inversionOrbit = (set: number[], axis: number): number[] =>
  Array.from(new Set(set.map((pc) => invert(pc, axis)))).sort((a, b) => a - b);

const main = (): void => {
  const raw = process.argv.slice(2).join(" ");
  const set = parseSet(raw.length ? raw : "0 4 7");
  const iv = intervalVector(set);
  const inv0 = inversionOrbit(set, 0);

  const lines = [
    `Pitch-class set: { ${set.join(", ")} }`,
    `Cardinality: ${set.length}`,
    `Interval vector <1..6>: <${iv.join(", ")}>`,
    `Inversion about 0 as PC axis: { ${inv0.join(", ")} }`,
    "",
    "Try:",
    "  npm run start -- 0 4 7        (C major triad pitch classes)",
    "  npm run start -- 0 1 6        (octatonic fragment-ish)",
    "  npm run start -- 0 3 6 9     (diminished seventh chord PCs)",
  ];

  console.log(lines.join("\n"));
};

main();
