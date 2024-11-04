import {Ratelimit} from "@upstash/ratelimit";
import {redis} from "./redis";

const defautlRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "60 s")
})

const createRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s")
})

export {defautlRateLimiter, createRateLimiter}
