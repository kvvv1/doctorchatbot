require('dotenv').config();
const { supabase } = require('../services/supabaseClient');
const tenants = require('../tenants.json');

async function migrate() {
  if (!supabase) {
    console.error('Supabase client not configured.');
    return;
  }

  for (const tenant of tenants) {
    const { name, zapi_api_key, zapi_instance_id, gestaods_token } = tenant;
    const { error } = await supabase
      .from('tenants')
      .upsert({ name, zapi_api_key, zapi_instance_id, gestaods_token }, { onConflict: 'name' });

    if (error) {
      console.error(`Failed to insert tenant ${name}:`, error.message);
    } else {
      console.log(`Tenant ${name} inserted/updated successfully.`);
    }
  }
}

migrate();
