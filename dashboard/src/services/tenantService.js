import api from './api';

const tenantService = {
  list: async () => {
    const res = await api.get('/tenants');
    return res.data;
  },
  get: async (id) => {
    const res = await api.get(`/tenants/${id}`);
    return res.data;
  },
  create: async (tenant) => {
    const res = await api.post('/tenants', tenant);
    return res.data;
  },
  update: async (id, tenant) => {
    const res = await api.put(`/tenants/${id}`, tenant);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/tenants/${id}`);
    return res.data;
  }
};

export default tenantService;
