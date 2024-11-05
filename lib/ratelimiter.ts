import { Ratelimit } from '@upstash/ratelimit'
import { getRedis } from './redis'

const redis = await getRedis()

const defautlRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '60 s')
})

const createRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '60 s')
})

export { defautlRateLimiter, createRateLimiter }
