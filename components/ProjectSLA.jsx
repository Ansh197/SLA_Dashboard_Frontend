// src/components/SLATrendChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './SLATrendChart.css'; // Custom CSS for fallback
import { useState } from "react";

const ProjectSLA = ({ data }) => {

    const projectName = []
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const transformData = (rawData) => {
    const grouped = {};
    
    rawData.forEach(({ month, sla, project }) => {
        if (!projectName.includes(project))
            {projectName.push(project)}
        if (!grouped[month]) grouped[month] = { month };
        grouped[month][project] = sla;
    });

    return Object.values(grouped);
    };

    const allProjects = []
    const chartData = transformData(data);
    const [selectedProjects, setSelectedProjects] = useState(projectName);
    const handleCheckboxChange = (project) => {
        setSelectedProjects((prev) =>
            prev.includes(project)
            ? prev.filter((p) => p !== project)
            : [...prev, project]
        );
    };

  return (

    <div>
        <div className="project-filters">
            {allProjects.map((project) => (
                <label key={project}>
                <input
                    type="checkbox"
                    checked={selectedProjects.includes(project)}
                    onChange={() => handleCheckboxChange(project)}
                />
                {project}
                </label>
            ))}
    </div>

    <div className="sla-chart-container2">
      <h2 className="sla-chart-title">Monthly SLA Trend</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[93.8, 99.9]} />
          <Tooltip />
          {projectName.map((project) => (
            <Line type={"monotone"} dataKey={project} stroke={getRandomColor()} strokeWidth={3} dot={{ r: 4 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default ProjectSLA;
