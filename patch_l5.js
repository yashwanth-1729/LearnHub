const fs = require("fs");
const file = "lib/lesson-content-5.ts";
let content = fs.readFileSync(file, "utf8");

// Replace all \033 octal escapes with \x1b (hex equivalent, valid in strict mode)
const before = (content.match(/\\033/g) || []).length;
content = content.split("\\033").join("\\x1b");
const after = (content.match(/\\033/g) || []).length;

fs.writeFileSync(file, content, "utf8");
console.log(`\x1b[32m Fixed ${before} occurrences of \\033 -> \\x1b\x1b[0m`);
console.log("\x1b[33m Done! Run: npm run dev\x1b[0m");
