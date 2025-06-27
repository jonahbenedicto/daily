# 🎯 Daily LeetCode Problem

> **Updated:** June 27, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Longest Subsequence Repeated k Times**

<div align="center">

### 🧩 Problem Description

</div>

You are given a string `s` of length `n`, and an integer `k`. You are tasked to find the **longest subsequence repeated** `k` times in string `s`.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

A subsequence `seq` is **repeated** `k` times in the string `s` if `seq * k` is a subsequence of `s`, where `seq * k` represents a string constructed by concatenating `seq` `k` times.

For example, `"bba"` is repeated `2` times in the string `"bababcba"`, because the string `"bbabba"`, constructed by concatenating `"bba"` `2` times, is a subsequence of the string `"** b **a** bab **c** ba **"`.

Return *the **longest subsequence repeated** *`k`* times in string *`s`*. If multiple such subsequences are found, return the **lexicographically largest** one. If there is no such subsequence, return an **empty** string*.

**Example 1:**

![example 1](https://assets.leetcode.com/uploads/2021/08/30/longest-subsequence-repeat-k-times.png)

**Input:** s = "letsleetcode", k = 2

**Output:** "let"

Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
"let" is the lexicographically largest one.

**Example 2:**

**Input:** s = "bb", k = 2

**Output:** "b"

Explanation: The longest subsequence repeated 2 times is "b".

**Example 3:**

**Input:** s = "ab", k = 2

**Output:** ""

Explanation: There is no subsequence repeated 2 times. Empty string is returned.

**Constraints:**

`n == s.length`

`2 ≤ n, k ≤ 2000`

`2 ≤ n < k * 8`

`s` consists of lowercase English letters.

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn longest_subsequence_repeated_k(s: String, k: i32) -> String {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/longest-subsequence-repeated-k-times/)

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

</div>