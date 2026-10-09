const fs = require('fs');
const matter = require('gray-matter');
let d = 0, nd = 0;
fs.readdirSync('content/blog').forEach(f => {
  if (!f.endsWith('.mdx')) return;
  const data = matter(fs.readFileSync(`content/blog/${f}`, 'utf8')).data;
  data.draft ? d++ : nd++;
});
console.log({ draft: d, nonDraft: nd });
