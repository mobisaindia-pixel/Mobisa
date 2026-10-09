/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "../content/blog");

function publishBlog() {
  const args = process.argv.slice(2);
  let categoryFilter = null;
  let slugFilter = null;
  let publishAll = false;

  args.forEach((arg) => {
    if (arg.startsWith("--category=")) {
      categoryFilter = arg.split("=")[1].toLowerCase();
    } else if (arg.startsWith("--slug=")) {
      slugFilter = arg.split("=")[1].toLowerCase();
    } else if (arg === "--all") {
      publishAll = true;
    }
  });

  if (!categoryFilter && !slugFilter && !publishAll) {
    console.log("Usage:");
    console.log("  node blog-publish.js --category=\"AI UGC Ads\"");
    console.log("  node blog-publish.js --slug=\"my-post-slug\"");
    console.log("  node blog-publish.js --all");
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  let updatedCount = 0;

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const categoryMatch = content.match(/^category:\s*"(.*?)"/m);
    const slugMatch = content.match(/^slug:\s*"(.*?)"/m);

    const fileCategory = categoryMatch ? categoryMatch[1].toLowerCase() : "";
    const fileSlug = slugMatch ? slugMatch[1].toLowerCase() : file.replace(/\.mdx?$/, "").toLowerCase();

    const matchesCategory = categoryFilter && fileCategory === categoryFilter;
    const matchesSlug = slugFilter && fileSlug === slugFilter;

    if (publishAll || matchesCategory || matchesSlug) {
      if (content.includes("draft: true")) {
        const updatedContent = content.replace(/^draft:\s*true/m, "draft: false");
        fs.writeFileSync(filePath, updatedContent, "utf-8");
        console.log(`✅ Published: ${file}`);
        updatedCount++;
      }
    }
  });

  console.log(`\n🎉 Successfully published ${updatedCount} articles.`);
}

publishBlog();
