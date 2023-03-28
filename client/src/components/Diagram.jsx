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
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="75%"
        data={data}
        margin={{ bottom: 15 }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="position" />
        <PolarRadiusAxis
          angle={60}
          label={{ value: "FPts/Game", position: "outside", offset: 25 }}
        />
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
  );
}

export default Diagram;
