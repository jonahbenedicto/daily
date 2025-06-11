import axios from 'axios';
import * as fs from 'fs';

interface LanguageInfo {
  display: string;
  slug: string;
}

interface CodeSnippet {
  lang: string;
  langSlug: string;
  code: string;
}

interface Question {
  title: string;
  content: string;
  codeSnippets: CodeSnippet[];
}

interface DailyProblem {
  date: string;
  link: string;
  question: Question;
}

interface GraphQLResponse {
  data: {
    activeDailyCodingChallengeQuestion: DailyProblem;
  };
}

async function fetchLeetCodeProblem(): Promise<void> {
  try {
    // Get language from environment variable or default to rust
    const selectedLanguage = (process.env.LANGUAGE || 'rust').toLowerCase();
    
    // Language mapping for display and code selection
    const languageMap: Record<string, LanguageInfo> = {
      'rust': { display: 'Rust', slug: 'rust' },
      'python': { display: 'Python', slug: 'python3' },
      'java': { display: 'Java', slug: 'java' },
      'cpp': { display: 'C++', slug: 'cpp' },
      'javascript': { display: 'JavaScript', slug: 'javascript' },
      'typescript': { display: 'TypeScript', slug: 'typescript' },
      'go': { display: 'Go', slug: 'golang' },
      'swift': { display: 'Swift', slug: 'swift' },
      'kotlin': { display: 'Kotlin', slug: 'kotlin' },
      'csharp': { display: 'C#', slug: 'csharp' }
    };
    
    const langInfo = languageMap[selectedLanguage] || languageMap['rust'];
    
    // Fetch the daily LeetCode problem OR specific problem for testing
    const isTest = process.env.TEST_PROBLEM;
    let response: any;
    
    if (isTest) {
      // Handle any test problem dynamically
      response = await axios.post('https://leetcode.com/graphql', {
        query: `query getQuestionDetail($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            title
            content
            codeSnippets {
              lang
              langSlug
              code
            }
          }
        }`,
        variables: {
          titleSlug: isTest
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referer': 'https://leetcode.com/problemset/all/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const data = response.data;
      if (!data?.data?.question) {
        console.log(`Test problem '${isTest}' not found`);
        process.exit(1);
      }
      var problem: any = { question: data.data.question, link: `/problems/${isTest}/` };
    } else {
      response = await axios.post<GraphQLResponse>('https://leetcode.com/graphql', {
        query: `query questionOfToday { 
          activeDailyCodingChallengeQuestion { 
            date 
            link 
            question { 
              title 
              content 
              codeSnippets { 
                lang 
                langSlug 
                code 
              } 
            } 
          } 
        }`
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referer': 'https://leetcode.com/problemset/all/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const data = response.data;
      if (!data?.data?.activeDailyCodingChallengeQuestion) {
        console.log('No daily problem found');
        process.exit(1);
      }
      var problem: any = data.data.activeDailyCodingChallengeQuestion;
    }

    // Extract problem details
    const title = problem.question.title;
    let content = problem.question.content;
    
    // Enhanced HTML content cleaning with better mathematical notation support
    // First, preserve important mathematical structures
    content = content.replace(/<sub>([^<]*)<\/sub>/g, '₍$1₎'); // Temporary subscript preservation
    content = content.replace(/<sup>([^<]*)<\/sup>/g, '⁽$1⁾'); // Temporary superscript preservation
    
    // Handle images - convert to Markdown format
    content = content.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');
    content = content.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi, '![$1]($2)');
    content = content.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '![]($1)'); // Images without alt text
    
    // Handle code blocks and preformatted text (preserve line breaks)
    content = content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match: string, preContent: string) => {
      // Check if this pre block contains Input/Output labels that should be outside code blocks
      if (preContent.includes('<strong>Input:</strong>') || preContent.includes('<strong>Output:</strong>') || 
          preContent.includes('<b>Input:</b>') || preContent.includes('<b>Output:</b>')) {
        // Handle Input/Output labels separately from the code content
        let processedContent = preContent;
        
        // Extract and format Input/Output labels with proper spacing and line breaks
        // Handle "Input: board =" pattern specifically - match DESIRED_FORMAT.txt exactly
        processedContent = processedContent.replace(/<strong>Input:<\/strong>\s*([^<\n]*)/gi, '\n**Input:** $1');
        processedContent = processedContent.replace(/<b>Input:<\/b>\s*([^<\n]*)/gi, '\n**Input:** $1');
        
        // Handle Output labels with bold formatting
        processedContent = processedContent.replace(/<strong>Output:<\/strong>\s*([^<\n]*)/gi, '\n**Output:** $1');
        processedContent = processedContent.replace(/<b>Output:<\/b>\s*([^<\n]*)/gi, '\n**Output:** $1');
        
        // Handle general Input/Output patterns
        processedContent = processedContent.replace(/<strong>([^<]*Input[^<]*?):<\/strong>\s*/gi, '\n**$1:** ');
        processedContent = processedContent.replace(/<strong>([^<]*Output[^<]*?):<\/strong>\s*/gi, '\n**$1:** ');
        processedContent = processedContent.replace(/<b>([^<]*Input[^<]*?):<\/b>\s*/gi, '\n**$1:** ');
        processedContent = processedContent.replace(/<b>([^<]*Output[^<]*?):<\/b>\s*/gi, '\n**$1:** ');
        
        // Fix spacing: add space after equals sign for "board =" patterns
        processedContent = processedContent.replace(/(\w+)\s*=(?!\s)/g, '$1 = ');
        
        // IMPORTANT: Handle matrices here to avoid double <pre> wrapping later
        // Format matrices based on original whitespace pattern between rows
        processedContent = processedContent.replace(/(\[\[[\s\S]*?\]\])/g, (match: string) => {
          // Check for existing line breaks (already multi-line)
          const hasExistingLineBreaks = /\],\s*\n\s*\[/.test(match);
          
          if (hasExistingLineBreaks) {
            // Keep existing multi-line format and ensure consistent spacing
            const formattedMatrix = match.replace(/\],\s*\n\s*\[/g, '],\n[');
            return '\n<pre>\n' + formattedMatrix + '\n</pre>';
          }
          
          // Check for whitespace between rows (key pattern detection)
          // Pattern: ],<space>[  indicates multi-line intent
          const hasSpacesBetweenRows = /\],\s+\[/.test(match);
          
          if (hasSpacesBetweenRows) {
            // LeetCode formatted with spaces → convert to multi-line
            const formattedMatrix = match.replace(/\],\s*\[/g, '],\n[');
            return '\n<pre>\n' + formattedMatrix + '\n</pre>';
          } else {
            // No spaces between rows → keep inline (single-line)
            return ' <pre>' + match + '</pre>';
          }
        });
        
        // Handle other nested array patterns
        processedContent = processedContent.replace(/(\[(?:\[[^\]]*\](?:,\s*)?)+\])/g, (match: string) => {
          // Skip if already processed as a 2D matrix
          if (match.includes('<pre>')) return match;
          
          // Check for existing line breaks
          const hasExistingLineBreaks = /\],\s*\n\s*\[/.test(match);
          
          if (hasExistingLineBreaks) {
            // Keep existing multi-line format
            const formattedMatrix = match.replace(/\],\s*\n\s*\[/g, '],\n[');
            return '\n<pre>\n' + formattedMatrix + '\n</pre>';
          }
          
          // Check for whitespace between rows (same pattern detection)
          const hasSpacesBetweenRows = /\],\s+\[/.test(match);
          
          if (hasSpacesBetweenRows) {
            // LeetCode formatted with spaces → convert to multi-line  
            const formattedMatrix = match.replace(/\],\s*\[/g, '],\n[');
            return '\n<pre>\n' + formattedMatrix + '\n</pre>';
          } else {
            // No spaces between rows → keep inline
            return ' <pre>' + match + '</pre>';
          }
        });
        
        // Add line breaks before key sections
        processedContent = processedContent.replace(/(\*\*Output:\*\*)/g, '\n$1');
        processedContent = processedContent.replace(/(Explanation:)/g, '\n$1');
        
        // Remove remaining HTML tags
        processedContent = processedContent.replace(/<[^>]*>/g, '');
        
        // Clean up excessive line breaks but preserve structure
        processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
        
        return '\n' + processedContent + '\n';
      } else {
        // Regular code block handling
        return '\n```\n' + preContent + '\n```\n';
      }
    });
    
    // Handle arrays and matrices - REMOVED - will handle at the very end
    // content = content.replace(/(\[\[[\s\S]*?\]\])/g, (match: string) => {
    //   return match.replace(/\],\s*\[/g, '],\n[');
    // });
    
    // Handle block-level tags that should create line breaks
    content = content.replace(/<\/?(p|div|br|li|ul|ol|h[1-6])[^>]*>/g, '\n');
    
    // Handle lists properly
    content = content.replace(/<li[^>]*>/g, '• '); // Convert list items to bullet points
    content = content.replace(/<\/li>/g, '\n');
    
    // Handle inline tags that shouldn't break words but may contain formatting
    content = content.replace(/<\/?(?:strong|b)([^>]*)>/g, '**'); // Bold to markdown
    content = content.replace(/<\/?(?:em|i)([^>]*)>/g, '*'); // Italic to markdown
    content = content.replace(/<\/?code([^>]*)>/g, '`'); // Code to markdown
    
    // Remove remaining HTML tags
    content = content.replace(/<[^>]*>/g, ' ');
    
    // Clean HTML entities
    content = content.replace(/&nbsp;/g, ' ');   // Non-breaking spaces
    content = content.replace(/&lt;/g, '<');     // Less than
    content = content.replace(/&gt;/g, '>');     // Greater than
    content = content.replace(/&amp;/g, '&');    // Ampersand
    content = content.replace(/&quot;/g, '"');   // Quotes
    content = content.replace(/&#39;/g, "'");    // Apostrophes
    content = content.replace(/&hellip;/g, '...'); // Ellipsis
    content = content.replace(/&mdash;/g, '—');   // Em dash
    content = content.replace(/&ndash;/g, '–');   // En dash
    
    // Enhanced mathematical notation support
    // Convert preserved subscripts and superscripts to Unicode
    content = content.replace(/₍([^₎]*)₎/g, (match: string, p1: string) => {
      // Convert common subscript characters
      return p1.replace(/0/g, '₀').replace(/1/g, '₁').replace(/2/g, '₂')
               .replace(/3/g, '₃').replace(/4/g, '₄').replace(/5/g, '₅')
               .replace(/6/g, '₆').replace(/7/g, '₇').replace(/8/g, '₈')
               .replace(/9/g, '₉').replace(/\+/g, '₊').replace(/-/g, '₋')
               .replace(/=/g, '₌').replace(/\(/g, '₍').replace(/\)/g, '₎')
               .replace(/a/g, 'ₐ').replace(/e/g, 'ₑ').replace(/h/g, 'ₕ')
               .replace(/i/g, 'ᵢ').replace(/j/g, 'ⱼ').replace(/k/g, 'ₖ')
               .replace(/l/g, 'ₗ').replace(/m/g, 'ₘ').replace(/n/g, 'ₙ')
               .replace(/o/g, 'ₒ').replace(/p/g, 'ₚ').replace(/r/g, 'ᵣ')
               .replace(/s/g, 'ₛ').replace(/t/g, 'ₜ').replace(/u/g, 'ᵤ')
               .replace(/v/g, 'ᵥ').replace(/x/g, 'ₓ');
    });
    
    content = content.replace(/⁽([^⁾]*)⁾/g, (match: string, p1: string) => {
      // Convert common superscript characters
      return p1.replace(/0/g, '⁰').replace(/1/g, '¹').replace(/2/g, '²')
               .replace(/3/g, '³').replace(/4/g, '⁴').replace(/5/g, '⁵')
               .replace(/6/g, '⁶').replace(/7/g, '⁷').replace(/8/g, '⁸')
               .replace(/9/g, '⁹').replace(/\+/g, '⁺').replace(/-/g, '⁻')
               .replace(/=/g, '⁼').replace(/\(/g, '⁽').replace(/\)/g, '⁾')
               .replace(/n/g, 'ⁿ').replace(/i/g, 'ⁱ').replace(/th/g, 'ᵗʰ');
    });
    
    // Handle common mathematical expressions
    content = content.replace(/(\d+)\s*\*\s*10\s*\^?\s*(\d+)/g, '$1 × 10^$2'); // Scientific notation
    content = content.replace(/(\d+)\s*\^\s*(\d+)/g, '$1^$2'); // General exponents
    content = content.replace(/10(\d+)/g, (match: string, p1: string) => {
      // Only convert if it looks like scientific notation (10^4, not things like 100)
      if (p1.length === 1 || (p1.length === 2 && parseInt(p1) > 10)) {
        return `10^${p1}`;
      }
      return match;
    });
    content = content.replace(/2\^(\d+)/g, '2^$1'); // Powers of 2
    content = content.replace(/O\(([^)]+)\)/g, 'O($1)'); // Big O notation
    content = content.replace(/log\s*(\d+)/g, 'log₂'); // Logarithms
    content = content.replace(/\blog\b/g, 'log'); // General log
    
    // Handle fractions and mathematical symbols
    content = content.replace(/<=>/g, '⟺'); // If and only if
    content = content.replace(/<=/g, '≤');  // Less than or equal
    content = content.replace(/>=/g, '≥');  // Greater than or equal
    content = content.replace(/!=/g, '≠');  // Not equal
    content = content.replace(/\+-/g, '±'); // Plus minus
    content = content.replace(/sqrt/g, '√'); // Square root
    content = content.replace(/infinity/g, '∞'); // Infinity
    content = content.replace(/\bsum\b/g, '∑');  // Summation (word boundary)
    content = content.replace(/\bproduct\b/g, '∏'); // Product (word boundary)
    content = content.replace(/\bdelta\b/g, 'Δ'); // Delta (word boundary)
    content = content.replace(/\btheta\b/g, 'θ'); // Theta (word boundary)
    // Only replace standalone "pi" not as part of other words
    content = content.replace(/\bpi\b/g, 'π');   // Pi (word boundary)
    content = content.replace(/\balpha\b/g, 'α'); // Alpha (word boundary)
    content = content.replace(/\bbeta\b/g, 'β');  // Beta (word boundary)
    content = content.replace(/\bgamma\b/g, 'γ'); // Gamma (word boundary)
    
    // Enhanced array formatting for better readability - REMOVED - will handle at the very end
    // Handle common LeetCode matrix patterns (like Sudoku boards) - REMOVED
    // Handle general nested array patterns - REMOVED
    
    // Clean up whitespace while preserving meaningful line breaks and matrix formatting
    // IMPORTANT: Be careful not to collapse line breaks within matrices
    content = content.replace(/[ \t]{2,}/g, ' ');  // Replace multiple spaces/tabs with single space
    content = content.replace(/\n[ \t]+/g, '\n');  // Remove spaces after line breaks
    content = content.replace(/[ \t]+\n/g, '\n');  // Remove spaces before line breaks
    content = content.replace(/\n{3,}/g, '\n\n');  // Limit to max double line breaks
    
    // Preserve matrix line breaks by ensuring they don't get collapsed
    content = content.replace(/(\],)\s*\n\s*(\[)/g, '$1\n$2'); // Ensure matrix rows stay on separate lines
    
    content = content.trim();  // Remove leading/trailing whitespace
    
    // ===== FINAL MATRIX FORMATTING =====
    // Matrices are now handled in the <pre> block processing above to avoid double wrapping
    // This section is kept for any matrices that might not be in <pre> blocks
    
    // Handle any remaining matrices that weren't processed (rare edge cases)
    content = content.replace(/(\[\[[\s\S]*?\]\])/g, (match: string, offset: number) => {
      // Check if this matrix is already inside a <pre> tag
      const beforeMatch = content.substring(Math.max(0, offset - 30), offset);
      const afterMatch = content.substring(offset + match.length, Math.min(content.length, offset + match.length + 30));
      
      // Skip if already in a <pre> tag, code block, or already processed
      if (beforeMatch.includes('<pre>') || beforeMatch.includes('```') || 
          afterMatch.includes('</pre>') || afterMatch.includes('```') ||
          match.includes('<pre>')) {
        return match;
      }
      
      // Only process if it's a standalone matrix
      // Apply intelligent formatting based on original whitespace pattern
      const hasExistingLineBreaks = /\],\s*\n\s*\[/.test(match);
      const hasSpacesBetweenRows = /\],\s+\[/.test(match);
      
      if (hasExistingLineBreaks || hasSpacesBetweenRows) {
        // Multi-line format (either existing line breaks or spaces between rows)
        const formattedMatrix = match.replace(/\],\s*\[/g, '],\n[');
        return '<pre>\n' + formattedMatrix + '\n</pre>';
      } else {
        // Inline format (no spaces between rows)
        return '<pre>' + match + '</pre>';
      }
    });
    
    const link = `https://leetcode.com${problem.link}`;

    // Find code snippet for selected language or fallback to the first available
    const codeSnippets = problem.question.codeSnippets;
    const selectedCode = codeSnippets.find((snippet: any) => snippet.langSlug === langInfo.slug)?.code || 
                        (codeSnippets.length > 0 ? codeSnippets[0].code : `// No ${langInfo.display} code available`);
    
    // Get current date for README
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Update README.md with beautiful markdown formatting
    const readmeContent = `# 🎯 Daily LeetCode Problem

> **Updated:** ${date} | **Language:** ${langInfo.display}

---

## 📋 Today's Challenge: **${title}**

<div align="center">

### 🧩 Problem Description

</div>

${content}

---

## 💻 Starting Code (${langInfo.display})

\`\`\`${langInfo.slug.replace('python3', 'python').replace('golang', 'go')}
${selectedCode}
\`\`\`

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](${link})

</div>

---

## ⚙️ How This Works

- 🤖 **Automated Updates**: GitHub Actions fetches the daily problem at midnight UTC
- 🎨 **Clean Formatting**: Beautiful markdown styling with GitHub's design system
- 💻 **Multi-Language Support**: Choose your preferred programming language
- 🔄 **Always Fresh**: New problem every day automatically

## 🛠️ Supported Languages

<div align="center">

| Language | Status | Language | Status |
|----------|--------|----------|--------|
| 🦀 Rust | ✅ Default | 🐍 Python | ✅ |
| ☕ Java | ✅ | ⚡ C++ | ✅ |
| 🟨 JavaScript | ✅ | 🔷 TypeScript | ✅ |
| 🐹 Go | ✅ | 🍎 Swift | ✅ |
| 🎯 Kotlin | ✅ | 💎 C# | ✅ |

</div>

---

<div align="center">

### 🌟 Happy Coding! 🌟

**Come back tomorrow for a new challenge!**

</div>`;

    fs.writeFileSync('README.md', readmeContent);
    
    console.log(`Successfully updated README.md with problem: ${title}`);

  } catch (error) {
    console.error(`Error fetching LeetCode problem:`, error);
    process.exit(1);
  }
}

// Export the function for testing
export { fetchLeetCodeProblem };

// Run the function only when called directly (not when imported)
if (require.main === module) {
  fetchLeetCodeProblem();
}