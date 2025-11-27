
🔥 TRADING SOP JOURNAL — V1.1 BUILD PLAN (VITE RESET EDITION)

(FINAL & CANONICAL — Replaces All Previous Versioned Plans)

This document defines the only valid build sequence for the Trading SOP Journal V1.1 system.

Every build must follow this order, with no skipping, merging, or freelancing.
All builds stack cleanly on top of each other in a modern component-based Vite architecture.


---

================================================================

🚀 PHASE 0 — FOUNDATION & VITE FRAMEWORK

================================================================

Build 001 — Project Scaffold + Global Theme + Reset Day (Vite)

Scope:

Initialize clean Vite project using Vanilla + JS + CSS

Create folder structure:


src/
  modules/
  components/
  utils/
  storage/
  styles/
public/
index.html

Add the 4 horizontal modules (accordion-only skeleton)

Implement global dark navy theme (Build 008 color palette)

Implement Reset Day button (wipes all state across Modules 1–4)

Add global autosave helper (empty for now)

Ensure all JS loads via Vite’s module system (import / export)

Ensure all components mount cleanly without errors


Output:
A clean, running Vite project with a functioning accordion layout and dark UI base.


---

================================================================

🟦 PHASE 1 — MODULE 1: PRE-MARKET

================================================================

Build 002 — Module 1 Core Fields (Updated V1.1)

Scope:
Implement the following blocks as collapsible subsections within Module 1:

Levels Marked (checkbox + observation + tags engine)

News Checked (checkbox + observation + tags)

HTF Check (checkbox + observation + tags)

LTF Alignment (Yes/No + observation + tags)


All fields:

must autosave to localStorage via storage/module1.js

must restore on page load

must support tag creation (comma + space)



---

Build 003 — IF–THEN Scenario Engine

Scope:

Multi-scenario UI

Auto IDs (S1, S2, S3…)

Title / IF / THEN

Delete scenario

Collapse/expand

Persistence in storage/scenarios.js

Helper: getScenarioByID(id) for Module 3 linkage



---

Build 004 — NY Impulse + Emotional Baseline

Scope:
Add remaining Module 1 fields:

NY Opening Impulse expectation (textarea)

Emotion Coming Into Session (dropdown)


Both autosaved + restored.


---

================================================================

🟧 PHASE 2 — MODULE 2: DURING SESSION (GLOBAL STATE)

================================================================

Build 005 — Watching Price Engine

Scope:

Add “Watching Price” entry system

Fields per entry:

Time (EST)

Emotion

Interpretation tags (preset + custom)

Notes


Add entry/remove entry

Autosave + restore via storage/module2_watching.js



---

Build 006 — Emotional Surges + Adaptation Windows

Scope:
Emotional Surges:

Time

Emotion shift

Trigger

Notes


Adaptation Windows:

Start time

What changed? (tags)

Market shift notes

Adaptation response

❗ No end time (V1.1 correction)


Both systems autosave + restore.


---

Build 007 — Session Energy & Market Behavior

Scope:

Trader energy

Market energy

Market type

Behavior notes

Liquidity observations

Volatility regime

Tempo

Autosave + restore


This completes Module 2.


---

================================================================

🟥 PHASE 3 — MODULE 3: TRADE IDEAS + EXECUTION

================================================================

Build 008 — Trade Idea Engine

Scope:

“Start New Trade Idea” button

Create idea card

Pre-Trade Baseline:

Emotion

Interpretation tags

Confluence tags

Notes

Assigned IF–THEN Scenario


Status = Active

Autosave + restore via storage/module3_ideas.js



---

Build 009 — At The Signal

Scope:

Emotion

Interpretation tags

Confluence tags

Entry Model selector

IF–THEN auto-suggest

Decision → Execute or Miss

On decision:

branch into executed trade flow
OR

branch into missed trade flow




---

Build 010 — Branching Logic & Idea Finalization

Scope:

For executed trade:

Create executed card

Mark idea as “executed”


For missed trade:

Create missed card

Mark idea as “missed”


For abandoned:

Add Abandon button

Mark idea as “abandoned”


Autosave entire state.


---

================================================================

🔵 PHASE 4 — EXECUTED TRADE ORDER (V1.1)

================================================================

Build 011 — Entry Details

Entry

Stop

RR expectation

Target (same? Y/N)

If no → target fields

Risk model (low / medium / full / custom)



---

Build 012 — Execution Behavior + IF–THEN Consistency

Behavior tags (multi-select)

Consistency summary

Autosave



---

Build 013 — During-Trade Emotion + Exit Logic

Emotion during trade

Planned exit?

Deviated?

Reason tags + text



---

Build 014 — Add-On Logic (MULTIPLE)

Add-on button

Each add-on = fields identical to re-entry

Each add-on includes Missed-R

Unlimited add-ons



---

================================================================

🔴 PHASE 5 — MISSED TRADES

================================================================

Build 015 — Missed Trade Core

Emotion

Interpretation

Reason tags

Behavior loops

IF–THEN miss logic

Missed R

Notes



---

Build 016 — Abandoned Trade Idea Logic

Emotion

Interpretation

Confluence tags

Notes

Status = Abandoned

Autosave



---

================================================================

🟩 PHASE 6 — MODULE 4: POST-MARKET

================================================================

Build 017 — Scenario Resolution

Auto-detect scenario used

Played / Didn’t play logic



---

Build 018 — R Aggregation Engine

Realized R

Missed R

Missed opportunities

Autoscore discipline/execution



---

Build 019 — Emotional Chain Engine

Combine emotions from:

Pre-trade baseline

Watching price

At signal

During trade

Missed trades

Surges


Produce structured emotional chain



---

Build 020 — What Went Well / Wrong (Semi-Auto)

Auto positive summary

Auto negative summary

Optional manual notes



---

Build 021 — Missed Opportunities + Tomorrow

Summary of missed R

Behavior-based explanations

Tomorrow’s adjustments



---

================================================================

🟨 PHASE 7 — FINALIZATION

================================================================

Build 022 — Integrity Pass

Fix all UX bugs

Ensure every field autosaves

Validate hierarchy



---

Build 023 — UI Polish

Smooth animations

Card spacing

Tag styling

Visual consistency



---

Build 024 — V1 FINAL TAG

Freeze V1

Generate documentation bundle

Prepare for PDF generator (V2)
