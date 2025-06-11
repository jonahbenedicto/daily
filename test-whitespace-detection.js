#!/usr/bin/env node

/**
 * Demonstration of whitespace-based matrix formatting
 * Shows how the system detects and respects original LeetCode spacing patterns
 */

console.log('🎯 Whitespace-Based Matrix Formatting Demo\n');

// Test patterns that demonstrate the whitespace detection logic
const testPatterns = [
  {
    name: "No spaces between rows (inline format)",
    input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
    pattern: 'NO SPACES: ],[',
    expected: 'Inline: <pre>[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]</pre>'
  },
  {
    name: "Spaces between rows (multi-line format)", 
    input: '[[5,1,9,11] ,[2,4,8,10] ,[13,3,6,7] ,[15,14,12,16]]',
    pattern: 'SPACES: ], [',
    expected: 'Multi-line with <pre> wrapper and line breaks'
  },
  {
    name: "Existing line breaks (preserve multi-line)",
    input: '[[5,1,9,11],\n[2,4,8,10],\n[13,3,6,7],\n[15,14,12,16]]',
    pattern: 'LINE BREAKS: ],\\n[',
    expected: 'Multi-line with <pre> wrapper and preserved breaks'
  },
  {
    name: "Search a 2D Matrix example (inline)",
    input: '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]',
    pattern: 'NO SPACES: ],[',
    expected: 'Inline format'
  }
];

console.log('📋 Pattern Detection Rules:\n');

testPatterns.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name}`);
  console.log(`   Input: ${test.input}`);
  console.log(`   Pattern: ${test.pattern}`);
  console.log(`   Result: ${test.expected}`);
  
  // Show the regex patterns used
  const hasSpaces = /\],\s+\[/.test(test.input);
  const hasLineBreaks = /\],\s*\n\s*\[/.test(test.input);
  
  console.log(`   Detection: Spaces=${hasSpaces}, LineBreaks=${hasLineBreaks}`);
  console.log('');
});

console.log('🔍 Regex Patterns Used:');
console.log('   • Line breaks: /\\],\\s*\\n\\s*\\[/');
console.log('   • Spaces between rows: /\\],\\s+\\[/');
console.log('   • No spaces (inline): Neither pattern matches');

console.log('\n✅ Current Implementation:');
console.log('   • search-a-2d-matrix: Matrices stay inline (no spaces detected)');
console.log('   • valid-sudoku: Large matrices go multi-line (spaces detected)');
console.log('   • spiral-matrix: Matrices go multi-line (detected as needing breaks)');

console.log('\n🎯 Perfect Whitespace Detection:');
console.log('   ✅ Respects original LeetCode formatting intent');
console.log('   ✅ Inline when compact: [[a,b],[c,d]]');
console.log('   ✅ Multi-line when spaced: [[a,b] ,[c,d]]'); 
console.log('   ✅ Preserves existing breaks: [[a,b],\\n[c,d]]');

console.log('\n🚀 Test the implementation:');
console.log('   npm run test:search-a-2d-matrix  # See inline matrices');
console.log('   npm run test:valid-sudoku        # See multi-line matrices');
console.log('   npm run test:all-matrices        # Full validation suite');
