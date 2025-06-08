import requests
import re
import sys
import os
import textwrap
from datetime import datetime

try:
    # Get language from environment variable or default to rust
    selected_language = os.environ.get('LANGUAGE', 'rust').lower()
    
    # Language mapping for display and code selection
    language_map = {
        'rust': {'display': 'Rust', 'slug': 'rust'},
        'python': {'display': 'Python', 'slug': 'python3'},
        'java': {'display': 'Java', 'slug': 'java'},
        'cpp': {'display': 'C++', 'slug': 'cpp'},
        'javascript': {'display': 'JavaScript', 'slug': 'javascript'},
        'typescript': {'display': 'TypeScript', 'slug': 'typescript'},
        'go': {'display': 'Go', 'slug': 'golang'},
        'swift': {'display': 'Swift', 'slug': 'swift'},
        'kotlin': {'display': 'Kotlin', 'slug': 'kotlin'},
        'csharp': {'display': 'C#', 'slug': 'csharp'}
    }
    
    lang_info = language_map.get(selected_language, language_map['rust'])
    
    # Fetch the daily LeetCode problem
    response = requests.get("https://leetcode.com/graphql", headers={
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://leetcode.com/problemset/all/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }, json={
        "query": "query questionOfToday { activeDailyCodingChallengeQuestion { date link question { title content codeSnippets { lang langSlug code } } } }"
    })
    
    response.raise_for_status()
    data = response.json()
    
    if not data.get('data') or not data['data'].get('activeDailyCodingChallengeQuestion'):
        print("No daily problem found")
        sys.exit(1)
    
    problem = data['data']['activeDailyCodingChallengeQuestion']

    # Extract problem details
    title = problem['question']['title']
    content = problem['question']['content']
    
    # Clean HTML content properly while preserving structure
    # First, handle block-level tags that should create line breaks
    content = re.sub(r'</?(p|div|br|li|ul|ol|h[1-6])[^>]*>', '\n', content)
    # Handle inline tags that shouldn't break words
    content = re.sub(r'</?(?:strong|b|em|i|code|span)[^>]*>', '', content)
    # Remove any remaining HTML tags
    content = re.sub(r'<[^>]*>', ' ', content)
    
    # Clean HTML entities
    content = content.replace('&nbsp;', ' ')   # Replace non-breaking spaces
    content = content.replace('&lt;', '<')     # Replace less than
    content = content.replace('&gt;', '>')     # Replace greater than
    content = content.replace('&amp;', '&')    # Replace ampersand
    content = content.replace('&quot;', '"')   # Replace quotes
    content = content.replace('&#39;', "'")    # Replace apostrophes
    
    # Fix mathematical notation
    content = re.sub(r'(\d+)\s*\*\s*10\s*(\d+)', r'\1 × 10^\2', content)  # Handle scientific notation
    content = re.sub(r'10(\d+)', r'10^\1', content)  # Handle superscripts like 104 -> 10^4
    
    # Clean up whitespace while preserving meaningful line breaks
    content = re.sub(r'[ \t]+', ' ', content)  # Replace multiple spaces/tabs with single space
    content = re.sub(r'\n[ \t]*\n', '\n\n', content)  # Normalize double line breaks
    content = re.sub(r'\n{3,}', '\n\n', content)  # Limit to max double line breaks
    content = content.strip()  # Remove leading/trailing whitespace
    
    link = f"https://leetcode.com{problem['link']}"

    # Find code snippet for selected language or fallback to the first available
    code_snippets = problem['question']['codeSnippets']
    selected_code = next((snippet['code'] for snippet in code_snippets if snippet['langSlug'] == lang_info['slug']), 
                        code_snippets[0]['code'] if code_snippets else f"// No {lang_info['display']} code available")
    
    # Get current date for README
    date = datetime.now().strftime("%B %d, %Y")

    # Update README.md with beautiful markdown formatting
    readme_content = f"""# 🎯 Daily LeetCode Problem

> **Updated:** {date} | **Language:** {lang_info['display']}

---

## 📋 Today's Challenge: **{title}**

<div align="center">

### 🧩 Problem Description

</div>

```
{content[:500]}{'...' if len(content) > 500 else ''}
```

---

## 💻 Starting Code ({lang_info['display']})

```{lang_info['slug'].replace('python3', 'python').replace('golang', 'go')}
{selected_code}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)]({link})

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

</div>"""

    with open("README.md", "w") as readme_file:
        readme_file.write(readme_content)
    
    print(f"Successfully updated README.md with problem: {title}")

except Exception as e:
    print(f"Error fetching LeetCode problem: {e}")
    sys.exit(1)
