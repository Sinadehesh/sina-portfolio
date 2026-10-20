import type { APIRoute } from "astro";
import { buildLlmsTxt } from "@/lib/llms";

export const GET: APIRoute = () =>
  new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
