import React, { useState } from 'react';
import { samplePosts } from './data/samplePosts';
import Header from './components/Header/Header';
import HeroPost from './components/Posts/HeroPost';
import PostCard from './components/Posts/PostCard';
import SearchBar from './components/Shared/SearchBar';
import './styles/global.css';

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Buscando por:', query);
    // Aquiiria disparar uma busca real
    setSearchOpen(false);
  };
  
  const handleCardClick = (id) => {
    const post = samplePosts.find(p => p.id === id);
    if (post) {
      alert(`Lendo: ${post.title}`);
      // Em um app real, navegar para a página do post
    }
  };
  
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header 
        searchOpen={searchOpen} 
        onSearch={() => setSearchOpen(true)} 
        onClose={() => setSearchOpen(false)} 
      />
      
      {/* SearchBar */}
      <SearchBar 
        onSearch={handleSearch} 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
      
      {/* Área Principal */}
      <main className="main-content">
        {/* Seção de Destaque */}
        <section className="section">
          <h2 className="section-title">Em Destaque</h2>
          
          {/* Post em Destaque (Hero) */}
          {samplePosts[0] && (
            <HeroPost post={samplePosts[0]} />
          )}
        </section>
        
        {/* Grid de Posts Recentes */}
        <section className="section" style={{ backgroundColor: var(--night-medium) }}>
          <h2 className="section-title text-center mb-8">Posts Recentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {samplePosts.slice(1).map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;