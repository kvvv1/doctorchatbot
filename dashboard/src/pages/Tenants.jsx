import { useEffect, useState } from 'react';
import tenantService from '../services/tenantService';
import './Tenants.css';

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', zapiKey: '', gestaoKey: '' });

  const load = async () => {
    const data = await tenantService.list();
    setTenants(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, zapiKey: form.zapiKey, gestaoKey: form.gestaoKey };
    if (form.id) {
      await tenantService.update(form.id, payload);
    } else {
      await tenantService.create(payload);
    }
    setForm({ id: null, name: '', zapiKey: '', gestaoKey: '' });
    await load();
  };

  const edit = (t) => {
    setForm({ id: t.id, name: t.name || '', zapiKey: t.zapi_key || '', gestaoKey: t.gestao_key || '' });
  };

  return (
    <div className="tenants-page">
      <h2>Gerenciar Tenants</h2>
      <form onSubmit={handleSubmit} className="tenant-form">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Z-API Key"
          value={form.zapiKey}
          onChange={(e) => setForm({ ...form, zapiKey: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Gestão Key"
          value={form.gestaoKey}
          onChange={(e) => setForm({ ...form, gestaoKey: e.target.value })}
          required
        />
        <button type="submit">{form.id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul className="tenant-list">
        {tenants.map((t) => (
          <li key={t.id}>
            <span>{t.name}</span>
            <button onClick={() => edit(t)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
