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

function Graph({ data }) {
  const [settings, toggleLineVisible] = useGraphSettingsStore((state) => [
    state.settings,
    state.toggleLineVisible,
  ]);

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="grid grid-cols-6 mt-5 gap-1 text-sm">
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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 15,
          right: 15,
          left: 15,
          bottom: 15,
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
        <Legend align="center" verticalAlign="bottom" content={renderLegend} />
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
  );
}

export default Graph;
