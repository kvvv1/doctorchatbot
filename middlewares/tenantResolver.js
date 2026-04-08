const tenantService = require('../services/tenantService');

/**
 * Middleware que resolve o tenant a partir da URL ou header.
 * - URL: /tenant/:tenantId/...
 * - Header: X-Tenant-ID
 */
module.exports = async function tenantResolver(req, res, next) {
  try {
    const tenantId = req.params.tenantId || req.header('x-tenant-id');
    if (!tenantId) {
      return res.status(401).json({ error: 'tenant_id_required' });
    }
    const tenantConfig = await tenantService.getTenantConfig(tenantId);
    if (!tenantConfig) {
      return res.status(404).json({ error: 'tenant_not_found' });
    }
    req.tenantId = tenantId;
    req.tenantConfig = tenantConfig;
    return next();
  } catch (err) {
    console.error('[tenantResolver] Erro:', err.message);
    return res.status(500).json({ error: 'internal_error' });
  }
};
