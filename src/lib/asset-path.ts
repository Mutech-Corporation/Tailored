const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public-folder path with the deploy base path. */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
