import { useEffect, useState } from 'react';
import './TenantForm.css';

export default function TenantForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  useEffect(() => {
    setName(initialData.name || '');
    setSupabaseUrl(initialData.credentials?.supabaseUrl || '');
    setSupabaseKey(initialData.credentials?.supabaseKey || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      credentials: {
        supabaseUrl,
        supabaseKey
      }
    });
  };

  return (
    <form className="tenant-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Supabase URL</label>
        <input value={supabaseUrl} onChange={(e) => setSupabaseUrl(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Supabase Key</label>
        <input value={supabaseKey} onChange={(e) => setSupabaseKey(e.target.value)} />
      </div>
      <button type="submit" className="save-btn">Salvar</button>
    </form>
  );
}
