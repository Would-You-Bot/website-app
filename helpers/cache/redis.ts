import { createClient } from "redis";

const client = createClient({
  socket: {
    reconnectStrategy: (retries) => {
      if (retries < 10) {
        return Math.min(retries * 50, 500);
      } else {
        return new Error("Max retries reached");
      }
    },
  },
});

client.on("error", (err) => console.log("Redis Client Error:", err));

async function initializeRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

initializeRedis();

const add = async (key: string, value: any) => {
  await client.set(key, JSON.stringify(value));
};

const get = async (key: string) => {
  const value = await client.get(key);

  return value ? JSON.parse(value) : null;
};

const setServer = async (userId: string, servers: object | Array<object>) => {
  await client.set(userId, JSON.stringify({ servers: [] }));
};
const getServers = async (userId: string) => {
  const data: string | null = await client.get(userId);
    if (!data) {
        return [];
    }
  return JSON.parse(data);
};

export { add, get, setServer, getServers };
