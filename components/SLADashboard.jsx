import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/App.css'; // Ensure this is imported

export default function SLADashboard() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-06');
  const [selectedSAT, setSelectedSAT] = useState('satmeters');
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/sla?month=${selectedDate}&sat=${selectedSAT}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
      console.log(data)
  }, [selectedDate, selectedSAT]);

  
    useEffect(() =>{
      axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profiles`)
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error(err));
    }, [profiles])

  return (
    <div className="dashboard-container">
      <h2>📊 SLA Dashboard</h2>

      {/* Filters */}
      <div className="filter-group">
        <input
          type="month"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select
          value={selectedSAT}
          onChange={(e) => setSelectedSAT(e.target.value)}
        >
          <option value="satmeters">Sat Meters</option>
          <option value="allmeters">All Meters</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="sla-table">
          <thead>
            <tr>
              <th>Project</th>
              {profiles.map((value) => (
              <th>
                {value}
              </th>
            ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.project}>
                  <td>{row["project"]}</td>
                  {profiles.map((value) => (
                  <td>
                    {row[value]||'-'}
                  </td>
                ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="no-data">
                  No data available for selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
