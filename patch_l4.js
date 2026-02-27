const fs = require("fs");
const file = "lib/lesson-content-4.ts";

if (!fs.existsSync(file)) {
  console.log("ERROR: file not found");
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content.length;

// Replace ALL occurrences of ${...} that are inside Python f-string code
// Pattern: ${ followed by anything up to } where the content contains . or :
// These are Python f-string format specs like ${amount:.2f} ${self.balance:.2f}
// We simply remove the $ sign — Python f-strings work fine as {amount:.2f}
content = content.replace(/\$\{([^}]*[.:][^}]*)\}/g, (match, inner) => {
  console.log("  Fixed: " + match + " -> {" + inner + "}");
  return "{" + inner + "}";
});

// Also fix plain ${variable} that appear in Python string contexts
// but only inside backtick template literal code blocks (safe to remove $)
content = content.replace(/\$\{(self\.[a-z_.]+)\}/g, (match, inner) => {
  console.log("  Fixed self ref: " + match + " -> {" + inner + "}");
  return "{" + inner + "}";
});

fs.writeFileSync(file, content, "utf8");
console.log("\x1b[32mDone! Run: npm run dev\x1b[0m");
