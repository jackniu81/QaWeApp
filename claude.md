# Interview Questions and Answers - WeChat Mini-Program

## Project Overview

A WeChat Mini-Program built with Taro framework (React + TypeScript) designed to help developers prepare for technical interviews by providing curated interview questions and answers across multiple technology stacks.

**App Name:** Interview Questions and Answers  
**Platform:** WeChat Mini-Program / H5 (via Taro)  
**Framework:** Taro 4.2.0 (React + TypeScript)  
**Version:** 1.0.0  
**Status:** Implementation Phase

## Quick Start

### Prerequisites
- WeChat DevTools installed
- WeChat developer account
- Node.js (optional, for build tools)

### Project Structure
```
qaApp/
├── src/
│   ├── pages/
│   │   ├── stack-selection/     # Technology stack selection page (TSX + SCSS)
│   │   └── questions/           # Question display and interaction page (TSX + SCSS)
│   ├── data/
│   │   ├── javascript.json      # JavaScript questions (100 questions)
│   │   ├── react.json          # React questions (100 questions)
│   │   ├── typescript.json     # TypeScript questions (100 questions)
│   │   ├── html.json           # HTML questions (100 questions)
│   │   └── css.json            # CSS questions (100 questions)
│   ├── utils/
│   │   ├── questionManager.ts  # Question selection and management logic (TypeScript)
│   │   ├── constants.ts        # Application constants (TypeScript)
│   │   └── validator.js        # Data validation utilities
│   ├── types/
│   │   └── dataStructure.ts    # TypeScript type definitions
│   ├── app.config.ts          # Taro app configuration
│   └── app.ts                  # Application entry point
├── config/
│   └── index.ts               # Taro build configuration
├── specs/
│   ├── features/              # Feature specifications (with phase prefixes)
│   │   ├── 02_feature_data_layer.md
│   │   ├── 03_feature_stack_selection.md
│   │   ├── 04_feature_questions_core.md
│   │   ├── 05_feature_questions_ui_polish.md
│   │   ├── 06_feature_session_completion.md
│   │   └── 07_feature_questions_ui_enhancement.md
│   ├── DEVELOPMENT_PLAN.md    # Development Plan and Timeline
│   └── DATA_STRUCTURE.md      # Data Structure Specification
├── dist/                      # Build output directory
├── package.json               # Node dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Core Features

### 1. Technology Stack Selection (Page 1)
- Select from 5 technology stacks: JavaScript, React, TypeScript, HTML, CSS
- Clean, intuitive UI with clear visual hierarchy
- One-tap selection navigates to questions page

### 2. Interactive Question Display (Page 2)
- **Question Display:** One question at a time for focused learning
- **Progress Indicator:** Inline with question text in parentheses format "(X/Y)"
- **Header:** Gradient background with SVG back icon for navigation to stack selection
- **Answer Reveal:** Click question text to toggle answer visibility (collapsible pattern)
- **Expand/Collapse Labels:** "show answer" when collapsed, "hide answer" when expanded
- **Navigation:** "Next" button in fixed footer advances to next random question
- **No User Input:** Just display answers for learning, no typing or validation required
- **Progress Tracking:** Visual indicator showing X/10 questions
- **No Duplicates:** Questions selected randomly without repeats in session
- **Session Length:** 10 questions per session
- **Fixed Footer:** Always visible at bottom with single button (Next/Restart Session)

### 3. Question Management
- Questions stored in separate files per technology stack
- Each question includes:
  - Question text
  - Answer text
  - Category (e.g., "Closures", "Hooks", "Types")
  - Difficulty level (easy, medium, hard)
- Random selection algorithm prevents duplicates within session

## Data Structure

### Question Object Schema
```javascript
{
  id: string,              // Unique ID (e.g., "js-001")
  question: string,        // Question text
  answer: string,          // Answer text
  category: string,        // Category/topic
  difficulty: string,      // "easy", "medium", or "hard"
  stack: string           // "javascript", "react", "typescript", "html", "css"
}
```

### Example Question
```javascript
{
  id: 'js-001',
  question: 'What is the difference between let, const, and var?',
  answer: 'var is function-scoped and can be redeclared. let is block-scoped and cannot be redeclared. const is block-scoped, cannot be redeclared, and cannot be reassigned.',
  category: 'Variables',
  difficulty: 'easy',
  stack: 'javascript'
}
```

## Development Workflow

### Phase 1: Setup (Days 1-2)
1. Install WeChat DevTools
2. Create project structure
3. Initialize version control
4. Configure app.json

### Phase 2: Data Layer (Days 3-4)
1. Create question data files for all 5 stacks
2. Add minimum 20 questions per stack
3. Implement question manager utility
4. Build random selection logic

### Phase 3: Stack Selection Page (Days 5-6)
1. Build UI with 5 stack options
2. Implement selection and navigation
3. Apply styling and animations

### Phase 4: Questions Page (Days 7-9)
1. Build question display UI
2. Implement show/hide answer
3. Add next button functionality
4. Implement progress tracking
5. Add duplicate prevention

### Phase 5: Questions Page UI Polish (Days 10-11)
1. Apply color palette and typography
2. Style question card and answer section
3. Add difficulty badges and category tags
4. Implement answer reveal animation
5. Test responsive layout

### Phase 6: Session Completion & Error Handling (Day 12)
1. Show completion modal/toast
2. Handle edge cases (exhausted questions, errors)
3. Add loading indicators
4. Implement navigation back to stack selection

### Phase 7: Questions Page UI Enhancement (Post-Phase 6)
1. **Header Enhancement:**
   - Add gradient background (135deg, #0f172a to #1d4ed8)
   - Add SVG back icon for navigation
   - Center stack name with bold typography
2. **Content Simplification:**
   - Move progress indicator inline with question text: "(X/Y) question text"
   - Implement collapsible answer pattern (click to toggle)
   - Add expand/collapse text labels ("show answer" / "hide answer")
   - Style labels with blue color (#1d4ed8)
3. **Footer Optimization:**
   - Fix footer at bottom of screen
   - Remove "Show Answer" and "Back to stacks" buttons
   - Keep only "Next/Restart Session" button
   - Style for mobile (72rpx height, 26rpx font)

### Phase 8: Deployment (Days 15-16)
1. Documentation
2. Build production version
3. Submit to WeChat for review

## Technical Stack

- **Framework:** Taro 4.2.0 (React + TypeScript)
- **Build Tool:** Vite 4.5.14
- **Languages:** TypeScript, React (JSX), SCSS
- **Platforms:** WeChat Mini-Program, H5 (web browser)
- **State Management:** React hooks (useState, useEffect, useRouter)
- **Data Storage:** Local JSON files (no backend in v1.0)
- **Navigation:** Taro.navigateTo, Taro.redirectTo

## Key Design Decisions

### Why No Back Button?
- Encourages forward progress through questions
- Prevents users from second-guessing answers
- Simpler navigation flow
- Mimics real interview conditions

### Why 10 Questions Per Session?
- Optimal length for focused learning
- Prevents fatigue
- Encourages multiple sessions
- Easy to track progress

### Why Random Selection?
- Varied practice experience
- Prevents memorization of order
- Better learning retention
- More realistic interview preparation

## UI/UX Highlights

### Color Palette
- **Primary:** #07C160 (WeChat green)
- **Background:** #F7F7F7
- **Text:** #333333
- **Answer Highlight:** #E8F5E9 (light green)

### Typography
- **Questions:** 30rpx, line-height 1.6
- **Answers:** 28rpx, line-height 1.6
- **Buttons:** 28rpx, medium weight

### Animations
- Answer reveal: Slide down + fade in (300ms)
- Question transition: Fade out/in (200ms)
- Button press: Scale(0.98)

## Testing Checklist

**Functional:**
- [ ] All 5 stacks selectable
- [ ] Questions display correctly
- [ ] Answer toggle works
- [ ] Next button advances questions
- [ ] No duplicate questions in session
- [ ] Progress indicator updates correctly
- [ ] Session completes after 10 questions

**UI/UX:**
- [ ] Styling matches specification
- [ ] Animations smooth (60fps)
- [ ] Responsive on different screen sizes
- [ ] Touch targets adequate size (88rpx minimum)
- [ ] Contrast ratios meet accessibility standards

**Edge Cases:**
- [ ] Handles fewer than 10 available questions
- [ ] Handles rapid button clicks
- [ ] Handles app backgrounding
- [ ] Shows appropriate error messages

## Future Enhancements (v2.0+)

- **User Accounts:** Track progress across sessions
- **Difficulty Filtering:** Select easy/medium/hard questions
- **Category Filtering:** Focus on specific topics
- **Bookmarking:** Save favorite questions
- **Analytics:** Track performance and weak areas
- **More Stacks:** Add Node.js, Python, SQL, etc.
- **Timed Mode:** Practice under time pressure
- **Community Questions:** User-contributed content

## Resources

### Documentation
- `specs/PRD.md` - Product requirements and user stories
- `specs/TECHNICAL_SPEC.md` - Technical architecture and implementation details
- `specs/DATA_STRUCTURE.md` - Data models and validation rules
- `specs/UI_UX_SPEC.md` - Design system and component specifications
- `specs/DEVELOPMENT_PLAN.md` - Development timeline and milestones

### External Links
- [WeChat Mini-Program Documentation](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [WeChat DevTools Download](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## Contributing

### Adding New Questions
1. Open appropriate data file (e.g., `data/javascript.js`)
2. Add question object with unique ID
3. Include question, answer, category, difficulty, stack
4. Validate data structure
5. Test in app

### Question Quality Guidelines
- Questions should be clear and unambiguous
- Answers should be accurate and concise
- Focus on practical, real-world scenarios
- Avoid trick questions
- Proofread for grammar and spelling

## License

[To be determined]

## Contact

[To be determined]

---

**Last Updated:** 2026-04-20  
**Document Version:** 1.0.0
