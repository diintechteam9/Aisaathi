import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
// import Template1 from './components/Templates/Template1'
import FirstPage from './components/FirstPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/firstpage" element={<FirstPage />} />
      </Routes>
    </Router>
    // <Template1/>
  )
}

export default App
