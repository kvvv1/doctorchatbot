const { supabase } = require('./supabaseClient');

const tenantCache = new Map();

async function getTenantConfig(tenantId) {
  if (tenantCache.has(tenantId)) {
    return tenantCache.get(tenantId);
  }

  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .single();

  if (error) {
    throw new Error(`Erro ao buscar tenant ${tenantId}: ${error.message}`);
  }

  tenantCache.set(tenantId, data);
  return data;
}

function clearTenantCache() {
  tenantCache.clear();
}

module.exports = {
  getTenantConfig,
  clearTenantCache
};
