# 🎯 Daily LeetCode Problem

> **Updated:** June 24, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Find All K-Distant Indices in an Array**

<div align="center">

### 🧩 Problem Description

</div>

You are given a **0-indexed** integer array `nums` and two integers `key` and `k`. A **k-distant index** is an index `i` of `nums` for which there exists at least one index `j` such that `|i - j| ≤ k` and `nums[j] == key`.

Return *a list of all k-distant indices sorted in **increasing order***.

**Example 1:**

**Input:** nums = [3,4,9,1,3,9,5], key = 9, k = 1

**Output:** [1,2,3,4,5,6]

Explanation: Here, nums[2] == key and nums[5] == key.
- For index 0, |0 - 2| > k and |0 - 5| > k, so there is no j where |0 - j| ≤ k and nums[j] == key. Thus, 0 is not a k-distant index.
- For index 1, |1 - 2| ≤ k and nums[2] == key, so 1 is a k-distant index.
- For index 2, |2 - 2| ≤ k and nums[2] == key, so 2 is a k-distant index.
- For index 3, |3 - 2| ≤ k and nums[2] == key, so 3 is a k-distant index.
- For index 4, |4 - 5| ≤ k and nums[5] == key, so 4 is a k-distant index.
- For index 5, |5 - 5| ≤ k and nums[5] == key, so 5 is a k-distant index.
- For index 6, |6 - 5| ≤ k and nums[5] == key, so 6 is a k-distant index.
Thus, we return [1,2,3,4,5,6] which is sorted in increasing order.

**Example 2:**

**Input:** nums = [2,2,2,2,2], key = 2, k = 2

**Output:** [0,1,2,3,4]

Explanation: For all indices i in nums, there exists some index j such that |i - j| ≤ k and nums[j] == key, so every index is a k-distant index.
Hence, we return [0,1,2,3,4].

**Constraints:**

`1 ≤ nums.length ≤ 1000`

`1 ≤ nums[i] ≤ 1000`

`key` is an integer from the array `nums`.

`1 ≤ k ≤ nums.length`

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn find_k_distant_indices(nums: Vec<i32>, key: i32, k: i32) -> Vec<i32> {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/find-all-k-distant-indices-in-an-array/)

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