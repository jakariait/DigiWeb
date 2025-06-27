"use client";

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const ImageComponent = ({
  imageName,
  className = "",
  altName = "",
  skeletonHeight = 200,
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageName && process.env.NEXT_PUBLIC_API_URL) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");
      setImageSrc(`${baseUrl}/uploads/${imageName}`);
    }
  }, [imageName]);

  return (
    <div>
      {isLoading && <Skeleton height={skeletonHeight} width="100%" />}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={altName}
          className={className}
          style={{ display: isLoading ? "none" : "block" }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setImageSrc(""); // fallback to empty string on error
          }}
        />
      )}
    </div>
  );
};

export default ImageComponent;
