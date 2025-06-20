# 🎯 Daily LeetCode Problem

> **Updated:** June 20, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Maximum Manhattan Distance After K Changes**

<div align="center">

### 🧩 Problem Description

</div>

You are given a string `s` consisting of the characters `'N'`, `'S'`, `'E'`, and `'W'`, where `s[i]` indicates movements in an infinite grid:

`'N'` : Move north by 1 unit.

`'S'` : Move south by 1 unit.

`'E'` : Move east by 1 unit.

`'W'` : Move west by 1 unit.

Initially, you are at the origin `(0, 0)`. You can change **at most** `k` characters to any of the four directions.

Find the **maximum** **Manhattan distance** from the origin that can be achieved **at any time** while performing the movements **in order**.

The **Manhattan Distance** between two cells `(xᵢ, yᵢ)` and `(xⱼ, yⱼ)` is `|xᵢ - xⱼ| + |yᵢ - yⱼ|`.

**Example 1:**

**Input:** s = "NWSE", k = 1

**Output:** 3

**Explanation:**

Change `s[2]` from `'S'` to `'N'`. The string `s` becomes `"NWNE"`.

Movement
Position (x, y)
Manhattan Distance
Maximum

s[0] == 'N'
(0, 1)
0 + 1 = 1
1

s[1] == 'W'
(-1, 1)
1 + 1 = 2
2

s[2] == 'N'
(-1, 2)
1 + 2 = 3
3

s[3] == 'E'
(0, 2)
0 + 2 = 2
3

The maximum Manhattan distance from the origin that can be achieved is 3. Hence, 3 is the output.

**Example 2:**

**Input:** s = "NSWWEW", k = 3

**Output:** 6

**Explanation:**

Change `s[1]` from `'S'` to `'N'`, and `s[4]` from `'E'` to `'W'`. The string `s` becomes `"NNWWWW"`.

The maximum Manhattan distance from the origin that can be achieved is 6. Hence, 6 is the output.

**Constraints:**

`1 ≤ s.length ≤ 10⁵`

`0 ≤ k ≤ s.length`

`s` consists of only `'N'`, `'S'`, `'E'`, and `'W'`.

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn max_distance(s: String, k: i32) -> i32 {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes/)

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