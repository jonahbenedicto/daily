# 🎯 Daily LeetCode Problem

> **Updated:** June 16, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Maximum Difference Between Increasing Elements**

<div align="center">

### 🧩 Problem Description

</div>

Given a **0-indexed** integer array `nums` of size `n`, find the **maximum difference** between `nums[i]` and `nums[j]` (i.e., `nums[j] - nums[i]`), such that `0 ≤ i < j < n` and `nums[i] < nums[j]`.

Return *the **maximum difference**. *If no such `i` and `j` exists, return `-1`.

**Example 1:**

**Input:** nums = [7,1,5,4]

**Output:** 4

Explanation:
The maximum difference occurs with i = 1 and j = 2, nums[j] - nums[i] = 5 - 1 = 4.
Note that with i = 1 and j = 0, the difference nums[j] - nums[i] = 7 - 1 = 6, but i > j, so it is not valid.

**Example 2:**

**Input:** nums = [9,4,3,2]

**Output:** -1

Explanation:
There is no i and j such that i < j and nums[i] < nums[j].

**Example 3:**

**Input:** nums = [1,5,2,10]

**Output:** 9

Explanation:
The maximum difference occurs with i = 0 and j = 3, nums[j] - nums[i] = 10 - 1 = 9.

**Constraints:**

`n == nums.length`

`2 ≤ n ≤ 1000`

`1 ≤ nums[i] ≤ 10⁹`

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn maximum_difference(nums: Vec<i32>) -> i32 {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/maximum-difference-between-increasing-elements/)

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