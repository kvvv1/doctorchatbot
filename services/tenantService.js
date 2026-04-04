const { supabase } = require('./supabaseClient');

async function getTenants() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('tenants').select('*').order('id');
  if (error) throw error;
  return data;
}

async function getTenant(id) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('tenants').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createTenant(tenant) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('tenants')
    .insert({ name: tenant.name, zapi_key: tenant.zapiKey, gestao_key: tenant.gestaoKey })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateTenant(id, tenant) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('tenants')
    .update({ name: tenant.name, zapi_key: tenant.zapiKey, gestao_key: tenant.gestaoKey })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteTenant(id) {
  if (!supabase) return false;
  const { error } = await supabase.from('tenants').delete().eq('id', id);
  if (error) throw error;
  return true;
}

module.exports = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
