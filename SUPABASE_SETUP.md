# 🗄️ Configuração do Supabase para o Chatbot

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Variáveis de ambiente configuradas

## 🔧 Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```bash
# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
SUPABASE_ANON_KEY=sua_anon_key_aqui

# Outras configurações
GESTAODS_TOKEN=seu_token_gestaods
DASHBOARD_API_KEY=sua_api_key_dashboard
```

## 🗂️ Estrutura das Tabelas Necessárias

### 1. Tabela `appointment_requests`
```sql
CREATE TABLE appointment_requests (
  id BIGSERIAL PRIMARY KEY,
  cpf VARCHAR(14) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  requested_date VARCHAR(10) NOT NULL,
  requested_time VARCHAR(5) NOT NULL,
  tipo VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  motivo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Tabela `reschedule_requests`
```sql
CREATE TABLE reschedule_requests (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  current_datetime TIMESTAMP WITH TIME ZONE,
  requested_date VARCHAR(10),
  requested_time VARCHAR(5),
  token_agendamento VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Tabela `cancel_requests`
```sql
CREATE TABLE cancel_requests (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  agendamento_token VARCHAR(100),
  motivo TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Tabela `waitlist`
```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  cpf VARCHAR(14),
  name VARCHAR(200),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(200),
  motivo TEXT,
  prioridade VARCHAR(20) DEFAULT 'media',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Tabela `secretary_tickets`
```sql
CREATE TABLE secretary_tickets (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  motivo TEXT,
  status VARCHAR(20) DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Tabela `patients`
```sql
CREATE TABLE patients (
  id BIGSERIAL PRIMARY KEY,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7. Tabela `messages`
```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  direction VARCHAR(10) NOT NULL, -- 'in' ou 'out'
  content TEXT NOT NULL,
  state VARCHAR(100),
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 8. Tabela `notifications`
```sql
CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 9. Tabela `tenants`
Armazena credenciais e metadados para cada clínica/tenant.
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  zapi_instance_id VARCHAR(100),
  zapi_token VARCHAR(255),
  zapi_client_token VARCHAR(255),
  gestaods_token VARCHAR(255),
  dashboard_api_key VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔐 Configuração de Políticas RLS (Row Level Security)

Para desenvolvimento, você pode desabilitar o RLS temporariamente:

```sql
-- Desabilitar RLS para todas as tabelas
ALTER TABLE appointment_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE reschedule_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE cancel_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
ALTER TABLE secretary_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE patients DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;
```

## 🧪 Testando a Configuração

Execute os scripts de teste:

```bash
# Testar conexão
node test-supabase.js

# Verificar tabelas
node check-tables.js
```

## 🚨 Problemas Comuns

### 1. "Cliente Supabase não configurado"
- Verifique se o arquivo `.env` existe
- Confirme se as variáveis estão corretas
- Reinicie o servidor após alterar o `.env`

### 2. "Tabela não existe"
- Execute os comandos SQL para criar as tabelas
- Verifique se está no schema correto

### 3. "Erro de permissão"
- Desabilite temporariamente o RLS
- Verifique se as chaves de API estão corretas

### 4. "Timeout na conexão"
- Verifique a URL do Supabase
- Confirme se o projeto está ativo

## 📊 Monitoramento

Após a configuração, você deve ver:

1. ✅ Agendamentos aparecendo na dashboard
2. ✅ Contador de agendamentos pendentes funcionando
3. ✅ Notificações sendo criadas
4. ✅ Logs de sucesso no console

## 🔄 Próximos Passos

1. Configure as variáveis de ambiente
2. Execute os scripts de teste
3. Crie as tabelas se necessário
4. Teste o fluxo de agendamento
5. Verifique se os dados aparecem na dashboard
