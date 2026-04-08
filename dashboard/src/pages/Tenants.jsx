import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tenantService } from '../services/api';
import './Tenants.css';

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    setLoading(true);
    try {
      const data = await tenantService.getTenants();
      setTenants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar tenants', err);
    } finally {
      setLoading(false);
    }
  };

  const removeTenant = async (id) => {
    if (!window.confirm('Deseja remover este tenant?')) return;
    try {
      await tenantService.deleteTenant(id);
      setTenants(tenants.filter(t => t.id !== id));
    } catch (err) {
      console.error('Erro ao remover tenant', err);
    }
  };

  if (loading) {
    return <div className="tenants"><div className="loading">Carregando...</div></div>;
  }

  return (
    <div className="tenants">
      <div className="page-header">
        <h1>Tenants</h1>
        <button onClick={() => navigate('/tenants/new')} className="new-btn">Novo</button>
      </div>
      <table className="tenants-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Credenciais</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((t) => (
            <tr key={t.id}>
              <td>{t.name || t.nome}</td>
              <td>
                <pre>{JSON.stringify(t.credentials || {}, null, 2)}</pre>
              </td>
              <td>
                <Link to={`/tenants/${t.id}`} className="edit-btn">Editar</Link>
                <button onClick={() => removeTenant(t.id)} className="delete-btn">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
