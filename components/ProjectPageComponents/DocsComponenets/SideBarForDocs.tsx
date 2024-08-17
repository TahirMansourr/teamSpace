import React from 'react';

const SideBarForDocs = ({ content }: { content: string }) => {
  
  const extractHeadings = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h1');
    return Array.from(headings).map((heading) => heading.textContent);
  };

  const headings = extractHeadings(content);

  return (
    <>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <h6>{heading}</h6>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideBarForDocs;
