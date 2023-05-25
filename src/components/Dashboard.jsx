import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api/statistics";
import { dashboardData } from "../dashboardData";
import Table from "./Table";
import Graph from "./Graph";
import Diagram from "./Diagram";

function Dashboard({ dataFilters, valuesLeague1, valuesLeague2 }) {
  const statsQuery = useQuery({
    queryKey: ["stats", dataFilters],
    queryFn: () => getStatistics(dataFilters),
  });

  if (statsQuery.status === "loading")
    return <h1 className="text-center text-lg font-bold p-5">Loading...</h1>;
  if (statsQuery.status === "error") {
    return <p className="p-5">{JSON.stringify(statsQuery.error)}</p>;
  }
  if (statsQuery.data.length === 0) {
    return (
      <h1 className="text-center text-lg font-bold p-5">
        No data
        <br />
        Please select another season or week
      </h1>
    );
  }

  const { fpts, fpts_rank, fpts_avg } = dashboardData(
    statsQuery.data,
    valuesLeague1,
    valuesLeague2
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
      <div className="bg-white lg:col-span-9 rounded-lg shadow-lg h-[450px]">
        <Graph data={fpts_rank} />
      </div>
      <div className="bg-white lg:col-span-3 rounded-lg shadow-lg h-[450px]">
        <Diagram data={fpts_avg} />
      </div>
      <div className="bg-white lg:col-span-12 rounded-lg shadow-lg max-h-[500px] overflow-y-scroll">
        <Table data={fpts} />
      </div>
    </div>
  );
}

export default Dashboard;
