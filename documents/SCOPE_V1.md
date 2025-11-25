# SCOPE V1.1 — Full Trading Journal System Specification

This document defines the functional scope of the trading journal as of Version 1.1,
including module structure, data flow, emotional logic, and execution behavior rules.

The system consists of FOUR HORIZONTAL MODULES:

---------------------------------------------------------------------
MODULE 1 — PRE-MARKET (Preparation Layer)
---------------------------------------------------------------------
1. Levels Marked  
   - Checkbox  
   - Observation (text)  
   - Tag support (preset + custom)

2. News Checked  
   - Checkbox  
   - Observation  
   - Tag support

3. HTF Check  
   - Checkbox  
   - Observation  
   - Tag support

4. LTF Alignment  
   - Yes/No  
   - Observation  
   - Tag support

5. IF–THEN Scenarios  
   - Multi-scenario engine  
   - Each scenario contains: ID, IF block, THEN block, title

6. NY Opening Impulse Expectation  
7. Emotions Coming Into Session

This module feeds directly into Module 3 via scenario + emotion inheritance.

---------------------------------------------------------------------
MODULE 2 — DURING SESSION (State Layer)
---------------------------------------------------------------------
1. Watching Price  
2. Emotional Surges  
3. Market Behavior Notes  
4. Energy / Focus Checks  
5. Adaptation Windows  
6. Market State Snapshots  

All emotional and behavioral data flows into Module 4’s Emotional Chain Engine.

---------------------------------------------------------------------
MODULE 3 — TRADE IDEA + TRADE LOGIC (Execution Layer)
---------------------------------------------------------------------

### A) Start New Trade Idea → Pre-Trade Baseline
- Emotion  
- Interpretation Tags  
- Confluence Tags  
- Notes  
- Assigned IF–THEN Scenario  
- Status: Active / Abandoned / Converted  

### B) At The Signal
- Emotion  
- Interpretation Tags  
- Confluence Tags  
- Entry Model  
- IF–THEN Suggested (auto)  
- Decision: Execute or Miss

---------------------------
EXECUTED TRADE (Ordered)
---------------------------
1. Entry Details  
   - Entry price  
   - Stop loss  
   - RR expectation  

2. Execution Behavior Tags (multi-select + custom)

3. IF–THEN Consistency

4. Emotion During Trade

5. Exit Logic  
   - Planned exit?  
   - Followed plan?  
   - Deviation reason  
   - Notes

6. Re-entry Logic (ONLY if exit deviated)  
   - Emotion  
   - Reason  
   - Confluence  
   - Entry  
   - SL  
   - RR  
   - Target / Same as Initial  
   - Missed R  
   - Notes

7. Add-on Logic (multiple allowed)  
   - Same fields as re-entry  
   - Missed R included

---------------------------
MISSED TRADE
---------------------------
- Emotion  
- Interpretation Tags  
- Reasons  
- Bad behavior loops  
- Suggested IF–THEN Scenario  
- Missed R  
- Notes  

---------------------------
ABANDONED TRADE IDEA
---------------------------
- Auto-status  
- Emotion  
- Interpretation  
- Confluence  
- Notes  

---------------------------------------------------------------------
MODULE 4 — POST-MARKET (Review Layer)
---------------------------------------------------------------------
1. Total Realized R  
2. Total Missed R (includes missed trades, re-entry, and add-ons)  
3. Scenario Resolution  
4. Rule Adherence Review  
5. Trade Logic Validation  
6. Emotional Chain Reconstruction  
7. What Went Well  
8. What Went Wrong  
9. Missed Opportunities Summary  
10. Tomorrow’s Adjustments  
11. Daily Grade  

---------------------------------------------------------------------
DATA FLOW (Cross-Module)
---------------------------------------------------------------------
- Module 1 IF–THEN → Module 3 Pre-Trade Baseline  
- Module 2 emotions + market state → Module 4 Emotional Chain  
- Pre-Trade → At The Signal → Execute/Miss branching  
- Executed/Missed → Module 4 performance metrics  
- Abandoned Ideas → Module 4 Psychological Analysis  
- Missed R fields → Module 4 Missed Opportunity Summary  
