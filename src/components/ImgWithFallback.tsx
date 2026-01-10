type Props = {
  src: string;
  alt: string;
  className: string;
};

export default function ImageWithFallback({ src, alt, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "https://placehold.co/400x600?text=Failed+To+Load+Image";
      }}
    />
  );
}
