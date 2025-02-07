import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const contentDirectory = path.join(process.cwd(), "content");
    const filePath = path.join(contentDirectory, "resume.md");
    const fileContents = await fs.readFile(filePath, "utf8");

    if (!fileContents) {
      throw new Error("Resume content is empty");
    }

    return new NextResponse(fileContents);
  } catch (error) {
    console.error("Error reading resume file:", error);
    return new NextResponse(
      `Error loading resume content: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    );
  }
}
