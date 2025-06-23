# 🎯 Daily LeetCode Problem

> **Updated:** June 23, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Sum of k-Mirror Numbers**

<div align="center">

### 🧩 Problem Description

</div>

A **k-mirror number** is a **positive** integer **without leading zeros** that reads the same both forward and backward in base-10 **as well as** in base-k.

For example, `9` is a 2-mirror number. The representation of `9` in base-10 and base-2 are `9` and `1001` respectively, which read the same both forward and backward.

On the contrary, `4` is not a 2-mirror number. The representation of `4` in base-2 is `10^0`, which does not read the same both forward and backward.

Given the base `k` and the number `n`, return *the **∑** of the* `n` ***smallest** k-mirror numbers*.

**Example 1:**

**Input:** k = 2, n = 5

**Output:** 25

Explanation:
The 5 smallest 2-mirror numbers and their representations in base-2 are listed as follows:
base-10 base-2
1 1
3 11
5 10^1
7 111
9 1001
Their ∑ = 1 + 3 + 5 + 7 + 9 = 25.

**Example 2:**

**Input:** k = 3, n = 7

**Output:** 499

Explanation:
The 7 smallest 3-mirror numbers are and their representations in base-3 are listed as follows:
base-10 base-3
1 1
2 2
4 11
8 22
121 11111
151 12121
212 21212
Their ∑ = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499.

**Example 3:**

**Input:** k = 7, n = 17

**Output:** 20379000

Explanation: The 17 smallest 7-mirror numbers are:
1, 2, 3, 4, 5, 6, 8, 121, 171, 242, 292, 16561, 65656, 2137312, 4602064, 6597956, 6958596

**Constraints:**

`2 ≤ k ≤ 9`

`1 ≤ n ≤ 30`

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn k_mirror(k: i32, n: i32) -> i64 {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/sum-of-k-mirror-numbers/)

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