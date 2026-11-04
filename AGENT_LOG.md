# Agent log

One entry per agent session, newest at the bottom. Be honest: what went wrong is the useful part.

<!-- Copy this block for each session:

## YYYY-MM-DD · <short title>
- Goal:
- Delegated:
- Checkpoints:
- Went wrong:
- Changed by hand:

-->

## 2026-11-04 · First Gemini MCP test
- Goal: Test whether Gemini CLI can use my MCP server to find information about a course lecture.
- Delegated: Asked Gemini "What does lecture 7 cover?" and let it choose the appropriate MCP tool.
- Checkpoints: Verified that my-project was ready with two tools. Gemini successfully called find_lecture with number 7. The tool call was successful.
- Went wrong: Google authentication failed with an invalid_grant error. I switched to a Gemini API key. The automatic model selection was also very slow.
- Changed by hand: Selected gemini-3.5-flash-lite manually to make the test work faster.

## 2026-11-04 · Tool description experiment
- Goal: Check whether changing the tool description affects Gemini's choice of tool.
- Delegated: Asked Gemini "What does lecture 7 cover?" again after changing the tool description.
- Checkpoints: Gemini successfully used find_lecture again and returned the correct information about lecture 7.
- Went wrong: No major problems occurred during the second test.
- Changed by hand: Changed the description of find_lecture from a detailed explanation to "Returns information." in server.js.