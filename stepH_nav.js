const fs = require("fs");

// ── 1. Patch nav to add Dashboard + Roadmap links ───────────────────────────
const navFiles = ["components/Navbar.tsx", "components/nav.tsx", "components/Header.tsx",
                  "app/components/Navbar.tsx", "components/navbar.tsx"];
let navFile = navFiles.find(f => fs.existsSync(f));

if (navFile) {
  let nav = fs.readFileSync(navFile, "utf8");
  if (!nav.includes("/dashboard")) {
    // Add links before the closing of nav links area
    nav = nav
      .replace(
        /(<Link[^>]*href="\/courses"[^>]*>[^<]*<\/Link>)/,
        '$1\n          <Link href="/roadmap" className={navLink} style={{cursor:"none"}}>Roadmap</Link>\n          <Link href="/dashboard" className={navLink} style={{cursor:"none"}}>Dashboard</Link>'
      );
    if (!nav.includes("/dashboard")) {
      // Try alternate pattern - find the last </Link> before </nav> or </header>
      nav = nav.replace(
        /(href="\/courses[^"]*"[^>]*>[^<]*<\/Link>)/,
        '$1\n          <a href="/roadmap" style={{color:"#C2C5D0",textDecoration:"none",fontSize:"14px",cursor:"none"}}>Roadmap</a>\n          <a href="/dashboard" style={{color:"#C2C5D0",textDecoration:"none",fontSize:"14px",cursor:"none"}}>Dashboard</a>'
      );
    }
    fs.writeFileSync(navFile, nav, "utf8");
    console.log("\x1b[32m OK\x1b[0m Added Dashboard + Roadmap to nav: " + navFile);
  } else {
    console.log("Nav links already present");
  }
} else {
  console.log("\x1b[33m WARNING\x1b[0m Nav file not found. Please add these links manually:");
  console.log('  <Link href="/dashboard">Dashboard</Link>');
  console.log('  <Link href="/roadmap">Roadmap</Link>');
}

// ── 2. Patch lesson page to add LessonCompletion component ─────────────────
const page = "app/courses/[slug]/lessons/[lessonId]/page.tsx";
let content = fs.readFileSync(page, "utf8");

if (!content.includes("LessonCompletion")) {
  // Add import
  content = content.replace(
    '"use client";',
    '"use client";\nimport { LessonCompletion } from "@/components/LessonCompletion";'
  );

  // Add component before the navigation footer buttons
  // Find the navigation div pattern and insert above it
  const navPattern = /(\{\/\* Navigation \*\/\})/;
  if (navPattern.test(content)) {
    content = content.replace(
      navPattern,
      `{/* Lesson Completion */}
          <div className="flex justify-end pt-2">
            <LessonCompletion lessonId={params.lessonId} />
          </div>

          {/* Navigation */}`
    );
  } else {
    // Fallback: add before the closing of the main tag
    content = content.replace(
      /(<\/main>)/,
      `          <div className="flex justify-end pb-4">
            <LessonCompletion lessonId={params.lessonId} />
          </div>
          $1`
    );
  }
  fs.writeFileSync(page, content, "utf8");
  console.log("\x1b[32m OK\x1b[0m Added LessonCompletion to lesson page");
} else {
  console.log("LessonCompletion already in lesson page");
}

// ── 3. Patch homepage — add Dashboard link to hero CTA ─────────────────────
const homePage = "app/page.tsx";
if (fs.existsSync(homePage)) {
  let home = fs.readFileSync(homePage, "utf8");
  if (!home.includes("/dashboard") && home.includes("Get Started")) {
    // Find the Get Started button and add a secondary Dashboard button next to it
    home = home.replace(
      /(href="\/courses\/python-fundamentals\/lessons\/l1"[^>]*>[^<]*Get Started[^<]*<\/[aA]>)/,
      '$1\n              <a href="/dashboard" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"12px 24px",borderRadius:"12px",border:"1px solid #2A2A32",color:"#C2C5D0",textDecoration:"none",fontSize:"14px",fontWeight:"600",cursor:"none",transition:"all 0.15s"}}>Dashboard</a>'
    );
    fs.writeFileSync(homePage, home, "utf8");
    console.log("\x1b[32m OK\x1b[0m Added Dashboard link to homepage hero");
  }
}

console.log("\n\x1b[32m All done!\x1b[0m Run: npm run dev");
console.log("\n\x1b[36m New pages:\x1b[0m");
console.log("  /dashboard  - XP, level, streak, phase progress");
console.log("  /roadmap    - Visual 9-phase roadmap");
console.log("  Each lesson now has a 'Mark as Complete +50 XP' button");
