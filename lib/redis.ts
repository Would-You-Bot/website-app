"use server";
import { getAuthTokenOrNull } from "@/helpers/oauth/helpers";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

const add = async (key: string, value: any) => {
  await redis.set(key, JSON.stringify(value));
};

const get = async (key: string) => {
  const data = await redis.get(key);

  return data;
};

const setServer = async (
  userId: string | undefined,
  servers: object | Array<object>,
) => {
  const authToken = await getAuthTokenOrNull();

  if (!authToken) return null;

  const { id } = authToken.payload;

  if (!userId) {
    userId = id;
  }
  await redis.set(userId, JSON.stringify(servers));
};
const getServer = async () => {
  const authToken = await getAuthTokenOrNull();

  if (!authToken) return null;

  const { id } = authToken.payload;

  let data = await redis.get(id);

  return data;
};

export { add, get, getServer, setServer };
