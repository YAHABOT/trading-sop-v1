# SCOPE V1.1 — Trading SOP Journal (Rewritten & Final)
:contentReference[oaicite:0]{index=0}

This is the complete functional scope of the Trading SOP Journal V1.1 system.
It replaces all prior versions and defines the final architecture across four
modules, emotional engines, behavioral logic, and cross-module data flow.

=====================================================================
MODULE 1 — PRE-MARKET (Preparation Layer)
=====================================================================

1. Levels Marked  
   - Checkbox  
   - Observation (textarea)  
   - Tag engine (preset + custom)

2. News Checked  
   - Checkbox  
   - Observation  
   - Tag engine

3. HTF Check  
   - Checkbox  
   - Observation  
   - Tag engine

4. LTF Alignment  
   - Yes/No  
   - Observation  
   - Tag engine

5. IF–THEN Scenarios  
   - Multi-scenario engine  
   - Each scenario has:
     - ID (S1, S2…)  
     - Title  
     - IF block  
     - THEN block  

6. NY Opening Impulse Expectation  
7. Emotions Coming Into Session

Module 1 feeds Module 3 by providing:
- Scenario assignments  
- Emotional baseline  
- Pre-market directional expectations  

=====================================================================
MODULE 2 — DURING SESSION (Global State Layer)
=====================================================================

1. Watching Price  
   - Time  
   - Emotion  
   - Interpretation tags (preset + custom)  
   - Notes  

2. Emotional Surges  
   - Time  
   - Emotion spike type  
   - Trigger  
   - Response notes  

3. Market Behavior Notes  
   - Liquidity observations  
   - Displacement strength  
   - Volatility regime  
   - Notes + tags  

4. Energy / Focus Checks  
   - Trader energy (0–10)  
   - Market energy (0–10)  
   - Market type  
   - Notes  

5. Adaptation Windows  
   - Start time  
   - “What changed?” tags  
   - Market shift notes  
   - Adaptation response  
   - (End time removed per V1.1 correction)

6. Market State Snapshots  
   - Tempo / behavior notes  
   - Structured dropdowns  

Module 2 feeds Module 4 via the Emotional Chain Engine.

=====================================================================
MODULE 3 — TRADE IDEA + EXECUTION ENGINE
=====================================================================

### A) Start New Trade Idea → Pre-Trade Baseline
- Emotion  
- Interpretation tags  
- Confluence tags  
- Notes  
- Assigned IF–THEN Scenario  
- Idea status: Active / Abandoned  

### B) At The Signal
- Emotion  
- Interpretation tags  
- Confluence tags  
- Entry Model  
- IF–THEN auto-suggestion  
- Decision: Execute or Miss  

=========================
EXECUTED TRADE — V1.1 ORDER
=========================

1. Entry Details  
   - Entry  
   - Stop Loss  
   - RR expectation  

2. Execution Behavior Tags  

3. IF–THEN Consistency  

4. Emotion During Trade  

5. Exit Logic  
   - Planned exit?  
   - Followed?  
   - Reason if deviated  

6. Re-Entry Logic  
   - ONLY if exit deviated  
   - Includes emotion, confluence, RR, target, missed R  

7. Add-On Logic (multi-add-on)  
   - Same fields as re-entry  
   - Missed R included  

=========================
MISSED TRADE
=========================

- Emotion  
- Interpretation  
- Reasons  
- Behavior loops  
- IF–THEN auto-suggest  
- Missed R  
- Notes  

=========================
ABANDONED TRADE IDEA
=========================

- Emotion  
- Interpretation  
- Confluence  
- Notes  

=====================================================================
MODULE 4 — POST-MARKET (Review Layer)
=====================================================================

1. Total Realized R  
2. Total Missed R  
3. Scenario Resolution  
4. Rule Adherence  
5. Trade Logic Validation  
6. Emotional Chain Reconstruction  
7. What Went Well  
8. What Went Wrong  
9. Missed Opportunities Summary  
10. Tomorrow’s Adjustments  
11. Daily Grade  

=====================================================================
DATA FLOW
=====================================================================

- Module 1 → Module 3  
  (Scenario assignments + emotional baseline)  

- Module 2 → Module 4  
  (Emotional chain + market state)  

- Module 3 → Module 4  
  (Executed vs missed vs abandoned logic)  

This completes the long-term, stable V1.1 system scope.
