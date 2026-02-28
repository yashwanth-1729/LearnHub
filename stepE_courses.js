const fs = require("fs");

// Read current courses.ts to see what modules/lessons exist
const content = fs.readFileSync("lib/courses.ts", "utf8");

// Check which lesson IDs are already in the courses file
const existingIds = [];
const matches = content.matchAll(/id:\s*["']l(\d+)["']/g);
for (const m of matches) existingIds.push(parseInt(m[1]));
existingIds.sort((a,b)=>a-b);
console.log("Existing lesson IDs:", existingIds);

// Check if l32-l37 are missing
const missing = [32,33,34,35,36,37].filter(n => !existingIds.includes(n));
console.log("Missing:", missing);

if (missing.length === 0) {
  console.log("All lessons already in courses.ts!");
  process.exit(0);
}

// Add missing lessons to the last module or create a new one
// Find the last } before the closing of modules array
const newLessons = `
      {
        id: "m9", title: "Advanced Python",
        lessons: [
          { id: "l32", title: "Iterators and Generators", duration: "13m" },
          { id: "l33", title: "Decorators",               duration: "12m" },
          { id: "l34", title: "The Standard Library",     duration: "11m" },
          { id: "l35", title: "Regular Expressions",      duration: "10m" },
        ],
      },
      {
        id: "m10", title: "Final Project",
        lessons: [
          { id: "l36", title: "CLI Todo App -- Part 1",   duration: "14m" },
          { id: "l37", title: "CLI Todo App -- Part 2",   duration: "13m" },
        ],
      },`;

// Insert before the closing of the modules array
// Find "];  // end of modules" or similar pattern
if (content.includes('"m8"') || content.includes("'m8'")) {
  // Find the last module's closing bracket and add after it
  const insertPoint = content.lastIndexOf("],\n    }");
  if (insertPoint === -1) {
    console.log("Could not find insert point. Please add manually.");
    process.exit(1);
  }
  const newContent = content.slice(0, insertPoint + 8) + newLessons + content.slice(insertPoint + 8);
  fs.writeFileSync("lib/courses.ts", newContent, "utf8");
  console.log("\x1b[32m OK\x1b[0m Added m9 and m10 modules");
} else {
  console.log("Module structure unexpected. Logging current modules...");
  const modMatches = content.matchAll(/id:\s*["'](m\d+)["']/g);
  for (const m of modMatches) console.log(" Found module:", m[1]);
}
