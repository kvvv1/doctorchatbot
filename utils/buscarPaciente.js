// utils/buscarPaciente.js
const axios = require('axios');

// Busca paciente pelo CPF usando o token fornecido pelo tenant
async function buscarPacientePorCPF(cpf, gestaodsToken) {
  const token = gestaodsToken;
  const url = `https://apidev.gestaods.com.br/api/paciente/${token}/${cpf}/`;

  try {
    console.log(`🔍 Buscando paciente CPF: ${cpf}`);
    console.log(`🌐 URL: ${url}`);
    
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log(`📊 Status da resposta: ${response.status}`);
    console.log(`📦 Dados recebidos:`, response.data);
    
    if (response.status === 200 && response.data) {
      return response.data; // aqui retorna diretamente os dados
    }

    return null;
  } catch (error) {
    console.error('❌ Erro ao buscar paciente:', error?.response?.data || error.message);
    return null;
  }
}

// Função para buscar dados detalhados do paciente
async function buscarDadosDetalhadosPaciente(cpf, gestaodsToken) {
  const token = gestaodsToken;
  
  // Tenta diferentes endpoints para buscar dados detalhados
  const urls = [
    `https://apidev.gestaods.com.br/api/paciente/${token}/${cpf}/detalhes/`,
    `https://apidev.gestaods.com.br/api/paciente/${token}/${cpf}/info/`,
    `https://apidev.gestaods.com.br/api/pacientes/${token}/${cpf}/`,
    `https://apidev.gestaods.com.br/api/paciente/${token}/${cpf}/completo/`
  ];

  for (const url of urls) {
    try {
      console.log(`🔍 Tentando buscar dados detalhados em: ${url}`);
      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 && response.data) {
        console.log(`✅ Dados detalhados encontrados:`, response.data);
        return response.data;
      }
    } catch (error) {
      console.log(`❌ Endpoint não funcionou: ${url}`);
      continue;
    }
  }

  return null;
}

module.exports = { buscarPacientePorCPF, buscarDadosDetalhadosPaciente }; 
