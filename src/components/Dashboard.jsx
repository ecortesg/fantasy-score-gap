import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api/statistics";
import { dashboardData } from "../dashboardData";
import Table from "./Table";
import Graph from "./Graph";
import Diagram from "./Diagram";
import { useQueryFiltersStore } from "../store/queryFiltersStore";
import { useLeague1Store, useLeague2Store } from "../store/leagueSettingsStore";
import { useGraphSettingsStore } from "../store/graphSettingsStore";
import { LoadingSpinner } from "./LoadingSpinner";

function Dashboard() {
  const queryFilters = useQueryFiltersStore((state) => state.queryFilters);

  const settingsLeague1 = useLeague1Store((state) => state.settings);

  const settingsLeague2 = useLeague2Store((state) => state.settings);

  const positions = useGraphSettingsStore((state) => state.positions);

  const statsQuery = useQuery({
    queryKey: ["stats", queryFilters],
    queryFn: () => getStatistics(queryFilters),
  });

  if (statsQuery.status === "loading") return <LoadingSpinner />;

  if (statsQuery.status === "error") {
    return <p className="p-5">{JSON.stringify(statsQuery.error)}</p>;
  }
  if (statsQuery.data.length === 0) {
    return (
      <h1 className="text-center text-lg font-bold p-5">
        No data
        <br />
        Please select another week or season
      </h1>
    );
  }

  const { fpts, fpts_rank, fpts_avg } = dashboardData(
    statsQuery.data,
    settingsLeague1,
    settingsLeague2,
    positions
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-5 p-5 h-full lg:h-screen">
      <div className="bg-white lg:col-span-9 lg:row-span-1 rounded-lg shadow-lg">
        <Graph data={fpts_rank} />
      </div>
      <div className="bg-white lg:col-span-3 lg:row-span-1 rounded-lg shadow-lg">
        <Diagram data={fpts_avg} />
      </div>
      <div className="bg-white lg:col-span-12 lg:row-span-1 rounded-lg h-[600px] lg:h-auto shadow-lg">
        <Table data={fpts} />
      </div>
    </div>
  );
}

export default Dashboard;
