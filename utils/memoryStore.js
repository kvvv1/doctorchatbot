// Exemplo simples: substitua por Redis ou persistência real quando possível
const store = new Map();

function buildKey(tenantId = 'default', key) {
  return `${tenantId}:${key}`;
}

module.exports = {
  set: async (tenantId, key, value) => {
    store.set(buildKey(tenantId, key), JSON.stringify(value));
  },
  get: async (tenantId, key) => {
    const v = store.get(buildKey(tenantId, key));
    return v ? JSON.parse(v) : null;
  },
  // Mantém compatibilidade com funções existentes
  getSession: (tenantId, userPhone) => {
    const v = store.get(buildKey(tenantId, `session:${userPhone}`));
    return v ? JSON.parse(v) : null;
  },
  setSession: (tenantId, userPhone, sessionId) => {
    store.set(buildKey(tenantId, `session:${userPhone}`), JSON.stringify(sessionId));
  },
  clearSession: (tenantId, userPhone) => {
    store.delete(buildKey(tenantId, `session:${userPhone}`));
  }
};
