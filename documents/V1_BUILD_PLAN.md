# V1.1 BUILD PLAN — Engineering Blueprint

This is the authoritative implementation plan for the trading journal application. 
All components, interactions, and UI flows must follow this document exactly.

-------------------------------------------------------
GLOBAL STRUCTURE (HORIZONTAL LAYOUT)
-------------------------------------------------------
Render FOUR main modules side-by-side:

Module 1 | Module 2 | Module 3 | Module 4

Each module is a vertical column of UI cards or collapsible sections.
Arrows or logic connections should be visually explicit in the interface.

-------------------------------------------------------
MODULE 1 IMPLEMENTATION RULES (Pre-Market)
-------------------------------------------------------
- Each section is its own card.
- All cards support:
  - Textarea input
  - Tag list (with both preset + custom tags)
  - Checkboxes where specified
- IF–THEN scenarios stored in local storage with:
  - ID
  - Title
  - IF block
  - THEN block

-------------------------------------------------------
MODULE 2 IMPLEMENTATION RULES (During Session)
-------------------------------------------------------
- Session timeline objects:
  - Watching Price (timestamped)
  - Emotional Surges (timestamped)
  - Adaptation Windows
- Data stored as array entries with timestamps.

-------------------------------------------------------
MODULE 3 IMPLEMENTATION RULES (Trade Engine)
-------------------------------------------------------
### ENTRY POINT: “Start New Trade Idea”
Creates a TradeIdea object:
- id
- timestamp
- emotion
- interpretation
- confluence
- ifThenScenarioId
- status = "active"

### AT THE SIGNAL
- Loads suggested IF–THEN from TradeIdea
- Ends TradeIdea.active when Execute/Miss selected

### EXECUTED TRADE (ordered components)
1. EntryDetails
2. ExecutionBehavior
3. IfThenConsistency
4. EmotionDuringTrade
5. ExitLogic
6. ReEntryLogic (conditional)
7. AddOnLogic (array, unlimited entries)
8. MissedR fields everywhere required
9. Screenshots

### MISSED TRADE
- Stores emotional + behavioral inputs
- Missed R required

### ABANDONED TRADE IDEA
- Triggered if no At-The-Signal occurs within defined time window
- Stored permanently

-------------------------------------------------------
MODULE 4 IMPLEMENTATION RULES (Post-Market)
-------------------------------------------------------
- Auto-aggregate R metrics
- Emotional chain builder reads from:
  - Module 1 Emotion
  - Module 2 Emotion Surges
  - Module 3 Emotions (baseline, signal, trade)
- Scenario resolution uses scenario IDs from executed/missed trades
- Missed opportunities built from:
  - Missed trades
  - Missed re-entries
  - Missed add-ons

-------------------------------------------------------
DATA PERSISTENCE
-------------------------------------------------------
- Use localStorage for:
  - Scenario Engine
  - Trade Ideas
  - Executed Trades
  - Missed Trades
  - Abandoned Trades
  - Session data

-------------------------------------------------------
EXPORT
-------------------------------------------------------
- Export day as JSON
- Export day as PDF summary
