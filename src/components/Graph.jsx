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
import { useState } from "react";

function Graph({ data }) {
  const [settings, toggleLineVisible, positions, updatePositions] =
    useGraphSettingsStore((state) => [
      state.settings,
      state.toggleLineVisible,
      state.positions,
      state.updatePositions,
    ]);

  const [positionCount, setPositionCount] = useState(positions);

  function handleChange(e) {
    setPositionCount({ ...positionCount, [e.target.name]: e.target.value });
  }

  const handleBlur = (e) => {
    const inputValue = Number(positionCount[e.target.name]) || 0;
    updatePositions({ [e.target.name]: inputValue });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

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
              onChange={(e) => toggleLineVisible(e.target.name)}
              className="w-[13px] h-5"
            />
            <label htmlFor={`line-${entry.value}`}>{entry.value}</label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="grid grid-cols-6 mt-4 gap-1 text-sm mx-4">
        {Object.keys(positions).map((key) => {
          return (
            <div
              key={key}
              className="grid text-center md:flex justify-center gap-x-1 place-items-center content-start"
            >
              <label htmlFor={`count-${key}`}>{key}</label>
              <input
                id={`count-${key}`}
                name={key}
                type="number"
                inputMode="numeric"
                min="0"
                max="999"
                value={positionCount[key].toString()}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
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
