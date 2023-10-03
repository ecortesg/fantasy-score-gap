import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

function Graph({ data }) {
  const [settings, toggleLine, positions] = useDashboardSettingsStore(
    (state) => [state.settings, state.toggleLine, state.positions]
  );

  function countNonZeroProperties(obj) {
    let count = 0;

    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] > 0) {
        count++;
      }
    }

    return count;
  }

  const gridColsVariants = {
    0: "",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul
        className={`grid grid-rows-2 ${
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
            <label htmlFor={`line-${entry.value}`}>{entry.value}</label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            dataKey="rank"
            type="number"
            label={{
              value: "Positional Rank",
              position: "insideBottom",
              offset: -10,
            }}
            padding={{ left: 20, right: 20 }}
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
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="bottom"
            content={renderLegend}
          />
          {Object.keys(settings).map((key) => {
            if (positions[settings[key].position] > 0) {
              return (
                <Line
                  key={key}
                  type="linear"
                  dot={false}
                  dataKey={key}
                  stroke={settings[key].color}
                  strokeWidth={2}
                  hide={!settings[key].lineVisible}
                />
              );
            }
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Graph;
