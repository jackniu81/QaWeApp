# Feature Specification: Session Completion & Error Handling
# Interview Questions and Answers Mini-Program

## 1. Feature Overview
- **Phase:** Phase 6 (Day 12)
- **Purpose:** Gracefully handle the end of the question session and surface error/loading states, ensuring the user can restart or return to stack selection without confusion.

## 2. Functional Requirements
### 2.1 Session Completion
- **FR-1:** After 10 questions, display a completion state inside the card (`Session complete. Tap Next to restart.`) and show a toast/modal summarizing their progress.
- **FR-2:** The Next button should change its label to `Restart Session` once the session completes, resetting the question stack when tapped.

### 2.2 Loading & Errors
- **FR-3:** Show a centered loading indicator (`Loading interview questions…`) while the questions page initializes or the user refreshes the page mid-session.
- **FR-4:** If the server/data fails to load, surface an error banner/text (`Could not load questions. Please retry.`) with a retry CTA that re-runs the question load.
- **FR-5:** If the selected stack has no questions, show a friendly empty state (`No questions found for that stack yet.`) and disable the Show Answer button.

### 2.3 Navigation & Feedback
- **FR-6:** Provide a secondary action/button that takes the user back to the stack selection screen (`Back to stacks`).
- **FR-7:** Each error or completion state should trigger a lightweight toast/snackbar (can reuse Taro `showToast`) to inform the user of what happened.

## 3. Technical Notes
- Extend `pages/questions/index.tsx` to track `sessionComplete` & `loading`, showing banners/overlays according to the requirements.
- Use Taro’s `showToast` or a custom component to provide toast-level feedback for completion/error states.
- Add a “Back to Stack Selection” button that uses `Taro.navigateBack` or `Taro.redirectTo` depending on navigation depth.
- Update `src/pages/questions/index.scss` to style the completion message, error banner, and button layout for multiple states.

## 4. Acceptance Criteria
- [ ] Completion message and toast display after 10 questions.
- [ ] Error/loading states are visibly handled with text/toasts and disable inappropriate actions.
- [ ] “Back to stacks” navigation works without manual URL entry.
- [ ] Session can restart via the Next button once complete.

## 5. Testing Strategy
- Manual: Trigger completion by cycling through questions; confirm Next toggles to `Restart Session` and resets the state. Simulate a load failure by temporarily renaming a data file and ensure the error message + retry CTA shows. Finally, tap `Back to stacks` and verify the stack page reappears.
- Automated: (Optional) Add a jest test for the questionManager to verify `loadQuestionsByStack` returns data for each stack as expected.

**Status:** Ready for implementation
