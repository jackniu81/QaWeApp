# Feature Specification: Data Layer Implementation
# Interview Questions and Answers Mini-Program

## 1. Feature Overview

**Feature Name:** Data Layer Implementation  
**Phase:** Phase 2  
**Duration:** Days 3-4  
**Estimated Time:** 8-10 hours

**Purpose:** 
Create the data foundation for the interview Q&A mini-program, including question data files, management utilities, and validation functions to support random question selection with duplicate prevention.

## 2. Functional Requirements

### 2.1 Question Data Files

**FR-1: Data File Structure**
- Create 5 separate data files, one per technology stack:
  - `src/data/javascript.js`
  - `src/data/react.js`
  - `src/data/typescript.js`
  - `src/data/html.js`
  - `src/data/css.js`
- Each file exports an array of Question objects
- Files use CommonJS module format (`module.exports`)

**FR-2: Minimum Question Count**
- Each data file must contain minimum 20 questions
- Recommended: 50+ questions per stack for variety
- Total minimum: 100 questions across all stacks

**FR-3: Question Object Schema**
Each question must include:
- `id`: Unique identifier (format: `{stack}-{3-digit-number}`)
- `question`: Question text (max 500 characters)
- `answer`: Answer text (max 2000 characters)
- `category`: Category/topic (max 50 characters)
- `difficulty`: One of "easy", "medium", "hard"
- `stack`: Technology stack identifier

**FR-4: Difficulty Distribution**
- Easy questions: 40% of total (8-20 questions)
- Medium questions: 40% of total (8-20 questions)
- Hard questions: 20% of total (4-10 questions)

### 2.2 Question Manager Utility

**FR-5: Load Questions by Stack**
- Function: `loadQuestionsByStack(stackId)`
- Input: Stack identifier string
- Output: Array of Question objects
- Behavior: Import and return questions from corresponding data file
- Error handling: Return empty array if stack not found

**FR-6: Random Question Selection**
- Function: `getRandomQuestion(allQuestions, askedQuestionIds)`
- Input: All questions array, array of already asked question IDs
- Output: Single Question object or null
- Behavior: 
  - Filter out already asked questions
  - Select random question from remaining pool
  - Return null if no questions available

**FR-7: Duplicate Prevention**
- Track asked question IDs in session
- Never return the same question twice in a session
- Use array-based tracking for simplicity
- Reset tracking when session completes

**FR-8: Shuffle Array Utility**
- Function: `shuffleArray(array)`
- Input: Array to shuffle
- Output: Shuffled array
- Algorithm: Fisher-Yates shuffle
- Use for pre-shuffling questions if needed

### 2.3 Validation Functions

**FR-9: Question Validation**
- Function: `validateQuestion(question)`
- Input: Question object
- Output: Validation result object `{valid: boolean, errors: string[]}`
- Validate:
  - ID format (regex: `^[a-z]+-\d{3}$`)
  - Question text presence and length
  - Answer text presence and length
  - Category presence
  - Difficulty value (enum check)
  - Stack value (enum check)

**FR-10: Data File Validation**
- Function: `validateQuestionFile(questions, expectedStack)`
- Input: Questions array, expected stack identifier
- Output: Validation result object
- Validate:
  - All individual questions pass validation
  - No duplicate IDs within file
  - Stack field matches expected stack
  - Return question count

**FR-11: Constants File**
- File: `src/utils/constants.js`
- Define app constants:
  - `QUESTIONS_PER_SESSION = 10`
  - `STACK_IDS = ['javascript', 'react', 'typescript', 'html', 'css']`
  - `DIFFICULTY_LEVELS = ['easy', 'medium', 'hard']`
  - `VALIDATION_RULES` object

## 3. Technical Specifications

### 3.1 File Structure

```
src/
├── data/
│   ├── javascript.js
│   ├── react.js
│   ├── typescript.js
│   ├── html.js
│   └── css.js
└── utils/
    ├── questionManager.js
    └── constants.js
```

### 3.2 Data File Template

```javascript
// src/data/javascript.js
module.exports = [
  {
    id: 'js-001',
    question: 'What is the difference between let, const, and var?',
    answer: 'var is function-scoped and can be redeclared. let is block-scoped and cannot be redeclared. const is block-scoped, cannot be redeclared, and cannot be reassigned.',
    category: 'Variables',
    difficulty: 'easy',
    stack: 'javascript'
  },
  // ... more questions
];
```

### 3.3 Question Manager Implementation

```javascript
// src/utils/questionManager.js
const constants = require('./constants');

/**
 * Load questions for a specific technology stack
 * @param {string} stackId - Technology stack identifier
 * @returns {Array} Array of Question objects
 */
function loadQuestionsByStack(stackId) {
  const questionMap = {
    'javascript': require('../data/javascript.js'),
    'react': require('../data/react.js'),
    'typescript': require('../data/typescript.js'),
    'html': require('../data/html.js'),
    'css': require('../data/css.js')
  };
  
  return questionMap[stackId] || [];
}

/**
 * Get random question avoiding duplicates
 * @param {Array} allQuestions - All available questions
 * @param {Array} askedIds - Already asked question IDs
 * @returns {Object|null} Random question or null if exhausted
 */
function getRandomQuestion(allQuestions, askedIds) {
  const availableQuestions = allQuestions.filter(
    q => !askedIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

module.exports = {
  loadQuestionsByStack,
  getRandomQuestion,
  shuffleArray
};
```

### 3.4 Validation Implementation

```javascript
// src/utils/validator.js

/**
 * Validate a single question object
 * @param {Object} question - Question to validate
 * @returns {Object} Validation result
 */
function validateQuestion(question) {
  const errors = [];
  
  // Validate ID
  if (!question.id || !/^[a-z]+-\d{3}$/.test(question.id)) {
    errors.push('Invalid ID format. Expected: {stack}-{number}');
  }
  
  // Validate question text
  if (!question.question || question.question.trim().length === 0) {
    errors.push('Question text is required');
  }
  if (question.question && question.question.length > 500) {
    errors.push('Question text exceeds 500 characters');
  }
  
  // Validate answer text
  if (!question.answer || question.answer.trim().length === 0) {
    errors.push('Answer text is required');
  }
  if (question.answer && question.answer.length > 2000) {
    errors.push('Answer text exceeds 2000 characters');
  }
  
  // Validate category
  if (!question.category || question.category.trim().length === 0) {
    errors.push('Category is required');
  }
  
  // Validate difficulty
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (!validDifficulties.includes(question.difficulty)) {
    errors.push('Difficulty must be: easy, medium, or hard');
  }
  
  // Validate stack
  const validStacks = ['javascript', 'react', 'typescript', 'html', 'css'];
  if (!validStacks.includes(question.stack)) {
    errors.push('Invalid stack value');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate entire question data file
 * @param {Array} questions - Questions array
 * @param {string} expectedStack - Expected stack identifier
 * @returns {Object} Validation result
 */
function validateQuestionFile(questions, expectedStack) {
  const errors = [];
  const ids = new Set();
  
  questions.forEach((question, index) => {
    const validation = validateQuestion(question);
    if (!validation.valid) {
      errors.push(`Question ${index}: ${validation.errors.join(', ')}`);
    }
    
    if (ids.has(question.id)) {
      errors.push(`Duplicate ID found: ${question.id}`);
    }
    ids.add(question.id);
    
    if (question.stack !== expectedStack) {
      errors.push(`Question ${question.id}: stack mismatch (expected ${expectedStack})`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    questionCount: questions.length
  };
}

module.exports = {
  validateQuestion,
  validateQuestionFile
};
```

### 3.5 Constants Implementation

```javascript
// src/utils/constants.js
module.exports = {
  QUESTIONS_PER_SESSION: 10,
  STACK_IDS: ['javascript', 'react', 'typescript', 'html', 'css'],
  DIFFICULTY_LEVELS: ['easy', 'medium', 'hard'],
  
  VALIDATION_RULES: {
    ID_PATTERN: /^[a-z]+-\d{3}$/,
    MAX_QUESTION_LENGTH: 500,
    MAX_ANSWER_LENGTH: 2000,
    MAX_CATEGORY_LENGTH: 50
  },
  
  STACK_NAMES: {
    javascript: 'JavaScript',
    react: 'React',
    typescript: 'TypeScript',
    html: 'HTML',
    css: 'CSS'
  }
};
```

## 4. Data Content Guidelines

### 4.1 JavaScript Categories
- Variables & Scope
- Functions & Closures
- Objects & Prototypes
- Async Programming
- ES6+ Features
- Error Handling
- Array Methods
- DOM Manipulation

### 4.2 React Categories
- Components & Props
- State & Lifecycle
- Hooks
- Context API
- Performance Optimization
- Routing
- Forms & Events
- Testing

### 4.3 TypeScript Categories
- Types & Interfaces
- Generics
- Type Guards
- Utility Types
- Decorators
- Modules
- Configuration
- Advanced Types

### 4.4 HTML Categories
- Semantic HTML
- Forms & Input
- Accessibility
- Meta Tags & SEO
- HTML5 APIs
- Media Elements
- Tables & Lists
- Best Practices

### 4.5 CSS Categories
- Selectors
- Box Model
- Flexbox
- Grid
- Positioning
- Animations
- Responsive Design
- Preprocessors

## 5. Acceptance Criteria

### 5.1 Data Files
- [ ] All 5 data files created in correct location
- [ ] Each file exports array of questions
- [ ] Minimum 20 questions per file
- [ ] All questions have required fields
- [ ] Difficulty distribution follows guidelines
- [ ] Categories are meaningful and consistent
- [ ] Questions are clear and unambiguous
- [ ] Answers are accurate and helpful

### 5.2 Question Manager
- [ ] `loadQuestionsByStack` loads correct data
- [ ] `getRandomQuestion` returns random questions
- [ ] `getRandomQuestion` avoids duplicates
- [ ] `getRandomQuestion` returns null when exhausted
- [ ] `shuffleArray` properly shuffles arrays
- [ ] Functions handle edge cases gracefully

### 5.3 Validation
- [ ] `validateQuestion` catches all validation errors
- [ ] `validateQuestionFile` detects duplicates
- [ ] `validateQuestionFile` checks stack mismatch
- [ ] Validation errors are descriptive
- [ ] Invalid data is rejected

### 5.4 Constants
- [ ] All constants defined in constants.js
- [ ] Constants are used throughout codebase
- [ ] No magic numbers in code
- [ ] Constants are well-documented

## 6. Testing Strategy

### 6.1 Unit Tests
Test each function independently:
- `loadQuestionsByStack(stackId)` - Test with valid/invalid stack IDs
- `getRandomQuestion(questions, askedIds)` - Test random selection, duplicate prevention, exhaustion
- `shuffleArray(array)` - Verify randomness, no data loss
- `validateQuestion(question)` - Test valid/invalid questions, edge cases
- `validateQuestionFile(questions, stack)` - Test file validation, duplicate detection

### 6.2 Integration Tests
Test data loading and selection flow:
- Load questions → Select random → Track asked → Prevent duplicates
- Validate entire data files
- Test with real question data

### 6.3 Manual Testing Checklist
- [ ] All data files load without errors
- [ ] Questions display correctly
- [ ] Random selection works across multiple sessions
- [ ] No duplicates in single session
- [ ] Validation catches intentional errors
- [ ] Edge cases handled (empty arrays, invalid IDs)

## 7. Implementation Tasks

### Task 1: Create Data Files (4-5 hours)
- [ ] Create `src/data/` directory
- [ ] Create `javascript.js` with 20+ questions
- [ ] Create `react.js` with 20+ questions
- [ ] Create `typescript.js` with 20+ questions
- [ ] Create `html.js` with 20+ questions
- [ ] Create `css.js` with 20+ questions
- [ ] Validate all questions
- [ ] Ensure difficulty distribution

### Task 2: Implement Question Manager (2-3 hours)
- [ ] Create `src/utils/` directory
- [ ] Create `questionManager.js`
- [ ] Implement `loadQuestionsByStack`
- [ ] Implement `getRandomQuestion`
- [ ] Implement `shuffleArray`
- [ ] Export functions
- [ ] Test with sample data

### Task 3: Implement Validation (1-2 hours)
- [ ] Create `validator.js`
- [ ] Implement `validateQuestion`
- [ ] Implement `validateQuestionFile`
- [ ] Test validation with valid/invalid data
- [ ] Add error messages

### Task 4: Create Constants (30 minutes)
- [ ] Create `constants.js`
- [ ] Define all constants
- [ ] Document each constant
- [ ] Update code to use constants

## 8. Dependencies

### 8.1 External Dependencies
None - pure JavaScript implementation

### 8.2 Internal Dependencies
- Question data files
- Constants file
- Validator utility

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Insufficient questions | High | Start with 20 per stack, add more later |
| Poor question quality | High | Review questions for accuracy and clarity |
| Validation too strict | Medium | Adjust validation rules based on real data |
| Performance issues | Low | Data is small, no optimization needed |

## 10. Success Metrics

- All 5 data files created with minimum 20 questions each
- Question manager functions work correctly
- Validation catches all data errors
- Random selection produces varied results
- No duplicates in sessions
- Code is well-documented and maintainable

## 11. Deliverables

1. **Data Files**
   - `src/data/javascript.js`
   - `src/data/react.js`
   - `src/data/typescript.js`
   - `src/data/html.js`
   - `src/data/css.js`

2. **Utilities**
   - `src/utils/questionManager.js`
   - `src/utils/validator.js`
   - `src/utils/constants.js`

3. **Documentation**
   - Code comments
   - Data structure documentation
   - Usage examples

## 12. Next Steps

After completing Phase 2:
- Proceed to Phase 3: Stack Selection Page
- Use data layer to build UI components
- Test data integration with UI

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-20  
**Status:** Ready for Implementation
