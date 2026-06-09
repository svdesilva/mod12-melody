# Mod‑12 melody

Pitch-class arithmetic is the **same** object whether you are:

- spelling a **Beethoven cadence**,
- counting semitones in a **Chopin chromatic voice**,
- or studying **12-tone rows** (where the mod‑12 group shows up loud and proud).

This repo is a toy CLI: feed integers `0..11`, get a sorted pitch-class set, an **interval vector**, and a simple **inversion** orbit sample.

---

## Run

```bash
npm install
npm run start -- 0 4 7
```

---

## Why interval vectors?

An interval vector counts how many times each **interval class** (1…6 semitones, modulo inversion) appears between distinct pitch classes in a set. It is a compact fingerprint—useful for comparing sets when you do not care about transposition yet.

---

## License

MIT.
