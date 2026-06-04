import type { ImgHTMLAttributes } from "react";

type ViteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
};

export default function Image({
  fill,
  priority,
  style,
  loading,
  ...props
}: ViteImageProps) {
  return (
    <img
      loading={priority ? "eager" : loading}
      decoding={priority ? "sync" : "async"}
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
