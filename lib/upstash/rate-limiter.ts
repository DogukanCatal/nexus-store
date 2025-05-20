import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

export const ratelimitCheckout = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  analytics: true,
  timeout: 2000,
});

export const ratelimitEmailSendCode = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 m"),
  analytics: true,
  timeout: 2000,
});

export const ratelimitEmailVerifyCode = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "5 m"),
  analytics: true,
  timeout: 2000,
});
