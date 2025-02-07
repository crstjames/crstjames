import { loadMarkdown } from "@/utils/loadMarkdown";
import { NextResponse } from "next/server";

export async function GET() {
  const content = loadMarkdown("stjames-resume.md");
  return new NextResponse(content);
}
