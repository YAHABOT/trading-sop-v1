# Trading SOP Journal — Project Tracking

This file combines:
1. Change Log
2. Feature Wishlist
3. To-Do Pipeline

Everything in one place.

---

# 🧾 CHANGE LOG

## [2025-11-23 — Step 0 Audit Completed + New 4-Section Architecture]

### ✅ Step 0 — Automaticity Field Audit Fully Completed
A full psychological, behavioral, execution-flow, and structural audit was completed.

This audit revealed the need to redesign the entire journaling system around **4 sections**:

1. **Pre-Market**
2. **During Session (Global)**
3. **Trade Idea Logic**  
   (Pre-Trade Baseline → At The Signal → Executed or Missed → Follow-Up Logic)
4. **Post-Market Review**

This replaces the old 3-section layout and establishes a fully reflex-aligned workflow.

---

# ⭐ MODULE 1 — PRE-MARKET (FINALIZED)

### 🔹 Final Approved Pre-Market Blocks

**1) Session Levels Marked**  
- Combined: PDH, PDL, Asia H/L, London H/L  
- Checkbox → text box reveals only if checked  
- Removed HTF OB / FVG (indicator handles these)

**2) Previous Sessions Observed**  
- Merged Asia + London + combined bias  
- Single checkbox → optional notes

**3) HTF → LTF Structure & Trend**  
- Checkbox reveals:  
  - 15m trend  
  - 5m structure  
  - 1m trend  
  - 1m EMA condition  
  - HTF wick behavior  
  - notes  
- Styled as tag-system checkboxes

**4) Confluence Preparation**  
- Entire block replaced with new **Confluence Tag Engine**  
  - predefined confluences  
  - custom tags using comma + space  

**5) IF–THEN Scenarios**  
- Builder kept  
- Expanded logic:  
  → “Which IF–THEN did this trade follow?”  
  → optional IF–THEN notes added in post-market

**6) Psychological Preparation**  
- Upgraded to:  
  **Session-Start Emotional State**  
  - dropdown (new emotion taxonomy)  
  - free-text clarifier  
- Other checkboxes remain

**7) NY Opening Impulse Expectation**  
- Kept  
- Renamed for clarity

---

## 📘 Module 1 Summary Table

| Section | Final Name | Action | Explanation |
|--------|------------|--------|-------------|
| Levels | Session Levels Marked | MERGE + REMOVE | Combined levels; OB/FVG gone |
| Bias | Previous Sessions Observed | RENAME + MERGE | Simpler & aligned |
| Trend | HTF → LTF Structure & Trend | KEEP + rename | Conditional reveal |
| Confluence Prep | Confluence Tag Engine | REPLACE | Universal tag system |
| IF–THEN | IF–THEN Scenarios | KEEP + expand | Needed for trade/miss logic |
| Psych Prep | Session-Start Emotional State | UPGRADE | New emotion engine |
| NY Impulse | NY Opening Impulse Expectation | KEEP | Renamed |

---

# ⭐ MODULE 2 — DURING SESSION (GLOBAL) — FINALIZED

This new section captures ALL session-time observations that occur **outside of a trade idea**.

### 🔹 Final Approved Fields

**1) Watching Price (Standalone Module)**  
- emotion (dropdown + free-text)  
- interpretation tags  
- confluence tags (optional)  
- notes  
- **timestamp (EST)**  
- can add multiple entries

**2) Mid-Session Notes**  
- moved out of Missed Trades  
- now belongs in During Session

**3) Market Behavior Observation**  
- liquidity behavior shifts  
- displacement strength  
- volatility regime shifts  
- free text  
- optional tags

**4) Emotional Surges**  
- emotion shift  
- description  
- timestamp  
- optional interpretation tags

**5) Energy / Focus Check (recommended)**  
- dropdown  
- free-text clarifier  
- timestamp

**6) Session Adaptation Notes**  
- Did expectation change? (yes/no)  
- If yes → reveal reason, updated plan, timestamp

---

## 📘 Module 2 Summary Table

| Section | Existing | Action | Explanation |
|--------|----------|--------|-------------|
| Watching Price | ❌ none | **ADD** | Critical hesitation/emotion capture |
| Mid-Session Notes | mis-located | **MOVE** | Should be global |
| Market Behavior | ❌ none | **ADD** | Captures tape-reading skill |
| Emotional Surges | ❌ none | **ADD** | Micro-hesitation tracking |
| Energy Check | optional | **ADD** | Strong link to execution quality |
| Adaptation Notes | ❌ none | **ADD** | Bias update tracking |

---

# ⭐ MODULE 3 — TRADE IDEA LOGIC — FINALIZED

This is the core engine replacing “Add Trade / Add Miss.”

### 🔹 Final Approved Sequence

**A) Pre-Trade Baseline (NEW)**  
- emotion  
- interpretation tags  
- confluence tags  
- notes  

**B) At The Signal (NEW)**  
- emotion  
- interpretation tags  
- confluence tags  
- notes  
- system asks: Execute or Miss?

---

## 🔹 For EXECUTED Trade:

**1. During-Trade Emotion**  
(dropdown + free-text)

**2. Execution Behavior**  
(multi-select + custom)

**3. Entry Details**  
- entry price  
- SL price  
- **RR expectation (always visible)**  
- target same as initial?  
  - if NO → target fields  
- outcome (win/loss/BE)  
- notes

**4. Exit Behavior Logic**  
- planned exit? yes/no  
- actual exit same?  
  - if NO → reason tags + text  

**5. Re-Entry Logic**  
- checkbox: re-entered?  
- if yes →  
  - confluence tags  
  - reason tags  
  - entry price  
  - SL price  
  - **RR expectation**  
  - target same?  
  - outcome  
  - notes  

**6. Add-On Logic**  
(same structure as re-entry logic)

**7. Behavior Loops**  
- good loops  
- bad loops  
- custom notes  

**8. IF–THEN Consistency**  
(show list of pre-market IF–THENs)

**9. Screenshots**

**10. Update Session Score**

---

## 🔹 For MISSED Trade:

**1. Emotion Watching Price**  
**2. Interpretation Tags**  
**3. Why Missed (multi-select + custom)**  
**4. Behavior Loops (bad only)**  
**5. IF–THEN Miss Logic**  
**6. Notes**  
**7. Screenshot**  
**8. Update Session Score**  
- “R Missed” (only once — duplicate removed)

---

## 📘 Module 3 Summary Table

| Section | Final Name | Action | Explanation |
|--------|------------|--------|-------------|
| Pre-Trade Baseline | NEW | ADD | Mandatory emotional origin |
| At The Signal | NEW | ADD | Central decision moment |
| Executed Trade | Old trade card | REPLACE+EXPAND | Adds exit/re-entry/add-on |
| Entry Data | Entry/SL/RR | KEEP+EXPAND | RR expectation always visible |
| Exit Logic | NEW | ADD | Emotional & rational exit clarity |
| Re-Entry Logic | Upgrade | ADD | Correct RR placement |
| Add-On Logic | Upgrade | ADD | Mirrors re-entry |
| Missed Trade | Old missed card | UPGRADE | Complete logic path |
| R Missed | once only | FIXED | Duplicate removed |

---

# 💡 FEATURE WISHLIST (Future / V2+)

(unchanged — same as previous version)

---

# 🔧 TO-DO PIPELINE (Updated)

## ⭐ PRIORITY 0 (NOW)
- Complete Module 4 audit  
- Freeze entire V1 field architecture  

## 🛠 NEXT UP
- Build 4-section UI skeleton  
- Implement Module 1, 2, and 3 structures  
- Implement new emotion system  
- Implement tag engine  
- Add branching logic  
- Add timestamps  
- Add update session score logic  
- Upgrade PDF structure  

(backlog + out-of-scope remain unchanged)

---

# ✅ DONE
- Step 0 audit  
- New 4-section architecture  
- Module 1 finalized  
- Module 2 finalized  
- Module 3 finalized  
- Autosave logic confirmed (instant)

[2025-11-24 — Module 4 Completed + Behavior Engine Added]
✅ Module 4 — Post-Market Review FINALIZED

A full refactor of the Post-Market Review was completed, adding:

automated PNL aggregation

automated R and missed-R aggregation

automated missed-opportunity count

scenario auto-resolution (played / didn’t play)

multi-select trend/range/continuation/reversal/mixed structure logic

full psychological pattern auto-generation based on Modules 1–3 emotional chain

semi-automated “What Went Well / What Went Wrong”

missed-opportunity explanation engine linked to emotional patterns

final daily grading

full backend logic for narrative generation

V1 layout frozen

This completes all 4 modules of the Trading SOP V1.

⭐ MODULE 4 — POST-MARKET REVIEW (FINALIZED)
🔹 Final Approved Blocks

1) Daily Performance (Auto)

total PNL

total realized R

total missed R (missed + taken-trade missed sections)

total missed opportunities

execution grade (auto)

discipline grade (auto)

2) Market Behavior

multi-select: trend / range / manipulation / continuation / reversal / hybrids

NY session only

3) Scenario Resolution (Auto)

“Scenario Played/Didn’t Play” auto-selected based on “Which Scenario Unfolded?”

TradeID → auto-links to its IF-THEN

ScenarioID → selected if chosen

none → all premkt scenarios marked “didn’t play”

4) Rule Adherence

check rule → follow/break

auto feeds scoring

5) Trade Logic Validation

per trade: setup valid, trigger valid, invalidation respected, management consistent

6) Psychological Pattern Detection (Auto)
Machine-like conditional engine combines emotional tags from:

pre-trade baseline

watching PA

at the signal

missed trade emotions

during-trade emotions

rule breaks

hesitation/fomo/revenge/avoidance tags
Produces final stitched summary

7) What Went Well (Semi-Auto)

auto-generated behavioral + structural wins

optional manual note

8) What Went Wrong (Semi-Auto)

auto-generated errors from execution + psychology

optional manual note

9) Missed Opportunities (Linked Auto)

counts missed trades

sums missed R

generates explanation using emotional-pattern engine

10) Tomorrow’s Adjustments

manual: “If X → tomorrow Y.”

11) Daily Grade

manual A/B/C or percentage

📘 Module 4 Summary Table
Section	Final Name	Action	Explanation
Daily PNL / R	Daily Performance	AUTO	Derived from trades
Scenario Outcome	Scenario Resolution	AUTO	Based on TradeID / ScenarioID
Market Behavior	Market Structure	UPGRADE	Multi-select logic
Rule Adherence	Rule Checklist	KEEP+UPGRADE	Feeds execution scoring
Trade Logic Validation	TIL Compliance	KEEP+UPGRADE	Per-trade logic
Psychological Patterns	Behavior Engine	AUTO	Full emotional chain synthesis
What Went Well	Performance Positives	SEMI-AUTO	Derived from trades
What Went Wrong	Performance Negatives	SEMI-AUTO	Derived from mistakes
Missed Opps	Missed Opportunities	AUTO+LINKED	Uses psych engine
Tomorrow	Feedback Loop	KEEP	Manual
Daily Grade	Grade	KEEP	Manual
🔧 TO-DO PIPELINE (Updated)
⭐ PRIORITY 0 (NOW)

Freeze V1 field architecture (Modules 1–4)

Begin UI structuring for all 4 modules

Implement autosave after every field edit

🛠 NEXT UP

Build dynamic multi-module UI

Implement psychological pattern engine

Build scenario auto-resolution logic

Implement missed-R and PNL aggregation logic

Implement semi-auto “What Went Well / Wrong” engine

Establish component-based PDF generator

Add refresh logic:
→ page refresh only when “Reset Day” pressed
→ fields persist always

📌 BACKLOG (V2+)

Weighting-based scoring system for execution & discipline

Advanced behavior-loop diagnostics

Multi-day performance trend charts

Trade classification engine

Entry-model scoring matrix

Dynamic coaching prompts

✅ DONE

Step 0 audit

New 4-section architecture

Module 1 finalized

Module 2 finalized

Module 3 finalized

Module 4 finalized

Autosave logic confirmed (instant)

[2025-11-24 — Module 3 Entry Model System Added]
✅ Entry Model Tagging System Implemented Across Modules 1–3

A complete Entry Model architecture was added and integrated throughout the trade-flow sequence.

Key Additions:

Entry Model field added to:

Pre-Trade Baseline (optional)

At-The-Signal (mandatory)

Executed Trade (auto-prefilled from At-Signal + editable)

Missed Trade (auto-prefilled from At-Signal + editable)

Carry-forward logic:

If selected in Baseline → suggested at At-Signal

If selected at At-Signal → auto-copied to Executed/Missed

Trader can add/remove/edit at any stage

Entry Model Library V1 added:

Liquidity-based models

Structure-based models

Inducement models

Continuation models

Reversal models

Hybrid models

Entry-style models (executed trades only)

Free-text Tag Engine integrated:

Typing “model1, model2, model3” creates individual tags

Custom tags saved to global library

Dropdown includes both predefined + custom entries

Purpose:
Establishes a unified and flexible entry-model classification system for:

signal detection

trade idea tracking

missed-trade logic

automated emotional chain reconstruction

post-market scoring and pattern modeling

Entry Model system is now finalized for SOP V1.

[2025-11-24 — Module 3 Risk Model Added]
✅ Risk Model field added to Executed Trades (Module 3)

A standardized risk-allocation selector was added to the Entry Details block for executed trades.

Key Additions:

Risk Model (executed trades only):

Low Risk

Medium Risk

Full Risk

Custom risk tags allowed (free-type, comma+space → tag creation)

Logic:

Required ONLY when a trade is taken

Not present in missed trades

Does NOT carry forward from Pre-Baseline or At-The-Signal

Directly integrates with R-calculation engine

Influences psychological auto-analysis (e.g., low-risk = hesitation, full-risk = confidence/aggression)

This completes the Risk Model architecture for Module 3 in SOP V1.

✅ CHANGELOG — BUILD 001 (2025-11-24)
Status: FAILED / UI REJECTED
Summary: First attempt at full V1 front-end build did NOT match SOP requirements.
What Happened

Attempted to deliver full V1 interface in one single static HTML file

UI became cluttered, misaligned, and inconsistent

Multiple fields appeared that were not part of the V1 spec

Layout broke:

Module 1 + Module 2 rendered SIDE-BY-SIDE instead of accordion

Text inputs were WHITE TEXT on WHITE BACKGROUND (unusable)

Dropdowns had unreadable white-on-white theming

IF–THEN scenario block layout was broken

Module 3 flow incorrect (no baseline → signal → executed/missed flow)

Random fields appeared (“emotion clarifier”, “expected entry models”, etc.)

Interpretation tags and confluence tags placed in wrong modules

Entire Module 3 structure not according to spec

Add Trade button produced invalid/garbage layout

Root Cause

Build attempted to mix Tailwind + heavy dynamic JS in one pass without respecting the original UX structure

Multiple assumptions were made outside the SOP spec

No accordion system implemented

Wrong module hierarchy rendered

Styling inconsistencies due to Tailwind defaults overriding custom styles

Trade flow logic incorrectly bundled into one component

Outcome

User confirmed Build 001 is not usable

Build 001 officially marked as FAILED

Complete UI refactor required

Clean rebuild (Build 002) must start from scratch

Actions for Build 002

Implement full accordion interface for all 4 modules (per requirement)

Restore proper vertical, structured layout

Only include fields explicitly defined in SOP V1

Remove unauthorized/undefined fields

Implement correct flow for Module 3:

Baseline → Signal → (Executed / Missed)

Fix all input styling (dark inputs, visible text, readable dropdowns)

Clean IF–THEN scenario UI (vertical stacked layout)

Add interpretation tags + free text input

Remove unexpected fields (“emotion clarifier”, expected entry models, etc.)

Ensure layout matches EXACT SOP V1 spec

No white-on-white elements

No side-by-side modules

Accordion = multiple open allowed (per final answer)

### Build 002 — Accordion + Module 1 UI + Dark Theme  
**Status:** Done / Passed  

**Scope:**
1. Implement accordion system for all 4 modules  
2. Rebuild Module 1 UI (Pre-Market) correctly  
3. Apply global dark theme to inputs / textareas / selects  

**What Was Implemented:**
- All 4 modules (Pre-Market, During Session, Trade Idea Logic, Post-Market Review) are now rendered as **accordion sections**:
  - Click header to expand/collapse
  - Multiple modules can be open at the same time
- **Module 1 — Pre-Market** UI rebuilt from scratch with the correct fields:
  - `Session Levels` → single checkbox: “All required levels marked”
  - `Previous Sessions Observed / Bias` → dark textarea
  - `HTF → LTF Structure & Trend` → dark textarea
  - `IF–THEN Scenarios` → placeholder block only (scenario system to be built in Build 003)
  - `Session-Start Emotional State` → dropdown with the approved options
- Explicitly **removed**:
  - Confluence tags in pre-market
  - “Emotion clarifier”
  - “Expected entry models” in Module 1
  - Any extra/undefined fields from Build 001

**Theming / Styling:**
- All text inputs, textareas and dropdowns now use a **dark background with light text**.
- No more white-text-on-white-background issues.
- Dropdowns are readable in closed state and consistent with the dark theme.

**Notes:**
- No autosave, scenario logic, or trade logic added in this build (by design).
- This build is the clean scaffold for all later logic.
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



