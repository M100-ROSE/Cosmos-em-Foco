import React from 'react';

function ArticleBody({ content }) {
  if (!Array.isArray(content)) return null;

  return (
    <div className="article-body">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index}>{block.text}</p>;

          case 'heading':
            return <h2 key={index}>{block.text}</h2>;

          case 'quote':
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
                {block.cite ? <cite>{block.cite}</cite> : null}
              </blockquote>
            );

          case 'list':
            return (
              <ul key={index}>
                {(block.items || []).map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default ArticleBody;
