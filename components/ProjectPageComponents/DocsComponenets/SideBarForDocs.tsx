
import React from 'react';

interface HeadingStructure {
  tag: 'h1' | 'h2' | 'h3' | 'h4';
  text: string;
}

const SideBarForDocs = ({ content }: { content: string }) => {
  const extractHeadings = (htmlContent: string): HeadingStructure[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Collect all headings (h1, h2, h3, h4)
    const headings: HeadingStructure[] = [];
    console.log("🚀 ~ extractHeadings ~ headings:", headings)
    doc.querySelectorAll('h1, h2, h3, h4').forEach((heading) => {
      headings.push({
        tag: heading.tagName.toLowerCase() as 'h1' | 'h2' | 'h3' | 'h4',
        text: heading.textContent || '',
      });
    });
    console.log("🚀 ~ extractHeadings ~ headings:", headings)
    return headings;
  };

  const headings = extractHeadings(content);

  return (
    <ul>
      {headings.map((heading, index) => {
        const level = parseInt(heading.tag.replace('h', ''), 10);
        const styles = {
          marginLeft: `${(level - 1) * 20}px`,
          fontSize: `${24 - (level - 1) * 2}px`,
          listStyleType: level > 1 ? 'disc' : 'none',
        };

        return (
          <li key={index} style={styles}>
            {heading.text}
          </li>
        );
      })}
    </ul>
  );
};

export default SideBarForDocs;
