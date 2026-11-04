# Usage

One row per agent session. In Gemini CLI, type `/stats` before you quit and copy the input and output tokens. Copilot shows credits instead of tokens: write those in the credits column. The free tier charges nothing, so record what the session **would cost at the provider's published list price**, and note once below the table which price list you used. Leave the cost empty for rows that only show credits.


| Date | Tool | Input tokens | Output tokens | Credits (if no tokens) | List-price cost |
|---|---|---:|---:|---|---|
| 2026-11-04 | Gemini CLI (session 1) | 35025 | 97 | — | $0.00637 |
| 2026-11-04 | Gemini CLI (session 2) | 25201 | 55 | — | $0.00496 |

Pricing source: https://ai.google.dev/gemini-api/docs/pricing

Model: gemini-3.5-flash-lite

Paid-tier list prices: $0.30 per 1M input tokens, $2.50 per 1M output tokens, and $0.03 per 1M cached tokens.

Cache reads: 16207 tokens in session 1 and 10144 tokens in session 2.

The estimated list-price costs account for cached tokens at the lower cache rate. Actual cost may be $0 if usage is covered by the free tier.

