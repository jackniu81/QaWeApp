# Feature Specification: Questions Page UI Enhancement
# Interview Questions and Answers Mini-Program

## 1. Feature Overview
- **Phase:** Phase 7 (Post-Phase 6)
- **Purpose:** Enhance the questions page UI with a polished header, simplified content layout, collapsible answer, and fixed footer for better usability and visual consistency.

## 2. Functional Requirements
### 2.1 Header
- **FR-1:** Design a beautiful header with gradient background (linear-gradient: 135deg, #0f172a, #1d4ed8), rounded corners (28rpx), and shadow for visual depth.
- **FR-2:** Position an SVG back icon on the left side of the header that, when clicked, navigates back to the stack selection page (`/pages/stack-selection/index`).
- **FR-3:** Center the stack name in the header with a clean, bold font (32rpx, weight 700) and white text color.

### 2.2 Content
- **FR-4:** Simplify the question display by showing the progress indicator inline with the question text in parentheses format: "(X/Y) question text".
- **FR-5:** Remove the separate progress section from the header and integrate it into the question card content.
- **FR-6:** Keep the difficulty badge visible above the question text.
- **FR-7:** Make the question row clickable to toggle answer visibility (collapsible answer pattern).
- **FR-8:** Display expand/collapse text labels: "show answer" when collapsed, "hide answer" when expanded, styled in blue (#1d4ed8) color.
- **FR-9:** Answer is collapsed by default and expands/collapses with a fadeSlideUp animation (400ms).

### 2.3 Footer
- **FR-10:** Fix the footer at the bottom of the screen so it's always visible regardless of content height.
- **FR-11:** Display only the "Next/Restart Session" button in the footer (single button layout).
- **FR-12:** Remove the "Show Answer" and "Back to stacks" buttons from the footer since navigation is handled by the header back icon and answer toggle.

### 2.4 Button Styling
- **FR-13:** Style the single button with smaller dimensions for mobile (height: 72rpx, font-size: 26rpx, border-radius: 12rpx).
- **FR-14:** Button uses primary styling with blue background (#1d4ed8) and white text.

## 3. Technical Notes
- Update `src/pages/questions/index.tsx` to:
  - Add SVG back icon in the header with `handleBack` navigation
  - Move progress indicator inline with question text using parentheses format
  - Replace "Show Answer" button with click-to-toggle on question row
  - Add expand/collapse text labels that change based on `showAnswer` state
  - Remove footer buttons except Next/Restart Session
- Modify `src/pages/questions/index.scss` to:
  - Style header with gradient background, shadow, and flexbox layout
  - Fix footer at bottom with `position: fixed`
  - Style expand icon with blue color (#1d4ed8) and appropriate font size (28rpx)
  - Adjust button styling for mobile-friendly single-button layout
  - Add cursor pointer to question row for better UX
- Use Taro's `View` and `Text` components with appropriate classes for the header, content, and footer structure.

## 4. Acceptance Criteria
- [ ] Header displays with SVG back icon on the left and stack name centered.
- [ ] Clicking the back icon navigates to the stack selection page.
- [ ] Progress indicator appears inline with question text in "(X/Y)" format.
- [ ] Question row is clickable and toggles answer visibility.
- [ ] Expand/collapse text labels show "show answer" when collapsed and "hide answer" when expanded.
- [ ] Answer is collapsed by default and animates in when expanded.
- [ ] Footer is fixed at the bottom with single button.
- [ ] Button styling is mobile-friendly with appropriate size and color.
- [ ] "Show Answer" and "Back to stacks" buttons are removed from footer.

## 5. Testing Strategy
- Manual: Navigate to the questions page, verify the header back icon works, progress indicator is inline, and question row toggles answer. Test that the footer remains fixed at the bottom on different screen sizes and button is properly sized for mobile.

**Status:** Implemented
