const fs = require("fs");

const page = "app/courses/[slug]/lessons/[lessonId]/page.tsx";
let content = fs.readFileSync(page, "utf8");

// ── 1. Add lesson-content-7 import if missing ───────────────────────────────
if (!content.includes("lesson-content-7")) {
  content = content.replace(
    'import { getLessonContent6 } from "@/lib/lesson-content-6";',
    'import { getLessonContent6 } from "@/lib/lesson-content-6";\nimport { getLessonContent7 } from "@/lib/lesson-content-7";'
  );
  content = content.replace(
    /getLessonContent6\(params\.lessonId\)\s*\?\?/,
    'getLessonContent7(params.lessonId) ??\n    getLessonContent6(params.lessonId) ??'
  );
  content = content.replace(
    '!!(getLessonContent6(id)',
    '!!(getLessonContent7(id) ?? getLessonContent6(id)'
  );
  console.log("\x1b[32m OK\x1b[0m Added lesson-content-7");
} else {
  console.log("lesson-content-7 already present");
}

// ── 2. Fix paragraph text color (was invisible grey, now warm readable) ──────
// Body text in sections
content = content.replace(
  /<p key=\{pi\} className="text-muted text-sm leading-relaxed">/g,
  '<p key={pi} className="text-sm leading-relaxed" style={{color:"#C2C5D0"}}>'
);
content = content.replace(
  /<p className="text-muted text-sm leading-relaxed">\{section\.body\}/g,
  '<p className="text-sm leading-relaxed" style={{color:"#C2C5D0"}}>{section.body}'
);
// Lesson intro
content = content.replace(
  /className="text-muted text-sm leading-relaxed max-w-2xl"/g,
  'className="text-sm leading-relaxed max-w-2xl" style={{color:"#C2C5D0"}}'
);
// Dim grey colour on sidebar and misc muted text - bump up
content = content.replace(/color: "#5A5A70"/g, 'color: "#8B8FA8"');
content = content.replace(/color:"#5A5A70"/g, 'color:"#8B8FA8"');

fs.writeFileSync(page, content, "utf8");
console.log("\x1b[32m OK\x1b[0m Text colors updated (#C2C5D0 for body)");
console.log("\n\x1b[33m Done! Run: node stepG_courses.js then npm run dev\x1b[0m");
