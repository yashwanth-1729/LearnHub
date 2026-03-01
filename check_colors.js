// Quick script to show current color values
const fs = require("fs");
const globals = fs.existsSync("app/globals.css") ? fs.readFileSync("app/globals.css","utf8") : "not found";
const tailwind = fs.existsSync("tailwind.config.ts") ? fs.readFileSync("tailwind.config.ts","utf8") : fs.existsSync("tailwind.config.js") ? fs.readFileSync("tailwind.config.js","utf8") : "not found";
console.log("=== globals.css (first 60 lines) ===");
console.log(globals.split("\n").slice(0,60).join("\n"));
console.log("\n=== tailwind.config (colors section) ===");
const match = tailwind.match(/colors[\s\S]{0,800}/);
console.log(match ? match[0] : tailwind.slice(0,400));
