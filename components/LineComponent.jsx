import React, { useEffect, useState } from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import './LineComponent.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function LineComponent() {

    const { encodedProjectName } = useParams();
    const projectName = decodeURIComponent(encodedProjectName);
    const [satData, setSatData] = useState({});
    const [nonSatData, setNonSatData] = useState({});

    useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/projectdetails?projectName=${projectName}`)
      .then((res) => {
      const fullData = res.data;
      const sat = {};
      const nonSat = {};

      // Loop through each profile
      for (const profile in fullData) {
        sat[profile] = fullData[profile].filter(entry => entry.sat === 'satmeters');
        nonSat[profile] = fullData[profile].filter(entry => entry.sat === 'allmeters');
      }

      setSatData(sat);
      setNonSatData(nonSat);
    })
    .catch((err) => console.error(err));
    }, [projectName]);

  return ( 
    <div className='line-dashboard-container'>
    {Object.keys(satData).map((profileName) => (
    <div className="linecomponent" key={profileName}>
        <div className="lineheading">{profileName}</div>
        {satData[profileName]?.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart
            data={satData[profileName]}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="yearmonth"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 12 }}
            />
            <YAxis domain={[50, 100]} />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="sla_percentage"
                stroke="#1ab394"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
            />
            </LineChart>
        </ResponsiveContainer>
        ) : (
        <p>Loading or no data available</p>
        )}
    </div>
    ))}
    {/* <div className='linecomponent'>
        <div className='lineheading'>Blockload Profile</div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={dummyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[70, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="SLA"
            stroke="#1ab394"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className='linecomponent'>
        <div className='lineheading'>Billing Profile</div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={dummyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[70, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="SLA"
            stroke="#1ab394"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className='linecomponent'>
        <div className='lineheading'>RC/DC SLA</div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={dummyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[70, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="SLA"
            stroke="#1ab394"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div> */}
    </div>
  )
}
