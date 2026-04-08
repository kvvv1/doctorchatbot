const { flowController } = require('../services/flowController');
const zapiService = require('../services/zapiService');

exports.handleWebhook = async (req, res) => {
  const { tenantConfig } = req;
  try {
    const data = req.body;

    const userPhone = data.from;
    const userMessage = data.message?.text?.trim();

    if (!userPhone || !userMessage) {
      return res.status(400).send('Mensagem inválida');
    }

    const resposta = await flowController(userMessage, userPhone, tenantConfig);

    await zapiService.sendMessage(userPhone, resposta, tenantConfig);

    res.status(200).send('Mensagem processada');
  } catch (err) {
    console.error('[Erro na controller]', err);
    res.status(500).send('Erro no processamento da mensagem');
  }
};
