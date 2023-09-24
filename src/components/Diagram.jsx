import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ToggleSwitch from "./ToggleSwitch";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import SummaryTable from "./SummaryTable";

function Diagram({ data }) {
  const [showSummaryTable, toggleSummaryTable] = useDashboardSettingsStore(
    (state) => [state.showSummaryTable, state.toggleSummaryTable]
  );

  return (
    <>
      <div className="flex flex-col mt-4 items-center gap-4">
        <h3>Average FPts/Game</h3>
        <div className="flex gap-2 items-center">
          <ToggleSwitch
            isChecked={showSummaryTable}
            toggleSwitch={toggleSummaryTable}
          />
          <p className="text-sm font-semibold">Show Table</p>
        </div>
      </div>
      {showSummaryTable ? (
        <SummaryTable data={data} />
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={data}
            margin={{
              top: 16,
              right: 24,
              left: 24,
              bottom: 16,
            }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="position" />
            <PolarRadiusAxis angle={60} />
            <Tooltip />
            <Legend />
            <Radar
              name="League 1"
              dataKey="avg1"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.2}
            />
            <Radar
              name="League 2"
              dataKey="avg2"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default Diagram;
