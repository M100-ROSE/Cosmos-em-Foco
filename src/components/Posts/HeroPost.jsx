import React from 'react';
import PropTypes from 'prop-types';

const HeroPost = ({ post }) => {
  const { title, imageCover, date, excerpt, id } = post;
  
  return (
    <article 
      className="hero-post relative w-full rounded-lg mb-8 sm:mb-12 overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {/* Imagem capa com overlay gradient */}
      <div className="hero-image relative aspect-[16/9]">
        <img 
          src={imageCover} 
          alt={title} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Conteúdo do post */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-8">
        <div className="max-w-md">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            {date && <span>{date}</span>}
          </div>
        </div>
      </div>
    </article>
  );
};

HeroPost.propTypes = {
  post: {
    title: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    id: PropTypes.string
  }
};

export default HeroPost;