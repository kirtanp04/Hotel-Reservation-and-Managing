import { Skeleton, styled } from "@mui/material";
import React, { useState } from "react";
import LazyLoad from "react-lazyload";

interface TProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  alt: string;
}

function LazyImage({ src, alt, ...other }: TProps) {
  const [loading, setLoading] = useState(true);

  return (
    <LazyLoad style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      {loading && <Skeleton variant="rectangular" width="100%" height="100%" />}
      <Image
        src={src}
        alt={alt}
        onLoad={() =>
          setTimeout(() => {
            setLoading(false);
          }, 1500)
        }
        onError={() =>
          setTimeout(() => {
            setLoading(false);
          }, 1500)
        }
        style={{ display: loading ? "none" : "block" }}
        {...other}
      />
    </LazyLoad>
  );
}

export default LazyImage;

const Image = styled("img")(() => ({
  objectFit: "fill",
  borderRadius: "15px",
}));
