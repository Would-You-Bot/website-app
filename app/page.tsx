import React from "react";

import { HomeContent } from "@/components/Homepage/Content";
import { HomeSchemaMetadata } from "@/components/Homepage/SchemaMetadata";
import { getRandomQuestion } from "@/helpers/getRandomQuestion";

const Home = async () => {
  const response = await fetch(
    "https://japi.rest/discord/v1/application/981649513427111957/"
  );

  const data = await response.json();
  const serverCount = data.data.bot.approximate_guild_count ?? 0;

  const serverResponse = await fetch(
    "https://liberal-snail-47202.upstash.io/get/server_count",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.UPSTASH_API_KEY,
      },
    }
  );

  const serverData = await serverResponse.json();

  return (
    <>
      <main className="flex flex-col w-full items-center mt-48 overflow-x-hidden text-neutral-300">
        <HomeContent
          initialQuestion={getRandomQuestion()}
          serverCount={serverCount}
          servers={JSON.parse(serverData.result).filter(
            (g: any) => g.name !== "Pornhub"
          )}
        />
      </main>
      <HomeSchemaMetadata />
    </>
  );
};

export default Home;
