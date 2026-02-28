const fs = require("fs");
const file = "lib/courses.ts";
let content = fs.readFileSync(file, "utf8");

// Check what's already there
const hasL38 = content.includes('"l38"') || content.includes("'l38'");
const hasL41 = content.includes('"l41"') || content.includes("'l41'");

if (hasL38 && hasL41) {
  console.log("Project lessons already in courses.ts");
  process.exit(0);
}

const projectModule = `
      {
        id: "m11", title: "Projects",
        lessons: [
          { id: "l38", title: "Project: Number Guessing Game",     duration: "20m" },
          { id: "l39", title: "Project: Personal Expense Tracker", duration: "22m" },
          { id: "l40", title: "Project: Student Grade Manager",    duration: "25m" },
          { id: "l41", title: "Project: Web Scraper and Analyser", duration: "30m" },
        ],
      },`;

// Insert before the closing bracket of the modules array
// Find the last occurrence of "}," that closes a module
const lastModuleEnd = content.lastIndexOf("      },\n    ]");
if (lastModuleEnd === -1) {
  // Try alternate format
  const alt = content.lastIndexOf("},\n  ]");
  if (alt === -1) {
    console.log("Could not find modules array end. Showing last 500 chars:");
    console.log(content.slice(-500));
    process.exit(1);
  }
  content = content.slice(0, alt + 2) + projectModule + "\n" + content.slice(alt + 2);
} else {
  content = content.slice(0, lastModuleEnd + 8) + projectModule + "\n" + content.slice(lastModuleEnd + 8);
}

fs.writeFileSync(file, content, "utf8");
console.log("\x1b[32m OK\x1b[0m Added project lessons to courses.ts");
