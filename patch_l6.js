const fs   = require("fs");
const path = require("path");

// Step 1: wipe .next cache so stale compiled output is gone
function del(p) {
  if (!fs.existsSync(p)) return;
  for (const e of fs.readdirSync(p)) {
    const f = path.join(p, e);
    try { if (fs.statSync(f).isDirectory()) del(f); else fs.unlinkSync(f); } catch(_) {}
  }
  try { fs.rmdirSync(p); } catch(_) {}
}
del(".next");
console.log("Cleared .next cache");

// Step 2: escape ${ -> \\${ so TypeScript never evaluates them as template expressions
const file = "lib/lesson-content-6.ts";
let content = fs.readFileSync(file, "utf8");
const count = (content.match(/\$\{/g) || []).length;
content = content.split("${").join("\\${");
fs.writeFileSync(file, content, "utf8");
console.log("Fixed " + count + " instances: ${ -> \\${");
console.log("Done! Run: npm run dev");
