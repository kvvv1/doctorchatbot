import { useNavigate } from 'react-router-dom';
import TenantForm from './TenantForm';
import { tenantService } from '../services/api';
import './TenantForm.css';

export default function TenantCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await tenantService.createTenant(data);
      navigate('/tenants');
    } catch (err) {
      console.error('Erro ao criar tenant', err);
    }
  };

  return (
    <div className="tenant-create">
      <h1>Novo Tenant</h1>
      <TenantForm onSubmit={handleSubmit} />
    </div>
  );
}
