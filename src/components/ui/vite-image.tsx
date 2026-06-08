import type { ImgHTMLAttributes } from "react";

type ViteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

export default function Image({
  fill,
  priority,
  style,
  loading,
  fetchPriority,
  src,
  srcSet,
  sizes,
  ...props
}: ViteImageProps) {
  const isMainLogo = src === "/logo.png";

  return (
    <img
      src={isMainLogo ? "/logo-180.png" : src}
      srcSet={
        srcSet ??
        (isMainLogo
          ? "/logo-180.png 180w, /logo-300.png 300w, /logo-600.png 600w, /logo.png 1500w"
          : undefined)
      }
      sizes={sizes ?? (isMainLogo ? "(max-width: 620px) 142px, 249px" : undefined)}
      loading={priority ? "eager" : loading}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : fetchPriority}
      style={{
        ...(fill
          ? {
              position: "absolute",
              inset: 0,
              height: "100%",
              width: "100%",
            }
          : null),
        ...style,
      }}
      {...props}
    />
  );
}
