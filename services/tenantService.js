const { supabase } = require('./supabaseClient');

/**
 * Busca as configurações do tenant pelo ID.
 * @param {string} tenantId
 * @returns {Promise<Object|null>} Configuração do tenant ou null se não encontrado
 */
async function getTenantConfig(tenantId) {
  if (!tenantId) return null;
  if (!supabase) {
    console.warn('[tenantService] Supabase não configurado.');
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();
    if (error) {
      console.warn(`[tenantService] Erro ao buscar tenant ${tenantId}:`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('[tenantService] Falha inesperada:', err.message);
    return null;
  }
}

module.exports = { getTenantConfig };
