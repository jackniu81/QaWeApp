# Feature Specification: Questions Page UI Polish
# Interview Questions and Answers Mini-Program

## 1. Feature Overview
- **Phase:** Phase 5 (Days 10-11)
- **Purpose:** Elevate the questions page from a functional prototype to a polished experience that matches the UI/UX design system, adds expressive typography, badges, animations, and a responsive layout.

## 2. Functional Requirements
### 2.1 Visual Hierarchy
- **FR-1:** Apply the design system’s color palette (dark bold heading, muted secondary text, accent green badges) to the question card, meta, and actions.
- **FR-2:** Question text should use a large, semi-bold font (≈30rpx) while the metadata uses smaller, uppercase badges.
- **FR-3:** Provide a card background with soft gradient/shadow, rounded corners (24rpx), and enough padding (32rpx) for visual comfort.

### 2.2 Badges & Tags
- **FR-4:** Display difficulty & category badges with distinct background colors (`#e7f2ff` for difficulty, `#fdf5dd` for category) and uppercase captions.
- **FR-5:** Position badges at the top-left of the card with consistent spacing (16rpx gap).

### 2.3 Animations & Interactions
- **FR-6:** Animate the answer reveal with a `fadeSlideUp` keyframe (duration 400ms, easing `ease`) on the answer container so the content feels lively.
- **FR-7:** Buttons should respond to taps with scale + opacity transitions (0.3s) and maintain accessible hit areas (min 44rpx height).
- **FR-8:** Use entry transitions for the card when page loads (opacity + translateY) with 320ms duration and 80ms stagger for complex layouts.

### 2.4 Responsive Layout
- **FR-9:** Ensure padding/margins shrink gracefully when the screen width drops below 375px (e.g., reduce horizontal padding to 24rpx, stack buttons vertically, maintain line spacing).
- **FR-10:** For wide screens (H5), center the card and constrain max-width to ~640rpx.

## 3. Technical Notes
- Implement styles in `src/pages/questions/index.scss` (already created) with CSS variables for colors (e.g., `--accent-green`, `--text-primary`).
- Use SCSS mixins (if desired) to define reusable badge styles.
- Keep animations in SCSS to leverage `@keyframes fadeSlideUp` defined earlier.
- Confirm `questions/index.tsx` uses the styled classes already defined (header, card, badges, actions, buttons).

## 4. Acceptance Criteria
- [ ] Question card uses the design palette and shadow specs.
- [ ] Difficulty/category badges are present and legible.
- [ ] Answer reveal uses the `fadeSlideUp` animation.
- [ ] Layout collapses gracefully on small screens and centers on wide screens.
- [ ] Buttons and interactions have polished transitions.

## 5. Testing Strategy
- Manual: Validate on H5 preview at multiple breakpoints (desktop width, 375px, 320px). Confirm animation plays when showing the answer. Ensure badges render with correct colors and the card is centered.
- Visual regression (if available): Capture screenshot of the questions card before/after animation.

## 6. Dependencies
- `/src/pages/questions/index.tsx` (structure)
- `/src/pages/questions/index.scss` (styles)
- `/specs/UI_UX_SPEC.md` for exact spacing/color references.

**Status:** Ready for implementation
