import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api/statistics";
import { dashboardData } from "../dashboardData";
import Table from "./Table";
import Graph from "./Graph";
import Diagram from "./Diagram";
import { useQueryFiltersStore } from "../store/queryFiltersStore";
import {
  useLeague1Store,
  useLeague2Store,
} from "../store/scoringSettingsStore";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { LoadingSpinner } from "./LoadingSpinner";

function Dashboard() {
  const queryFilters = useQueryFiltersStore((state) => state.queryFilters);

  const settingsLeague1 = useLeague1Store((state) => state.settings);

  const settingsLeague2 = useLeague2Store((state) => state.settings);

  const positions = useDashboardSettingsStore((state) => state.positions);

  const statsQuery = useQuery({
    queryKey: ["stats", queryFilters],
    queryFn: () => getStatistics(queryFilters),
  });

  if (statsQuery.status === "loading") return <LoadingSpinner />;

  if (statsQuery.status === "error") {
    return <p className="p-4">{JSON.stringify(statsQuery.error)}</p>;
  }
  if (statsQuery.data.length === 0) {
    return (
      <h1 className="text-center text-xl font-bold p-4">
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
    <div className="grid grid-cols-1 xl:grid-cols-12 xl:grid-rows-2 gap-6 p-6 h-full xl:h-screen">
      <div className="bg-white xl:col-span-9 xl:row-span-1 rounded-xl shadow-xl z-20 h-[500px] xl:h-auto">
        <Graph data={fpts_rank} />
      </div>
      <div className="bg-white xl:col-span-3 xl:row-span-1 rounded-xl shadow-xl h-[500px] xl:h-auto">
        <Diagram data={fpts_avg} />
      </div>
      <div className="bg-white xl:col-span-12 xl:row-span-1 rounded-xl shadow-xl h-[80vh] xl:h-auto">
        <Table data={fpts} />
      </div>
    </div>
  );
}

export default Dashboard;
