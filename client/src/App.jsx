import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Countdown, Design, Home, MyCountdowns, Settings } from './pages'
import { AuthProvider } from './context';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route key='home' path='' element={<Home />} />
          <Route key='settings' path='settings' element={<Settings />} />
          <Route key='countdown' path='countdown' element={<Countdown />} />
          <Route key='design' path='countdown/edit/:id' element={<Design />} />
          <Route key='countdown' path='saved' element={<MyCountdowns />} />
          <Route key='error' path="*" element={<Navigate to={`/`} replace={true} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
