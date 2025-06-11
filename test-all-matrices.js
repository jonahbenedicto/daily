#!/usr/bin/env node

/**
 * Comprehensive test runner for matrix-heavy LeetCode problems
 * Tests the formatting and matrix rendering capabilities
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const matrixProblems = [
  'valid-sudoku',
  'spiral-matrix', 
  'game-of-life',
  'rotate-image',
  'set-matrix-zeroes',
  'search-a-2d-matrix'
];

async function testProblem(problemSlug) {
  console.log(`🧪 Testing: ${problemSlug}`);
  
  return new Promise((resolve, reject) => {
    const env = { ...process.env, TEST_PROBLEM: problemSlug };
    
    const child = spawn('node', ['dist/fetch_leetcode_problem.js'], {
      env,
      stdio: 'pipe' // Capture output
    });
    
    let output = '';
    let errors = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      errors += data.toString();
    });
    
    child.on('exit', (code) => {
      if (code === 0) {
        // Analyze the output
        const outputDir = path.join('tests', 'output');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        try {
          const readmeContent = fs.readFileSync('README.md', 'utf-8');
          const outputPath = path.join(outputDir, `${problemSlug}.md`);
          fs.writeFileSync(outputPath, readmeContent);
          
          // Analysis
          const hasMatricesInPre = readmeContent.includes('<pre>') && readmeContent.includes('[[');
          const hasBoldLabels = readmeContent.includes('**Input:**') && readmeContent.includes('**Output:**');
          const hasImages = readmeContent.includes('![');
          const hasDoublePreTags = readmeContent.includes('<pre>\n<pre>');
          const hasUnicodeSymbols = /[₀-₉⁰-⁹≤≥≠±√∞∑∏Δθπαβγ]/.test(readmeContent);
          const problemTitle = readmeContent.match(/## 📋 Today's Challenge: \*\*(.+?)\*\*/)?.[1] || 'Unknown';
          
          const analysis = {
            problemSlug,
            problemTitle,
            timestamp: new Date().toISOString(),
            hasMatricesInPre,
            hasBoldLabels,
            hasImages,
            hasDoublePreTags,
            hasUnicodeSymbols,
            success: true,
            summary: `✅ Matrices: ${hasMatricesInPre}, Bold: ${hasBoldLabels}, Images: ${hasImages}, No Double Pre: ${!hasDoublePreTags}`
          };
          
          const analysisPath = path.join(outputDir, `${problemSlug}-analysis.json`);
          fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
          
          console.log(`   ${analysis.summary}`);
          resolve(analysis);
        } catch (error) {
          console.log(`   ❌ Error analyzing output: ${error.message}`);
          resolve({
            problemSlug,
            success: false,
            error: error.message
          });
        }
      } else {
        console.log(`   ❌ Failed with code ${code}`);
        if (errors) console.log(`   Error: ${errors}`);
        resolve({
          problemSlug,
          success: false,
          exitCode: code,
          error: errors || 'Unknown error'
        });
      }
    });
    
    child.on('error', (error) => {
      console.log(`   ❌ Process error: ${error.message}`);
      resolve({
        problemSlug,
        success: false,
        error: error.message
      });
    });
  });
}

async function runAllTests() {
  console.log('🚀 Running comprehensive matrix formatting tests...\n');
  
  // Make sure we have a fresh build
  console.log('📦 Building TypeScript...');
  await new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
  });
  
  console.log('\n🧪 Testing matrix problems...\n');
  
  const results = [];
  for (const problem of matrixProblems) {
    const result = await testProblem(problem);
    results.push(result);
    console.log(''); // Empty line between tests
  }
  
  // Generate summary report
  console.log('📊 Test Summary Report');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ Successful Tests:');
    successful.forEach(result => {
      console.log(`   • ${result.problemSlug}: ${result.problemTitle || 'N/A'}`);
      if (result.summary) console.log(`     ${result.summary}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    failed.forEach(result => {
      console.log(`   • ${result.problemSlug}: ${result.error}`);
    });
  }
  
  // Save comprehensive report
  const reportPath = path.join('tests', 'output', 'comprehensive-test-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    successful: successful.length,
    failed: failed.length,
    details: results
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📋 Detailed report saved to: ${reportPath}`);
  
  if (failed.length > 0) {
    process.exit(1);
  }
}

// Run the tests
runAllTests().catch(error => {
  console.error('❌ Test suite failed:', error.message);
  process.exit(1);
});
