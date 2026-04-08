# WhatsApp Chatbot + GestãoDS

Um chatbot inteligente para WhatsApp que integra com sistema GestãoDS para automação de vendas e atendimento ao cliente.

## 🚀 Funcionalidades

- **Integração com Z-API**: Recebe e envia mensagens via WhatsApp
- **GestãoDS CRM**: Gerenciamento de leads e oportunidades
- **Memory Store**: Gerenciamento de estado das conversas
- **Webhook**: Endpoint para receber mensagens do Z-API
- **Agendamento de Consultas**: Sistema completo de agendamento
- **Visualização de Agendamentos**: Lista agendamentos futuros (120 dias)
- **Reagendamento**: Permite alterar data/hora de consultas
- **Cancelamento**: Interface para cancelar consultas

## 📁 Estrutura do Projeto

```
whatsapp-chatbot/
├── index.js                 # Servidor principal
├── controllers/
│   └── messageController.js # Controlador de mensagens
├── services/
│   ├── zapiService.js       # Integração com Z-API
│   └── gestaodsService.js   # Integração com GestãoDS
├── utils/
│   └── memoryStore.js       # Gerenciamento de estado
├── .env                     # Variáveis de ambiente
├── package.json
└── README.md
```

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd whatsapp-chatbot
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   ```
   
   Edite o arquivo `.env` com suas credenciais:
   ```env
   PORT=3000
   ZAPI_API_KEY=your_zapi_api_key
   ZAPI_INSTANCE_ID=your_instance_id
   GESTAODS_API_KEY=your_gestaods_api_key
   ```

4. **Execute o servidor**
   ```bash
   npm start
   ```

5. **Teste a funcionalidade de agendamentos**
   ```bash
   node teste-agendamentos.js
   ```

## 🔧 Configuração

### Z-API Setup
1. Crie uma conta no [Z-API](https://z-api.io)
2. Crie uma instância do WhatsApp
3. Obtenha sua API Key e Instance ID
4. Configure o webhook para: `https://seu-dominio.com/tenant/{tenantId}/webhook`

### GestãoDS Setup
1. Configure sua conta no GestãoDS
2. Obtenha sua API Key e Company ID
3. Configure as variáveis de ambiente

## 📅 Sistema de Agendamentos

### Visualização de Agendamentos
O sistema permite visualizar agendamentos futuros dos pacientes com as seguintes funcionalidades:

- **Busca por CPF**: Filtra agendamentos específicos do paciente
- **Período de 120 dias**: Mostra agendamentos de hoje até 120 dias no futuro
- **Opções de ação**: Reagendar, Cancelar ou Voltar ao menu
- **Integração com API**: Usa a API `/listagem/{token}` do GestãoDS

### Fluxo de Visualização
1. Usuário digita "ver agendamentos" ou seleciona opção 2 no menu
2. Sistema solicita CPF do paciente
3. Confirma identidade do paciente
4. Lista agendamentos futuros com numeração
5. Permite selecionar agendamento para ação
6. Oferece opções: Reagendar, Cancelar ou Voltar

### API de Agendamentos
```
GET https://apidev.gestaods.com.br/api/dados-agendamento/listagem/{token}
```

**Parâmetros:**
- `data_inicial`: Data atual (DD/MM/YYYY)
- `data_final`: Data atual + 120 dias (DD/MM/YYYY)

**Exemplo:**
```
GET /listagem/{token}?data_inicial=04/08/2025&data_final=03/09/2025
```

## 📡 API Endpoints

### POST /tenant/:tenantId/webhook
Recebe mensagens do Z-API

**Body:**
```json
{
  "message": "Olá, como posso ajudar?",
  "phone": "5511999999999",
  "name": "João Silva"
}
```

### Dashboard API (/api/painel)

- Base: `http://localhost:3000/api/painel` (use header `x-api-key: DASHBOARD_API_KEY` se configurado)
- Endpoints implementados:
  - `GET /estatisticas`
  - `GET /agendamentos`
  - `GET /reagendamentos`
  - `GET /cancelamentos`
  - `GET /espera`
  - `GET /secretaria`
  - `GET /pacientes`
  - `POST /agendamentos/:id/aprovar`
  - `POST /agendamentos/:id/rejeitar`
  - `POST /reagendamentos/:id/aprovar`
  - `POST /cancelamentos/:id/aprovar`
  - `POST /secretaria/atender`

### Supabase

1. Configure `.env` com `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
2. Rode o SQL de `supabase/schema.sql` no editor SQL do Supabase.
3. Reinicie o servidor.

**Response:**
```json
{
  "success": true
}
```

## 🔄 Fluxo de Funcionamento

1. **Recebimento**: Z-API envia mensagem para `/tenant/:tenantId/webhook`
2. **Processamento**: `messageController` processa a mensagem
3. **GestãoDS**: Criação/atualização de leads
4. **Resposta**: Envio da resposta via Z-API
5. **Memória**: Armazenamento do estado da conversa

## 🧠 Memory Store

O sistema mantém em memória:
- **Sessões**: Estado das conversas ativas
- **Dados do usuário**: Informações coletadas
- **Histórico**: Últimas mensagens trocadas

### Limpeza Automática
- Sessões antigas (>24h) são removidas automaticamente
- Histórico limitado a 50 mensagens por usuário

## 📊 Monitoramento

### Logs
- ✅ Mensagens enviadas com sucesso
- ❌ Erros de integração
- 📨 Mensagens recebidas
- 🗑️ Sessões removidas

### Estatísticas
```javascript
const stats = memoryStore.getStats();
console.log(stats);
// { activeSessions: 5, userDataEntries: 10, conversationHistories: 8 }
```

## 🚨 Tratamento de Erros

O sistema inclui tratamento robusto de erros:
- Validação de dados de entrada
- Retry automático para APIs externas
- Logs detalhados para debugging
- Fallbacks para falhas de integração

## 🔒 Segurança

- Validação de tokens de API
- Sanitização de dados de entrada
- Rate limiting (recomendado)
- HTTPS obrigatório em produção

## 🚀 Deploy

### Heroku
```bash
heroku create seu-app-name
heroku config:set NODE_ENV=production
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.



---

