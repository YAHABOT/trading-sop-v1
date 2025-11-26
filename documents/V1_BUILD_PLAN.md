# Trading SOP Journal — V1.1 Build Plan (Final Reset)
:contentReference[oaicite:1]{index=1}

This is the canonical Build Plan for Trading SOP Journal V1.1.
It replaces all previous build plans and aligns with the refactor strategy.

Each build contains:
- A precise scope
- Strict boundaries
- Dependencies (if any)
- Implementation notes

=====================================================================
PHASE 0 — FOUNDATION
=====================================================================

### Build 001 — Core Scaffold + Dark Theme + Reset Day
**Scope:**
1. Add horizontal 4-module UI scaffold.
2. Apply dark navy Build-008 theme globally.
3. Implement Reset Day (clears Modules 1–4 state).

=====================================================================
PHASE 1 — MODULE 1 (PRE-MARKET)
=====================================================================

### Build 002 — Module 1 Core Fields (Updated V1.1)
**Scope:**  
Implement:
- Levels Marked  
- News Checked  
- HTF Check  
- LTF Alignment  

### Build 003 — IF–THEN Scenario Engine
**Scope:**  
- Multi-scenario UI  
- ID (S1, S2, …)  
- Title, IF, THEN  
- Delete + collapse  
- Persistence layer + helpers  

### Build 004 — NY Impulse + Emotional Baseline
**Scope:**  
- NY impulse field  
- Emotional baseline field  
- Persistence  

=====================================================================
PHASE 2 — MODULE 2 (DURING SESSION)
=====================================================================

### Build 005 — Watching Price (Full)
**Scope:**  
- Add cards  
- Preset interpretation tags  
- Custom tags  
- Notes  
- Persistence  

### Build 006 — Emotional Surges + Adaptation Windows
**Scope:**  
- Emotional Surges  
- Adaptation Windows (correct fields)  
- Persistence  

### Build 007 — Session State Snapshot
**Scope:**  
- Trader energy  
- Market energy  
- Market type  
- Tempo/behavior notes  
- Persistence  

=====================================================================
PHASE 3 — MODULE 3 (TRADE IDEA + EXECUTION)
=====================================================================

### Build 008 — Trade Idea Engine
**Scope:**  
- Start New Trade Idea button  
- Pre-Trade Baseline fields  
- Scenario assignment  
- Status = Active  

### Build 009 — At The Signal
**Scope:**  
- Emotion  
- Interpretation  
- Confluence  
- Entry Model  
- IF–THEN auto-suggest  
- Execute / Miss  

### Build 010 — Branching Logic
**Scope:**  
- Executed trade card  
- Missed trade card  
- Update idea status  

=====================================================================
PHASE 4 — EXECUTED TRADE ORDER (V1.1)
=====================================================================

### Build 011 — Entry Details (FIRST)
### Build 012 — Execution Behavior + IF–THEN Consistency
### Build 013 — During-Trade Emotion + Exit Logic
### Build 014 — Add-On Logic (MULTIPLE)

(Each build implements exactly the blocks defined in SCOPE.)

=====================================================================
PHASE 5 — MISSED TRADES
=====================================================================

### Build 015 — Missed Trade Core
### Build 016 — Abandoned Trade Idea Logic

=====================================================================
PHASE 6 — POST-MARKET (MODULE 4)
=====================================================================

### Build 017 — Scenario Resolution
### Build 018 — R Aggregation Engine
### Build 019 — Emotional Chain Engine
### Build 020 — Auto What-Went-Well / Wrong
### Build 021 — Missed Opportunities + Tomorrow + Grade

=====================================================================
PHASE 7 — FINALIZATION
=====================================================================

### Build 022 — Integrity Pass  
### Build 023 — UI Polish  
### Build 024 — V1 Final Tag  

=====================================================================
This build plan governs all future development.
No build may deviate from scope.
