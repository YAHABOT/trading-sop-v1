# Trading SOP Journal — V1 Build Plan

## Project Goal

Deliver the complete **Trading SOP Journal V1**:

- Full 4-module architecture:
  1. Pre-Market
  2. During Session (Global)
  3. Trade Idea Logic (Baseline → Signal → Executed/Missed)
  4. Post-Market Review
- Clean accordion UI (all modules collapsible, multiple open allowed)
- Dark theme, readable inputs and dropdowns
- Autosave + Reset Day
- Logical flow exactly as defined in SOP V1
- No extra fields, no missing required fields

---

## Build Rules

- **Max 3 items per build.**
- No feature creep inside a build.
- Each build must:
  - Implement only the items listed in its scope.
  - Preserve all previously working behavior.
- Every build gets:
  - A short description
  - A status (Planned / In Progress / Done / Failed)
  - A brief outcome note once completed.

---

## Phase 0 — Foundations

### Build 001 — First Full UI Attempt  
**Status:** Failed / Rejected  
**Summary:**  
- Attempted an “all-in-one” UI + logic build in a single pass.  
- Layout, fields, and behavior did not match SOP requirements:
  - Modules 1 and 2 rendered side-by-side instead of accordion.
  - White text on white input boxes and dropdowns (unusable).
  - IF–THEN scenario layout broken and hard to read.
  - Module 3 did not follow the required flow (Baseline → Signal → Executed/Missed).
  - Extra, non-specified fields appeared (“emotion clarifier”, “expected entry models” etc.).
- Decision: mark Build 001 as a failed experiment and **restart with structured phases**.

---

## Phase 1 — Core UI Scaffolding

### Build 002 — Accordion + Module 1 Base + Theming  
**Status:** Passed
**Scope:**
1. Implement **accordion system** for all 4 modules  
   - Each module is a collapsible section.  
   - Multiple modules can be open at the same time.  
2. Rebuild **Module 1 layout** (UI only, no extra logic):  
   - Fields stacked vertically, not side-by-side.  
   - Fields included:
     - Session Levels Marked → **single checkbox** (“All levels marked”)  
     - Previous Sessions Observed / Bias → textarea  
     - HTF → LTF Structure & Trend → textarea  
     - IF–THEN Scenarios container (empty, UI placeholder only)  
     - Session-Start Emotional State → dropdown  
   - Explicitly **exclude**:
     - Confluence tags in pre-market  
     - Emotion clarifier  
     - Expected entry models  
3. Apply **global dark styling**:  
   - All text inputs and textareas = dark background + light text.  
   - All dropdowns = dark background + light text.  
   - No white-on-white anywhere.

---

## Phase 2 — Module 1: IF–THEN Scenarios

### Build 003 — IF–THEN Scenario UI (Module 1)  
**Status:** Done / Passed  

**Scope:**
1. Add IF–THEN scenario creation UI inside Module 1  
2. Use a clean vertical layout for each scenario (ID, Title, IF, THEN, Delete)  
3. Auto-generate Scenario IDs (S1, S2, S3, …) and keep them in page state  

**What Was Implemented:**
- Added a **Scenario UI block** under `IF–THEN Scenarios` in Module 1:
  - “Scenarios List” header
  - `+ Add Scenario` button
  - Empty state message when no scenarios exist
- Each scenario is rendered as a separate **vertical card** with:
  - Scenario ID (S1, S2, S3, …)
  - Title (single-line input)
  - IF: textarea
  - THEN: textarea
  - Delete button (removes the scenario from the list)
- Scenario IDs are generated sequentially as S1, S2, S3… using an internal counter.

**Notes / Limitations (by design):**
- Scenarios are kept in **front-end memory only** for now (no localStorage yet).
- Refreshing the page clears the scenarios (persistence will be added in Build 004).
- No linking to trades or post-market yet; this UI is a standalone editor in Module 1.

### Build 004 — Scenario Persistence + Reset + Helpers  
**Status:** Done / Passed  

**Scope:**
1. Persist IF–THEN scenarios using localStorage  
2. Add a “Reset Day (Scenarios)” action to clear them  
3. Expose read-only helpers so other modules can read scenarios by ID  

**What Was Implemented:**
- Added a dedicated localStorage key: `sop_v1_scenarios_only`.
- Scenarios created in Module 1 (S1, S2, S3, …) are now:
  - Saved automatically on every change (title, IF, THEN).
  - Restored on page load.
  - Kept with correct ID sequencing after reload.
- Added a **Reset Day (Scenarios)** button in the top bar:
  - Confirms with the user before clearing.
  - Wipes scenarios from memory and localStorage.
- Implemented helper functions and exposed them on `window`:
  - `SOP_SCENARIOS.getAllScenarios()` → returns a shallow copy of all scenarios.
  - `SOP_SCENARIOS.getScenarioById(id)` → returns a single scenario or `null`.

**Notes / Limitations (by design):**
- Only **scenarios** are persisted in this build; other fields (Module 1 textareas, emotion, etc.) are still non-persistent.
- No linkage yet to trades or post-market logic; this is pre-work for Module 3 and 4 integration.



---

## Phase 3 — Module 2 (During Session) UI

### Build 005 — Watching Price Block  
**Status:** Planned  
**Scope:**
1. Add **“Watching Price” entries** list in Module 2.  
   - Fields per entry: time, emotion, notes.  
2. Add **Interpretation tags** for each watching entry:  
   - Preset options (e.g. “chop”, “compression”, “sweep”, “displacement”, “indecision”, “stalling”).  
3. Allow **custom interpretation tags** via tag input (type + Enter/comma).

### Build 006 — Emotional Surges  
**Status:** Planned  
**Scope:**
1. Add **Emotional Surges** list in Module 2.  
   - Fields: time, emotion, description.  
2. Implement add/delete behavior for surges.  
3. Ensure autosave + Reset Day correctly handle all surges.

### Build 007 — Adaptation + Energy + Behavior Notes  
**Status:** Planned  
**Scope:**
1. Add **Adaptation block**:  
   - Time, changed? (yes/no), reason/new plan.  
2. Add **Energy** dropdown + energy notes.  
3. Add **Market Behavior Notes** textarea (session-wide notes).

---

## Phase 4 — Module 3 Core Flow (Baseline → Signal → Branch)

### Build 008 — Pre-Trade Baseline  
**Status:** Planned  
**Scope:**
1. Create **Pre-Trade Baseline block** for each trade idea:  
   - Baseline emotion  
   - Baseline notes  
2. (Optional, only if previously defined in spec) Baseline tags if required; otherwise keep minimal.  
3. Ensure baseline is clearly separated and appears **before** At-Signal block.

### Build 009 — At The Signal  
**Status:** Planned  
**Scope:**
1. Create **At-The-Signal block**:  
   - Signal emotion  
   - Signal notes  
2. Add **Entry Model tags** (free-text tags for now; library integration later).  
3. Ensure Baseline → Signal flows vertically and visually clearly.

### Build 010 — Executed/Missed Branch Selection  
**Status:** Planned  
**Scope:**
1. After At-Signal, add two buttons:  
   - **Add Executed Trade**  
   - **Add Missed Trade**  
2. Clicking **Add Executed Trade** spawns an Executed block tied to that trade idea.  
3. Clicking **Add Missed Trade** spawns a Missed block tied to that trade idea.

---

## Phase 5 — Module 3 Executed Trades Details

### Build 011 — Core Executed Fields  
**Status:** Planned  
**Scope:**
1. Inside Executed block, add:
   - Entry price  
   - Stop loss price  
   - RR expectation  
2. Implement **Risk Model dropdown**: Low / Medium / Full.  
3. Add **Custom Risk Tags** as a tag input.

### Build 012 — Execution Behavior & During-Trade State  
**Status:** Planned  
**Scope:**
1. Add **During-trade emotion** field.  
2. Add **Execution Behavior tags** (e.g. “late entry”, “early exit”, “full size”, “scaled in”, etc.).  
3. Ensure all executed fields autosave correctly and belong to the right trade.

### Build 013 — Exit & Re-entry Notes  
**Status:** Planned  
**Scope:**
1. Add **Exit logic fields**:  
   - Planned exit? (yes/no)  
   - Actual = planned? (yes/no)  
2. Add **Exit Reason Tags** + exit notes.  
3. Add **Re-entry notes** and **Add-on notes** fields.

---

## Phase 6 — Module 3 Missed Trades

### Build 014 — Missed Trade Core  
**Status:** Planned  
**Scope:**
1. Add **Missed Trade block**:  
   - Emotion while watching  
   - Missed reason tags  
   - Notes.  
2. Ensure Missed block visually differs from Executed block.  
3. Link missed trade to its parent baseline/signal.

### Build 015 — Missed R & Scenario Link  
**Status:** Planned  
**Scope:**
1. Add **Missed R** field (numeric).  
2. Add dropdown to link missed trade to a **Scenario ID** from Module 1.  
3. Ensure missed R contributes to daily missed R totals (used later in Module 4).

---

## Phase 7 — Module 4 Post-Market Core

### Build 016 — Scenarios & Market Behavior  
**Status:** Planned  
**Scope:**
1. Add **Which scenarios unfolded?** multi-select (using Scenario IDs from Module 1).  
2. Add **Market Behavior tags**:  
   - trend, range, continuation, reversal, manipulation, continuation/reversal hybrid, etc.  
3. Implement dark dropdown + correct tag styling for these.

### Build 017 — PNL / R / Missed R Aggregation  
**Status:** Planned  
**Scope:**
1. Aggregate **total PNL** from all executed trades.  
2. Aggregate **total realized R** from executed trades.  
3. Aggregate **total missed R** from missed trades + “missed R” fields on executed trades.

### Build 018 — Psych + What Went Well/Wrong (Auto Seed)  
**Status:** Planned  
**Scope:**
1. Implement **Psychological Pattern Engine V1** (rule-based, no AI):  
   - Uses: pre-market emotion, watching emotion, signal emotion, miss/emotion, etc.  
2. Auto-seed **“What Went Well”** based on wins + adherence.  
3. Auto-seed **“What Went Wrong”** based on misses + rule breaks.

---

## Phase 8 — Post-Market Finishing

### Build 019 — Missed Opportunities & Tomorrow  
**Status:** Planned  
**Scope:**
1. Generate **Missed Opportunity summary** from missed trades + missed R.  
2. Add **Tomorrow’s Adjustments** textarea.  
3. Add **Daily Grade** field and ensure it persists.

### Build 020 — Reset & Integrity Pass  
**Status:** Planned  
**Scope:**
1. Verify **Reset Day** wipes all modules correctly.  
2. Verify state integrity (no orphan trades, no broken scenario links).  
3. Add lightweight internal validation (e.g. warn if trades exist but no post-market review).

---

## Phase 9 — Polish & Hardening

### Build 021 — UI Polish  
**Status:** Planned  
**Scope:**
1. Tighten spacing, paddings, and typography.  
2. Align labels, inputs, and section headers across all modules.  
3. Ensure consistent dark theme and visual hierarchy.

### Build 022 — Bug Fixes & Stress Testing  
**Status:** Planned  
**Scope:**
1. Test with many trades (10+), many scenarios, and long sessions.  
2. Fix any performance / rendering / layout issues.  
3. Confirm autosave reliability across all modules.

---

## Phase 10 — Final V1

### Build 023 — V1 Finalization  
**Status:** Planned  
**Scope:**
1. Final code cleanup (remove dead code, console logs, etc.).  
2. Final QA pass (full-day journaling simulation).  
3. Tag this as **Trading SOP Journal — V1 (Final)** in repo.

---
