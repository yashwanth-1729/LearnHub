const fs = require("fs");

// Fix homepage — replace all "#" hrefs with real links
const homePath = "app/page.tsx";
if (!fs.existsSync(homePath)) {
  console.log("page.tsx not found, trying app/(home)/page.tsx");
}

let files = ["app/page.tsx", "app/(home)/page.tsx"];
let found = files.find(f => fs.existsSync(f));
if (!found) { console.log("Could not find homepage"); process.exit(1); }

let content = fs.readFileSync(found, "utf8");

// Fix href="#" → real routes
content = content
  // Get Started / Start Learning buttons → first lesson
  .replace(/href=["']#["'](\s*[^>]*>[\s\S]*?(?:Get Started|Start Learning|Start Free|Begin|Start Now))/g,
           'href="/courses/python-fundamentals/lessons/l1"$1')
  // Learning paths / Browse / Explore buttons → courses page
  .replace(/href=["']#["'](\s*[^>]*>[\s\S]*?(?:Learning Path|Browse|Explore|View All|See All|All Course))/gi,
           'href="/courses"$1')
  // Any remaining href="#" → courses page
  .replace(/href=["']#["']/g, 'href="/courses"');

// Add hover transitions to buttons that lack them
content = content
  .replace(/className="([^"]*?)rounded-xl([^"]*?)font-semibold([^"]*?)"/g, (m, a, b, c) => {
    if (m.includes('transition') || m.includes('hover:')) return m;
    return `className="${a}rounded-xl${b}font-semibold${c} transition-all hover:brightness-110 active:scale-95"`;
  });

fs.writeFileSync(found, content, "utf8");
console.log("\x1b[32m OK\x1b[0m Fixed homepage buttons in " + found);
