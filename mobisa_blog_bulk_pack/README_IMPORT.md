# Mobisa Blog Bulk Pack

This package contains 60 SEO-oriented Mobisa blog drafts in MDX format.

## Contents
- `content/blog/` — 60 article files
- `blog-manifest.json` — structured metadata for all posts
- `categories.json` — category counts
- `image-briefs.csv` — 3 visual briefs per article (1 cover + 2 inline)
- `publication-plan.csv` — suggested staged release plan

## Important
All posts are intentionally set to `draft: true`.
Add all 60 to the codebase now, but only index/publish posts after reviewing them and attaching real visuals.

Your blog loader should:
1. Ignore `draft: true` in production listings, sitemap, RSS and category pages.
2. Support `/blog/[slug]`.
3. Read frontmatter dynamically.
4. Generate title/meta/canonical/OpenGraph/Article schema from frontmatter.
5. Render `relatedSlugs` as related articles.
6. Render images only when actual image paths have been attached.
7. Exclude draft posts from sitemap and structured-data collections.

## Recommended image workflow
Each post includes three image briefs:
- cover
- inline explanatory visual
- inline ad/workflow visual

Generate or design the images in batches, save them under:
`/public/blog/<slug>/`

Then populate:
- `coverImage`
- `coverAlt`
and add inline image components where appropriate.

## Publishing approach
The plan suggests 5 posts per day. Adjust based on Search Console indexing and quality review.
Do not publish low-value or near-duplicate pages just to increase page count.

## Editorial review before publish
For every article:
- verify product/platform claims
- add a real Mobisa example or original observation where possible
- attach custom images
- remove any wording that feels generic
- add 2–4 contextual internal links
- confirm search intent
- confirm canonical and metadata
- check mobile readability

## Suggested code-editor instruction
"Import all MDX files from this package. Keep every article as draft until `draft:false`. Build one dynamic `/blog/[slug]` renderer and never hand-code article pages individually."
