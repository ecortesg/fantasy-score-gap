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

function Diagram({ data }) {
  return (
    <>
      <div className="mt-4 text-center">
        <h3>FPts/Game</h3>
      </div>
      <ResponsiveContainer width="100%" height="90%">
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
    </>
  );
}

export default Diagram;
