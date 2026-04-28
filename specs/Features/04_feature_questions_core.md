# Feature Specification: Questions Page Core Functionality
# Interview Questions and Answers Mini-Program

## 1. Feature Overview
- **Phase:** Phase 4 (Days 7-9)
- **Purpose:** Build the core questions experience that loads stack-specific data, prevents duplicates, tracks progress, and lets users reveal answers.

## 2. Functional Requirements
### 2.1 Data Loading & Navigation
- **FR-1:** Read the `stack` query parameter (`/pages/questions/index?stack={stackId}`) and fall back to default stack IDs (`javascript`, `react`, etc.) if the parameter is missing or invalid.
- **FR-2:** Load the corresponding JSON data file (from `src/data/{stack}.json`) using `questionManager.loadQuestionsByStack` and map the questions into a normalized structure.

### 2.2 Question Flow
- **FR-3:** Show one question at a time with its difficulty, category, and question text, while keeping track of answered IDs.
- **FR-4:** Prevent duplicate questions by filtering previously asked IDs when calling `getRandomQuestion`.
- **FR-5:** Limit the session to `QUESTIONS_PER_SESSION` (10) questions, updating a progress label (`X/10`).
- **FR-6:** Implement `Show Answer` and `Next` buttons that toggle answer visibility and fetch the next question, respectively.

### 2.3 Error & Loading States
- **FR-7:** Display a loading indicator while the page initializes with data.
- **FR-8:** Surface an error message (`Could not load questions...`) when data fails to load, and disable `Show Answer`/`Next` until resolved.
- **FR-9:** If no questions are available for a stack, show an empty-state message (`No questions found for that stack yet.`) instead of the question card.

## 3. Technical Notes
- Implement logic in `src/pages/questions/index.tsx` using shared constants (`STACK_IDS`, `QUESTIONS_PER_SESSION`) and the question manager helpers (`loadQuestionsByStack`, `getRandomQuestion`, `shuffleArray`).
- Keep `sessionComplete` and `loading` in component state, resetting them when a new session starts.
- The question manager should import data statically from `src/data/{stack}.json` to avoid `require` errors in the browser.

## 4. Acceptance Criteria
- [ ] Stack query parameter selects the correct dataset and values.
- [ ] Progress label updates as the user advances through questions.
- [ ] Duplicate questions do not appear in one session.
- [ ] Loading and error states behave as described.
- [ ] Show Answer / Next controls work reliably and are disabled appropriately.

## 5. Testing Strategy
- Manual: Navigate to each stack via the stack selection page and confirm the correct stack name, question set, and progress. Refresh mid-session and ensure loading/error states behave.
- Unit: Add tests for `questionManager` to verify stack filtering, shuffle randomness, and difficulty/category helpers.

**Status:** Ready for implementation
