require('dotenv').config();

const tenantConfig = {
  zapiInstanceId: process.env.ZAPI_INSTANCE_ID,
  zapiToken: process.env.ZAPI_TOKEN,
  zapiClientToken: process.env.ZAPI_CLIENT_TOKEN,
  gestaodsToken: process.env.GESTAODS_TOKEN,
  gestaodsBaseUrl: process.env.GESTAODS_BASE_URL || 'https://apidev.gestaods.com.br'
};

module.exports = tenantConfig;
