import React from 'react';
import { Article } from '../data/articles';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to render formatted text with bold and hyperlinks
  const renderFormattedText = (text: string) => {
    // Split text into parts for bold and links
    const parts: Array<{ type: 'text' | 'bold'; content: string }> = [];
    let currentIndex = 0;
    
    // Match bold text (**text**)
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let boldMatch;
    
    while ((boldMatch = boldRegex.exec(text)) !== null) {
      // Add text before bold
      if (boldMatch.index > currentIndex) {
        parts.push({
          type: 'text',
          content: text.slice(currentIndex, boldMatch.index)
        });
      }
      
      // Add bold text
      parts.push({
        type: 'bold',
        content: boldMatch[1]
      });
      
      currentIndex = boldMatch.index + boldMatch[0].length;
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(currentIndex)
      });
    }
    
    // Render parts with formatting
    return parts.map((part, index) => {
      if (part.type === 'bold') {
        return (
          <strong key={index} style={{ fontWeight: '600' }}>
            {renderLinks(part.content)}
          </strong>
        );
      } else {
        return (
          <span key={index}>
            {renderLinks(part.content)}
          </span>
        );
      }
    });
  };

  // Function to render hyperlinks
  const renderLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: Array<{ type: 'text' | 'link'; content: string; url?: string }> = [];
    let currentIndex = 0;
    let linkMatch;
    
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      // Add text before link
      if (linkMatch.index > currentIndex) {
        parts.push({
          type: 'text',
          content: text.slice(currentIndex, linkMatch.index)
        });
      }
      
      // Add link
      parts.push({
        type: 'link',
        content: linkMatch[1],
        url: linkMatch[2]
      });
      
      currentIndex = linkMatch.index + linkMatch[0].length;
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(currentIndex)
      });
    }
    
    return parts.map((part, index) => {
      if (part.type === 'link') {
        // Check if it's a reference link or a URL link
        const isReferenceLink = /^\d+$/.test(part.content);
        const displayText = isReferenceLink ? part.content : 'Link';
        
        return (
          <a
            key={index}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#0066cc',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
            title={isReferenceLink ? `Reference ${part.content}` : part.url}
          >
            {displayText}
          </a>
        );
      } else {
        return <span key={index}>{part.content}</span>;
      }
    });
  };

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
      backgroundColor: '#fff'
    }}>
      {/* Back button */}
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#333',
            marginBottom: '20px'
          }}
        >
          ← Back to Articles
        </button>
      </div>

      {/* Article header */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{
          margin: '0 0 10px 0',
          fontSize: '28px',
          fontWeight: '600',
          color: '#333'
        }}>
          {article.title}
        </h1>
        
        <div style={{
          fontSize: '14px',
          color: '#666',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <span>Created: {formatDate(article.createdAt)}</span>
          <span>Source: {article.sourcePdf}</span>
          {article.metadata.pages > 0 && (
            <span>Pages: {article.metadata.pages}</span>
          )}
        </div>
      </div>

      {/* Article content */}
      <div style={{
        fontSize: '16px',
        lineHeight: '1.8'
      }}>
        {article.content.split('\n').map((line, index) => {
          // Render markdown headers
          if (line.startsWith('## ')) {
            return (
              <h2 key={index} style={{
                margin: '30px 0 15px 0',
                fontSize: '24px',
                fontWeight: '600',
                color: '#333',
                borderBottom: '2px solid #eee',
                paddingBottom: '10px'
              }}>
                {renderFormattedText(line.substring(3))}
              </h2>
            );
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={index} style={{
                margin: '25px 0 10px 0',
                fontSize: '20px',
                fontWeight: '600',
                color: '#444'
              }}>
                {renderFormattedText(line.substring(4))}
              </h3>
            );
          }
          
          // Render lists
          if (line.startsWith('- ')) {
            return (
              <div key={index} style={{
                margin: '10px 0',
                paddingLeft: '20px'
              }}>
                <span style={{ color: '#666' }}>•</span>
                <span style={{ marginLeft: '8px' }}>
                  {renderFormattedText(line.substring(2))}
                </span>
              </div>
            );
          }
          
          // Render numbered lists
          if (/^\d+\.\s/.test(line)) {
            return (
              <div key={index} style={{
                margin: '10px 0',
                paddingLeft: '20px'
              }}>
                <span style={{ color: '#666', fontWeight: '600' }}>
                  {line.match(/^\d+\./)?.[0]}
                </span>
                <span style={{ marginLeft: '8px' }}>
                  {renderFormattedText(line.replace(/^\d+\.\s/, ''))}
                </span>
              </div>
            );
          }
          
          // Regular paragraphs
          if (line.trim() === '') {
            return <div key={index} style={{ margin: '15px 0' }} />;
          }
          
          return (
            <p key={index} style={{
              margin: '0 0 15px 0',
              textAlign: 'justify'
            }}>
              {renderFormattedText(line)}
            </p>
          );
        })}
      </div>
      
      {/* Footer */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #eee',
        fontSize: '14px',
        color: '#666'
      }}>
        <p>
          <strong>Design Philosophy:</strong> Ultra-lightweight, minimalist design inspired by 
          <a href="https://thebestmotherfucking.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            thebestmotherfucking.website
          </a> and 
          <a href="http://bettermotherfuckingwebsite.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            bettermotherfuckingwebsite.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ArticleView; 