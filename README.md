# Coding-Exercise-FE

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Build for Production](#build-for-production)
  - [Available Scripts](#available-scripts)
- [Development & Code Quality](#development--code-quality)
  - [ESLint](#eslint)
  - [Recommended VS Code Extensions](#recommended-vs-code-extensions)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Assumptions and Decisions](#assumptions-and-decisions)
  - [Design & Branding](#design--branding)
  - [Calendar Usability & Touch Experience](#calendar-usability--touch-experience)
  - [TBD Teams](#tbd-teams)
  - [Filtering and Reset Design Decisions](#filtering-and-reset-design-decisions)
  - [Data fetching and Caching](#data-fetching-and-caching)
  - [Unique ID Generation](#unique-id-generation)
  - [Efficient Data Structure: Map vs Array](#efficient-data-structure-map-vs-array)
  - [Event Data Management](#event-data-management)
  - [Form Validation Strategy](#form-validation-strategy)
  - [Feedback with Toast Notifications](#feedback-with-toast-notifications)

## Project Overview

This project is a **sports event calendar** that allows users to:

- View a list of sports events **displayed in the calendar**.
- **Filter events** by sport type and/or match status.
- **Navigate** through pages using a responsive **navbar** .
- See detailed information for each event.
- Add new events dynamically during runtime.

The application is built with **React**, **TypeScript**, and **Tailwind CSS** for a responsive and modern UI.  
**React Hook Form** is used for handling forms and validation.  
Application state is managed using **React Context**, and events are persisted in **local storage** to maintain data between sessions.

## Setup Instructions

Step-by-step guide to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yesmine96/Coding-Exercise-FE
cd Coding-Exercise-FE
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Development & Code Quality

This project uses **TypeScript**, **ESLint**, and **Prettier** to ensure clean, maintainable, and consistent code.

---

### ESLint

- Enforces code quality and detects potential bugs.
- Run ESLint to check for issues

### Recommended VS Code Extensions

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)

Enable "Format on Save" in VS Code settings for automatic formatting.

```bash
npm run lint        # Check for linting errors
npm run lint:fix  # Auto-fix issues
```

## Technology Stack

| Category             | Technology            |
| -------------------- | --------------------- |
| **Framework**        | React 19 + TypeScript |
| **Styling**          | Tailwind CSS          |
| **Form Handling**    | React Hook Form       |
| **State Management** | React Context API     |
| **Routing**          | React Router v6       |
| **Build Tool**       | Vite                  |
| **Code Quality**     | ESLint + Prettier     |
| **ID Generation**    | nanoid                |

## Project Structure

```
├── .eslintrc.js       # ESLint configuration for code quality and consistency
├── .prettierrc        # Prettier configuration for consistent code formatting
public/
└── data/
└── events.json # Original JSON data for events
src/
├── components/       # Reusable UI components
├── constants/        # Application constants (e.g., sport types, status, stages)
├── contexts/         # React Context providers
│   └── eventContext/ # Event state management
├── features/         # Feature-specific components
│   ├── calendar/     # Calendar view
│   ├── eventCard/    # Event display
│   └── addEvent/     # Add event form
├── hooks/            # Custom hooks
│   └── useCachedFetch.ts
├── layouts/
│   └── MainLayout.tsx   # Main page wrapper including Navbar, Toaster, and Outlet
├── pages/            # Route pages
├── types/            # TypeScript types
└── utils/            # Helper functions
```

## Assumptions and Decisions

### Design & Branding

The application design is inspired by the SportRadar website, including its color palette, logo, and **look and feel**.

### Calendar Usability & Touch Experience

**Problem:**  
Too many events per day make the calendar full and hard to use on touch devices

**Solution:**

- Each day shows a maximum of **3 events**.
- If there are more than 3 events, a **“more” button** appears. Clicking it opens the full list of events.
- On mobile devices, **tapping a day** opens the full list of events.

**Benefits:**

- Keeps the calendar **easy to read**.
- Makes the calendar **touch-friendly** for mobile and tablet users.

### TBD Teams

**Scenario:** Some events lack confirmed team information (e.g., final)

**Solution:**

- Display **"TBD"** (To Be Determined) for null teams
- Show **event stage** (e.g., "final") for context

**User Benefit:** Understands why teams are TBD rather than seeing `null` or empty fields.

### Filtering and Reset Design Decisions

- **Generic filters:**
  - The calendar allows filtering events by **sport** and **status**.
  - Filters are designed to be **generic**, so additional parameters (e.g., date, stage) can be added in the future.

- **Reset button:**
  - A **reset button** clears all filters and restores the full calendar view.
  - Enhances usability and ensures users can quickly return to the default state.

### Data fetching and Caching:

**How it works:**

1. Check localStorage for cached data with valid expiration time
2. If cache exists and hasn't expired → use cached data
3. If cache is stale or missing → fetch from JSON File and update cache
4. Configurable Expiration time (default: 30 minutes)

**Benefits:**

- limits fetching data from the JSON file
- Faster page loads (uses cached data)
- Stays fresh with 30 minute

### Unique ID Generation

**Problem:** The original JSON data lacks unique identifiers for events.

**Solution:** [`nanoid`](https://github.com/ai/nanoid) library

**Reason for choosing `nanoid`:**

- **Better than alternatives:**
  - `Math.random()` or `Date.now()` can produce duplicate.
  - Combining parameters from the JSON data can fail if any field is `null` or `undefined`.

### Efficient Data Structure (Map vs Array)

**Problem:** Finding events in an array with `.find()` takes time and slows down as the list grows.

**Solution:** Store events in a `Map` using their unique IDs as keys.

**Performance Comparison:**

| Operation     | Array (`.find()`) | Map (`.get()`) |
| ------------- | ----------------- | -------------- |
| Lookup by ID  | O(n) - Slow       | O(1) - Instant |
| 1,000 events  | ~1,000 checks     | 1 check        |
| 10,000 events | ~10,000 checks    | 1 check        |

**Benefits:**

- Quickly access any event by its ID without searching the array.
- Improves performance as the number of events grows.

### Event Data Management

- The app uses **React Context** to manage global event data.
- Provides a **central store** for events, filters, and selected event details.
- Allows all components (calendar, event details, add event form) to access data consistently.
- avoids passing data through many components “prop drilling” and keeps the code clean and maintainable as the app grows.

**Why React Context?**

- Lightweight alternative to external state managers (like Redux or Zustand).
- Well-suited for moderate-sized apps with shared data.
- Integrates cleanly with React hooks and the component tree.
- Provides an easy way to add actions such as `addEvent`, `updateFilter`, and `getEventById` while keeping logic encapsulated.

### Form Validation Strategy

- The application uses **React Hook Form** for input validation when adding events.

- **Field validation rules:**
  - **Teams:** Must be a string; numeric values are not accepted.
  - **Scores:** Must be integers; non-integer values are rejected.

- **Date-dependent status validation:**
  - **If the date is today:** Only the **“Live”** status can be selected.
  - **If the date is in the past:** Only **“Played”** status can be selected.
  - **If the date is in the future:** Neither **“Live”** nor **“Played”** can be selected; only scheduled status is allowed.

- **Reasoning:**
  - Enforces **data consistency** and prevents invalid combinations of date and status.
  - Improves **user experience** by guiding users toward valid inputs.
  - Keeps the application logic **aligned with real-world event scenarios**.

#### Example Table

| Event Date | Allowed Status |
| ---------- | -------------- |
| Past       | Played         |
| Today      | Live           |
| Future     | Scheduled      |

### Feedback with Toast Notifications

- **Instant user feedback:**
  - When a new event is successfully added, a **success toast** appears: `"Event added successfully!"`.
  - If adding the event fails, an **error toast** appears: `"Failed to add event. Please try again."`.

- **Why toast notifications:**
  - Improves user experience and keeps the interface responsive.
