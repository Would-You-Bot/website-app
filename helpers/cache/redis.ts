"use server";
import { Redis } from "@upstash/redis"
import dotenv from "dotenv";
dotenv.config();


const redis = new Redis({
  url:  process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

const add = async (key: string, value: any) => {
  await redis.set(key, JSON.stringify(value));
};

const get = async (key: string) => {
  const value = await redis.get(key);

  value ? JSON.parse(value) : null;
};

const setServer = async (userId: string, servers: object | Array<object>) => {
  await redis.set(userId, JSON.stringify(servers));
};
const getServer = async (userId: string) => {
  let data = await redis.get(userId);
  console.log(data, "data");
  return data;
};

export { add, get, setServer, getServer };
