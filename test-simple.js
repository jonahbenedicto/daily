#!/usr/bin/env node

/**
 * Simple test runner for specific LeetCode problems
 * Usage: node test-simple.js <problem-slug>
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testProblem(problemSlug) {
  console.log(`🧪 Testing problem: ${problemSlug}\n`);
  
  return new Promise((resolve, reject) => {
    // Set environment variable and run the main script
    const env = { ...process.env, TEST_PROBLEM: problemSlug };
    
    console.log(`🚀 Running: node dist/fetch_leetcode_problem.js`);
    console.log(`📝 Environment: TEST_PROBLEM=${problemSlug}`);
    
    const child = spawn('node', ['dist/fetch_leetcode_problem.js'], {
      env,
      stdio: 'inherit'
    });
    
    child.on('exit', (code) => {
      console.log(`\n🔍 Process exited with code: ${code}`);
      
      if (code === 0) {
        console.log(`\n✅ Test completed for ${problemSlug}`);
        
        // Save the output for inspection
        const outputDir = path.join('tests', 'output');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Copy README.md to test output
        const readmeContent = fs.readFileSync('README.md', 'utf-8');
        const outputPath = path.join(outputDir, `${problemSlug}.md`);
        fs.writeFileSync(outputPath, readmeContent);
        
        // Simple analysis
        const hasMatricesInPre = readmeContent.includes('<pre>') && readmeContent.includes('[[');
        const hasBoldLabels = readmeContent.includes('**Input:**') && readmeContent.includes('**Output:**');
        const hasImages = readmeContent.includes('![');
        
        const analysis = {
          problemSlug,
          timestamp: new Date().toISOString(),
          hasMatricesInPre,
          hasBoldLabels,
          hasImages,
          summary: `Matrices in <pre>: ${hasMatricesInPre}, Bold labels: ${hasBoldLabels}, Images: ${hasImages}`
        };
        
        const analysisPath = path.join(outputDir, `${problemSlug}-analysis.json`);
        fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
        
        console.log(`📄 Output saved to: ${outputPath}`);
        console.log(`📊 Analysis: ${analysis.summary}`);
        console.log(`📋 Details: ${analysisPath}`);
        
        resolve();
      } else {
        reject(new Error(`Test failed with exit code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

// Main execution
const args = process.argv.slice(2);
const problemSlug = args[0];

if (!problemSlug) {
  console.log('Usage: node test-simple.js <problem-slug>');
  console.log('Example: node test-simple.js valid-sudoku');
  process.exit(1);
}

testProblem(problemSlug).catch(error => {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
});
