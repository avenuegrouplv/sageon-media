import React from 'react';

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
  widths = [400, 800, 1200],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className = '',
  containerClassName = '',
  width,
  height,
  style,
  onError,
  ...rest
}) => {
  // If not a local webp image, fallback to normal img tag
  if (!src || !src.startsWith('/') || !src.endsWith('.webp')) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        onError={onError}
        {...rest}
      />
    );
  }

  const basePath = src.substring(0, src.lastIndexOf('.'));

  const avifSrcSet = widths.map((w) => `${basePath}-${w}w.avif ${w}w`).join(', ');
  const webpSrcSet = widths.map((w) => `${basePath}-${w}w.webp ${w}w`).join(', ');

  return (
    <picture className={containerClassName} style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        onError={onError}
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;
