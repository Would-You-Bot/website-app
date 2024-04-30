"use server"
const testServers = async (auth: any) => {
    const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${auth?.payload.exp}`,
      },
    
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
export default testServers;