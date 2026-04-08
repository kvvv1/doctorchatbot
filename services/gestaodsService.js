const axios = require('axios');

const DEFAULT_BASE_URL = 'https://apidev.gestaods.com.br';

async function verificarPaciente(tenantConfig, cpf) {
  try {
    const baseUrl = tenantConfig.gestaodsBaseUrl || DEFAULT_BASE_URL;
    const token = tenantConfig.gestaodsToken;
    const url = `${baseUrl}/api/paciente/${token}/${cpf}/`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response?.status === 422) return null; // CPF inválido
    if (error.response?.status === 404) return null; // Não encontrado
    console.error('[GestãoDS] Erro na verificação de paciente:', error.message);
    throw new Error('Erro na consulta da API GestãoDS');
  }
}

async function buscarDiasDisponiveis(tenantConfig) {
  try {
    const baseUrl = tenantConfig.gestaodsBaseUrl || DEFAULT_BASE_URL;
    const token = tenantConfig.gestaodsToken;
    const url = `${baseUrl}/api/agendamento/dias-disponiveis/${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('[GestãoDS] Erro ao buscar dias disponíveis:', error.message);
    throw new Error('Erro ao consultar dias disponíveis');
  }
}

async function buscarHorariosDisponiveis(tenantConfig, data) {
  try {
    const baseUrl = tenantConfig.gestaodsBaseUrl || DEFAULT_BASE_URL;
    const token = tenantConfig.gestaodsToken;
    const url = `${baseUrl}/api/agendamento/horarios-disponiveis/${token}?data=${data}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('[GestãoDS] Erro ao buscar horários disponíveis:', error.message);
    throw new Error('Erro ao consultar horários disponíveis');
  }
}

async function agendarConsulta(tenantConfig, payload) {
  try {
    const baseUrl = tenantConfig.gestaodsBaseUrl || DEFAULT_BASE_URL;
    const url = `${baseUrl}/api/agendamento/agendar/`;

    // ✅ Validação dos campos obrigatórios
    if (!payload.token) {
      throw new Error('Token é obrigatório');
    }
    if (!payload.cpf) {
      throw new Error('CPF é obrigatório');
    }
    if (!payload.data_agendamento) {
      throw new Error('Data de agendamento é obrigatória');
    }
    if (!payload.data_fim_agendamento) {
      throw new Error('Data de fim do agendamento é obrigatória');
    }

    console.log('[GestãoDS] Enviando dados de agendamento:', JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log('[GestãoDS] Agendamento realizado com sucesso');
      return response.data;
    } else {
      console.error('[GestãoDS] Erro ao agendar consulta:', response.data);
      throw new Error(JSON.stringify(response.data));
    }

  } catch (error) {
    if (error.response) {
      console.error('[GestãoDS] Erro ao agendar consulta:', error.response.data);
      throw new Error(JSON.stringify(error.response.data));
    } else {
      console.error('[GestãoDS] Erro inesperado ao agendar consulta:', error.message);
      throw new Error('Erro inesperado ao realizar agendamento');
    }
  }
}

module.exports = {
  verificarPaciente,
  buscarDiasDisponiveis,
  buscarHorariosDisponiveis,
  agendarConsulta
};

