const constants = require('./constants');

/**
 * Validate a single question object
 * @param {Object} question - Question to validate
 * @returns {Object} Validation result
 */
function validateQuestion(question) {
  const errors = [];
  
  // Validate ID
  if (!question.id || !constants.VALIDATION_RULES.ID_PATTERN.test(question.id)) {
    errors.push('Invalid ID format. Expected: {stack}-{number}');
  }
  
  // Validate question text
  if (!question.question || question.question.trim().length === 0) {
    errors.push('Question text is required');
  }
  if (question.question && question.question.length > constants.VALIDATION_RULES.MAX_QUESTION_LENGTH) {
    errors.push(`Question text exceeds ${constants.VALIDATION_RULES.MAX_QUESTION_LENGTH} characters`);
  }
  
  // Validate answer text
  if (!question.answer || question.answer.trim().length === 0) {
    errors.push('Answer text is required');
  }
  if (question.answer && question.answer.length > constants.VALIDATION_RULES.MAX_ANSWER_LENGTH) {
    errors.push(`Answer text exceeds ${constants.VALIDATION_RULES.MAX_ANSWER_LENGTH} characters`);
  }
  
  // Validate category
  if (!question.category || question.category.trim().length === 0) {
    errors.push('Category is required');
  }
  if (question.category && question.category.length > constants.VALIDATION_RULES.MAX_CATEGORY_LENGTH) {
    errors.push(`Category exceeds ${constants.VALIDATION_RULES.MAX_CATEGORY_LENGTH} characters`);
  }
  
  // Validate difficulty
  if (!constants.DIFFICULTY_LEVELS.includes(question.difficulty)) {
    errors.push(`Difficulty must be one of: ${constants.DIFFICULTY_LEVELS.join(', ')}`);
  }
  
  // Validate stack
  if (!constants.STACK_IDS.includes(question.stack)) {
    errors.push(`Stack must be one of: ${constants.STACK_IDS.join(', ')}`);
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
  let validCount = 0;
  
  if (!Array.isArray(questions)) {
    return {
      valid: false,
      errors: ['Questions must be an array'],
      questionCount: 0
    };
  }
  
  questions.forEach((question, index) => {
    const validation = validateQuestion(question);
    if (!validation.valid) {
      errors.push(`Question ${index}: ${validation.errors.join(', ')}`);
    } else {
      validCount++;
    }
    
    if (ids.has(question.id)) {
      errors.push(`Duplicate ID found: ${question.id}`);
    }
    ids.add(question.id);
    
    if (question.stack && question.stack !== expectedStack) {
      errors.push(`Question ${question.id}: stack mismatch (expected ${expectedStack}, got ${question.stack})`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    questionCount: questions.length,
    validCount
  };
}

/**
 * Get difficulty distribution statistics
 * @param {Array} questions - Questions array
 * @returns {Object} Distribution statistics
 */
function getDifficultyDistribution(questions) {
  const distribution = {
    easy: 0,
    medium: 0,
    hard: 0
  };
  
  questions.forEach(q => {
    if (distribution.hasOwnProperty(q.difficulty)) {
      distribution[q.difficulty]++;
    }
  });
  
  const total = questions.length;
  return {
    easy: { count: distribution.easy, percentage: ((distribution.easy / total) * 100).toFixed(2) },
    medium: { count: distribution.medium, percentage: ((distribution.medium / total) * 100).toFixed(2) },
    hard: { count: distribution.hard, percentage: ((distribution.hard / total) * 100).toFixed(2) },
    total
  };
}

/**
 * Get category distribution statistics
 * @param {Array} questions - Questions array
 * @returns {Object} Distribution statistics
 */
function getCategoryDistribution(questions) {
  const distribution = {};
  
  questions.forEach(q => {
    if (!distribution[q.category]) {
      distribution[q.category] = 0;
    }
    distribution[q.category]++;
  });
  
  return distribution;
}

module.exports = {
  validateQuestion,
  validateQuestionFile,
  getDifficultyDistribution,
  getCategoryDistribution
};
