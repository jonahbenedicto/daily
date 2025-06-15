# 🎯 Daily LeetCode Problem

> **Updated:** June 15, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Max Difference You Can Get From Changing an Integer**

<div align="center">

### 🧩 Problem Description

</div>

You are given an integer `num`. You will apply the following steps to `num` **two** separate times:

Pick a digit `x (0 ≤ x ≤ 9)`.

Pick another digit `y (0 ≤ y ≤ 9)`. Note `y` can be equal to `x`.

Replace all the occurrences of `x` in the decimal representation of `num` by `y`.

Let `a` and `b` be the two results from applying the operation to `num` *independently*.

Return *the max difference* between `a` and `b`.

Note that neither `a` nor `b` may have any leading zeros, and **must not** be 0.

**Example 1:**

**Input:** num = 555

**Output:** 888

Explanation: The first time pick x = 5 and y = 9 and store the new integer in a.
The second time pick x = 5 and y = 1 and store the new integer in b.
We have now a = 999 and b = 111 and max difference = 888

**Example 2:**

**Input:** num = 9

**Output:** 8

Explanation: The first time pick x = 9 and y = 9 and store the new integer in a.
The second time pick x = 9 and y = 1 and store the new integer in b.
We have now a = 9 and b = 1 and max difference = 8

**Constraints:**

`1 ≤ num ≤ 10⁸`

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn max_diff(num: i32) -> i32 {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer/)

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