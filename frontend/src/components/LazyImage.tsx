import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean; // for above-fold images
  width?: number;
  height?: number;
  [key: string]: any;
}

// Optimize Unsplash URLs for fast loading
const optimizeImageUrl = (url: string, width = 400): string => {
  if (!url) return '';
  
  // Unsplash optimization
  if (url.includes('unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=format&fit=crop&q=75&w=${width}&fm=webp`;
  }
  
  return url;
};

const FALLBACK = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=75&w=400&fm=webp';

const LazyImage = ({
  src,
  alt,
  className = '',
  eager = false,
  width = 400,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager); // eager = load immediately
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const optimizedSrc = optimizeImageUrl(error ? FALLBACK : src, width);

  useEffect(() => {
    if (eager) return; // skip observer for eager images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 } // start loading 200px before visible
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Skeleton shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
        </div>
      )}

      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={() => { setError(true); setIsLoaded(true); }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
