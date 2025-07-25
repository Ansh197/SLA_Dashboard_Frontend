import SLADashboard from '../components/SLADashboard'
import './App.css'
import ProjectSLA from '../components/ProjectSLA'
import { Routes, Route, Link} from 'react-router-dom'
import BarChartComp from '../components/BarChart'
import LineComponent from '../components/LineComponent'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SLADashboard/>} />
        <Route path="/linecharts" element={<LineComponent/>} />
        <Route path="/barcharts" element={<BarChartComp/>} />
        <Route path="/project/:encodedProjectName" element={<LineComponent/>} />
      </Routes>
    </>
  )
}

export default App
