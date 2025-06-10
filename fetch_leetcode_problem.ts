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
    
    // Fetch the daily LeetCode problem
    const response = await axios.post<GraphQLResponse>('https://leetcode.com/graphql', {
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
    
    const problem = data.data.activeDailyCodingChallengeQuestion;

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
    content = content.replace(/₍([^₎]*)₎/g, (match, p1) => {
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
    
    content = content.replace(/⁽([^⁾]*)⁾/g, (match, p1) => {
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
    content = content.replace(/10(\d+)/g, (match, p1) => {
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
    content = content.replace(/sum/g, '∑');  // Summation
    content = content.replace(/product/g, '∏'); // Product
    content = content.replace(/delta/g, 'Δ'); // Delta
    content = content.replace(/theta/g, 'θ'); // Theta
    content = content.replace(/pi/g, 'π');   // Pi
    content = content.replace(/alpha/g, 'α'); // Alpha
    content = content.replace(/beta/g, 'β');  // Beta
    content = content.replace(/gamma/g, 'γ'); // Gamma
    
    // Clean up whitespace while preserving meaningful line breaks
    content = content.replace(/[ \t]+/g, ' ');  // Replace multiple spaces/tabs with single space
    content = content.replace(/\n[ \t]*\n/g, '\n\n');  // Normalize double line breaks
    content = content.replace(/\n{3,}/g, '\n\n');  // Limit to max double line breaks
    content = content.trim();  // Remove leading/trailing whitespace
    
    const link = `https://leetcode.com${problem.link}`;

    // Find code snippet for selected language or fallback to the first available
    const codeSnippets = problem.question.codeSnippets;
    const selectedCode = codeSnippets.find(snippet => snippet.langSlug === langInfo.slug)?.code || 
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

// Run the function
fetchLeetCodeProblem();