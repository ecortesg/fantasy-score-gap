import { useState } from "react";

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
import {
  usePersistentSettingsStore,
  useSettingsStore,
} from "../store/dashboardSettingsStore";
import { countNonZeroProperties } from "../utils";
import { GRAPH_LEGEND_SETTINGS } from "../data/positions_data";

function Graph({ data }) {
  const [positions, theme] = usePersistentSettingsStore((state) => [
    state.positions,
    state.theme,
  ]);

  const [series, toggleSeries] = useSettingsStore((state) => [
    state.series,
    state.toggleSeries,
  ]);

  let textColor;
  let backgroundColor;
  let accentColor;

  if (theme === "dark") {
    textColor = "white";
    backgroundColor = "#334155"; // slate-700
    accentColor = "#6366f1"; // indigo-700
  } else {
    textColor = "gray";
    backgroundColor = "white";
    accentColor = "#3b82f6"; // blue-500
  }

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
        {payload.map((entry) => {
          const [position, league] = entry.value.split("-");
          return (
            <li
              className="grid text-center md:flex justify-center gap-x-1 place-items-center content-start"
              key={entry.value}
              style={{ color: entry.color }}
            >
              <input
                id={`line-${entry.value}`}
                name={entry.value}
                type="checkbox"
                checked={series[entry.value]}
                onChange={(e) => toggleSeries(e.target.name)}
                className="w-3 h-4"
                style={{
                  accentColor: accentColor,
                }}
              />
              <label
                className="flex flex-col md:flex-row items-center"
                htmlFor={`line-${entry.value}`}
              >
                <div className="flex flex-col sm:flex-row sm:gap-1">
                  <p>{position}</p>
                  <p>{league}</p>
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
          );
        })}
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
          <CartesianGrid vertical={false} />
          <XAxis
            name="Rank"
            dataKey="rank"
            type="number"
            label={{
              value: "Positional Rank",
              position: "insideBottom",
              offset: -10,
              fill: textColor,
            }}
            padding={{ left: 16, right: 16 }}
            domain={["minData", "maxData"]}
            tickCount={Math.ceil(data.length / 2)}
            stroke={textColor}
          />
          <YAxis
            type="number"
            label={{
              value: "FPts",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fill: textColor,
            }}
            tickCount={10}
            stroke={textColor}
          />
          <ZAxis range={[50, 51]} /> {/* To change dot size */}
          <Tooltip
            contentStyle={{
              backgroundColor: backgroundColor,
            }}
            itemStyle={{ color: textColor }}
            // To hide "1" in tooltip
            labelFormatter={() => {
              return "";
            }}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Legend
            align="center"
            verticalAlign="bottom"
            content={renderLegend}
          />
          {GRAPH_LEGEND_SETTINGS.map((elem) => {
            if (positions[elem.position] > 0) {
              return (
                <Scatter
                  line={{ strokeWidth: 2 }}
                  key={elem.key}
                  dataKey={elem.key}
                  name={elem.key}
                  data={data[elem.key]}
                  shape={elem.shape}
                  legendType={elem.shape}
                  fill={elem.color}
                  hide={!series[elem.key]}
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
