const express = require('express');
const router = express.Router();
const tenantService = require('../services/tenantService');

// List tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await tenantService.getTenants();
    res.json(tenants);
  } catch (error) {
    console.error('[tenants] list error:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Get single tenant
router.get('/:id', async (req, res) => {
  try {
    const tenant = await tenantService.getTenant(req.params.id);
    if (!tenant) return res.status(404).json({ error: 'not_found' });
    res.json(tenant);
  } catch (error) {
    console.error('[tenants] get error:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Create tenant
router.post('/', async (req, res) => {
  try {
    const tenant = await tenantService.createTenant(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    console.error('[tenants] create error:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Update tenant
router.put('/:id', async (req, res) => {
  try {
    const tenant = await tenantService.updateTenant(req.params.id, req.body);
    res.json(tenant);
  } catch (error) {
    console.error('[tenants] update error:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Delete tenant
router.delete('/:id', async (req, res) => {
  try {
    await tenantService.deleteTenant(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('[tenants] delete error:', error.message);
    res.status(500).json({ error: 'internal_error' });
  }
});

module.exports = router;
