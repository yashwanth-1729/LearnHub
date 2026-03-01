const fs = require("fs");
const file = "lib/courses.ts";
let content = fs.readFileSync(file, "utf8");

let changed = false;

// ── Add l21-l25 to existing module (they complete the data structures module) 
if (!content.includes('"l21"') && !content.includes("'l21'")) {
  // Find where l20 lesson entry ends and add after it
  const l20entry = content.indexOf('"l20"');
  if (l20entry !== -1) {
    const lineEnd = content.indexOf('\n', l20entry);
    const newLessons = `
          { id: "l21", title: "String Methods Deep Dive",          duration: "11m" },
          { id: "l22", title: "List Methods and Sorting",           duration: "10m" },
          { id: "l23", title: "Unpacking, zip, and enumerate",      duration: "9m"  },
          { id: "l24", title: "Working with Files -- CSV",          duration: "10m" },
          { id: "l25", title: "Choosing the Right Data Structure",  duration: "9m"  },`;
    content = content.slice(0, lineEnd) + newLessons + content.slice(lineEnd);
    changed = true;
    console.log("\x1b[32m OK\x1b[0m Added l21-l25");
  } else {
    console.log("\x1b[33m WARNING\x1b[0m Could not find l20 entry to insert after");
  }
}

// ── Add beginner starter projects module ────────────────────────────────────
if (!content.includes('"l42"') && !content.includes("'l42'")) {
  const starterModule = `
      {
        id: "m12", title: "Starter Projects",
        lessons: [
          { id: "l42", title: "Starter: Simple Calculator",       duration: "12m" },
          { id: "l43", title: "Starter: Mad Libs Story Generator", duration: "10m" },
          { id: "l44", title: "Starter: Quiz Game",               duration: "13m" },
        ],
      },`;

  // Insert before m11 (Projects module) or at end of modules
  if (content.includes('"m11"')) {
    content = content.replace('{\n        id: "m11"', starterModule + '\n      {\n        id: "m11"');
  } else {
    // Insert before closing of modules array
    const lastClose = content.lastIndexOf('      },\n    ]');
    if (lastClose !== -1) {
      content = content.slice(0, lastClose + 8) + starterModule + '\n' + content.slice(lastClose + 8);
    }
  }
  changed = true;
  console.log("\x1b[32m OK\x1b[0m Added Starter Projects module (l42-l44)");
}

if (changed) {
  fs.writeFileSync(file, content, "utf8");
  console.log("\n\x1b[32m courses.ts saved\x1b[0m");
} else {
  console.log("Nothing to add -- all lessons already present");
}
