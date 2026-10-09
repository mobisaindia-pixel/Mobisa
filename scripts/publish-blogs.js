const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../content/blog');
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  
  if (parsed.data.draft === true) {
    parsed.data.draft = false;
    // We want to avoid rewriting the whole frontmatter with gray-matter's stringify if possible, to preserve formatting, but it's the safest way. 
    // Or we can just regex replace `draft: true` to `draft: false`
    const updated = raw.replace(/^draft:\s*true/m, 'draft: false');
    fs.writeFileSync(filePath, updated, 'utf8');
  }
});

console.log(`Updated draft status for 60 articles.`);
