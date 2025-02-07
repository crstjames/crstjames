import fs from "fs";
import path from "path";

export function loadMarkdown(filename: string): string {
  const filePath = path.join(process.cwd(), "assets", filename);
  return fs.readFileSync(filePath, "utf-8");
}
