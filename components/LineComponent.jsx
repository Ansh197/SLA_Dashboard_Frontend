import React, { useEffect, useState } from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import './LineComponent.css'
import { useParams } from 'react-router-dom'

export default function LineComponent() {

    const { encodedProjectName } = useParams();
    const projectName = decodeURIComponent(encodedProjectName);
    const [projectData,setProjectData] = useState([])

  const dummyData = [
  { "month": "Jan", "SLA": 80 },
  { "month": "Feb", "SLA": 90 },
  { "month": "Mar", "SLA": 85 },
  { "month": "Apr", "SLA": 88 },
  { "month": "May", "SLA": 92 },
  { "month": "Jun", "SLA": 86 },
  { "month": "Jul", "SLA": 89 },
  { "month": "Aug", "SLA": 91 },
  { "month": "Sep", "SLA": 87 },
  { "month": "Oct", "SLA": 93 },
  { "month": "Nov", "SLA": 90 },
  { "month": "Dec", "SLA": 95 }
]

    useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/projectdetails?projectName=${projectName}`)
      .then((res) => setProjectData(res.data))
      .catch((err) => console.error(err));
    }, []);

    console.log(projectName)


  return ( 
    <div className='line-dashboard-container'>
    <div className='linecomponent'>
        <div className='lineheading'>DailyLoad Profile</div>
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
    </div>
    </div>
  )
}
