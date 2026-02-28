const fs = require("fs");
const path = require("path");

// Minimal page update -- just adds getLessonContent5 import
const pagePath = "app/courses/[slug]/lessons/[lessonId]/page.tsx";
let content = fs.readFileSync(pagePath, "utf8");

if (content.includes("lesson-content-5")) {
  console.log("Already updated.");
  process.exit(0);
}

// Add import after lesson-content-4 import
content = content.replace(
  'import { getLessonContent4 } from "@/lib/lesson-content-4";',
  'import { getLessonContent4 } from "@/lib/lesson-content-4";\nimport { getLessonContent5 } from "@/lib/lesson-content-5";'
);

// Update lesson lookup to include content5 (highest priority for new lessons)
content = content.replace(
  'const lesson = getLessonContent4(params.lessonId)',
  'const lesson = getLessonContent5(params.lessonId)\n    ?? getLessonContent4(params.lessonId)'
);

// Update hasContent helper
content = content.replace(
  '!!(getLessonContent4(id) ?? getLessonContent3(id) ?? getLessonContent(id) ?? getLessonContent2(id));',
  '!!(getLessonContent5(id) ?? getLessonContent4(id) ?? getLessonContent3(id) ?? getLessonContent(id) ?? getLessonContent2(id));'
);

fs.writeFileSync(pagePath, content, "utf8");
console.log("\x1b[32m OK\x1b[0m " + pagePath);
console.log("\n\x1b[33m Done! Run: npm run dev\x1b[0m");
