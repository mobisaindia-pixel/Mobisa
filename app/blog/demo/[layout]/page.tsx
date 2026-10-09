import { notFound } from "next/navigation";
import ArticlePageClient from "../../[slug]/ArticlePageClient";
import type { BlogPostMeta, LayoutMode } from "@/lib/blog";

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ layout: string }> }) {
  const { layout } = await params;
  
  if (!["visual", "mixed", "text"].includes(layout)) {
    notFound();
  }
  
  const layoutMode = layout as LayoutMode;

  const demoMeta: BlogPostMeta = {
    title: `Demo Article: ${layoutMode.charAt(0).toUpperCase() + layoutMode.slice(1)} Mode`,
    slug: `demo-${layoutMode}`,
    description: "This is a development demo showing the new Mobisa editorial layout modes.",
    category: "Demo",
    primaryKeyword: "demo",
    searchIntent: "informational",
    author: "Mobisa",
    publishedAt: new Date().toISOString(),
    draft: true,
    featured: false,
    featuredImage: "",
    featuredImageAlt: "",
    relatedSlugs: [],
    imageBriefs: [],
    readingTime: 4,
    layoutMode,
    recipe: layoutMode === "visual" ? "playbook" : layoutMode === "text" ? "analysis" : "comparison",
    visualDensity: layoutMode === "visual" ? 5 : layoutMode === "text" ? 2 : 3,
    visualStyle: "editorial-product",
  };

  return (
    <ArticlePageClient post={demoMeta} relatedPosts={[]}>
      <h2>The short version</h2>
      <p>
        This page demonstrates the <strong>{layoutMode}</strong> layout mode. Notice how the typography, spacing, and maximum reading width adjust to suit the content density.
      </p>
      
      {layoutMode === "text" && (
        <blockquote className="article-pull-quote">
          <p>"A highly text-heavy article requires narrower reading widths and distinct typography to maintain premium editorial feel."</p>
          <cite>— Mobisa Design Team</cite>
        </blockquote>
      )}

      <h3>Key Principles</h3>
      <p>
        The content here is driven by MDX, utilizing our custom coded components. For example, below is a checklist component rendered without images.
      </p>

      <div className="article-checklist">
        <h4 className="checklist-title">Layout Guidelines</h4>
        <ul className="checklist-items">
          <li className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span className="checklist-text">Use visual mode for high-impact creative playbooks.</span>
          </li>
          <li className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span className="checklist-text">Use mixed mode for balanced guides and comparisons.</span>
          </li>
          <li className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span className="checklist-text">Use text mode for deep strategic analysis and budgets.</span>
          </li>
        </ul>
      </div>

      {layoutMode === "mixed" && (
        <>
          <h3>Comparison Matrix</h3>
          <p>This layout is perfect for side-by-side analysis using coded SVG/HTML components rather than raster images.</p>
          <div className="article-comparison-table-wrap">
            <table className="article-comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Visual Mode</th>
                  <th>Text Mode</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-feature">Reading Width</td>
                  <td>1200px</td>
                  <td>780px</td>
                </tr>
                <tr>
                  <td className="table-feature">Typography</td>
                  <td>Large & Bold</td>
                  <td>Dense & Legible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {layoutMode === "visual" && (
        <>
          <h3>Creative Framework</h3>
          <p>A visual framework flow component that explains the concept directly in HTML/CSS.</p>
          <div className="article-framework-flow">
            <div className="framework-step"><span className="framework-number">1</span><span className="framework-text">Hook</span></div>
            <div className="framework-arrow">→</div>
            <div className="framework-step"><span className="framework-number">2</span><span className="framework-text">Show</span></div>
            <div className="framework-arrow">→</div>
            <div className="framework-step"><span className="framework-number">3</span><span className="framework-text">Story</span></div>
            <div className="framework-arrow">→</div>
            <div className="framework-step"><span className="framework-number">4</span><span className="framework-text">Prove</span></div>
            <div className="framework-arrow">→</div>
            <div className="framework-step"><span className="framework-number">5</span><span className="framework-text">Convert</span></div>
          </div>
        </>
      )}
    </ArticlePageClient>
  );
}
