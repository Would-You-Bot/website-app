"use server"
const testServers = async () => {
    const token = await getAuthTokenOrNull();
    const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${token?.payload.discord.access_token}`,
      },

    });
    const data = await response.json();
    console.log(data);
    return data;
  }
export default testServers;