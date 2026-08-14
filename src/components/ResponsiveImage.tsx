import React, { useState, useEffect } from 'react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widths?: number[];
  sizes?: string;
  containerClassName?: string;
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
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    setCurrentSrc(src);
    setAttempt(0);
  }, [src]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (attempt === 0) {
      setAttempt(1);
      // Toggle case as first fallback
      const toggled = currentSrc.startsWith('/') && currentSrc.length > 1
        ? currentSrc[1] === currentSrc[1].toUpperCase()
          ? '/' + currentSrc[1].toLowerCase() + currentSrc.slice(2)
          : '/' + currentSrc[1].toUpperCase() + currentSrc.slice(2)
        : currentSrc;
      setCurrentSrc(toggled);
    } else if (attempt === 1) {
      setAttempt(2);
      // Append cache buster
      const sep = currentSrc.includes('?') ? '&' : '?';
      setCurrentSrc(`${src}${sep}v=${Date.now()}`);
    } else if (onError) {
      onError(e);
    }
  };

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




