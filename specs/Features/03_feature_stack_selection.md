# Feature Specification: Stack Selection Page
# Interview Questions and Answers Mini-Program

## 1. Feature Overview

**Feature Name:** Stack Selection Page
**Phase:** Phase 3
**Duration:** Days 5-6
**Estimated Time:** 6-8 hours

**Purpose:**
Provide the first interactive page where the user chooses one of the five supported technology stacks before entering the question session. The page should follow the UI/UX spec — large stack cards, iconography, animated taps — and must navigate to the questions page without exposing passages backward.

## 2. Functional Requirements

### 2.1 Stack Tiles
- **FR-1:** Display five stack cards: JavaScript, React, TypeScript, HTML, CSS.
- **FR-2:** Each card shows stack name, friendly icon (emoji or small illustration), and difficulty summary (e.g., “50 curated prompts”).
- **FR-3:** Cards arranged vertically with generous spacing (32rpx margins) and consistent padding (24rpx).
- **FR-4:** Card is tappable and provides visual feedback (scale, shadow) on press.
- **FR-5:** Cards must be accessible (minimum 44rpx tap target, color contrast ≥ 4.5:1).

### 2.2 Navigation
- **FR-6:** Tapping a stack card runs a handler that:
  - Stores `stackId` (lowercase key) for the session.
  - Navigates to `/pages/questions/index` with query `?stack={stackId}`.
  - Resets question progress if the user returns to selection (forward-only navigation enforced by disabling hardware back).
- **FR-7:** Display a subtle transition animation (slide-left 300ms, opacity fade) when navigating to questions.

### 2.3 Animations & Micro Interactions
- **FR-8:** Use gentle scale transform and shadow ramp-up when a stack card is pressed (scale 0.98, shadow deepens).
- **FR-9:** Use hover/focus states for web previews (border color #07C160, shadow increase).
- **FR-10:** On entry, hero header and cards stagger in with fade-in (stagger 80ms, duration 320ms).

### 2.4 Edge Cases
- **FR-11:** If question data fails to load after navigation, display a toast/snackbar (“Could not load questions, please retry”). Provide a retry button that re-triggers navigation.
- **FR-12:** If navigation is blocked by missing stackId, disable cards and show loader until data map is ready.

## 3. Technical Specifications

### 3.1 Folder Layout
```
pages/stack-selection/index.js (logic)
pages/stack-selection/index.wxml (layout)
pages/stack-selection/index.wxss (styles)
```
### 3.2 Data & Constants
- Import `STACK_IDS` and `STACK_NAMES` from `utils/constants.js` for consistency.
- Maintain `STACK_METADATA` array locally to match icons and copy.

### 3.3 Page Lifecycle
```js
onLoad() {
  this.setData({ stacks: STACK_METADATA });
}

tapStack(event) {
  const stackId = event.currentTarget.dataset.stack;
  wx.navigateTo({
    url: `/pages/questions/index?stack=${stackId}`
  });
}
```

### 3.4 Styles
- Background: gradient from #F5F7FF to #FFFFFF.
- Cards: white background, border-radius 16rpx, shadow 0 8rpx 24rpx rgba(0,0,0,0.08).
- Icons: 48rpx emoji or svg, center-left aligned.
- Text: stack name 34rpx, description 24rpx.
- Buttons/CTA: entire card acts as button.

## 4. Acceptance Criteria
- [ ] Five stack cards render as defined
- [ ] Tap animation & hover states feel responsive
- [ ] Navigation passes `stackId` query and opens questions page
- [ ] Handles missing stack data gracefully (loader + disabled state)
- [ ] Accessibility targets (touch size, contrast) are met
- [ ] Animations (entry fade/stagger) are implemented

## 5. Testing Strategy
### 5.1 Manual Tests
1. Launch app → verify stack cards appear
2. Tap each card → confirm navigation to `/pages/questions/index?stack={stackId}`
3. Confirm animation plays and cards show tap feedback
4. Simulate data fetch failure → verify toast + retry button
5. Inspect on web (H5 target) for hover/focus states

### 5.2 Automated Tests
- Snapshot tests for layout (if using component test harness)
- E2E (Taro test) verifying navigation query parameters

## 6. Dependencies
- `src/utils/constants.js` for stack IDs/names
- Icon assets (emoji or svg) placed under `/assets/icons`

## 7. Risks & Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Missing stack metadata | High | Fallback to safe defaults per constant file |
| Slow navigation | Medium | Preload question data when card is pressed (prefetch logic) |
| Accessibility regression | Medium | Run contrast checks, ensure 44rpx tap area |

## 8. Next Steps
- Implement questions page (Phase 4) once stack selection navigation works.
- Add analytics/event logging for stack taps in a later phase.

---
**Document Version:** 1.0  
**Last Updated:** 2026-04-20  
**Status:** Ready for Implementation
