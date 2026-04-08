import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TenantForm from './TenantForm';
import { tenantService } from '../services/api';
import './TenantForm.css';

export default function TenantEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await tenantService.getTenant(id);
        setTenant(data);
      } catch (err) {
        console.error('Erro ao carregar tenant', err);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await tenantService.updateTenant(id, data);
      navigate('/tenants');
    } catch (err) {
      console.error('Erro ao atualizar tenant', err);
    }
  };

  if (!tenant) {
    return <div className="tenants"><div className="loading">Carregando...</div></div>;
  }

  return (
    <div className="tenant-edit">
      <h1>Editar Tenant</h1>
      <TenantForm initialData={tenant} onSubmit={handleSubmit} />
    </div>
  );
}
