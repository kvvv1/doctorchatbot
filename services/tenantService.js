const { supabase } = require('./supabaseClient');

const TENANTS_TABLE = 'tenants';
let memoryTenants = [];

async function listTenants() {
  if (!supabase) return memoryTenants;
  const { data, error } = await supabase.from(TENANTS_TABLE).select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

async function getTenant(id) {
  if (!supabase) return memoryTenants.find(t => t.id === id) || null;
  const { data, error } = await supabase.from(TENANTS_TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createTenant(tenant) {
  if (!supabase) {
    const newTenant = { id: Date.now().toString(), ...tenant };
    memoryTenants.push(newTenant);
    return newTenant;
  }
  const { data, error } = await supabase.from(TENANTS_TABLE).insert(tenant).select().single();
  if (error) throw error;
  return data;
}

async function updateTenant(id, tenant) {
  if (!supabase) {
    memoryTenants = memoryTenants.map(t => (t.id === id ? { ...t, ...tenant } : t));
    return memoryTenants.find(t => t.id === id) || null;
  }
  const { data, error } = await supabase.from(TENANTS_TABLE).update(tenant).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

async function deleteTenant(id) {
  if (!supabase) {
    memoryTenants = memoryTenants.filter(t => t.id !== id);
    return { success: true };
  }
  const { error } = await supabase.from(TENANTS_TABLE).delete().eq('id', id);
  if (error) throw error;
  return { success: true };
}

module.exports = {
  listTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant
};
