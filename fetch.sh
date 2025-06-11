#!/bin/bash

# Daily LeetCode Problem Fetcher (TypeScript version)
# Usage: ./fetch.sh [LANGUAGE]
# Example: ./fetch.sh typescript

if [ $# -eq 1 ]; then
    export LANGUAGE=$1
fi

echo "🚀 Fetching daily LeetCode problem..."
echo "📝 Language: ${LANGUAGE:-rust}"

npm run fetch

echo "✅ Done! Check README.md for today's problem."
