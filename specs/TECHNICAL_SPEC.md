# Technical Specification
# Interview Questions and Answers Mini-Program

## 1. Technology Stack

### 1.1 Framework
- **Platform:** WeChat Mini-Program
- **Language:** TypeScript
- **UI Framework:** WXML, WXSS (WeChat Markup Language & Styling)

### 1.2 Development Tools
- WeChat DevTools
- Node.js (for build tools if needed)
- Version Control: Git

## 2. Architecture Overview

### 2.1 Application Structure
```
qaApp/
├── pages/
│   ├── stack-selection/     # Page 1: Technology stack selection
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   ├── index.js
│   │   └── index.json
│   └── questions/           # Page 2: Question display
│       ├── index.wxml
│       ├── index.wxss
│       ├── index.js
│       └── index.json
├── data/
│   ├── javascript.js        # JavaScript questions
│   ├── react.js             # React questions
│   ├── typescript.js        # TypeScript questions
│   ├── html.js              # HTML questions
│   └── css.js               # CSS questions
├── utils/
│   ├── questionManager.js   # Question selection logic
│   └── constants.js         # App constants
├── components/              # Reusable components (if needed)
├── app.js                   # App entry point
├── app.json                 # App configuration
├── app.wxss                 # Global styles
└── project.config.json      # Project configuration
```

### 2.2 Page Flow
```
[Stack Selection Page] 
        ↓ (user selects stack)
[Questions Page]
        ↓ (show question → show answer → next)
        ↓ (repeat 10 times)
[Session Complete] → [Return to Stack Selection]
```

## 3. Component Specifications

### 3.1 Stack Selection Page

**File:** `pages/stack-selection/index.js`

**Data:**
```javascript
{
  stacks: [
    { id: 'javascript', name: 'JavaScript', icon: '...' },
    { id: 'react', name: 'React', icon: '...' },
    { id: 'typescript', name: 'TypeScript', icon: '...' },
    { id: 'html', name: 'HTML', icon: '...' },
    { id: 'css', name: 'CSS', icon: '...' }
  ]
}
```

**Methods:**
- `onStackSelect(stackId)`: Navigate to questions page with selected stack

**Navigation:**
```javascript
wx.navigateTo({
  url: `/pages/questions/index?stack=${stackId}`
})
```

### 3.2 Questions Page

**File:** `pages/questions/index.js`

**Data:**
```javascript
{
  currentStack: '',           // Selected technology stack
  currentQuestion: null,      // Current question object
  showAnswer: false,          // Answer visibility state
  currentIndex: 0,            // Current question number (0-9)
  totalQuestions: 10,         // Total questions per session
  askedQuestionIds: [],       // Track asked questions to avoid repeats
  allQuestions: []            // All questions for selected stack
}

// Computed:
// questionIndexDisplay: "Question #X" or "#X of 10" (derived from currentIndex + 1)
```

**Methods:**
- `onLoad(options)`: Load questions for selected stack
- `loadQuestions(stackId)`: Import and initialize question data
- `getRandomQuestion()`: Select random question avoiding duplicates
- `onShowAnswer()`: Toggle answer visibility
- `onNext()`: Load next question, reset answer visibility
- `onSessionComplete()`: Handle session completion

**Lifecycle:**
```javascript
onLoad → loadQuestions → getRandomQuestion → 
  [User interaction loop: showAnswer → next] × 10 → 
  onSessionComplete
```

### 3.3 Question Manager Utility

**File:** `utils/questionManager.js`

**Functions:**
```javascript
/**
 * Get random question avoiding duplicates
 * @param {Array} questions - All available questions
 * @param {Array} askedIds - Already asked question IDs
 * @returns {Object|null} Random question or null if exhausted
 */
function getRandomQuestion(questions, askedIds)

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array)

/**
 * Load questions for specific stack
 * @param {string} stackId - Technology stack identifier
 * @returns {Array} Questions array
 */
function loadQuestionsByStack(stackId)
```

## 4. Data Structure Specification

### 4.1 Question Object Schema
```javascript
{
  id: String,              // Unique identifier (e.g., "js-001")
  question: String,        // Question text
  answer: String,          // Answer text (supports markdown/rich text)
  category: String,        // Category (e.g., "Closures", "Hooks", "Types")
  difficulty: String,      // Difficulty level: "easy", "medium", "hard"
  stack: String           // Technology stack: "javascript", "react", etc.
}
```

### 4.2 Question Data File Format

**File:** `data/javascript.js`
```javascript
module.exports = [
  {
    id: 'js-001',
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned...',
    category: 'Closures',
    difficulty: 'medium',
    stack: 'javascript'
  },
  // ... more questions
]
```

## 5. UI/UX Specifications

### 5.1 Stack Selection Page Layout
```
┌─────────────────────────┐
│   Interview Q&A         │
│   Select Tech Stack     │
│                         │
│  ┌─────────────────┐   │
│  │   JavaScript    │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │     React       │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │   TypeScript    │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │      HTML       │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │      CSS        │   │
│  └─────────────────┘   │
└─────────────────────────┘
```

### 5.2 Questions Page Layout
```
┌─────────────────────────┐
│  JavaScript  [3/10]     │ ← Header with stack & progress
├─────────────────────────┤
│                         │
│  Q: What is a closure?  │ ← Question
│                         │
│  [Answer shown here     │ ← Answer (conditional)
│   when button clicked]  │
│                         │
│                         │
├─────────────────────────┤
│ [Show Answer]  [Next]   │ ← Action buttons
└─────────────────────────┘
```

### 5.3 Styling Guidelines
- **Colors:**
  - Primary: #07C160 (WeChat green)
  - Background: #F7F7F7
  - Text: #333333
  - Secondary text: #999999
  - Answer background: #E8F5E9

- **Typography:**
  - Title: 32rpx, bold
  - Question: 28rpx, regular
  - Answer: 26rpx, regular
  - Button text: 28rpx, medium

- **Spacing:**
  - Page padding: 32rpx
  - Element margin: 24rpx
  - Button height: 88rpx

## 6. State Management

### 6.1 Session State
- Stored in page data (no global state needed for v1.0)
- Session resets when returning to stack selection
- No persistence between app sessions

### 6.2 Question Selection Algorithm
```javascript
// Pseudo-code
function selectNextQuestion() {
  const availableQuestions = allQuestions.filter(
    q => !askedQuestionIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) {
    // All questions exhausted, allow repeats or end session
    return handleExhaustedQuestions();
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const selectedQuestion = availableQuestions[randomIndex];
  
  askedQuestionIds.push(selectedQuestion.id);
  return selectedQuestion;
}
```

## 7. Error Handling

### 7.1 Error Scenarios
- No questions available for selected stack
- Failed to load question data
- Network errors (if future API integration)

### 7.2 Error Handling Strategy
```javascript
try {
  const questions = loadQuestionsByStack(stackId);
  if (!questions || questions.length === 0) {
    wx.showToast({
      title: 'No questions available',
      icon: 'none'
    });
    // Navigate back or show error state
  }
} catch (error) {
  console.error('Error loading questions:', error);
  wx.showToast({
    title: 'Failed to load questions',
    icon: 'none'
  });
}
```

## 8. Performance Considerations

### 8.1 Optimization Strategies
- Lazy load question data only when stack is selected
- Use `setData` efficiently (update only changed fields)
- Avoid deep object nesting in page data
- Pre-shuffle questions on page load to avoid repeated calculations

### 8.2 Memory Management
- Clear question data when leaving questions page
- Limit session to 10 questions to prevent memory bloat
- Use `onUnload` lifecycle to cleanup

## 9. Testing Strategy

### 9.1 Unit Testing
- Question selection algorithm (no duplicates)
- Random selection distribution
- Data validation

### 9.2 Integration Testing
- Page navigation flow
- Data loading and display
- Button interactions
- Progress tracking

### 9.3 Manual Testing Checklist
- [ ] All 5 stacks are selectable
- [ ] Questions display correctly
- [ ] Answer toggle works
- [ ] Next button advances question
- [ ] Progress indicator updates
- [ ] No duplicate questions in session
- [ ] Session completes after 10 questions
- [ ] UI responsive on different screen sizes

## 10. Security Considerations

### 10.1 Data Security
- All data stored locally in app bundle
- No sensitive user data collected
- No external API calls (v1.0)

### 10.2 WeChat Mini-Program Compliance
- Follow WeChat content guidelines
- Ensure appropriate content rating
- No prohibited content in questions/answers

## 11. Deployment

### 11.1 Build Process
1. Test in WeChat DevTools
2. Build production version
3. Submit for WeChat review
4. Publish after approval

### 11.2 Version Control
- Use semantic versioning (v1.0.0)
- Tag releases in Git
- Maintain changelog

## 12. Future Technical Considerations

### 12.1 Scalability
- Database integration for larger question sets
- Cloud functions for dynamic content
- User data storage (WeChat Cloud Development)

### 12.2 Analytics
- Track question completion rates
- Monitor user engagement
- A/B testing framework
