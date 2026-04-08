const tenants = {
  default: { name: 'default' }
};

module.exports = (req, res, next) => {
  const { tenantId } = req.params;
  const tenantConfig = tenants[tenantId];
  if (!tenantConfig) {
    return res.status(404).send('Tenant not found');
  }
  req.tenantConfig = tenantConfig;
  next();
};
