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
    
    // Clean HTML content properly while preserving structure
    // First, handle block-level tags that should create line breaks
    content = content.replace(/<\/?(p|div|br|li|ul|ol|h[1-6])[^>]*>/g, '\n');
    // Handle inline tags that shouldn't break words
    content = content.replace(/<\/?(?:strong|b|em|i|code|span)[^>]*>/g, '');
    // Remove any remaining HTML tags
    content = content.replace(/<[^>]*>/g, ' ');
    
    // Clean HTML entities
    content = content.replace(/&nbsp;/g, ' ');   // Replace non-breaking spaces
    content = content.replace(/&lt;/g, '<');     // Replace less than
    content = content.replace(/&gt;/g, '>');     // Replace greater than
    content = content.replace(/&amp;/g, '&');    // Replace ampersand
    content = content.replace(/&quot;/g, '"');   // Replace quotes
    content = content.replace(/&#39;/g, "'");    // Replace apostrophes
    
    // Fix mathematical notation
    content = content.replace(/(\d+)\s*\*\s*10\s*(\d+)/g, '$1 × 10^$2'); // Handle scientific notation
    content = content.replace(/10(\d+)/g, '10^$1'); // Handle superscripts like 104 -> 10^4
    
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

\`\`\`
${content.length > 500 ? content.substring(0, 500) + '...' : content}
\`\`\`

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