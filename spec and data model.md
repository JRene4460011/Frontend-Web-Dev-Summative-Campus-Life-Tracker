# Campus Life Tracker Specification

## Purpose

The Campus Life Tracker helps students manage tasks, events, and study plans by offering a simple dashboard for adding, viewing, deleting, searching, sorting, and exporting plans.

## Features

- Add a plan
- View plans in a dashboard
- Delete plans
- Search plans
- Sort plans
- Export plans to JSON
- Configure settings

## Technologies

- HTML
- CSS
- JavaScript
- Local Storage
- jQuery

## Data Model

Plans are stored as an array in local storage under `localStorage["plans"]`.

Example record:

```json
{
  "Id": "rec_123456",
  "title": "Study JavaScript",
  "dueDate": "2026-06-20",
  "duration": 60,
  "tag": "Learning"
}
```

Example storage structure:

```json
[
  {
    "Id": "rec_123456",
    "title": "Study JavaScript",
    "dueDate": "2026-06-20",
    "duration": 60,
    "tag": "Learning"
  }
]
```

Field | Type | Example
--- | --- | ---
Id | String | rec_123456
 title | String | Study JavaScript
 dueDate | Date | 2026-06-20
 duration | Number | 60
 tag | String | Learning
