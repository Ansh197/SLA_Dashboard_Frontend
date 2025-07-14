import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this is imported

export default function SLADashboard() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-06');
  const [selectedSAT, setSelectedSAT] = useState('satmeters');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/sla?month=${selectedDate}&sat=${selectedSAT}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
      console.log(data)
      console.log(import.meta.env.VITE_BACKEND_URL)
  }, [selectedDate, selectedSAT]);

  return (
    <div className="dashboard-container">
      <h2>📊 Project SLA Dashboard</h2>

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
              <th>Load Survey (8Hrs)</th>
              <th>Load Survey (12Hrs)</th>
              <th>Load Survey (24Hrs)</th>
              <th>Daily Profile</th>
              <th>Billing Profile (72 Hrs)</th>
              <th>Billing Profile (120 Hrs)</th>
              <th>Billing Profile (168 Hrs)</th>
              <th>Reconnect (15 min)</th>
              <th>Reconnect (6 Hrs)</th>
              <th>Disconnect (15 min)</th>
              <th>Disconnect (6 Hrs)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.project}>
                  <td>{row.project}</td>
                  <td>{row["Load Survey (8Hrs)"] || '-'}</td>
                  <td>{row["Load Survey (12Hrs)"] || '-'}</td>
                  <td>{row["Load Survey (24Hrs)"] || '-'}</td>
                  <td>{row["Daily Profile"] || '-'}</td>
                  <td>{row["Billing Profile (72 Hrs)"] || '-'}</td>
                  <td>{row["Billing Profile (120 Hrs)"] || '-'}</td>
                  <td>{row["Billing Profile (168 Hrs)"] || '-'}</td>
                  <td>{row["Reconnect (15 min)"] || '-'}</td>
                  <td>{row["Reconnect (6 Hrs)"] || '-'}</td>
                  <td>{row["Disconnect (15 min)"] || '-'}</td>
                  <td>{row["Disconnect (6 Hrs)"] || '-'}</td>
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
