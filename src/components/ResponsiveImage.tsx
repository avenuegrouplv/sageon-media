import React, { useState, useEffect, useCallback } from 'react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widths?: number[];
  sizes?: string;
  containerClassName?: string;
}

function getFallbacks(originalSrc: string): string[] {
  if (!originalSrc || !originalSrc.startsWith('/')) return [];
  const list: string[] = [];
  const lastSlashIndex = originalSrc.lastIndexOf('/');
  const dir = originalSrc.slice(0, lastSlashIndex);
  const filename = originalSrc.slice(lastSlashIndex + 1);

  if (filename) {
    // 1. Same folder with capitalized first letter
    const capitalized = filename.charAt(0).toUpperCase() + filename.slice(1);
    list.push(`${dir}/${capitalized}`);

    // 2. Same folder with lowercase first letter
    const lowerFirst = filename.charAt(0).toLowerCase() + filename.slice(1);
    list.push(`${dir}/${lowerFirst}`);

    // 3. Same folder with all lowercase
    list.push(`${dir}/${filename.toLowerCase()}`);
  }

  // 4. Cross-folder fallback: if in /blog, check root
  if (originalSrc.startsWith('/blog/')) {
    const rootName = originalSrc.slice('/blog/'.length);
    list.push(`/${rootName}`);
    list.push(`/${rootName.toLowerCase()}`);
  }

  // 5. Cross-folder fallback: if in root, check /blog
  if (!originalSrc.startsWith('/blog/') && originalSrc.startsWith('/')) {
    const name = originalSrc.slice(1);
    list.push(`/blog/${name}`);
    list.push(`/blog/${name.toLowerCase()}`);
  }

  return Array.from(new Set(list)).filter((p) => p !== originalSrc);
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  widths,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className = '',
  containerClassName,
  width,
  height,
  style,
  onError,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [fallbacks, setFallbacks] = useState<string[]>([]);

  useEffect(() => {
    setCurrentSrc(src);
    setFallbackIndex(0);
    setFallbacks(getFallbacks(src));
  }, [src]);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackIndex < fallbacks.length) {
        const nextSrc = fallbacks[fallbackIndex];
        setFallbackIndex((prev) => prev + 1);
        setCurrentSrc(nextSrc);
      } else if (onError) {
        onError(e);
      }
    },
    [fallbackIndex, fallbacks, onError]
  );

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
      style={style}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default ResponsiveImage;




