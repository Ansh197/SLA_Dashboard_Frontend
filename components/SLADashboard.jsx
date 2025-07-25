import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/App.css'; // Ensure this is imported
import { Link } from 'react-router-dom';


export default function SLADashboard() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-06');
  const [selectedSAT, setSelectedSAT] = useState('satmeters');
//   const data = [
//   {
//     "project": "Project A",
//     "Load Survey (8Hrs)": 92,
//     "Load Survey (12Hrs)": 88,
//     "Load Survey (24Hrs)": 85,
//     "Daily Profile": 95,
//     "Billing Profile (72 Hrs)": 90,
//     "Billing Profile (120 Hrs)": 87,
//     "Billing Profile (168 Hrs)": 93,
//     "Reconnect (15 min)": 91,
//     "Reconnect (6 Hrs)": 89,
//     "Disconnect (15 min)": 90,
//     "Disconnect (6 Hrs)": 88
//   },
//   {
//     "project": "Project B",
//     "Load Survey (8Hrs)": 89,
//     "Load Survey (12Hrs)": 85,
//     "Load Survey (24Hrs)": 80,
//     "Daily Profile": 92,
//     "Billing Profile (72 Hrs)": 88,
//     "Billing Profile (120 Hrs)": 85,
//     "Billing Profile (168 Hrs)": 90,
//     "Reconnect (15 min)": 87,
//     "Reconnect (6 Hrs)": 86,
//     "Disconnect (15 min)": 88,
//     "Disconnect (6 Hrs)": 84
//   },
//   {
//     "project": "Project C",
//     "Load Survey (8Hrs)": 95,
//     "Load Survey (12Hrs)": 92,
//     "Load Survey (24Hrs)": 90,
//     "Daily Profile": 97,
//     "Billing Profile (72 Hrs)": 94,
//     "Billing Profile (120 Hrs)": 91,
//     "Billing Profile (168 Hrs)": 96,
//     "Reconnect (15 min)": 93,
//     "Reconnect (6 Hrs)": 90,
//     "Disconnect (15 min)": 92,
//     "Disconnect (6 Hrs)": 89
//   }
// ];



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/sla?month=${selectedDate}&sat=${selectedSAT}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
      console.log(data)
  }, [selectedDate, selectedSAT]);

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
                  <td>
                    <Link to={`/project/${row.project}`}>
                      {row["project"]}
                    </Link>
                  </td>
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
