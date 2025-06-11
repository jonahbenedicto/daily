# 🎯 Enhanced LeetCode Daily Problem Fetcher

> **TypeScript-powered LeetCode problem fetcher with advanced mathematical notation support and robust matrix formatting**

## ✨ Features

### 🔢 **Advanced Mathematical Notation Support**
- **Subscripts**: Automatically converts HTML subscripts to Unicode (₀₁₂₃₄₅₆₇₈₉)
- **Superscripts**: Converts HTML superscripts to Unicode (⁰¹²³⁴⁵⁶⁷⁸⁹)
- **Mathematical Symbols**: Supports ≤≥≠±√∞∑∏Δθπαβγ and more
- **Smart Word Boundaries**: Only replaces mathematical terms when appropriate (e.g., "spiral" won't become "sπral")

### 🎨 **Beautiful Matrix Rendering**
- **Guaranteed Line Breaks**: All matrices wrapped in `<pre>` tags for perfect rendering
- **Multi-line Format**: Arrays display as proper matrices instead of collapsed single lines
- **No Double Tags**: Fixed duplicate `<pre>` tag issues
- **Universal Compatibility**: Works across all Markdown viewers (GitHub, VS Code, etc.)

### 🖼️ **Rich Content Support**
- **Image Conversion**: HTML `<img>` tags → Markdown `![alt](url)` format
- **Bold Labels**: Proper **Input:** and **Output:** formatting
- **Full Descriptions**: No character limits - complete problem descriptions
- **Code Snippets**: Multi-language support (Rust, Python, Java, C++, JavaScript, TypeScript, Go, Swift, Kotlin, C#)

### 🧪 **Comprehensive Testing Infrastructure**
- **Individual Problem Testing**: Test specific problems with `npm run test:valid-sudoku`
- **Matrix Problem Suite**: Comprehensive testing with `npm run test:all-matrices`
- **Automated Analysis**: JSON reports with formatting validation
- **Multiple Test Cases**: Validates across different problem types

## 🚀 Quick Start

### Installation
```bash
git clone <repository>
cd daily-leetcode-fetcher
npm install
```

### Basic Usage
```bash
# Fetch today's daily problem (default: Rust)
npm run fetch

# Fetch with specific language
LANGUAGE=python npm run fetch
LANGUAGE=typescript npm run fetch
```

### Testing
```bash
# Test a specific problem
npm run test:valid-sudoku
npm run test:spiral-matrix

# Run comprehensive matrix tests
npm run test:all-matrices

# Test any LeetCode problem
TEST_PROBLEM=two-sum npm run dev
```

## 📊 Supported Languages

| Language   | Code      | Package.json Script |
|------------|-----------|-------------------|
| Rust       | `rust`    | `LANGUAGE=rust`   |
| Python     | `python`  | `LANGUAGE=python` |
| Java       | `java`    | `LANGUAGE=java`   |
| C++        | `cpp`     | `LANGUAGE=cpp`    |
| JavaScript | `javascript` | `LANGUAGE=javascript` |
| TypeScript | `typescript` | `LANGUAGE=typescript` |
| Go         | `go`      | `LANGUAGE=go`     |
| Swift      | `swift`   | `LANGUAGE=swift`  |
| Kotlin     | `kotlin`  | `LANGUAGE=kotlin` |
| C#         | `csharp`  | `LANGUAGE=csharp` |

## 🎯 Matrix Formatting Examples

### Before (Collapsed)
```
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."]...]
```

### After (Beautiful)
```markdown
**Input:** board =
<pre>
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
</pre>
```

## 🧪 Testing Framework

### Individual Problem Testing
```bash
npm run test:valid-sudoku      # Test Sudoku matrix formatting
npm run test:spiral-matrix     # Test spiral traversal matrices
npm run test:game-of-life      # Test cellular automaton grids
npm run test:rotate-image      # Test image rotation matrices
```

### Comprehensive Testing
```bash
npm run test:all-matrices      # Test all matrix problems
```

### Test Output Analysis
- **Matrix Detection**: Validates proper `<pre>` tag wrapping
- **Bold Labels**: Confirms **Input:**/**Output:** formatting
- **Image Support**: Checks Markdown image conversion
- **Unicode Symbols**: Verifies mathematical notation
- **JSON Reports**: Detailed analysis saved to `tests/output/`

## 🔧 GitHub Actions Integration

### Automated Daily Updates
```yaml
# Runs daily at midnight UTC
schedule:
  - cron: '0 0 * * *'

# Manual trigger with language selection
workflow_dispatch:
  inputs:
    language:
      description: 'Programming Language'
      default: 'rust'
      type: choice
```

### Formatting Validation Workflow
- Automated testing on push/PR
- Matrix formatting validation
- Cross-platform compatibility checks

## 📁 Project Structure

```
daily-leetcode-fetcher/
├── fetch_leetcode_problem.ts    # Main TypeScript fetcher
├── test-simple.js              # Individual problem tester
├── test-all-matrices.js        # Comprehensive test suite
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .github/workflows/          # GitHub Actions
├── tests/
│   ├── output/                 # Test results and analysis
│   └── README.md              # Testing documentation
└── dist/                       # Compiled JavaScript
```

## 🎨 Advanced Features

### Mathematical Notation Examples
- **Big O**: `O(n²)` → `O(n²)`
- **Inequalities**: `<=` → `≤`, `>=` → `≥`, `!=` → `≠`
- **Scientific**: `10^4` → `10⁴`
- **Greek Letters**: `theta` → `θ`, `pi` → `π` (word boundary aware)
- **Mathematical**: `sqrt` → `√`, `infinity` → `∞`

### Matrix Problem Coverage
✅ **Validated Problems:**
- Valid Sudoku (9×9 grids)
- Spiral Matrix (rectangular traversal)
- Game of Life (cellular automaton)
- Rotate Image (square matrix rotation)
- Set Matrix Zeroes (sparse matrices)
- Search a 2D Matrix (sorted matrices)

## 🤝 Contributing

### Adding New Test Problems
1. Add problem slug to `matrixProblems` array in `test-all-matrices.js`
2. Add npm script: `"test:new-problem": "npm run build && node test-simple.js new-problem"`
3. Run test: `npm run test:new-problem`
4. Verify output in `tests/output/new-problem.md`

### Improving Formatting
1. Modify processing pipeline in `fetch_leetcode_problem.ts`
2. Test with: `npm run test:all-matrices`
3. Validate no regressions in comprehensive report

## 📈 Version History

- **v1.0.0**: TypeScript migration with matrix rendering fixes
- **Enhanced**: Mathematical notation support
- **Robust**: Comprehensive testing framework
- **Production**: GitHub Actions integration

## 🏆 Key Achievements

- **100% Matrix Test Pass Rate**: All 6 matrix problems render perfectly
- **Zero Double Pre Tags**: Fixed formatting inconsistencies
- **Universal Markdown Support**: Works across all viewers
- **Smart Mathematical Conversion**: Context-aware symbol replacement
- **Automated Quality Assurance**: Comprehensive testing pipeline

---

*Built with TypeScript, tested extensively, and optimized for beautiful mathematical problem rendering.*
