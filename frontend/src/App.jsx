import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
// import FirstPage from './components/FirstPage'
import Admin from './Admin'
import User from './User'
// import Template1 from './components/Templates/Template1'


function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/firstpage" element={<Navigate to="/auth/firstpage" replace />} />
         <Route path="/admin/*" element={<Admin/>}/>
         <Route path="/auth/*" element={<User/>}/>
         <Route path="*" element={<Navigate to="/" replace/>}/>
       </Routes>
    </Router>
    // <Template1/>
  )
}

export default App
