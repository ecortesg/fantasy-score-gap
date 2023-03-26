import { useState } from "react";
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

const lines_data = [
  { key: "QB-L1", color: "#fca5a5" },
  { key: "RB-L1", color: "#6ee7b7" },
  { key: "WR-L1", color: "#7dd3fc" },
  { key: "TE-L1", color: "#fdba74" },
  { key: "DEF-L1", color: "#fde047" },
  { key: "K-L1", color: "#c4b5fd" },

  { key: "QB-L2", color: "#ef4444" },
  { key: "RB-L2", color: "#10b981" },
  { key: "WR-L2", color: "#0ea5e9 " },
  { key: "TE-L2", color: "#f97316" },
  { key: "DEF-L2", color: "#eab308" },
  { key: "K-L2", color: "#8b5cf6" },
];

function Graph({ data }) {
  const [hideLine, setHideLine] = useState(
    lines_data.reduce((a, { key }) => {
      a[key] = false;
      return a;
    }, {})
  );

  function onClickLegend(e) {
    setHideLine({
      ...hideLine,
      [e.target.id]: !hideLine[e.target.id],
    });
  }

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="grid grid-cols-6 mt-5 gap-1 text-sm content-center">
        {payload.map((entry, index) => (
          <li
            className="grid text-center md:flex"
            key={`item-${index}`}
            style={{ color: entry.color }}
          >
            <input
              id={entry.value}
              type="checkbox"
              checked={!hideLine[entry.value]}
              onChange={onClickLegend}
              className="mx-1"
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
          ticks={[...Array(37).keys()].slice(1)}
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
          layout="vertical"
          align="center"
          verticalAlign="bottom"
          content={renderLegend}
        />
        {lines_data.map((line, index) => (
          <Line
            key={index}
            type="linear"
            dot={false}
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            hide={hideLine[line.key]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
