# Trading SOP Journal — Project Tracking

This file combines:
1. Change Log
2. Feature Wishlist
3. To-Do Pipeline

Everything in one place.

---

# 🧾 CHANGE LOG

## [2025-11-23 — Major Architecture Update]
- Introduced NEW journaling logic:
  - Trades and Misses are no longer manually added.
  - Each one is *spawned* through the emotional sequence:
      Pre-Trade Baseline → At The Signal → (Executed or Missed?)
- Added full branching logic for:
  - Executed Trades (During-Trade → Exit Behavior → Behavior Loops → IF–THEN check)
  - Missed Trades (Emotions While Watching Price → Behavior Loops → IF–THEN miss logic)
- All fields are now fully optional; no blank field blocks PDF export.
- Added optional module: “While Watching Price Without Being in a Trade”
  - includes mandatory timestamp field (EST timezone)
  - can be logged multiple times per session
- Added expanded Interpretation Layer options:
  - Did I expect this move?
  - Was I surprised by volatility?
  - Did I freeze waiting for confirmation?
  - Did I feel FOMO?
  - Was the move too fast?
- Added system rule: *ChatGPT/dev may propose new fields as trading insights evolve.*
- Added instant autosave on every field change.
- Added 12-hour persistence storage window.
- Added “Update Session Score” button required at the end of each trade/miss logic chain.
- Added PDF logic update: print ONLY filled fields.
- Added complex conditional rendering rules for:
  - Exit Behavior
  - Re-entry logic
  - IF–THEN logic (trade vs miss)
  - Behavior loop differences for trades vs misses

---

# 💡 FEATURE WISHLIST (FUTURE / V2+)

### Behavioral Intelligence / AI
- Automated hesitation loop detection  
- Emotional clustering engine  
- Execution consistency score  
- Opening impulse emotional classifier  
- Re-entry quality assessment via AI  
- “Why I exited early” classifier  
- Trader pattern recognition  
- Interpretation-layer misalignment detector  
- Health → Trading correlation system (sleep, fatigue, HRV)

### UX Improvements
- Emotion presets  
- Confluence favorites  
- Multi-level collapsibles  
- Screenshot previews  
- Auto-expanding trade cards  
- Improved branching visuals for trade/miss flows  
- Better timestamp UX for “watching price” logs

### PDF Enhancements
- Dark/Light themes  
- Automatic day summary  
- Screenshot grids  
- Timeline-style print for timestamps

---

# 🔧 TO-DO PIPELINE (LIVE ROADMAP)

## ⭐ PRIORITY 0 (NOW)  
**Automaticity Field Audit**
- Field universe finalized  
- Required → Optional → V2 fields separated  
- Confirm all psychological + execution fields exist  
- Freeze V1 field architecture

---

## 🛠 NEXT UP (After Priority 0)

- Implement branching system:
  Pre-Trade → Signal → Executed/Missed → Follow-up fields
- Implement instant autosave system (localStorage)
- Implement “Start New Day / Reset Journal”
- Implement “While Watching Price (timestamped)” module
- Update UI structure:
  - emotional modules
  - hesitation reason modules
  - execution modules  
  - exit-behavior module  
  - re-entry module  
  - IF–THEN mapping  
  - behavior-loop sections (trade vs miss)
- Update PDF generator:
  - print only filled fields
  - preserve branching narrative order
  - include timestamps (EST)
- Add “Update Session Score” button at end of every trade/miss tree
- Polish spacing + grouping + readability

---

## 📥 BACKLOG

- Additional emotion presets  
- More intuitive confluence clusters  
- Tooltip explanations (hover help)  
- Quick-select session model  
- Automatic context hints based on earlier answers  
- IF–THEN → Trade linking refinement  

---

## ❌ OUT OF SCOPE FOR V1

### Backend / Database  
- Supabase integration  
- Cloud sync  
- User accounts  
- Session history storage  

### Analytics  
- Setup performance dashboards  
- Emotional frequency graphs  
- Behavior cluster visuals  
- TradeZella-style breakdowns  
- Replay mode  

### Environmental State (V2)  
- Sleep  
- Stress  
- Distraction load  
- Rushing / time pressure  

### Outcome Response System (V2)  
- Tilt  
- Revenge  
- Post-loss spirals  
- Emotional avoidance  

---

## ✅ DONE  
- Undo system  
- Dynamic IF–THEN  
- Structured PDF generator  
- Clean UI skeleton  
- Dark-mode polish  
- Initial static prototype  
- Autosave model chosen (instant)
