import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Countdown, Home, Settings } from './pages'

function App() {

  return (
    <Router>
      <Routes>
        <Route key='home' path='' element={<Home />} />
        <Route key='settings' path='settings' element={<Settings />} />
        <Route key='countdown' path='countdown' element={<Countdown />} />
        <Route key='error' path="*" element={<Navigate to={`/`} replace={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
