// Dad Joke Showdown — one dad joke, written to /output/entry.txt.
//
// The joke: a father changes the air filter every month, then admits
// it is the only filter he has — his children get the unfiltered
// version of him. The turn is the last two words: "unfiltered version"
// — the dad who filters the house air has no filter of his own.
//
// Gate (from the bounty rules): entry.txt must be UTF-8 text of 1 to
// 200 characters and not only white space. This file enforces both
// before writing anything, so a bad joke can never reach the scorer.
import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "My dad changes the air filter every month. It's the only filter he has — the kids get the unfiltered version.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("joke must not be only white space");
  }
}

validate(JOKE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
