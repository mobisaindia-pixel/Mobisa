const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT_DIR = path.join(__dirname, '..');
const VISUALS_SRC_DIR = path.join(ROOT_DIR, 'public', 'blogs', 'Mobisa_Blog_Visuals_1(60)');
const BLOGS_DEST_DIR = path.join(ROOT_DIR, 'public', 'blogs');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'blog');
const REPORT_PATH = path.join(ROOT_DIR, 'blog-image-integration-report.json');
const MANIFEST_PATH = path.join(ROOT_DIR, 'lib', 'article-visuals.json');

async function main() {
  const report = {
    totalArticles: 0,
    mapped: 0,
    ambiguous: 0,
    missing: 0,
    imagesDetected: 0,
    brokenReferences: 0,
    mappings: {}
  };

  const finalManifest = {};

  const sourceManifestFile = path.join(VISUALS_SRC_DIR, 'image-manifest.json');
  let manifestData = [];
  if (fs.existsSync(sourceManifestFile)) {
    manifestData = JSON.parse(fs.readFileSync(sourceManifestFile, 'utf-8'));
  } else {
    console.error("image-manifest.json not found!");
    process.exit(1);
  }

  const mdxFiles = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const articleSlugs = mdxFiles.map(f => f.replace(/\.mdx?$/, ''));
  report.totalArticles = articleSlugs.length;

  for (const slug of articleSlugs) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
    const { data: frontmatter, content } = matter(raw);
    
    // Find visual folder. First try exact match
    let folderPath = path.join(VISUALS_SRC_DIR, slug);
    let matchedFolder = fs.existsSync(folderPath) ? slug : null;

    if (!matchedFolder) {
      // try prefix or fallback
      const dirs = fs.readdirSync(VISUALS_SRC_DIR).filter(d => fs.statSync(path.join(VISUALS_SRC_DIR, d)).isDirectory());
      matchedFolder = dirs.find(d => d.includes(slug) || slug.includes(d));
    }

    const mapping = {
      slug,
      originalFolder: matchedFolder || "MISSING",
      finalFolder: `/blogs/${slug}`,
      cover: null,
      supportingImages: [],
      imageCount: 0,
      status: matchedFolder ? "mapped" : "missing",
      layoutMode: frontmatter.layoutMode || 'mixed'
    };

    if (matchedFolder) {
      report.mapped++;
      const srcFolder = path.join(VISUALS_SRC_DIR, matchedFolder);
      const destFolder = path.join(BLOGS_DEST_DIR, slug);
      
      if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder, { recursive: true });
      }

      const files = fs.readdirSync(srcFolder).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
      mapping.imageCount = files.length;
      report.imagesDetected += files.length;

      const articleImagesFromManifest = manifestData.filter(item => item.Slug === slug || item["Slug"] === matchedFolder);
      
      // Analyze headings for placement
      const headings = [...content.matchAll(/^(#{2,3})\s+(.+)/gm)].map(m => ({ level: m[1].length, text: m[2] }));

      let coverPlaced = false;

      files.forEach(file => {
        const srcFile = path.join(srcFolder, file);
        const destFile = path.join(destFolder, file);
        
        // Copy file
        if (!fs.existsSync(destFile)) {
          fs.copyFileSync(srcFile, destFile);
        }

        const publicPath = `/blogs/${slug}/${file}`;
        const manifestItem = articleImagesFromManifest.find(i => i.Filename === file);
        const role = manifestItem ? manifestItem.Role : (file.includes('cover') ? 'Hero' : 'Supporting');
        
        const altText = generateAltText(frontmatter.title, role, file);

        if ((file === 'cover.webp' || role.toLowerCase().includes('hero')) && !coverPlaced) {
          mapping.cover = { src: publicPath, alt: altText };
          coverPlaced = true;
        } else {
          // heuristic placement hint
          let afterHeading = null;
          if (headings.length > 0) {
            // Assign based on keywords in heading vs filename
            const matchedHeading = headings.find(h => {
              const hText = h.text.toLowerCase();
              const fName = file.toLowerCase();
              if (fName.includes('comparison') && hText.includes('vs')) return true;
              if (fName.includes('workflow') && (hText.includes('how') || hText.includes('process') || hText.includes('workflow'))) return true;
              if (fName.includes('example') && hText.includes('example')) return true;
              return false;
            });
            afterHeading = matchedHeading ? matchedHeading.text : headings[Math.floor(Math.random() * headings.length)].text;
          }
          
          mapping.supportingImages.push({
            src: publicPath,
            alt: altText,
            role,
            afterHeading
          });
        }
      });
      
      // Try to distribute headings evenly if many are mapped to the same heading
      if (headings.length > 0) {
          mapping.supportingImages.forEach((img, idx) => {
              img.afterHeading = headings[idx % headings.length].text;
          });
      }

      finalManifest[slug] = {
        cover: mapping.cover,
        sections: mapping.supportingImages
      };

    } else {
      report.missing++;
    }

    report.mappings[slug] = mapping;
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(finalManifest, null, 2));

  console.log(`Articles: ${report.totalArticles}`);
  console.log(`Mapped: ${report.mapped}`);
  console.log(`Missing: ${report.missing}`);
  console.log(`Images detected: ${report.imagesDetected}`);
  console.log(`Broken references: ${report.brokenReferences}`);
}

function generateAltText(title, role, filename) {
  let base = title.replace(/[^a-zA-Z0-9 ]/g, '');
  if (role.toLowerCase().includes('hero')) {
    return `${base} - Hero Feature`;
  }
  if (filename.includes('comparison')) {
    return `Comparison relating to ${base}`;
  }
  if (filename.includes('workflow')) {
    return `Workflow and process for ${base}`;
  }
  const prettyName = filename.replace(/\.(webp|jpg|png)$/, '').split('-').join(' ');
  return `${prettyName} for ${base}`;
}

main().catch(console.error);
