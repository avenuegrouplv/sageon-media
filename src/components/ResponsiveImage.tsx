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
};

export default ResponsiveImage;


