// src/components/SLATrendChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import './SLATrendChart.css'; // Custom CSS for fallback
import './Barchart.css'
import { useState } from "react";

const BarChartComp = ({ data }) => {

    
    const [selectedDate, setSelectedDate] = useState('2024-06');
    const [selectedProfile, setSelectedProfile] = useState('satmeters');
    
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function getLatestMonthSLA(data) {
        if (!data || data.length === 0) return [];

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

  return (
    <div className="sla-chart-container">
        <h2 className="sla-chart-title">Monthly Billing Trend</h2>
        <div className="filter-group">
        <input
          type="month"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
        >
          <option value="dailyload">Dailyload</option>
          <option value="billing">Billing</option>
          <option value="loadsurvey">LoadSurvey</option>
          <option value="Reconnect">Reconnect</option>
          <option value="Disconnect">Disconnect</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }} // ⬅️ More bottom margin
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="project"
            angle={-45}
            textAnchor="end"
            interval={0} // ⬅️ Show all labels
            />
            <YAxis domain={[90, 100]} />
            <Tooltip />
            <Bar barSize={40} dataKey="sla" fill="#1ab394" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default BarChartComp;
