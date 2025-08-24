const { supabase } = require('./supabaseClient');

// Cache simples em memória para armazenar configurações dos tenants
const tenantCache = new Map();

/**
 * Busca as configurações de um tenant no Supabase.
 * Os resultados são armazenados em cache para evitar consultas repetidas.
 * @param {string|number} tenantId - Identificador do tenant
 * @returns {Promise<Object>} Configurações do tenant
 */
async function getTenantConfig(tenantId) {
  if (!tenantId) {
    throw new Error('tenantId é obrigatório');
  }

  // Retorna do cache se já estiver disponível
  if (tenantCache.has(tenantId)) {
    return tenantCache.get(tenantId);
  }

  if (!supabase) {
    throw new Error('Cliente Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .single();

  if (error) {
    throw new Error(`Erro ao buscar tenant: ${error.message}`);
  }

  // Armazena resultado no cache
  tenantCache.set(tenantId, data);

  return data;
}

module.exports = {
  getTenantConfig,
  _tenantCache: tenantCache // exportado para facilitar testes
};
