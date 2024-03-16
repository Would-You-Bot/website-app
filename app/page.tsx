import React from "react";

import { HomeContent } from "@/components/Homepage/HomeContent";
import { HomeSchemaMetadata } from "@/components/Homepage/HomeSchemaMetadata";
import { getRandomQuestion } from "@/helpers/getRandomQuestion";

const Home = async () => {
  const response = await fetch(
    "https://japi.rest/discord/v1/application/981649513427111957/",
  );

  const data = await response.json();
  const serverCount = data.data.bot.approximate_guild_count ?? 0;

  return (
    <>
      <main className="mt-48 overflow-x-hidden text-neutral-300">
        <HomeContent
          initialQuestion={getRandomQuestion()}
          serverCount={serverCount}
        />
      </main>
      <HomeSchemaMetadata />
    </>
  );
};

export default Home;
