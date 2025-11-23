# Trading SOP Journal — V1 Scope (Muscle Memory Edition)

This document defines the boundaries of Version 1, the live feedback loop through which it evolves, 
and the behavioral architecture required to turn strategy execution into automatic “pencil reflex” behavior.

V1 sharpens itself through real usage — not theoretical design.

---

# ⭐ PRIORITY #1 — Automaticity Field Audit

Before ANY V1 work, we must:

1. Identify every behavior required to understand:
   - hesitation  
   - missed setups  
   - fear loops  
   - execution quality  
   - emotional spikes  
   - A-game alignment  
   - exit behavior  
   - re-entry discipline  
   - IF–THEN consistency  

2. Compare required fields vs current UI fields.

3. Add / remove / refine fields until NOTHING important is missing.

This defines the entire V1 skeleton.

---

# 🎯 CORE PHILOSOPHY

The journal is a mirror that reveals:
- hesitation patterns  
- emotional surges  
- interpretation errors  
- behavior loops  
- discipline lapses  
- A-game behaviors  
- execution consistency  
- exit-quality metrics  

The goal:
**turn deliberate execution → automatic execution.**

---

# 🧪 HOW V1 IS USED  
V1 is filled progressively:

- Not all at once  
- Across the entire session  
- As emotions, trades, and misses occur in real-time  

All fields autosave instantly.  
No data is lost on refresh or browser restart.  
Data clears ONLY when pressing **Start New Day / Clear Journal**.

---

# ✔️ V1 MUST-HAVE FEATURES

## 1. Session-Long Incremental Journaling
- Fill small parts throughout the session  
- Instant autosave  
- 12-hour persistence  
- All fields optional; blank fields do not block PDF  

---

# 2. Pre-Market Module
- Levels (PDH/PDL, Asia/London H/L, OB, FVG)  
- Bias + HTF/LTF alignment  
- NY impulse expectation  
- Confluences  
- **Session Start Emotion**  
  - dropdown + free-text  

- IF–THEN scenario builder

---

# 3. NEW CORE LOGIC — Trades/Misses Spawn Through Emotions

## A. Pre-Trade Baseline  
(dropdown + free-text)

## B. At The Signal  
(dropdown + free-text)

After these two fields:

**System asks → Did you execute or miss?**

This spawns either:

### → Executed Trade Block  
or  
### → Missed Trade Block  

Every trade/miss begins from emotional state, not manually.

---

# 4. Executed Trade Flow (Full Branch)

### 1. During Trade Emotion  
### 2. Execution Layer (multi-select)
All execution behaviors appear as checkboxes:
- early  
- late  
- overconfirmation  
- hesitation  
- reduced size  
- increased size  
- jumped early  
- micromanaged  
- SL interference  
- confirmation freeze  
- etc.

### 3. Exit Behavior Module  
- Planned exit?  
  - show text input  
- Actual exit = planned?  
  - if no:
    - dropdown: emotional exit, impatience, good instinct, volatility shift, SL avoidance  
    - text-box explanation  

### 4. Re-Entry Logic  
Shown only if:
- exit ≠ planned  
- AND re-entry checkbox selected

Dropdown + text explanation.

### 5. Behavior Loop (Trade)
Shows BOTH good + bad loops (multi-select + free-text).

### 6. IF–THEN Consistency
Checkbox: “Did this trade follow my IF–THEN?”
→ reveals list of IF–THENs.

### 7. Update Session Score button  
Appears at bottom.

---

# 5. Missed Trade Flow (Full Branch)

### 1. Emotional State While Watching Price  
(dropdown + free text)

### 2. Interpretation/Execution Layer (slimmer set)
- hesitation  
- overconfirmation  
- fear  
- disbelief  
- adrenaline  
- frozen  
- too fast  

### 3. Behavior Loops (Miss)
Only BAD loops.

### 4. IF–THEN Miss Logic  
“Did this missed move follow your IF–THEN?”  
→ shows scenarios.

### 5. Update Session Score button

---

# 6. While Watching Price (Standalone Module)
Can be logged at **any time**, independent of trades/misses.

This module includes:
- emotional tag  
- free text  
- **timestamp (auto-filled EST)**  
- optional interpretation dropdown  

User can add multiple entries.

---

# 7. Interpretation Layer (Expanded)
Dropdown for:
- Did I expect this move?
- Surprised by volatility?
- Freeze due to confirmation?
- Felt FOMO?
- Was move too fast?

These appear inside both:
- trade flow  
- miss flow  
- standalone “watching price” logs  

---

# 8. Post-Market Reflection
- How shocked were you by the open?  
- Tired mid-session?  
- Rushed?  
- Behind the market?  
- Pressure to make back?  
- Did session go as expected?  
- Did you adapt?  
- Did market violate expectations?  
- Did you freeze in chaos?  
- Did you capitalize on clean conditions?  

---

# 9. PDF Export Rules
- Only print filled fields  
- Preserve chronological branching  
- Include timestamps  
- Include emotional flows  
- Include exit/re-entry logic  
- Include IF–THEN mapping  
- Include behavior loops  

Blank = simply not shown.

---

# 🟡 SHOULD-HAVE FEATURES
- better presets  
- better clusters  
- collapsibles  
- emotion colors  
- intuitive UX grouping  

---

# ⚪ NICE-TO-HAVE FEATURES
- themes  
- screenshot grids  
- auto summaries  

---

# ❌ OUT OF SCOPE FOR V1
(V1.5 → V2)

### Environmental State  
sleep, stress, distractions

### Outcome Response System  
tilt, revenge, spirals

### Backend & Analytics  
supabase, dashboards, patterns, replay, AI summaries

---

# 🧭 V1 DONE WHEN:
1. Full automaticity field system stable  
2. Branching logic fully implemented  
3. PDF prints narrative cleanly  
4. Journal feels natural and frictionless  
5. Execution loops become obvious  
6. No major missing fields  
