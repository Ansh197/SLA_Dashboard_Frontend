import React, { useEffect, useState } from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import './LineComponent.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function LineComponent() {

    const { encodedProjectName } = useParams();
    const projectName = decodeURIComponent(encodedProjectName);
    // const [satData, setSatData] = useState({});
    // const [nonSatData, setNonSatData] = useState({});
    const [chartData, setChartData] = useState([]);

    // useEffect(() => {
    // axios
    //   .get(`${import.meta.env.VITE_BACKEND_URL}/api/projectdetails?projectName=${projectName}`)
    //   .then((res) => {
    //   const fullData = res.data;
    //   const sat = {};
    //   const nonSat = {};

    //   // Loop through each profile
    //   for (const profile in fullData) {
    //     sat[profile] = fullData[profile].filter(entry => entry.sat === 'satmeters');
    //     nonSat[profile] = fullData[profile].filter(entry => entry.sat === 'allmeters');
    //   }

    //   setSatData(sat);
    //   setNonSatData(nonSat);
    // })
    // .catch((err) => console.error(err));
    // }, [projectName]);

     useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/projectdetails?projectName=MSEDCL - NCC Aurangabad`)
      .then((res) => {
        const rawData = res.data;
        const profiles = ["Load Survey (8Hrs)", "Load Survey (12Hrs)", "Load Survey (24Hrs)"];
        
        const merged = {};

        profiles.forEach((profile, index) => {
          rawData[profile]?.forEach(entry => {
            if (entry.sat === 'satmeters') {
              const ym = entry.yearmonth;
              if (!merged[ym]) merged[ym] = { yearmonth: ym };
              merged[ym][`LS_${[8, 12, 24][index]}Hrs`] = entry.sla_percentage;
            }
          });
        });

        const mergedList = Object.values(merged);
        setChartData(mergedList);
      });
  }, []);

  return ( 
    <div className='line-dashboard-container'>
    <div className='linecomponent'>
        <div className='lineheading'>Load Survey (8Hrs)</div>
        {loadSurvey8Data?.length > 0 ? (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={satData["Load Survey (8Hrs)"]}
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
          {/* <Line
            type="monotone"
            dataKey="sla_percentage"
            stroke="#1ab394"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          /> */}
          <Line type="monotone" dataKey="LS_8Hrs" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="LS_12Hrs" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="LS_24Hrs" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
         ) : (
          <p>Loading or no data available</p>
        )}
    </div>
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
