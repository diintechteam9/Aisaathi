import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import FirstPage from './components/FirstPage'
// import Template1 from './components/Templates/Template1'


function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/firstpage" element={<Navigate to="/auth/firstpage" replace />} />
         {/* Public builder route to open TemplateTab without auth */}
         <Route path="/templatetab" element={<FirstPage />} />
       </Routes>
    </Router>
    // <Template1/>
  )
}

export default App
