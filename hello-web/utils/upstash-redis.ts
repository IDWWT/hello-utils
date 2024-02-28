import { Redis } from "@upstash/redis"

export default class RedisConnection {
  private static redisOptions = {
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_URL!,
  };

  static createRedisClinet(): Redis {
    return new Redis(this.redisOptions);
  }

  static async redisExecutor(
    callback: (
      redisClient: Redis
    ) => Promise<any> | void
  ) {
    let redisClient;
    let result: any;
    
    try {
      redisClient = this.createRedisClinet();
  
      result = await callback(redisClient);
    } catch (err) {
      // check: 에러 로그를 어떻게 남길 것일지 논의 필요
      throw err;
    }
    return result;
  }
}
