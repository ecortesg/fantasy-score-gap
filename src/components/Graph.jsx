import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Symbols,
  Surface,
} from "recharts";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { countNonZeroProperties } from "../utils";

function Graph({ data }) {
  const [settings, toggleLine, positions] = useDashboardSettingsStore(
    (state) => [state.settings, state.toggleLine, state.positions]
  );

  const gridColsVariants = {
    0: "",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul
        className={`grid gap-y-4 md:gap-y-0 grid-rows-2 ${
          gridColsVariants[countNonZeroProperties(positions)]
        } mt-4 gap-1 text-sm`}
      >
        {payload.map((entry) => (
          <li
            className="grid text-center md:flex justify-center gap-x-1 place-items-center content-start"
            key={entry.value}
            style={{ color: entry.color }}
          >
            <input
              id={`line-${entry.value}`}
              name={entry.value}
              type="checkbox"
              checked={settings[entry.value].lineVisible}
              onChange={(e) => toggleLine(e.target.name)}
              className="w-3 h-4"
            />
            <label
              className="flex flex-col md:flex-row items-center"
              htmlFor={`line-${entry.value}`}
            >
              <div className="flex flex-col sm:flex-row sm:gap-1">
                <p>{settings[entry.value].position}</p>
                <p>{settings[entry.value].league}</p>
              </div>
              <Surface width={20} height={10}>
                <Symbols
                  cx={10}
                  cy={5}
                  type={entry.type}
                  size={50}
                  fill={entry.color}
                />
              </Surface>
            </label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 16,
            bottom: 16,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            name="Rank"
            dataKey="rank"
            type="number"
            label={{
              value: "Positional Rank",
              position: "insideBottom",
              offset: -10,
            }}
            padding={{ left: 16, right: 16 }}
            domain={["minData", "maxData"]}
            tickCount={Math.ceil(data.length / 2)}
          />
          <YAxis
            type="number"
            label={{
              value: "FPts",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
            tickCount={10}
          />
          <ZAxis range={[50, 51]} /> {/* To change dot size */}
          <Tooltip
            // To hide "1" in tooltip
            labelFormatter={() => {
              return "";
            }}
          />
          <Legend
            align="center"
            verticalAlign="bottom"
            content={renderLegend}
          />
          {Object.keys(settings).map((key) => {
            if (positions[settings[key].position] > 0) {
              return (
                <Scatter
                  line
                  key={key}
                  dataKey={key}
                  name={key}
                  data={data[key]}
                  shape={settings[key].shape}
                  legendType={settings[key].shape}
                  fill={settings[key].color}
                  hide={!settings[key].lineVisible}
                />
              );
            }
          })}
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}

export default Graph;
