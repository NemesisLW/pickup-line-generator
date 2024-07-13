import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createClient } from "./supabase/server";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(3, "30 m"),
});

export async function rateLimiter() {
  // userId from supabase AUTH
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error("Failed to get user");
  }

  if (!data.user?.id) {
    throw new Error("User ID not found");
  }

  const identifier = data.user?.id!;
  const { success, limit, remaining, reset } =
    await ratelimit.limit(identifier);

  return {
    success,
    limit,
    remaining,
    reset,
    error: success ? null : "Rate limit exceeded",
  };
}
