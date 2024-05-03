"use server";

import { DiscordGuild } from "../_types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SelectItem } from "@/components/ui/select";
import { getServer } from "@/helpers/cache/redis";
import Image from "next/image";
import { useEffect, useState } from "react";

export async function ServersList() {
  const [serversData, setServersData] = useState<DiscordGuild[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const servers: any = await getServer();
      console.log(servers, "servers");
      setServersData(servers);
    };

    fetchData();
  }, []);

  return (
    <>
      {serversData.map((server: DiscordGuild) => (
        <SelectItem key={server.id} value={server.id}>
          <div className="flex gap-2 items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`}
              />
              <AvatarFallback>
                <Image
                  src="https://cdn.discordapp.com/embed/avatars/5.png"
                  alt="avatar example"
                  width={999}
                  height={999}
                />
              </AvatarFallback>
            </Avatar>
            <span>{server.name}</span>
          </div>
        </SelectItem>
      ))}
    </>
  );
}
