# Trading SOP Journal — Project Tracking

This file combines:
1. Change Log
2. Feature Wishlist
3. To-Do Pipeline

Everything in one place.

---

# 🧾 CHANGE LOG

## [2025-11-25 — Completion of Step 0 Audit + New 4-Section Architecture]

### ✅ Step 0 — Automaticity Field Audit Completed
A full behavioral, emotional, structural, and execution-flow audit was completed.  
This resulted in a complete redesign of the journaling logic and session workflow.

### 🔷 Introduced a new 4-Section Architecture for the entire system:
1. **Pre-Market**
2. **During Session (Global)**  
   (new section — logs that happen outside specific trade ideas)
3. **Trade Idea Logic**  
   (Pre-Trade Baseline → At The Signal → Executed/Missed branching)
4. **Post-Market Review**

This replaces the old 3-section UI, which could not support emotional sequencing or reflex-based journaling.

---

## 🟦 MODULE 1 — PRE-MARKET (Now Finalized)

### ✔ Redesigned Section Structure
The Pre-Market block has been rebuilt to match the new architecture.

### ✔ Approved Final Pre-Market Fields
1) **Session Levels Marked**  
- Combined: PDH, PDL, Asia H/L, London H/L  
- Checkbox: “Session Levels Marked”  
- Text box appears ONLY if checked  
- Removed: HTF OB / HTF FVG (indicator covers this)

2) **Previous Sessions Observed**  
- Combines Asia direction + London behavior + combined bias  
- Checkbox with optional notes field  
- Cleaner, simpler, more accurate

3) **HTF → LTF Structure & Trend**  
- Checkbox: “HTF → LTF Structure Reviewed”  
- Reveals:  
  - 15m trend  
  - 5m structure  
  - 1m trend  
  - 1m EMA condition  
  - HTF wick behavior  
  - Trend notes  
- Only appears when checkbox is ticked  
- Styled to match Tag Engine visuals

4) **Confluence Preparation**  
- Old list removed  
- Replaced with new **Confluence Tag Engine**:  
  - Predefined confluences  
  - Custom tags using comma + space

5) **IF–THEN Scenarios**  
- Builder kept  
- Expanded to connect with:  
  - Executed Trade Flow  
  - Missed Trade Flow  
- Post-market IF–THEN notes supported

6) **Psychological Preparation**  
- Remains  
- Upgraded with new emotion taxonomy  
- Adds free-text emotional clarifier  
- Renamed to “Session-Start Emotional State”

7) **NY Opening Impulse Expectation**  
- Kept  
- Renamed for clarity  
- Matches HTF → LTF bias flow

---

## 📘 Snapshot Table — Module 1 (Pre-Market)

| Section | Final Name | Action | Explanation |
|--------|------------|--------|-------------|
| Levels Marked | Session Levels Marked | MERGE + REMOVE | Combined levels; OB/FVG removed |
| Bias | Previous Sessions Observed | RENAME + MERGE | Simpler and aligned with workflow |
| Trend | HTF → LTF Structure & Trend | KEEP + rename | Checkbox to reveal detailed items |
| Confluence Prep | Confluence Tag Engine | REPLACE | New system used across entire journal |
| IF–THEN | IF–THEN Scenarios | KEEP + expand | Links to trade/missed logic |
| Psychological Prep | Session-Start Emotional State | UPGRADE | New emotion system |
| NY Impulse | NY Opening Impulse Expectation | KEEP | Renamed; stays the same |

---

## [2025-11-23 — Major Architecture Update]
- Introduced NEW journaling logic:
  - Trades and Misses are no longer manually added.
  - Each one is *spawned* through the emotional sequence:  
    Pre-Trade Baseline → At The Signal → (Executed or Missed?)
- Added full branching logic for:
  - Executed Trades (During-Trade → Exit Behavior → Behavior Loops → IF–THEN check)
  - Missed Trades (Emotions Watching Price → Behavior Loops → IF–THEN miss logic)
- Added “During Session (Global)” section:
  - Watching Price (timestamped, emotion, interpretation)
  - Mid-session notes
  - Market behavior observations
  - Emotional surges
  - Optional energy/focus checks
  - Adaptation notes
- All fields are now optional; PDF prints only what is filled.
- Added new Interpretation Layer items:
  - Expected move?
  - Surprised by volatility?
  - Confirmation freeze?
  - FOMO?
  - Price too fast?
- Added system rule: *ChatGPT/dev may propose new fields as trading insights evolve.*
- Added instant autosave on every field change.
- Added 12-hour persistence system.
- Added “Update Session Score” inside trade/miss blocks.
- Added PDF narrative updates for conditional branches.
- Added initial timestamp logic (EST).

---

# 💡 FEATURE WISHLIST (Future / V2+)

### Behavioral Intelligence / AI
- Auto hesitation-loop detection  
- Emotional clustering  
- Execution consistency grading  
- Opening impulse emotional classifier  
- Re-entry quality evaluator  
- “Why I exited early” classifier  
- Trader pattern recognition  
- Bias–emotion misalignment detector  
- Health → Trading correlator  

### UX / Flow Enhancements
- Emotion presets  
- Confluence favorites  
- Multi-level collapsibles  
- Screenshot previews  
- Better timestamp UX  
- Auto-expand on new trade/miss logic

### PDF Enhancements
- Dark/Light themes  
- Day summary generator  
- Screenshot grid layouts  
- Timeline view for timestamps  

---

# 🔧 TO-DO PIPELINE (LIVE ROADMAP)

## ⭐ PRIORITY 0 (NOW)
**Automaticity Field Audit**
- Completed for Module 1  
- Continue Module 2 → Module 3 → Module 4  
- Freeze V1 field architecture after all modules finalized  

---

## 🛠 NEXT UP
- Implement 4-Section UI skeleton  
- Implement new Pre-Market structure  
- Implement During-Session (Global)  
- Implement Pre-Trade Baseline + At The Signal branching  
- Implement full Executed/Missed logic  
- Implement new Exit + Re-Entry + Add-On modules  
- Implement behavior-loop sections  
- Implement new emotion engine  
- Update PDF structure  
- Implement EST timestamps  
- Add “Update Session Score” logic  

---

## 📥 BACKLOG
- Additional emotion presets  
- More intuitive confluence clusters  
- IF–THEN → Trade linking refinement  
- Tooltip explanations  
- Auto hints from previous entries

---

## ❌ OUT OF SCOPE FOR V1
### Backend / Database
- Supabase integration  
- Cloud sync  
- History system  

### Analytics
- Setup performance dashboards  
- Emotional frequency graphs  
- Behavior cluster maps  
- Replay mode  

### Environmental State (V2)
- Sleep  
- Stress  
- Distraction load  
- Rushing  

### Outcome Response System (V2)
- Tilt  
- Revenge  
- Spiral states  

---

## ✅ DONE  
- Undo system  
- Dynamic IF–THEN  
- Structured PDF generator  
- Clean UI skeleton  
- Dark-mode polish  
- Initial static prototype  
- Autosave model chosen (instant)
