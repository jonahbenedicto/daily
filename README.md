# 🎯 Daily LeetCode Problem

> **Updated:** June 14, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Maximum Difference by Remapping a Digit**

<div align="center">

### 🧩 Problem Description

</div>

You are given an integer `num`. You know that Bob will sneakily **remap** one of the `10` possible digits (`0` to `9`) to another digit.

Return *the difference between the maximum and minimum values Bob can make by remapping **exactly** **one** digit in *`num`.

**Notes:**

When Bob remaps a digit d1 to another digit d2 , Bob replaces all occurrences of `d1` in `num` with `d2`.

Bob can remap a digit to itself, in which case `num` does not change.

Bob can remap different digits for obtaining minimum and maximum values respectively.

The resulting number after remapping can contain leading zeroes.

**Example 1:**

**Input:** num = 11891

**Output:** 99009

Explanation:
To achieve the maximum value, Bob can remap the digit 1 to the digit 9 to yield 99899.
To achieve the minimum value, Bob can remap the digit 1 to the digit 0, yielding 890.
The difference between these two numbers is 99009.

**Example 2:**

**Input:** num = 90

**Output:** 99

Explanation:
The maximum value that can be returned by the function is 99 (if 0 is replaced by 9) and the minimum value that can be returned by the function is 0 (if 9 is replaced by 0).
Thus, we return 99.

**Constraints:**

`1 ≤ num ≤ 10⁸`

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn min_max_difference(num: i32) -> i32 {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/maximum-difference-by-remapping-a-digit/)

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