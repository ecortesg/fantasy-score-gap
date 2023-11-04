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
import SummaryTable from "./SummaryTable";
import {
  usePersistentSettingsStore,
  useSettingsStore,
} from "../store/dashboardSettingsStore";
import { countNonZeroProperties } from "../utils";

function Diagram({ data }) {
  const [showSummaryTable, toggleSummaryTable] = useSettingsStore((state) => [
    state.showSummaryTable,
    state.toggleSummaryTable,
  ]);

  const [positions, theme] = usePersistentSettingsStore((state) => [
    state.positions,
    state.theme,
  ]);

  let textColor;
  let backgroundColor;

  if (theme === "dark") {
    textColor = "white";
    backgroundColor = "#334155"; // slate-700
  } else {
    textColor = "gray";
    backgroundColor = "white";
  }

  const angleOptions = {
    1: 30,
    2: 30,
    3: 30,
    4: 45,
    5: 55,
    6: 60,
    7: 65,
    8: 68,
    9: 71,
  };

  return (
    <>
      <div className="h-1/5 flex flex-col">
        <div className="h-full flex flex-col items-center justify-evenly">
          <h3 className="font-bold">Average FPts/Game</h3>
          <div className="flex gap-2 items-center">
            <ToggleSwitch
              isChecked={showSummaryTable}
              toggleSwitch={() => toggleSummaryTable()}
            />
            <p className="text-sm font-semibold">Show Table</p>
          </div>
        </div>
      </div>
      <div className="h-4/5">
        {showSummaryTable ? (
          <SummaryTable data={data} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={data}
              margin={{
                top: 16,
                right: 16,
                left: 16,
                bottom: 16,
              }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="position" stroke={textColor} />
              <PolarRadiusAxis
                angle={angleOptions[countNonZeroProperties(positions)]}
                stroke={textColor}
              />
              <Tooltip contentStyle={{ backgroundColor: backgroundColor }} />
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
      </div>
    </>
  );
}

export default Diagram;
