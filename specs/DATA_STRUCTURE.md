# Data Structure Specification
# Interview Questions and Answers Mini-Program

## 1. Overview

This document defines the data structures used throughout the Interview Q&A Mini-Program, including question schemas, data file formats, and runtime data models.

## 2. Core Data Models

### 2.1 Question Object

**Description:** Represents a single interview question with its answer and metadata.

**Schema:**
```typescript
interface Question {
  id: string;              // Unique identifier (format: "{stack}-{number}")
  question: string;        // Question text (plain text or markdown)
  answer: string;          // Answer text (plain text or markdown)
  category: string;        // Question category/topic
  difficulty: 'easy' | 'medium' | 'hard';  // Difficulty level
  stack: 'javascript' | 'react' | 'typescript' | 'html' | 'css';  // Tech stack
}
```

**Example:**
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

**Validation Rules:**
- `id`: Required, unique, format: `{stack}-{3-digit-number}` (e.g., "js-001")
- `question`: Required, non-empty string, max 500 characters
- `answer`: Required, non-empty string, max 2000 characters
- `category`: Required, non-empty string, max 50 characters
- `difficulty`: Required, must be one of: "easy", "medium", "hard"
- `stack`: Required, must match file's technology stack

### 2.2 Technology Stack Object

**Description:** Represents a technology stack option on the selection page.

**Schema:**
```typescript
interface TechStack {
  id: string;              // Unique identifier (lowercase)
  name: string;            // Display name
  icon: string;            // Icon path or emoji
  description?: string;    // Optional description
  questionCount?: number;  // Number of available questions
}
```

**Example:**
```javascript
{
  id: 'javascript',
  name: 'JavaScript',
  icon: '📜',
  description: 'Core JavaScript concepts',
  questionCount: 50
}
```

### 2.3 Session State

**Description:** Tracks the current question session state.

**Schema:**
```typescript
interface SessionState {
  currentStack: string;           // Selected technology stack ID
  currentQuestion: Question | null;  // Currently displayed question
  currentIndex: number;           // Current question number (0-based)
  totalQuestions: number;         // Total questions in session (default: 10)
  askedQuestionIds: string[];     // IDs of already asked questions
  allQuestions: Question[];       // All available questions for stack
  showAnswer: boolean;            // Whether answer is currently visible
  sessionComplete: boolean;       // Whether session is finished
}
```

**Example:**
```javascript
{
  currentStack: 'javascript',
  currentQuestion: { id: 'js-005', question: '...', ... },
  currentIndex: 4,
  totalQuestions: 10,
  askedQuestionIds: ['js-001', 'js-003', 'js-007', 'js-012', 'js-005'],
  allQuestions: [...],  // Array of all JavaScript questions
  showAnswer: true,
  sessionComplete: false
}
```

## 3. Data File Structure

### 3.1 Question Data Files

**Location:** `data/{stack}.js`

**Format:** CommonJS module exporting array of Question objects

**File Naming Convention:**
- `javascript.js` - JavaScript questions
- `react.js` - React questions
- `typescript.js` - TypeScript questions
- `html.js` - HTML questions
- `css.js` - CSS questions

**Template:**
```javascript
// data/javascript.js
module.exports = [
  {
    id: 'js-001',
    question: 'Question text here',
    answer: 'Answer text here',
    category: 'Category name',
    difficulty: 'easy',
    stack: 'javascript'
  },
  {
    id: 'js-002',
    question: 'Another question',
    answer: 'Another answer',
    category: 'Category name',
    difficulty: 'medium',
    stack: 'javascript'
  }
  // ... more questions
];
```

### 3.2 Minimum Question Requirements

Each technology stack should have:
- **Minimum:** 20 questions
- **Recommended:** 50+ questions
- **Distribution:**
  - Easy: 40% (8-20 questions)
  - Medium: 40% (8-20 questions)
  - Hard: 20% (4-10 questions)

## 4. Category Guidelines

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

## 5. Data Access Patterns

### 5.1 Loading Questions

```javascript
// utils/questionManager.js
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
```

### 5.2 Random Selection Algorithm

```javascript
function getRandomQuestion(allQuestions, askedQuestionIds) {
  // Filter out already asked questions
  const availableQuestions = allQuestions.filter(
    q => !askedQuestionIds.includes(q.id)
  );
  
  // If no questions available, return null
  if (availableQuestions.length === 0) {
    return null;
  }
  
  // Select random question
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}
```

### 5.3 Duplicate Prevention

```javascript
function selectNextQuestion(sessionState) {
  const { allQuestions, askedQuestionIds, totalQuestions } = sessionState;
  
  // Check if session is complete
  if (askedQuestionIds.length >= totalQuestions) {
    return { question: null, sessionComplete: true };
  }
  
  // Get random question
  const question = getRandomQuestion(allQuestions, askedQuestionIds);
  
  // Handle case where all questions exhausted before session complete
  if (!question && askedQuestionIds.length < totalQuestions) {
    // Reset asked questions and continue
    sessionState.askedQuestionIds = [];
    return selectNextQuestion(sessionState);
  }
  
  return { question, sessionComplete: false };
}
```

## 6. Data Validation

### 6.1 Question Validation Function

```javascript
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
```

### 6.2 Data File Validation

```javascript
function validateQuestionFile(questions, expectedStack) {
  const errors = [];
  const ids = new Set();
  
  questions.forEach((question, index) => {
    // Validate individual question
    const validation = validateQuestion(question);
    if (!validation.valid) {
      errors.push(`Question ${index}: ${validation.errors.join(', ')}`);
    }
    
    // Check for duplicate IDs
    if (ids.has(question.id)) {
      errors.push(`Duplicate ID found: ${question.id}`);
    }
    ids.add(question.id);
    
    // Check stack matches file
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
```

## 7. Sample Data

### 7.1 JavaScript Sample Questions

```javascript
module.exports = [
  {
    id: 'js-001',
    question: 'What is the difference between == and === in JavaScript?',
    answer: '== performs type coercion before comparison, while === compares both value and type without coercion. For example, 5 == "5" is true, but 5 === "5" is false.',
    category: 'Operators',
    difficulty: 'easy',
    stack: 'javascript'
  },
  {
    id: 'js-002',
    question: 'Explain closures in JavaScript.',
    answer: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures are created every time a function is created.',
    category: 'Functions & Closures',
    difficulty: 'medium',
    stack: 'javascript'
  },
  {
    id: 'js-003',
    question: 'What is the event loop in JavaScript?',
    answer: 'The event loop is a mechanism that handles asynchronous operations. It continuously checks the call stack and task queue, executing tasks from the queue when the stack is empty.',
    category: 'Async Programming',
    difficulty: 'hard',
    stack: 'javascript'
  }
];
```

## 8. Data Migration & Versioning

### 8.1 Version History

**v1.0.0** - Initial data structure
- Basic question schema with id, question, answer, category, difficulty, stack

### 8.2 Future Enhancements

Potential fields for future versions:
```typescript
interface QuestionV2 extends Question {
  tags?: string[];              // Additional tags for filtering
  relatedQuestions?: string[];  // IDs of related questions
  explanation?: string;         // Detailed explanation
  codeExample?: string;         // Code snippet
  references?: string[];        // External links
  lastUpdated?: Date;           // Last modification date
  author?: string;              // Question contributor
}
```

## 9. Data Maintenance Guidelines

### 9.1 Adding New Questions

1. Choose appropriate stack file
2. Generate unique ID (next sequential number)
3. Write clear, concise question
4. Provide accurate, helpful answer
5. Assign appropriate category
6. Set difficulty level
7. Validate using validation function
8. Test in app

### 9.2 Updating Questions

1. Locate question by ID
2. Update relevant fields
3. Increment version if tracking
4. Re-validate
5. Test changes

### 9.3 Quality Guidelines

- Questions should be clear and unambiguous
- Answers should be accurate and concise
- Avoid overly complex or trick questions
- Include practical, real-world scenarios
- Keep language professional and accessible
- Proofread for grammar and spelling
