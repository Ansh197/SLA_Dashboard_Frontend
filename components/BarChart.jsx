// src/components/SLATrendChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import './SLATrendChart.css'; // Custom CSS for fallback

const BarChartComp = ({ data }) => {

    function getLatestMonthSLA(data) {
        if (!data || data.length === 0) return [];

        // Get list of months in the order they appear
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Find latest month by comparing month index
        const latestMonth = data.reduce((latest, curr) => {
            return monthOrder.indexOf(curr.month) > monthOrder.indexOf(latest) ? curr.month : latest;
        }, data[0].month);

        // Filter only latest month entries and return { project, sla } format
        return data
            .filter((d) => d.month === latestMonth)
            .map((d) => ({
            project: d.project,
            sla: d.sla
            }));
        }

    const chartData = getLatestMonthSLA(data);
    console.log(chartData)


  return (
    <div className="sla-chart-container">
      <h2 className="sla-chart-title">Monthly SLA Trend</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="project" angle={-45} textAnchor="end"/>
          <YAxis domain={[90, 100]} />
          <Tooltip />
          <Bar barSize={40} dataKey="sla" fill="#1ab394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComp;
