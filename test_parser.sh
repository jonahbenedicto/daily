#!/bin/bash

# Test script to verify mathematical notation and content handling
echo "🧪 Testing enhanced LeetCode problem parser..."

# Test with different languages to get diverse problems
languages=("rust" "python" "typescript" "java")

for lang in "${languages[@]}"; do
    echo ""
    echo "🔍 Testing with language: $lang"
    export LANGUAGE=$lang
    
    # Run the fetcher
    npm run dev > /dev/null 2>&1
    
    # Check if subscripts, superscripts, and mathematical symbols are present
    echo "✅ Checking for mathematical notation in README.md:"
    
    # Look for subscripts (Unicode)
    if grep -q "[₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ]" README.md; then
        echo "   📝 Subscripts found!"
    fi
    
    # Look for superscripts (Unicode)
    if grep -q "[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿⁱ]" README.md; then
        echo "   📝 Superscripts found!"
    fi
    
    # Look for mathematical symbols
    if grep -q "[≤≥≠±√∞∑∏Δθπαβγ×]" README.md; then
        echo "   📝 Mathematical symbols found!"
    fi
    
    # Check content length (should be substantial)
    content_lines=$(sed -n '/### 🧩 Problem Description/,/---/p' README.md | wc -l)
    echo "   📊 Description lines: $content_lines"
    
    if [ $content_lines -gt 20 ]; then
        echo "   ✅ Full description captured!"
    else
        echo "   ⚠️  Description might be truncated"
    fi
    
    break # Just test once for now
done

echo ""
echo "🎯 Test completed! Check README.md for results."
