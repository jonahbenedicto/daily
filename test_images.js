// Test HTML content with images to verify our image processing
const testHTML = `Here is an image: <img src="https://example.com/image.jpg" alt="Test Image" /> and another <img src="https://example.com/image2.jpg" />`;

console.log("Testing image processing...");
console.log("Input:", testHTML);

// Simulate the same processing logic
let content = testHTML;

// Handle images - convert to Markdown format
content = content.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');
content = content.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi, '![$1]($2)');
content = content.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '![]($1)'); // Images without alt text

console.log("Result:", content);
