import { Mixedbread } from "@mixedbread/sdk";
import type { ScoredImageURLInputChunk } from "@mixedbread/sdk/resources";
import { NextResponse } from "next/server";

const mxbai = new Mixedbread({
  apiKey: process.env.MXBAI_API_KEY || "",
});

export interface SearchResult {
  url: string;
  id: string;
  score: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const response = await mxbai.stores.search({
      query,
      // biome-ignore lint/style/noNonNullAssertion: MXBAI_STORE_ID is required and validated at build time
      store_identifiers: [process.env.MXBAI_STORE_ID!],
      top_k: 18,
    });

    const imageResults = response.data.filter(
      (result): result is ScoredImageURLInputChunk =>
        result.type === "image_url",
    );

    const results: SearchResult[] = imageResults.map((result, index) => ({
      url: result.image_url.url,
      id: `${result.file_id}-${index}`,
      score: result.score,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search images" },
      { status: 500 },
    );
  }
}
