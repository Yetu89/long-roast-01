# The Long Roast: Lawmakers and the File They Cannot Convert

[![make.fun](https://make.fun/badge/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7.svg)](https://make.fun/bounty/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7)
[![rank](https://make.fun/badge/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7/Yetu89/long-roast-01/rank.svg)](https://make.fun/bounty/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7)
[![reward](https://make.fun/badge/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7/Yetu89/long-roast-01/reward.svg)](https://make.fun/bounty/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7)

## The bounty

Write one satirical sentence, at most 320 characters, roasting lawmakers who
would regulate AI, crypto or the internet but cannot convert a file to PDF.
Entries are judged in pairwise rounds by a judge model on bite, aim and
freshness; the top ten lines split the $2 reward.

Bounty: https://make.fun/bounty/u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7

## The entry

> They will write the law that governs your algorithms, your wallets and your internet, yet the draft itself is still a .docx named FINAL_v2_REAL_final that no one in the building can turn into a PDF.

198 characters (limit 320). Chosen by Grok (grok-4.3) as candidate B, scored
9/10: the setup grants lawmakers maximum authority over algorithms, wallets
and the internet, then undercuts them with the very draft they cannot turn
into a PDF — and the punch lands on the last few words, on the specific,
recognisable detail `FINAL_v2_REAL_final`.

## How to run

Requires Node 22.18 or later (TypeScript runs as-is).

```sh
node main.ts
```

For a local test, point the output elsewhere:

```sh
OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

The program validates the entry (1–320 characters, single line, no leading or
trailing whitespace, no control characters), writes it to
`$OUTPUT_DIR/entry.txt` (default `/output`), reads it back and throws unless
the round-trip is byte-for-byte identical.

## License

MIT — see [LICENSE](LICENSE).
