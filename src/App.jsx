import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './componen/componenpublic/AppLayout';
import Home from './pages/Home';
import Book from './pages/Booking';
import Admin from './pages/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/booking" element={<AppLayout><Book /></AppLayout>} />
        <Route path="/admin" element={<Admin />} />
        {/* Tambahkan route lain di sini */}
      </Routes>
    </Router>
  );
}

export default App;