# UI/UX Specification
# Interview Questions and Answers Mini-Program

## 1. Design Principles

### 1.1 Core Principles
- **Simplicity:** Clean, uncluttered interface with clear hierarchy
- **Focus:** One task per screen, minimal distractions
- **Clarity:** Clear labels, obvious actions, immediate feedback
- **Consistency:** Uniform styling, spacing, and interaction patterns
- **Mobile-First:** Optimized for thumb-friendly interactions

### 1.2 Design Goals
- Enable quick, distraction-free learning sessions
- Minimize cognitive load during question review
- Provide clear progress feedback
- Ensure accessibility and readability

## 2. Visual Design System

### 2.1 Color Palette

**Primary Colors:**
```
Primary Green:    #07C160  (WeChat brand color)
Primary Dark:     #06AD56  (Hover/active states)
Primary Light:    #E8F5E9  (Backgrounds, highlights)
```

**Neutral Colors:**
```
Background:       #F7F7F7  (Page background)
Card Background:  #FFFFFF  (Content cards)
Text Primary:     #333333  (Main text)
Text Secondary:   #999999  (Labels, hints)
Border:           #E5E5E5  (Dividers, borders)
```

**Semantic Colors:**
```
Success:          #52C41A  (Correct, complete)
Warning:          #FAAD14  (Caution)
Error:            #F5222D  (Error states)
Info:             #1890FF  (Information)
```

**Difficulty Colors:**
```
Easy:             #52C41A  (Green)
Medium:           #FAAD14  (Orange)
Hard:             #F5222D  (Red)
```

### 2.2 Typography

**Font Family:**
- Primary: System default (-apple-system, BlinkMacSystemFont, "Segoe UI")
- Fallback: sans-serif

**Font Sizes (rpx):**
```
Heading Large:    36rpx  (Page titles)
Heading Medium:   32rpx  (Section headers)
Body Large:       30rpx  (Questions)
Body Medium:      28rpx  (Answers, buttons)
Body Small:       26rpx  (Labels)
Caption:          24rpx  (Hints, metadata)
```

**Font Weights:**
```
Bold:             700    (Headings, emphasis)
Medium:           500    (Buttons, labels)
Regular:          400    (Body text)
```

**Line Heights:**
```
Tight:            1.2    (Headings)
Normal:           1.5    (Body text)
Relaxed:          1.8    (Long-form content)
```

### 2.3 Spacing System

**Base Unit:** 8rpx

**Spacing Scale:**
```
xs:   8rpx    (Tight spacing)
sm:   16rpx   (Small spacing)
md:   24rpx   (Medium spacing)
lg:   32rpx   (Large spacing)
xl:   48rpx   (Extra large spacing)
xxl:  64rpx   (Section spacing)
```

**Application:**
- Page padding: 32rpx (lg)
- Card padding: 24rpx (md)
- Element margin: 16rpx (sm)
- Section gap: 48rpx (xl)

### 2.4 Border Radius
```
Small:   8rpx   (Buttons, tags)
Medium:  12rpx  (Cards, inputs)
Large:   16rpx  (Large containers)
Round:   999rpx (Pills, badges)
```

### 2.5 Shadows
```
Small:   0 2rpx 8rpx rgba(0, 0, 0, 0.08)   (Subtle elevation)
Medium:  0 4rpx 16rpx rgba(0, 0, 0, 0.12)  (Cards)
Large:   0 8rpx 24rpx rgba(0, 0, 0, 0.16)  (Modals, overlays)
```

## 3. Page Specifications

### 3.1 Stack Selection Page

**Layout:**
```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐   │ ← Header (80rpx height)
│  │  Interview Q&A          │   │
│  │  Select Your Tech Stack │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │ ← Stack button (120rpx height)
│  │  📜  JavaScript         │   │   32rpx padding, 16rpx margin
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  ⚛️  React              │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  🔷  TypeScript          │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  📄  HTML               │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  🎨  CSS                │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Components:**

1. **Header Section**
   - Title: "Interview Q&A" (36rpx, bold)
   - Subtitle: "Select Your Tech Stack" (28rpx, regular, #999)
   - Background: #FFFFFF
   - Padding: 32rpx
   - Border-bottom: 1px solid #E5E5E5

2. **Stack Button**
   - Height: 120rpx
   - Background: #FFFFFF
   - Border: 2rpx solid #E5E5E5
   - Border-radius: 12rpx
   - Padding: 24rpx 32rpx
   - Margin: 16rpx 32rpx
   - Shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08)
   - Icon: 48rpx emoji/icon on left
   - Text: 30rpx, medium weight
   - Hover: Border color → #07C160, shadow increase
   - Active: Background → #F7F7F7

**Interactions:**
- Tap: Highlight with scale(0.98) animation
- Navigate: Slide left transition (300ms)

### 3.2 Questions Page

**Layout:**
```
┌─────────────────────────────────┐
│  JavaScript          [3/10]     │ ← Header (88rpx)
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │ ← Question card
│  │ Question #3             │    │ ← Index at top
│  │                         │    │
│  │ Q: What is a closure?   │    │
│  │                         │    │
│  │ [Answer area]           │    │ ← Conditional (middle)
│  │ A closure is a function │    │
│  │ that has access to...   │    │
│  │                         │    │
│  │ Category: Closures      │    │ ← Metadata
│  │ Difficulty: Medium      │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  [Show Answer]      [Next →]    │ ← Action buttons (100rpx)
└─────────────────────────────────┘
```

**Components:**

1. **Header Bar**
   - Height: 88rpx
   - Background: #FFFFFF
   - Border-bottom: 1px solid #E5E5E5
   - Padding: 0 32rpx
   - Layout: Flex (space-between)
   - Left: Stack name (28rpx, medium)
   - Right: Progress badge (26rpx, #999)

2. **Progress Badge**
   - Format: "[current/total]"
   - Background: #F7F7F7
   - Padding: 8rpx 16rpx
   - Border-radius: 999rpx
   - Color: #666

3. **Question Card**
   - Background: #FFFFFF
   - Border-radius: 12rpx
   - Padding: 32rpx
   - Margin: 24rpx 32rpx
   - Shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08)
   - Min-height: 400rpx

4. **Question Index**
   - Format: "Question #X" or "#X of 10"
   - Font-size: 26rpx, medium weight
   - Color: #999
   - Margin-bottom: 16rpx

5. **Question Section**
   - Label: "Q:" (bold, #07C160, 30rpx)
   - Text: 30rpx, line-height 1.6, #333
   - Margin-bottom: 24rpx

6. **Answer Section** (Conditional)
   - Background: #E8F5E9 (light green)
   - Border-left: 4rpx solid #07C160
   - Padding: 24rpx
   - Border-radius: 8rpx
   - Margin-top: 24rpx
   - Margin-bottom: 24rpx
   - Position: Middle of page (between question and metadata)
   - Label: "A:" (bold, #07C160, 28rpx)
   - Text: 28rpx, line-height 1.6, #333
   - Transition: Slide down + fade in (300ms)

7. **Metadata Section**
   - Margin-top: 24rpx
   - Padding-top: 24rpx
   - Border-top: 1px solid #E5E5E5
   - Layout: Flex (space-between)
   - Font-size: 24rpx
   - Color: #999

7. **Category Tag**
   - Background: #F7F7F7
   - Padding: 4rpx 12rpx
   - Border-radius: 4rpx
   - Color: #666

8. **Difficulty Badge**
   - Background: Color based on difficulty
   - Padding: 4rpx 12rpx
   - Border-radius: 4rpx
   - Color: #FFFFFF
   - Easy: #52C41A
   - Medium: #FAAD14
   - Hard: #F5222D

9. **Action Buttons Container**
   - Position: Fixed bottom
   - Height: 100rpx
   - Background: #FFFFFF
   - Border-top: 1px solid #E5E5E5
   - Padding: 16rpx 32rpx
   - Layout: Flex (space-between)
   - Safe area: padding-bottom + env(safe-area-inset-bottom)

10. **Show Answer Button**
    - Width: 45%
    - Height: 88rpx
    - Background: #FFFFFF
    - Border: 2rpx solid #07C160
    - Color: #07C160
    - Border-radius: 8rpx
    - Font-size: 28rpx, medium
    - Hover: Background → #F7F7F7
    - Active: Background → #E8F5E9
    - Disabled state: When answer shown
      - Border: 2rpx solid #E5E5E5
      - Color: #999
      - Background: #F7F7F7

11. **Next Button**
    - Width: 45%
    - Height: 88rpx
    - Background: #07C160
    - Color: #FFFFFF
    - Border-radius: 8rpx
    - Font-size: 28rpx, medium
    - Icon: → (arrow right)
    - Hover: Background → #06AD56
    - Active: Scale(0.98)

**Interactions:**

1. **Show Answer Flow:**
   - Tap "Show Answer" button
   - Button becomes disabled (grayed out)
   - Answer section slides down with fade-in (300ms)
   - Scroll to show full answer if needed

2. **Next Question Flow:**
   - Tap "Next" button
   - Card fades out (200ms)
   - New question loads
   - Card fades in (200ms)
   - Progress updates
   - Answer section hidden
   - "Show Answer" button re-enabled
   - Scroll to top

3. **Session Complete:**
   - After 10th question
   - Show modal/toast: "Session Complete! 🎉"
   - Options: "Try Another Stack" or "Restart"

### 3.3 Session Complete Modal

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────┐   │
│  │         🎉              │   │
│  │  Session Complete!      │   │
│  │                         │   │
│  │  You've completed 10    │   │
│  │  JavaScript questions   │   │
│  │                         │   │
│  │  ┌─────────────────┐   │   │
│  │  │ Try Another     │   │   │
│  │  └─────────────────┘   │   │
│  │  ┌─────────────────┐   │   │
│  │  │ Restart         │   │   │
│  │  └─────────────────┘   │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**
- Background overlay: rgba(0, 0, 0, 0.5)
- Modal: 600rpx width, centered
- Background: #FFFFFF
- Border-radius: 16rpx
- Padding: 48rpx 32rpx
- Title: 32rpx, bold, centered
- Message: 28rpx, #666, centered
- Buttons: Full width, 88rpx height, 16rpx margin

## 4. Responsive Design

### 4.1 Screen Size Adaptations

**Small screens (<375px):**
- Reduce padding to 24rpx
- Font sizes -2rpx
- Button height 80rpx

**Large screens (>414px):**
- Max content width: 750rpx
- Center content
- Increase card shadows

### 4.2 Safe Areas
- Top: Status bar + navigation bar
- Bottom: Home indicator (iPhone X+)
- Use `env(safe-area-inset-*)` for padding

## 5. Animations & Transitions

### 5.1 Page Transitions
```css
/* Slide left (forward navigation) */
.page-enter {
  transform: translateX(100%);
}
.page-enter-active {
  transform: translateX(0);
  transition: transform 300ms ease-out;
}

/* Slide right (back navigation) */
.page-exit {
  transform: translateX(0);
}
.page-exit-active {
  transform: translateX(-100%);
  transition: transform 300ms ease-out;
}
```

### 5.2 Component Animations
```css
/* Answer reveal */
.answer-enter {
  opacity: 0;
  transform: translateY(-20rpx);
}
.answer-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}

/* Button press */
.button-active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
}

/* Card transition */
.card-fade {
  transition: opacity 200ms ease-in-out;
}
```

### 5.3 Loading States
- Skeleton screens for question loading
- Spinner for data fetching
- Smooth opacity transitions

## 6. Accessibility

### 6.1 Touch Targets
- Minimum size: 88rpx × 88rpx
- Spacing between targets: ≥16rpx
- Clear visual feedback on tap

### 6.2 Contrast Ratios
- Text on background: ≥4.5:1 (WCAG AA)
- Large text: ≥3:1
- Interactive elements: ≥3:1

### 6.3 Text Legibility
- Minimum font size: 24rpx
- Line height: ≥1.5 for body text
- Adequate spacing between lines

### 6.4 Focus States
- Visible focus indicators
- Logical tab order
- Skip navigation options

## 7. Error States

### 7.1 No Questions Available
```
┌─────────────────────────────────┐
│         😕                      │
│  No questions available         │
│  for this stack yet.            │
│                                 │
│  [Go Back]                      │
└─────────────────────────────────┘
```

### 7.2 Loading Error
```
┌─────────────────────────────────┐
│         ⚠️                      │
│  Failed to load questions       │
│                                 │
│  [Retry]  [Go Back]             │
└─────────────────────────────────┘
```

## 8. Design Assets

### 8.1 Icons
- Use emoji for tech stack icons (consistent, no assets needed)
- System icons for UI elements (arrow, check, etc.)
- Icon size: 48rpx (large), 32rpx (medium), 24rpx (small)

### 8.2 Illustrations
- Success: 🎉 (celebration)
- Error: ⚠️ (warning)
- Empty state: 😕 (confused)
- Loading: Spinner animation

## 9. Design Checklist

**Before Development:**
- [ ] Color palette defined and documented
- [ ] Typography scale established
- [ ] Spacing system created
- [ ] Component specifications complete
- [ ] Interaction patterns defined
- [ ] Animation timings set

**During Development:**
- [ ] Colors match specification
- [ ] Fonts and sizes correct
- [ ] Spacing consistent
- [ ] Touch targets adequate size
- [ ] Animations smooth (60fps)
- [ ] Responsive on all screen sizes

**Before Launch:**
- [ ] Accessibility audit passed
- [ ] Contrast ratios verified
- [ ] Touch targets tested
- [ ] Animations perform well
- [ ] Error states handled
- [ ] Loading states implemented
