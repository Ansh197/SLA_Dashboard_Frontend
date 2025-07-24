import SLADashboard from '../components/SLADashboard'
import './App.css'
import ProjectSLA from '../components/ProjectSLA'
import { Routes, Route, Link, HashRouter } from 'react-router-dom'
import BarChartComp from '../components/BarChart'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>
        <SLADashboard/>
        <BarChartComp/>
        </>} />
        <Route path="/charts" element={<ProjectSLA data={data} />} />
        <Route path="/barcharts" element={<BarChartComp/>} />
      </Routes>
    </>
  )
}

export default App
