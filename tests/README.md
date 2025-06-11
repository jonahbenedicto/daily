# 🧪 LeetCode Problem Formatting Tests

This directory contains comprehensive testing tools for validating LeetCode problem formatting across different problem types and edge cases.

## 🎯 Purpose

The test suite helps ensure that:
- ✅ **Matrices render properly** with line breaks preserved
- ✅ **Mathematical notation** is correctly converted to Unicode symbols
- ✅ **Bold formatting** works correctly for Input/Output labels
- ✅ **Images** are properly converted to markdown format
- ✅ **Code blocks** and preformatted text maintain structure

## 🚀 Quick Start

### Test a Specific Problem
```bash
# Test Valid Sudoku problem
npm run test:problem valid-sudoku

# Test Spiral Matrix problem  
npm run test:problem spiral-matrix

# Test any LeetCode problem by slug
npm run test:problem <problem-slug>
```

### Test All Problems
```bash
# Run comprehensive test suite
npm run test:all
```

### Manual Testing
```bash
# Using TypeScript directly
npx ts-node tests/test-problem.ts valid-sudoku

# Run all tests
npx ts-node tests/test-problem.ts
```

## 📊 Test Problems

The test suite includes these carefully selected problems that cover different formatting challenges:

| Problem | Features Tested | Why It Matters |
|---------|----------------|----------------|
| **Valid Sudoku** | Matrices, Images, Bold formatting | Classic matrix formatting test case |
| **Spiral Matrix** | Matrices, Arrays | Tests various matrix sizes and patterns |
| **Game of Life** | Matrices, Mathematical notation | Complex matrix with math symbols |
| **Unique Paths** | Mathematical notation, Subscripts | Tests subscript formatting |
| **Pow(x, n)** | Mathematical notation, Superscripts | Tests superscript formatting |
| **Climbing Stairs** | Mathematical sequences | Tests mathematical formula rendering |

## 📁 Output Structure

```
tests/
├── test-problem.ts          # Main test script
├── output/                  # Generated test results
│   ├── valid-sudoku.md     # Formatted problem output
│   ├── valid-sudoku-analysis.json  # Formatting analysis
│   ├── spiral-matrix.md    # Another test output
│   ├── spiral-matrix-analysis.json
│   └── test-report.json    # Overall test summary
└── README.md               # This file
```

## 🔍 Analysis Features

Each test generates detailed analysis including:

### ✅ **Feature Detection**
- Matrix presence and formatting
- Bold formatting correctness  
- Image conversion status
- Mathematical notation usage
- Code block structure

### 📊 **Matrix Analysis**
- Count of matrices found
- Verification that all matrices are wrapped in `<pre>` tags
- Sample matrix examples
- Line break preservation check

### ⚠️ **Issue Detection**
- Unwrapped matrices (rendering problems)
- Missing bold formatting
- Broken mathematical notation
- Image conversion failures

## 🤖 GitHub Actions Integration

### Manual Testing
1. Go to **Actions** tab in GitHub
2. Select **"Test LeetCode Problem Formatting"**
3. Click **"Run workflow"**
4. Optionally specify a problem slug (e.g., `valid-sudoku`)
5. View results in the workflow run

### Automatic Testing
Tests run automatically when:
- `fetch_leetcode_problem.ts` is modified
- Files in `tests/` directory are changed
- Pull requests affecting formatting code

## 📝 Adding New Test Problems

To add a new test problem, edit `tests/test-problem.ts`:

```typescript
const TEST_PROBLEMS: TestProblem[] = [
  // ... existing problems
  {
    slug: 'your-problem-slug',
    name: 'Your Problem Name',
    expectedFeatures: ['matrices', 'mathematical-notation', 'images']
  }
];
```

## 🛠️ Troubleshooting

### Common Issues

**Matrix not rendering properly:**
- Check if matrices are wrapped in `<pre>` tags
- Verify line breaks are preserved in the source
- Look for `allWrappedInPre: false` in analysis

**Mathematical notation not working:**
- Check if symbols are converted to Unicode
- Verify superscripts/subscripts are properly formatted
- Look for `hasMathematicalNotation: false` in analysis

**Bold formatting issues:**
- Ensure `**Input:**` and `**Output:**` are present
- Check for HTML remnants like `<strong>` tags
- Verify proper spacing around labels

### Debug Mode

For detailed debugging, check the generated analysis files:

```bash
# View analysis for a specific problem
cat tests/output/valid-sudoku-analysis.json | jq '.'

# Check overall test report
cat tests/output/test-report.json | jq '.results[]'
```

## 🤝 Contributing

When adding new formatting features:

1. **Add test coverage** for the new feature
2. **Update analysis logic** to detect the feature
3. **Add example problems** that use the feature
4. **Test with various problem types** to ensure compatibility

## 📋 Test Checklist

Before deploying formatting changes:

- [ ] All matrix problems render with proper line breaks
- [ ] Mathematical notation displays correctly
- [ ] Bold formatting works for Input/Output labels
- [ ] Images convert to proper markdown format
- [ ] No unwrapped matrices in test output
- [ ] Test report shows 100% success rate

---

## 🎯 Example Test Output

```json
{
  "problemSlug": "valid-sudoku",
  "features": {
    "hasMatrices": true,
    "hasBoldFormatting": true,
    "hasImages": true,
    "hasPreTags": true
  },
  "matrices": {
    "count": 2,
    "allWrappedInPre": true
  },
  "issues": [],
  "summary": "Found 4 formatting features. 2 matrices detected. ✅ No formatting issues detected."
}
```

**Happy Testing! 🚀**
