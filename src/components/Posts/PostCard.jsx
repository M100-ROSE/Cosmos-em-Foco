import React from 'react';
import PropTypes from 'prop-types';

const PostCard = ({ post, onCardClick }) => {
  const { title, imageCover, date, excerpt, id } = post;
  
  return (
    <article
      className="post-card group bg-white/95 backdrop-filter: blur(5px) rounded-lg overflow-hidden border border-white/20 transition-all duration-300 hover:translate-y-4 hover:scale-102 hover:shadow-xl"
      onClick={() => onCardClick(id)}
    >
      {/* Imagem capa */}
      <div className="relative aspect-[16/9]">
        <img 
          src={imageCover} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Conteúdo sobre a imagem */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="max-w-none">
          <h3 className="text-base sm:text-sm font-serif font-medium text-[var(--night-light)] line-clamp-3 line-clamp-rows-3 mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-current" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 7h8l-2 2-6 6-6-6z"/>
              </svg>
              {date}
            </span>
          </div>
          {excerpt && (
            <p className="mt-1 text-gray-500 text-xs line-clamp-3 line-clamp-rows-3">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

PostCard.propTypes = {
  post: {
    title: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    id: PropTypes.string
  },
  onCardClick: PropTypes.func
};

export default PostCard;