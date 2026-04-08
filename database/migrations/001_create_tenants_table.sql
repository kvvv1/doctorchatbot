CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  api_key TEXT NOT NULL,
  api_secret TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
