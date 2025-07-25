// src/components/SLATrendChart.jsx
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import './SLATrendChart.css'; // Custom CSS for fallback
import './Barchart.css'
import { useState,useEffect } from "react";
import axios from "axios";

const BarChartComp = () => {

    
    const [selectedDate, setSelectedDate] = useState('2024-06');
    const [selectedProfile, setSelectedProfile] = useState('Daily Profile');
    const [sat, setSat] = useState('satmeters')
    const [data, setData] = useState([])
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/trend?month=${selectedDate}&sat=${sat}&profile=${selectedProfile}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
    }, [selectedDate, sat, selectedProfile]);
    
    useEffect(() =>{
      axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profiles`)
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error(err));
    }, [])

  return (
    <div className="sla-chart-container">
        <h2 className="sla-chart-title">Projectwise Monthly Trend</h2>
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
        {profiles.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
        </select>
        <select
          value={sat}
          onChange={(e) => setSat(e.target.value)}
        >
          <option value="satmeters">Sat Meters</option>
          <option value="allmeters">All Meters</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }} 
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="Project"
            angle={-45}
            textAnchor="end"
            interval={0}
            />
            <YAxis domain={[90, 100]} />
            <Tooltip />
            <Bar barSize={40} dataKey="SLA" fill="#1ab394" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default BarChartComp;
