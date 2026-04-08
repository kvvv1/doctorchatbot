const axios = require('axios');

async function sendMessage(tenantConfig, phone, message) {
  try {
    const { zapiInstanceId, zapiToken, zapiClientToken } = tenantConfig;
    // Formato correto da API Z-API
    const url = `https://api.z-api.io/instances/${zapiInstanceId}/token/${zapiToken}/send-text`;

    const payload = {
      phone: phone,
      message: message
    };

    console.log(`[Z-API] Enviando para: ${url}`);
    console.log(`[Z-API] Payload:`, payload);

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': zapiClientToken
      }
    });

    console.log(`[Z-API] Mensagem enviada para ${phone}`);
    console.log(`[Z-API] Resposta:`, response.data);
    return response.data;
  } catch (error) {
    console.error('[Z-API] Erro ao enviar mensagem:', error.response?.data || error.message);
    console.error('[Z-API] Status:', error.response?.status);
    throw new Error('Falha ao enviar mensagem pelo WhatsApp');
  }
}

async function getStatus(tenantConfig) {
  try {
    const { zapiInstanceId, zapiToken, zapiClientToken } = tenantConfig;
    const url = `https://api.z-api.io/instances/${zapiInstanceId}/token/${zapiToken}/status`;
    const response = await axios.get(url, {
      headers: {
        'Client-Token': zapiClientToken
      }
    });

    console.log('[Z-API] Status verificado');
    return response.data;
  } catch (error) {
    console.error('[Z-API] Erro ao verificar status:', error.response?.data || error.message);
    throw new Error('Falha ao verificar status do Z-API');
  }
}

module.exports = { sendMessage, getStatus };

