import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Static Archivo instances (cut from the variable font in app/fonts) for the
 * build-time share images: the image renderer reads TTF, not variable WOFF2.
 */
export function ogFonts() {
  const read = (file: string) => readFileSync(join(process.cwd(), "app", "fonts", file));
  return [
    { name: "Archivo", data: read("archivo-og-800.ttf"), weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: read("archivo-og-500.ttf"), weight: 500 as const, style: "normal" as const },
  ];
}
