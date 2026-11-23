// Dad Joke Showdown — entry writer.
// The program writes one dad joke to /output/entry.txt, byte-for-byte,
// every time it runs. No network, no clock, no randomness.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The competition gate, from the bounty rules: one line of text, 1-200
// characters, not blank, with no line breaks inside it.
const GATE = {
  minChars: 1,
  maxChars: 200,
  outDir: "/output",
  outName: "entry.txt",
} as const;

function countCodePoints(text: string): number {
  return [...text].length;
}

function isSingleCleanLine(text: string): boolean {
  if (text.trim().length === 0) return false;
  // No control characters at all: no tabs, no NUL, no line breaks.
  if (/[\u0000-\u001f\u007f]/.test(text)) return false;
  const n = countCodePoints(text);
  return n >= GATE.minChars && n <= GATE.maxChars;
}

function ensureOutDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// The joke itself — 109 characters, punchline in the last two words.
const JOKE =
  "My dad changes the air filter every month. It's the only filter he has — the kids get the unfiltered version.";

function writeJoke(): string {
  if (!isSingleCleanLine(JOKE)) {
    throw new Error("joke failed the entry gate");
  }
  ensureOutDir(GATE.outDir);
  const target = join(GATE.outDir, GATE.outName);
  writeFileSync(target, JOKE, "utf8");
  return target;
}

function confirmRoundTrip(target: string): void {
  const back = readFileSync(target, "utf8");
  if (back !== JOKE) {
    throw new Error("round-trip mismatch: file differs from the joke");
  }
}

const writtenTo = writeJoke();
confirmRoundTrip(writtenTo);
console.log(`wrote ${countCodePoints(JOKE)} chars to ${writtenTo}`);
