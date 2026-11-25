import { rssResponse } from "@/lib/resources/rss";

export const dynamic = "force-static";

export function GET(): Response {
  return rssResponse("es");
}
