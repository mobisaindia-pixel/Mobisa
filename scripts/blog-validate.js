/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BLOG_DIR = path.join(__dirname, "../content/blog");

function validateBlog() {
  console.log("=== Starting Blog Content Validation ===");

  if (!fs.existsSync(BLOG_DIR)) {
    console.error("❌ Content directory not found: " + BLOG_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  
  let published = 0;
  let drafts = 0;
  const categories = {};
  const slugs = new Set();
  
  let hasErrors = false;

  files.forEach((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);

    const slug = data.slug || file.replace(/\.mdx?$/, "");
    if (slugs.has(slug)) {
      console.error(`❌ Duplicate slug found: "${slug}" in file ${file}`);
      hasErrors = true;
    }
    slugs.add(slug);

    if (!data.title) {
      console.error(`❌ Missing title in file ${file}`);
      hasErrors = true;
    }
    if (!data.description) {
      console.error(`❌ Missing description in file ${file}`);
      hasErrors = true;
    }
    if (!data.category) {
      console.error(`❌ Missing category in file ${file}`);
      hasErrors = true;
    }

    if (data.draft) {
      drafts++;
    } else {
      published++;
    }

    const cat = data.category || "Uncategorized";
    categories[cat] = (categories[cat] || 0) + 1;
  });

  console.log(`\n=== Validation Summary ===`);
  console.log(`Total Articles: ${files.length}`);
  console.log(`Published: ${published}`);
  console.log(`Drafts: ${drafts}`);
  console.log(`\nCategories:`);
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(` - ${cat}: ${count}`);
  });

  if (hasErrors) {
    console.error("\n❌ Validation failed with errors.");
    process.exit(1);
  } else {
    console.log("\n✅ All blog files validated successfully.");
  }
}

validateBlog();
