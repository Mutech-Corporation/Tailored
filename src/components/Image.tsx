"use client";

import NextImage, { type ImageProps } from "next/image";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Drop-in replacement for next/image that prepends the deploy base path
 * to string `src` values. With `output: "export"` + `unoptimized: true`,
 * Next.js does NOT auto-prefix basePath on image src — this wrapper fixes that.
 */
export default function Image({ src, ...rest }: ImageProps) {
  const prefixedSrc =
    typeof src === "string" && BASE_PATH && !src.startsWith(BASE_PATH)
      ? `${BASE_PATH}${src}`
      : src;

  return <NextImage src={prefixedSrc} {...rest} />;
}
