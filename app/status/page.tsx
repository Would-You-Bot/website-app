const Status = async () => {
  const cluster = await fetch(
    process.env.API_URL!,
    {
      method: 'GET',
      headers: {
        Authorization: process.env.API_KEY!,
      },
      cache: 'no-cache',
    },
  )

  const clusterData = await cluster.json()

  // Formula to calculate the shardid from the guild id
  // shard_id = (guild_id >> 22) % num_shards
  // Might need to be moved to a simple api route to be used in the frontend
  const shardFromGuild = (guildId: string) => (parseInt(guildId) >> 22) % clusterData.flat().length

return (
<div className="p-8 min-h-screen">
  <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">Bot Clusters Status</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {clusterData.map((cluster: any[], clusterIndex: number) => (
      <div key={clusterIndex} className="bg-background-dark rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-100 text-center">Cluster {clusterIndex}</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 border border-gray-600 text-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-600 text-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-600 text-gray-300">Ping (ms)</th>
              <th className="px-4 py-2 border border-gray-600 text-gray-300">Guilds</th>
              <th className="px-4 py-2 border border-gray-600 text-gray-300">Members</th>
            </tr>
          </thead>
          <tbody>
            {cluster.map((data: any) => (
              <tr key={data.id} className={`hover:bg-gray-700 ${data.status === 0 ? 'bg-green-900' : 'bg-red-900'}`}>
                <td className="px-4 py-2 border border-gray-600 text-gray-200 text-center">{data.id}</td>
                <td className="px-4 py-2 border border-gray-600 text-center">
                  <span className={data.status === 0 ? 'text-green-400' : 'text-red-400'}>
                    {data.status === 0 ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-600 text-gray-200 text-center">{data.ping} ms</td>
                <td className="px-4 py-2 border border-gray-600 text-gray-200 text-center">{data.guilds}</td>
                <td className="px-4 py-2 border border-gray-600 text-gray-200 text-center">{data.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
</div>
  );
}

export default Status;
