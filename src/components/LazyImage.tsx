import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

/**
 * LazyImage component that loads images only when they enter the viewport
 *
 * Uses IntersectionObserver API to detect when the image becomes visible.
 * This improves initial page load performance by deferring image loading
 * until needed, reducing bandwidth usage and improving user experience.
 *
 * Features:
 * - Loads images only when entering viewport (with 50px pre-load margin)
 * - Shows lightweight placeholder until real image loads
 * - Smooth fade-in transition when image loads
 * - Automatic cleanup of observers
 *
 * @example
 * <LazyImage src="https://example.com/image.jpg" alt="Product" />
 */
export function LazyImage({ src, alt, className, placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f1f5f9" width="400" height="300"/%3E%3C/svg%3E' }: LazyImageProps) {
  // Start with placeholder, swap to real image when visible
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (imgRef.current) {
      // Create observer that watches when element enters viewport
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If image is visible (or about to be), load the real image
            if (entry.isIntersecting) {
              setImageSrc(src);
              // Stop observing once we've triggered the load
              observer.unobserve(entry.target);
            }
          });
        },
        {
          // Start loading 50px before image enters viewport
          // This provides smoother experience as images are ready when scrolled to
          rootMargin: '50px',
        }
      );

      observer.observe(imgRef.current);
    }

    // Cleanup: stop observing when component unmounts
    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      onLoad={() => setIsLoaded(true)}
      style={{
        // Fade in effect when image loads
        opacity: isLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}
