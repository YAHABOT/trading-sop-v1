# Trading SOP Journal — V1.1 Build Plan (Final Architecture)

This is the authoritative build plan for the Trading SOP Journal.  
It replaces all earlier build plans, merges the results of previous builds (1–8), 
and integrates all new V1.1 module logic.

Each build contains:
- A title
- A scope of EXACT features to implement
- A status placeholder
- Dependencies (if any)
- Implementation notes

No build may contain more than 3 items.

=====================================================================
PHASE 0 — FOUNDATION (UI scaffold, dark theme, module layout)
=====================================================================

### Build 001 — Core Scaffolding + Module Layout + Day Reset
**Status:** Planned  
**Scope:**
1. Create FOUR MODULE columns aligned horizontally:
   - Module 1: Pre-Market
   - Module 2: During Session
   - Module 3: Trade Idea + Trade Logic
   - Module 4: Post-Market Review
2. Implement global dark theme, typography, spacing.
3. Implement global Reset Day:
   - Clears Module 1 scenarios
   - Clears Module 2 session state
   - Clears Module 3 trades/ideas
   - Clears Module 4 review fields

**Notes:**
- This build merges all UI work from old Builds 1–2 but reorganized into horizontal modules.
- Old accordion system removed entirely.

=====================================================================
PHASE 1 — MODULE 1 (PRE-MARKET)
=====================================================================

### Build 002 — Updated Module 1 Core (V1.1 Structure)
**Status:** Planned  
**Scope:**
1. Levels Marked block:
   - Checkbox
   - Observation textarea
   - Tag field (preset + custom)
2. News Checked block:
   - Checkbox
   - Observation
   - Tags
3. HTF Check block:
   - Checkbox
   - Observation
   - Tags
4. LTF Alignment block:
   - Yes/No
   - Observation
   - Tags

### Build 003 — IF–THEN Scenario Engine (Enhanced)
**Status:** Planned  
**Scope:**
1. Scenario list with:
   - ID (S1, S2…)
   - Title
   - IF block
   - THEN block
   - Delete scenario
2. Persist scenarios via localStorage
3. Expose helpers:
   - getAllScenarios()
   - getScenarioById(id)

### Build 004 — NY Impulse + Emotional Baseline
**Status:** Planned  
**Scope:**
1. NY Opening Impulse expectation block
2. Emotions coming into session block
3. Persist these fields

=====================================================================
PHASE 2 — MODULE 2 (DURING SESSION)
=====================================================================

### Build 005 — Watching Price (Enhanced)
**Status:** Planned  
**Scope:**  
1. Watching Price entries  
2. Preset interpretation tags  
3. Custom tag support  
4. Notes

### Build 006 — Emotional Surges + Adaptation Windows
**Status:** Planned  
**Scope:**  
1. Emotional Surge entry cards  
2. Adaptation Window cards  
3. Full persistence for both

### Build 007 — Session State Snapshot
**Status:** Planned  
**Scope:**
1. Trader Energy (0–10)
2. Market Energy (0–10)
3. Market Type dropdown
4. Tempo/Behavior notes
5. Persistence

=====================================================================
PHASE 3 — MODULE 3 (TRADE IDEA + EXECUTION ENGINE)
=====================================================================

### Build 008 — Trade Idea Engine (NEW)
**Status:** Planned  
**Scope:**  
1. "Start New Trade Idea" button  
2. Pre-Trade Baseline fields:
   - Emotion
   - Interpretation Tags
   - Confluence Tags
   - Notes
   - IF–THEN Scenario assignment
   - Status = Active

### Build 009 — At The Signal (Updated)
**Status:** Planned  
**Scope:**  
1. At-The-Signal card:
   - Emotion at signal
   - Interpretation tags
   - Confluence tags
   - Entry Model
   - Auto-suggest IF–THEN from baseline
2. Options:
   - Execute
   - Miss

### Build 010 — Executed/Missed Branching
**Status:** Planned  
**Scope:**  
1. Clicking “Execute” spawns Executed Trade block  
2. Clicking “Miss” spawns Missed Trade block  
3. Trade Idea status updated automatically

=====================================================================
PHASE 4 — EXECUTED TRADE REBUILD (V1.1 ORDER)
=====================================================================

### Build 011 — Entry Details (FIRST)
**Status:** Planned  
**Scope:**  
1. Entry Price  
2. Stop Loss  
3. RR expectation  

### Build 012 — Execution Behavior + IF–THEN Consistency
**Status:** Planned  
**Scope:**  
1. Execution Behavior tags (preset + custom)
2. IF–THEN Consistency block

### Build 013 — During-Trade Emotion + Exit Logic
**Status:** Planned  
**Scope:**  
1. Emotion During Trade  
2. Exit Logic  
3. Conditional Re-Entry Logic:
   - Only appears if exit plan deviated  
   - Includes emotion, confluence, RR, target, missed R

### Build 014 — Add-On Logic (MULTIPLE)
**Status:** Planned  
**Scope:**  
1. Add Add-On button  
2. Each add-on:
   - Emotion
   - Reason
   - Confluence
   - Entry
   - SL
   - RR
   - Target
   - Missed R
3. Allow unlimited add-ons

=====================================================================
PHASE 5 — MISSED TRADES
=====================================================================

### Build 015 — Missed Trade Core (Updated)
**Status:** Planned  
**Scope:**  
1. Emotion during watch  
2. Interpretation  
3. Miss reasons  
4. Behavior loops  
5. IF–THEN auto-suggest  
6. Missed R  
7. Notes

### Build 016 — Abandoned Trade Idea Logic
**Status:** Planned  
**Scope:**  
1. Auto-mark idea “Abandoned” if:
   - No At-The-Signal within threshold  
2. Store:
   - Emotion
   - Interpretation
   - Confluence
   - Notes

=====================================================================
PHASE 6 — MODULE 4 (POST-MARKET)
=====================================================================

### Build 017 — Scenario Resolution
**Status:** Planned  
**Scope:**  
1. Resolve which scenarios unfolded  
2. Read scenario IDs from Module 1 and Module 3  

### Build 018 — R Aggregation Engine
**Status:** Planned  
**Scope:**  
1. Total Realized R  
2. Total Missed R:
   - From missed trades
   - From missed re-entries
   - From missed add-ons  

### Build 019 — Emotional Chain Engine (V1)
**Status:** Planned  
**Scope:**  
1. Combine emotions from:
   - Module 1
   - Module 2
   - Module 3  
2. Produce emotional pattern string

### Build 020 — What Went Well / What Went Wrong (Auto-seed)
**Status:** Planned  
**Scope:**  
1. Auto-seed using:
   - Execution behavior  
   - Rule adherence  
   - Emotional chain  
   - Missed R logic  

### Build 021 — Missed Opportunity Summary + Tomorrow
**Status:** Planned  
**Scope:**  
1. Compile missed opportunities  
2. Generate summary  
3. Tomorrow’s adjustments  
4. Daily grade

=====================================================================
PHASE 7 — FINALIZATION
=====================================================================

### Build 022 — Integrity Pass
### Build 023 — UI Polish
### Build 024 — V1 Final Tag
