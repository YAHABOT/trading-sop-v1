# Trading SOP Journal — Project Tracking

This file combines:
1. Change Log
2. Feature Wishlist
3. To-Do Pipeline

Everything in one place.

---

# 🧾 CHANGE LOG

## [2025-11-25 — Step 0 Audit Completed + New 4-Section Architecture]

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

