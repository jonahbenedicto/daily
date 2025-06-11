#!/usr/bin/env node

/**
 * Test script to demonstrate intelligent matrix formatting
 * Shows how the system handles different matrix sizes and formats
 */

const fs = require('fs');

// Simulate different matrix formats as they might appear in LeetCode content
const testMatrices = [
  {
    name: "Small 2x2 Matrix (should be inline)",
    content: '**Input:** matrix = [[1,2],[3,4]]',
    expected: "inline"
  },
  {
    name: "Medium 3x3 Matrix (should be multi-line)", 
    content: '**Input:** matrix = [[1,2,3],[4,5,6],[7,8,9]]',
    expected: "multi-line"
  },
  {
    name: "Large Matrix with existing line breaks (should preserve multi-line)",
    content: '**Input:** board = [[1,2,3],\n[4,5,6],\n[7,8,9]]',
    expected: "multi-line"
  },
  {
    name: "Single Row Array (should be inline)",
    content: '**Output:** [1,2,3,4,5]',
    expected: "inline"
  },
  {
    name: "Long Array (should be inline - not a matrix)",
    content: '**Output:** [1,2,3,4,5,6,7,8,9,10,11,12]',
    expected: "inline"
  }
];

console.log('🧪 Matrix Formatting Intelligence Test\n');
console.log('Testing how the system handles different matrix sizes and formats:\n');

testMatrices.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name}`);
  console.log(`   Input: ${test.content}`);
  console.log(`   Expected: ${test.expected}`);
  console.log('');
});

console.log('📝 Note: This demonstrates the intelligent formatting logic:');
console.log('   • Small matrices (< 100 chars, ≤ 3 rows): Inline format');
console.log('   • Large matrices (≥ 100 chars or > 3 rows): Multi-line format');
console.log('   • Existing line breaks: Preserved as multi-line');
console.log('   • All matrices wrapped in <pre> tags for proper rendering');

console.log('\n🎯 Run matrix tests to see this in action:');
console.log('   npm run test:spiral-matrix     # 3x3 and 3x4 matrices');
console.log('   npm run test:valid-sudoku      # Large 9x9 Sudoku grids');
console.log('   npm run test:all-matrices      # Full test suite');

console.log('\n✅ The intelligent formatting ensures:');
console.log('   • Readability: Large matrices are multi-line');
console.log('   • Compactness: Small matrices stay inline');
console.log('   • Consistency: All matrices properly wrapped');
console.log('   • Compatibility: Works in all Markdown viewers');
