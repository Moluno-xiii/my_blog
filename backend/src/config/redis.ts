import { createClient } from "redis";
import { RedisStore } from "connect-redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "blogApp",
});

export { redisClient };

export default redisStore;
