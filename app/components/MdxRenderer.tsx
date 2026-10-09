import React from "react";
import Link from "next/link";
import Image from "next/image";

interface MdxRendererProps {
  content: string;
}

export default function MdxRenderer({ content }: MdxRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const parseInline = (text: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    const inlineRegex =
      /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[(.+?)\]\((.+?)\))|(`(.+?)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = inlineRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        nodes.push(<strong key={`b-${match.index}`}>{match[2]}</strong>);
      } else if (match[3]) {
        nodes.push(<em key={`i-${match.index}`}>{match[4]}</em>);
      } else if (match[5]) {
        const href = match[7];
        const isExternal =
          href.startsWith("http") && !href.includes("mobisa.in");
        nodes.push(
          <Link
            key={`a-${match.index}`}
            href={href}
            className="article-link"
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {match[6]}
          </Link>
        );
      } else if (match[8]) {
        nodes.push(
          <code key={`c-${match.index}`} className="article-inline-code">
            {match[9]}
          </code>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes.length > 0 ? nodes : [text];
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
      elements.push(
        <Tag key={key++} className={`article-h${level}`}>
          {parseInline(text)}
        </Tag>
      );
      i++;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={key++} className="article-hr" />);
      i++;
      continue;
    }

    if (line.trimStart().startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("> ")) {
        quoteLines.push(lines[i].trimStart().replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="article-blockquote">
          <p>{parseInline(quoteLines.join(" "))}</p>
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line.trimStart())) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trimStart())) {
        items.push(
          <li key={`li-${key}-${items.length}`}>
            {parseInline(lines[i].trimStart().replace(/^[-*]\s+/, ""))}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={key++} className="article-ul">
          {items}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line.trimStart())) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trimStart())) {
        items.push(
          <li key={`oli-${key}-${items.length}`}>
            {parseInline(lines[i].trimStart().replace(/^\d+\.\s+/, ""))}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={key++} className="article-ol">
          {items}
        </ol>
      );
      continue;
    }

    const imgMatch = line.match(/^!\[(.*?)\]\((.+?)\)/);
    if (imgMatch) {
      elements.push(
        <figure key={key++} className="article-figure">
          <Image
            src={imgMatch[2]}
            alt={imgMatch[1] || 'Article image'}
            className="article-img"
            loading="lazy"
            width={800}
            height={600}
          />
          {imgMatch[1] && (
            <figcaption className="article-figcaption">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^#{1,6}\s/) &&
      !lines[i].trimStart().startsWith("> ") &&
      !/^[-*]\s+/.test(lines[i].trimStart()) &&
      !/^\d+\.\s+/.test(lines[i].trimStart()) &&
      !lines[i].match(/^!\[/) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="article-p">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return <div className="article-body">{elements}</div>;
}
