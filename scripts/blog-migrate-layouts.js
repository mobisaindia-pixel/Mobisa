const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function migrateLayouts() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    let changed = false;

    // Default layoutMode mapping based on category
    let defaultLayout = "mixed";
    let defaultRecipe = "guide";
    const cat = (parsed.data.category || "").toLowerCase();
    
    if (cat.includes("playbook") || cat.includes("creative")) {
      defaultLayout = "visual";
      defaultRecipe = "playbook";
    } else if (cat.includes("strategy") || cat.includes("analysis") || cat.includes("metrics")) {
      defaultLayout = "text";
      defaultRecipe = "analysis";
    }

    if (!parsed.data.layoutMode) {
      parsed.data.layoutMode = defaultLayout;
      changed = true;
    }
    if (!parsed.data.recipe) {
      parsed.data.recipe = defaultRecipe;
      changed = true;
    }
    if (!parsed.data.visualDensity) {
      parsed.data.visualDensity = defaultLayout === "visual" ? 5 : defaultLayout === "text" ? 2 : 3;
      changed = true;
    }
    if (!parsed.data.visualStyle) {
      parsed.data.visualStyle = "editorial-product";
      changed = true;
    }

    if (changed) {
      const newContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
    }
  });

  console.log(`Migration complete. Updated ${updatedCount} files.`);
}

migrateLayouts();
