import { RedisClientOptions, createClient } from "redis";

export default class RedisConnection {
  private static redisOptions: RedisClientOptions = {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  };

  static createRedisClinet() {
    return createClient(this.redisOptions);
  }

  static async redisExecutor(
    callback: (
      redisClient: ReturnType<typeof createClient>
    ) => Promise<any> | void
  ) {
    let redisClient;
    let result: any;
    
    try {
      redisClient = this.createRedisClinet();
      await redisClient.connect();
  
      result = await callback(redisClient);
    } catch (err) {
      // check: 에러 로그를 어떻게 남길 것일지 논의 필요
      throw err;
    } finally {
      if (redisClient) redisClient.disconnect();
    }
    return result;
  }
}
