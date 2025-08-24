const allowedTenants = (process.env.TENANT_IDS || '')
  .split(',')
  .map((t) => t.trim())
  .filter(Boolean);

module.exports = function tenantMiddleware(req, res, next) {
  const { tenantId } = req.params;

  if (!tenantId || !allowedTenants.includes(tenantId)) {
    return res.status(404).json({ error: 'Tenant not found' });
  }

  req.tenantId = tenantId;
  next();
};
