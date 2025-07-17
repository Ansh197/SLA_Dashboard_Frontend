import SLADashboard from '../components/SLADashboard'
import './App.css'
import ProjectSLA from '../components/ProjectSLA'
import { Routes, Route, Link, HashRouter } from 'react-router-dom'
import BarChartComp from '../components/BarChart'

function App() {
  const data = [
  { month: "Jan", sla: 97.1, project: "JKPDCL - Anvil" },
  { month: "Jan", sla: 96.5, project: "JKPDCL - Techno" },
  { month: "Jan", sla: 98.3, project: "APDCL - Anvil AMI 1,2" },
  { month: "Jan", sla: 95.7, project: "APDCL - Purbanchal Uday (AIIB)" },
  { month: "Jan", sla: 97.9, project: "APDCL - Intellismart Pkg 1 & 2" },
  { month: "Jan", sla: 96.8, project: "APDCL - Apraava + Anvil" },
  { month: "Jan", sla: 94.4, project: "APDCL - IntelliSmart Pkg7" },
  { month: "Jan", sla: 96.2, project: "MSEDCL - NCC Nashik" },
  { month: "Jan", sla: 95.9, project: "MSEDCL - NCC Aurangabad" },
  { month: "Jan", sla: 95.5, project: "MSEDCL - MCL Nagpur" },
  { month: "Jan", sla: 97.6, project: "HPSEBL Himachal - Apraava HP" },
  { month: "Jan", sla: 96.1, project: "WBSEDCL - Apraava WB" },
  { month: "Jan", sla: 95.3, project: "WBSEDCL - GVPR" },
  { month: "Jan", sla: 96.7, project: "Anvil - Sikkim" },

  { month: "Feb", sla: 97.8, project: "JKPDCL - Anvil" },
  { month: "Feb", sla: 96.2, project: "JKPDCL - Techno" },
  { month: "Feb", sla: 98.6, project: "APDCL - Anvil AMI 1,2" },
  { month: "Feb", sla: 96.3, project: "APDCL - Purbanchal Uday (AIIB)" },
  { month: "Feb", sla: 98.0, project: "APDCL - Intellismart Pkg 1 & 2" },
  { month: "Feb", sla: 97.5, project: "APDCL - Apraava + Anvil" },
  { month: "Feb", sla: 95.6, project: "APDCL - IntelliSmart Pkg7" },
  { month: "Feb", sla: 97.1, project: "MSEDCL - NCC Nashik" },
  { month: "Feb", sla: 96.2, project: "MSEDCL - NCC Aurangabad" },
  { month: "Feb", sla: 96.0, project: "MSEDCL - MCL Nagpur" },
  { month: "Feb", sla: 97.9, project: "HPSEBL Himachal - Apraava HP" },
  { month: "Feb", sla: 95.8, project: "WBSEDCL - Apraava WB" },
  { month: "Feb", sla: 96.5, project: "WBSEDCL - GVPR" },
  { month: "Feb", sla: 96.9, project: "Anvil - Sikkim" },

  { month: "Mar", sla: 98.4, project: "JKPDCL - Anvil" },
  { month: "Mar", sla: 97.0, project: "JKPDCL - Techno" },
  { month: "Mar", sla: 98.8, project: "APDCL - Anvil AMI 1,2" },
  { month: "Mar", sla: 96.9, project: "APDCL - Purbanchal Uday (AIIB)" },
  { month: "Mar", sla: 98.3, project: "APDCL - Intellismart Pkg 1 & 2" },
  { month: "Mar", sla: 97.7, project: "APDCL - Apraava + Anvil" },
  { month: "Mar", sla: 96.4, project: "APDCL - IntelliSmart Pkg7" },
  { month: "Mar", sla: 97.2, project: "MSEDCL - NCC Nashik" },
  { month: "Mar", sla: 96.3, project: "MSEDCL - NCC Aurangabad" },
  { month: "Mar", sla: 96.7, project: "MSEDCL - MCL Nagpur" },
  { month: "Mar", sla: 98.1, project: "HPSEBL Himachal - Apraava HP" },
  { month: "Mar", sla: 96.2, project: "WBSEDCL - Apraava WB" },
  { month: "Mar", sla: 96.8, project: "WBSEDCL - GVPR" },
  { month: "Mar", sla: 97.0, project: "Anvil - Sikkim" },

  { month: "Apr", sla: 98.5, project: "JKPDCL - Anvil" },
  { month: "Apr", sla: 97.1, project: "JKPDCL - Techno" },
  { month: "Apr", sla: 99.1, project: "APDCL - Anvil AMI 1,2" },
  { month: "Apr", sla: 97.0, project: "APDCL - Purbanchal Uday (AIIB)" },
  { month: "Apr", sla: 98.5, project: "APDCL - Intellismart Pkg 1 & 2" },
  { month: "Apr", sla: 98.0, project: "APDCL - Apraava + Anvil" },
  { month: "Apr", sla: 96.7, project: "APDCL - IntelliSmart Pkg7" },
  { month: "Apr", sla: 97.4, project: "MSEDCL - NCC Nashik" },
  { month: "Apr", sla: 96.6, project: "MSEDCL - NCC Aurangabad" },
  { month: "Apr", sla: 97.1, project: "MSEDCL - MCL Nagpur" },
  { month: "Apr", sla: 98.3, project: "HPSEBL Himachal - Apraava HP" },
  { month: "Apr", sla: 96.7, project: "WBSEDCL - Apraava WB" },
  { month: "Apr", sla: 97.2, project: "WBSEDCL - GVPR" },
  { month: "Apr", sla: 97.5, project: "Anvil - Sikkim" },
];


  return (
    <>
      <Routes>
        <Route path="/" element={<SLADashboard/>} />
        <Route path="/charts" element={<ProjectSLA data={data} />} />
        <Route path="/barcharts" element={<BarChartComp data={data} />} />
      </Routes>
    </>
  )
}

export default App
