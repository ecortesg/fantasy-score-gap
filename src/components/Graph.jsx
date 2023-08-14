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
import { useGraphSettingsStore } from "../store/graphSettingsStore";
import { POSITIONS } from "../data/fields_data";

function Graph({ data }) {
  const [settings, toggleLineVisible, positions, updatePositions] =
    useGraphSettingsStore((state) => [
      state.settings,
      state.toggleLineVisible,
      state.positions,
      state.updatePositions,
    ]);

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="grid grid-cols-6 mt-4 gap-1 text-sm">
        {payload.map((entry, index) => (
          <li
            className="grid text-center md:flex justify-center gap-x-1 place-items-center content-start"
            key={`item-${index}`}
            style={{ color: entry.color }}
          >
            <input
              id={entry.value}
              type="checkbox"
              checked={settings[entry.value].lineVisible}
              onChange={(e) => toggleLineVisible(e.target.id)}
              className="w-[13px] h-5"
            />
            <label htmlFor={entry.value}>{entry.value}</label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="grid grid-cols-6 mt-4 gap-1 text-sm mx-4">
        {POSITIONS.map((field) => {
          return (
            <div
              key={field.id}
              className="grid text-center md:flex justify-center gap-x-1 place-items-center content-start"
            >
              <label>{field.id}</label>
              <input
                id={field.id}
                type="number"
                inputMode="numeric"
                min="0"
                max="999"
                value={positions[field.id].toString()}
                onChange={(e) =>
                  updatePositions({ [e.target.id]: Number(e.target.value) })
                }
                className="border px-1 rounded w-full md:w-12"
              />
            </div>
          );
        })}
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 24,
            left: 24,
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
            tickCount={20}
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
          {Object.keys(settings).map((key) => (
            <Line
              key={key}
              type="linear"
              dot={false}
              dataKey={key}
              stroke={settings[key].color}
              strokeWidth={2}
              hide={!settings[key].lineVisible}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Graph;
