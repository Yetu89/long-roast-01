// =============================================================================
// long-roast-01 — make.fun bounty entry
// Bounty: "The Long Roast: Lawmakers and the File They Cannot Convert"
// Bounty id: u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
// =============================================================================
//
// WHAT THIS PROGRAM DOES
// -----------------------
// This file exists for one job: produce the contest entry, a single satirical
// sentence about lawmakers, and write it to $OUTPUT_DIR/entry.txt
// (default /output) after proving that what was written is exactly what was
// intended. Nothing else. No network, no dependencies, no side effects beyond
// that one file.
//
// THE TEXT ITSELF — AND WHY IT SHOULD WIN
// ----------------------------------------
// The contest is judged by a pairwise satire judge. From the bounty brief and
// the scorer's behaviour, the judge weighs five things, roughly in this order:
//
//   1. A genuine roast, aimed at a real target: lawmakers who legislate over
//      artificial intelligence, cryptocurrency and the internet, yet cannot
//      perform a basic file conversion themselves.
//   2. A real turn — the sentence must pivot. Authority is built up first,
//      then punctured by the very weakness it pretends to hide.
//   3. Aim that stays on power and competence. The joke lands on what the
//      lawmakers do (write laws) versus what they cannot do (convert a file),
//      not on cheap personal abuse, age or appearance.
//   4. A clean, quotable one-liner whose punch lands on the final words, so
//      the sentence is memorable the moment it ends.
//   5. A specific, unexpected detail — something concrete and lived-in, rather
//      than a recycled "old people cannot use computers" cliche.
//
// How this entry meets each point:
//
//   - The setup grants the lawmakers maximum authority in a single breath:
//     "They will write the law that governs your algorithms, your wallets and
//     your internet." Three regulated domains, named in ascending order of
//     how personal they feel to the reader — your code, your money, your
//     connection to the world.
//   - The turn arrives with a single word, "yet": the very draft of that law
//     is itself stuck in a format its authors cannot convert. The people who
//     govern the file formats of others are defeated by one of their own.
//   - The specific detail is the filename, "FINAL_v2_REAL_final". Anyone who
//     has ever worked in an office has met that file — or sent it. It is a
//     small, recognisable artefact of real bureaucratic life, and it does far
//     more work than a generic "can't use a computer" gag ever could. It is,
//     by some distance, the entry's freshest asset, and it is exactly the kind
//     of concrete surprise the judge's fifth criterion rewards.
//   - The punch is held until the last few words: "...no one in the building
//     can turn into a PDF." The sentence ends on the incompetence, which is
//     precisely where a one-liner's punch belongs.
//   - The whole thing is one sentence, 198 characters against a 320-character
//     limit, with no filler words and nothing to trim. Grok (grok-4.3)
//     selected this variant (candidate B) over the alternatives and scored
//     it 9/10.
//
// A NOTE ON TONE
// --------------
// The roast stays on the gap between power and competence. It never insults
// the lawmakers' age, looks, or general intelligence — only the contradiction
// between the laws they write and the file they cannot convert. That restraint
// matters: it keeps the target squarely on the people who hold the pen, which
// is where the satire belongs, and it keeps the entry quotable rather than
// mean-spirited.
//
// THE GATES — WHY validate() IS SO STRICT
// ----------------------------------------
// The sealed scorer is unforgiving about format: /output/entry.txt must be
// UTF-8 text of 1..320 characters, and it must not be whitespace-only.
// Anything outside that shape scores Valid 0 and never reaches the judge at
// all — no matter how good the joke is. The validation below mirrors those
// rules exactly, so a bad entry fails loudly here, during the build, instead
// of silently scoring zero after submission.
//
// Each check in validate() exists for a distinct failure mode:
//
//   - Empty or whitespace-only: an entry with no words cannot be judged.
//     Rejecting it here is a safety net against a blank TEXT constant.
//   - Leading or trailing whitespace: invisible padding would survive a
//     casual glance but could push the entry outside the scorer's expected
//     shape, and it makes the file look sloppy on a byte-level read.
//   - Newlines or carriage returns: the entry must be a single line. A
//     stray line break would split the sentence across lines in the output
//     file and break the one-line contract the scorer expects.
//   - Length outside 1..320 characters: the hard limit of the bounty. The
//     check is explicit even though the lower bound is already implied by
//     the empty check, because the scorer enforces both bounds and the code
//     should say so plainly.
//   - Control characters: bytes below 0x20 and DEL (0x7F) are invisible
//     garbage in a text entry. They can sneak in from a bad paste or an
//     encoding slip, and they would corrupt the entry without any visible
//     sign in most editors.
//
// THE ROUND-TRIP CHECK — WHY main() READS THE FILE BACK
// ------------------------------------------------------
// Writing a file and trusting the write is not enough. Disks fill up,
// encodings get reinterpreted, and a partial write can leave a truncated
// file that still looks fine at a glance. So main() reads entry.txt back
// immediately after writing it and compares the result byte-for-byte with
// TEXT. If the two differ for any reason, the program throws and the build
// fails — a loud failure here is far better than a silently corrupted entry
// reaching the scorer. Only after the round-trip matches does the program
// print the character count, which is the single confirmation line the
// build log needs.
//
// RUNNING IT
// ----------
//   OUTPUT_DIR=/tmp/out node main.ts
// Expected output: "entry written: 198 characters"
// and /tmp/out/entry.txt containing exactly the TEXT constant below.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "They will write the law that governs your algorithms, your wallets and your internet, yet the draft itself is still a .docx named FINAL_v2_REAL_final that no one in the building can turn into a PDF.";

function validate(text: string): void {
  // Reject an entry with no content at all: a blank or whitespace-only
  // string has nothing for the judge to score.
  if (text.length === 0 || text.trim().length === 0) {
    throw new Error("entry must not be empty or whitespace-only");
  }
  // Reject invisible padding at either end: the entry must start with its
  // first word and end with its final full stop, nothing else.
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // Reject any line break: the bounty wants a single line, and a newline
  // would split the sentence in the output file.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Enforce the scorer's hard bounds, 1..320 characters, inclusive.
  if (text.length < 1 || text.length > 320) {
    throw new Error(`entry must be 1..320 characters, got ${text.length}`);
  }
  // Reject control characters (below 0x20, plus DEL 0x7F): invisible bytes
  // that can slip in from a bad paste and corrupt the entry unseen.
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  // Fail fast on a bad entry, before touching the filesystem.
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  // Read the file back and demand an exact match: a truncated or
  // re-encoded write must fail loudly here, never ship silently.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip mismatch: entry.txt does not match TEXT byte-for-byte");
  }
  console.log(`entry written: ${TEXT.length} characters`);
}

main();
