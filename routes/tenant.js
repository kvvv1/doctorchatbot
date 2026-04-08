const express = require('express');
const router = express.Router();
const tenantService = require('../services/tenantService');

// Middleware de API Key semelhante ao painel
router.use((req, res, next) => {
  const requiredKey = process.env.DASHBOARD_API_KEY;
  if (!requiredKey) return next();
  const key = req.header('x-api-key');
  if (key !== requiredKey) return res.status(401).json({ error: 'unauthorized' });
  next();
});

// Listar todos os tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await tenantService.listTenants();
    res.json(tenants);
  } catch (error) {
    console.error('[tenants/list] erro:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Obter um tenant específico
router.get('/:id', async (req, res) => {
  try {
    const tenant = await tenantService.getTenant(req.params.id);
    if (!tenant) return res.status(404).json({ error: 'not_found' });
    res.json(tenant);
  } catch (error) {
    console.error('[tenants/get] erro:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Criar novo tenant
router.post('/', async (req, res) => {
  try {
    const created = await tenantService.createTenant(req.body);
    res.status(201).json(created);
  } catch (error) {
    console.error('[tenants/create] erro:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Atualizar tenant existente
router.put('/:id', async (req, res) => {
  try {
    const updated = await tenantService.updateTenant(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'not_found' });
    res.json(updated);
  } catch (error) {
    console.error('[tenants/update] erro:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Remover tenant
router.delete('/:id', async (req, res) => {
  try {
    await tenantService.deleteTenant(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('[tenants/delete] erro:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

module.exports = router;
