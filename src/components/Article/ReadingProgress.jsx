import React, { useEffect, useState } from 'react';

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = 0;

    const update = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = documentHeight > 0 ? window.scrollY / documentHeight : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span className="reading-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export default ReadingProgress;
