# CALI Tracker

## Overview
CALI Tracker is a lightweight campus life planner for students to record, search, sort, and manage tasks or events. The app uses vanilla HTML, CSS, and JavaScript with localStorage persistence and client-side validation.

## Chosen Theme
Campus Life Planner — a student-focused productivity dashboard for coursework, study sessions, and campus events.

## Features
- Add new tasks or events with title, due date, duration, and tag
- Client-side form validation with regex rules
- Dashboard statistics: total plans, total duration, remaining cap, top tag, and recent items
- Search plans by title, tag, duration or due date
- Sort plans by due date, title, duration, or tag
- Highlight matching search results in the table
- Save weekly cap settings and duration unit
- Export plan data as JSON
- Accessible keyboard support, ARIA notifications, and responsive layout

## Regex Catalog
### Title
- Pattern: `^\S(?:.*\S)?$`
- Purpose: no leading or trailing whitespace, and at least one non-space character
- Examples:
  - Valid: `Math assignment`, `Group study`, `Lab` 
  - Invalid: `  spaced`, `trailing `, ` `

### Due Date
- Pattern: `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`
- Purpose: strict `YYYY-MM-DD` date format
- Examples:
  - Valid: `2026-06-19`, `2025-12-01`
  - Invalid: `19-06-2026`, `2026/06/19`, `2026-13-01`

### Duration
- Pattern: `^(0|[1-9]\d*)(\.\d{1,2})?$`
- Purpose: positive number, optionally with 1–2 decimal places
- Examples:
  - Valid: `30`, `45.5`, `120`, `0`, `2.25`
  - Invalid: `-5`, `3.141`, `one hour`

### Tag
- Pattern: `^[A-Za-z]+(?:[ -][A-Za-z]+)*$`
- Purpose: letters only, optionally separated by single spaces or hyphens
- Examples:
  - Valid: `Study`, `Group project`, `Gym-time`
  - Invalid: `Exam123`, `Work!`, `Bad  spacing`

## Keyboard Map
- `Tab` — move through links, buttons, form fields, and controls
- `Shift + Tab` — move backwards through focusable elements
- `Enter` — activate buttons, submit forms
- `Space` — toggle buttons such as sort direction or export
- `Escape` — close the sidebar when open
- Search field and sort dropdown are reachable by keyboard

## Accessibility Notes
- Uses semantic HTML elements: `<main>`, `<header>`, `<nav>`, `<aside>`, `<table>`
- Search input has an accessible label and visible placeholder
- ARIA live regions announce validation errors and status changes
- Buttons are real `<button>` elements with focus support
- `skip-link` support allows keyboard users to jump to main content
- Reduced motion support is encouraged through browser preferences
- Table headers should include `scope="col"` for better screen reader navigation

## Running the App
1. Open `dashboard.html` in a browser.
2. Use `add_record.html` to add plans.
3. Use `settings.html` to set a weekly cap and duration unit.
4. Return to `dashboard.html` to view stats and remaining cap.

## Testing Instructions
- Open `tests.html` in a browser.
- The page runs client-side assertions for validation patterns.
- Confirm the pass/fail summary shows all tests as passing.
- Use the dashboard and add-record pages to confirm live behavior of search, sort, and cap updates.

## Notes
- Data is saved to browser localStorage under the key `plans`.
- Settings are saved under the localStorage key `settings`.
