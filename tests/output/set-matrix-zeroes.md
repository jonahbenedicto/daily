# 🎯 Daily LeetCode Problem

> **Updated:** June 11, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Set Matrix Zeroes**

<div align="center">

### 🧩 Problem Description

</div>

Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.

You must do it in place .

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg)

**Input:** matrix = <pre>[[1,1,1],[1,0,1],[1,1,1]]</pre>

**Output:** <pre>[[1,0,1],[0,0,0],[1,0,1]]</pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg)

**Input:** matrix = <pre>[[0,1,2,0],[3,4,5,2],[1,3,1,5]]</pre>

**Output:** <pre>[[0,0,0,0],[0,4,5,0],[0,3,1,0]]</pre>

**Constraints:**

`m == matrix.length`

`n == matrix[0].length`

`1 ≤ m, n ≤ 200`

`-2³¹ ≤ matrix[i][j] ≤ 2³¹ - 1`

**Follow up:**

A straightforward solution using `O(mn)` space is probably a bad idea.

A simple improvement uses `O(m + n)` space, but still not the best solution.

Could you devise a constant space solution?

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn set_zeroes(matrix: &mut Vec<Vec<i32>>) {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/set-matrix-zeroes/)

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