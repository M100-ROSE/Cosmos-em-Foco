import React, { useEffect, useState } from 'react';

/**
 * Imagem com fallback visual: se o arquivo remoto falhar, mostra um bloco
 * com gradiente cósmico e estrela, preservando o texto alternativo.
 */
function FallbackImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchpriority,
  sizes,
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    const fallbackA11y = alt
      ? { role: 'img', 'aria-label': alt }
      : { 'aria-hidden': true };

    return (
      <div className={`media-fallback ${className}`.trim()} {...fallbackA11y}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchpriority={fetchpriority}
      sizes={sizes}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default FallbackImage;
