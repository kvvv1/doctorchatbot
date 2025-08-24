import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Agendamentos from './pages/Agendamentos';
import Reagendamentos from './pages/Reagendamentos';
import Cancelamentos from './pages/Cancelamentos';
import Espera from './pages/Espera';
import Secretaria from './pages/Secretaria';
import Pacientes from './pages/Pacientes';
import Tenants from './pages/Tenants';
import TenantCreate from './pages/TenantCreate';
import TenantEdit from './pages/TenantEdit';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/reagendamentos" element={<Reagendamentos />} />
              <Route path="/cancelamentos" element={<Cancelamentos />} />
              <Route path="/espera" element={<Espera />} />
              <Route path="/secretaria" element={<Secretaria />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/tenants/new" element={<TenantCreate />} />
              <Route path="/tenants/:id" element={<TenantEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
