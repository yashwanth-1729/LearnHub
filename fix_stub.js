const fs = require("fs");
const path = require("path");

const stubContent = `import type { LessonContent } from "./lesson-content";

const lessons: Record<string, LessonContent> = {};

export function getLessonContent3(id: string): LessonContent | undefined {
  return lessons[id];
}
`;

const dir = path.join(process.cwd(), "lib");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "lesson-content-3.ts"), stubContent, { encoding: "utf8" });
console.log("\x1b[32m OK\x1b[0m lib/lesson-content-3.ts (stub created)");
console.log("\n\x1b[33m Done! Now run: npm run dev\x1b[0m");
