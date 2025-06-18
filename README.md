# 🎯 Daily LeetCode Problem

> **Updated:** June 18, 2025 | **Language:** Rust

---

## 📋 Today's Challenge: **Divide Array Into Arrays With Max Difference**

<div align="center">

### 🧩 Problem Description

</div>

You are given an integer array `nums` of size `n` where `n` is a multiple of 3 and a positive integer `k`.

Divide the array `nums` into `n / 3` arrays of size **3** satisfying the following condition:

The difference between **any** two elements in one array is **less than or equal** to `k`.

Return a **2D** array containing the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return **any** of them.

**Example 1:**

**Input:** nums = [1,3,4,8,7,9,3,5,1], k = 2

**Output:** <pre>[[1,1,3],[3,4,5],[7,8,9]]</pre>

**Explanation:**

The difference between any two elements in each array is less than or equal to 2.

**Example 2:**

**Input:** nums = [2,4,2,2,5,2], k = 2

**Output:** []

**Explanation:**

Different ways to divide `nums` into 2 arrays of size 3 are:

<pre>[[2,2,2],[2,4,5]]</pre> (and its permutations)

<pre>[[2,2,4],[2,2,5]]</pre> (and its permutations)

Because there are four 2s there will be an array with the elements 2 and 5 no matter how we divide it. since `5 - 2 = 3 > k`, the condition is not satisfied and so there is no valid division.

**Example 3:**

**Input:** nums = [4,2,9,8,2,12,7,12,10,5,8,5,5,7,9,2,5,11], k = 14

**Output:** <pre>[[2,2,12],[4,8,5],[5,9,7],[7,8,5],[5,9,10],[11,12,2]]</pre>

**Explanation:**

The difference between any two elements in each array is less than or equal to 14.

**Constraints:**

`n == nums.length`

`1 ≤ n ≤ 10⁵`

`n `is a multiple of 3

`1 ≤ nums[i] ≤ 10⁵`

`1 ≤ k ≤ 10⁵`

---

## 💻 Starting Code (Rust)

```rust
impl Solution {
    pub fn divide_array(nums: Vec<i32>, k: i32) -> Vec<Vec<i32>> {
        
    }
}
```

---

<div align="center">

## 🔗 Quick Actions

[![Solve on LeetCode](https://img.shields.io/badge/Solve_on-LeetCode-orange?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/problems/divide-array-into-arrays-with-max-difference/)

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