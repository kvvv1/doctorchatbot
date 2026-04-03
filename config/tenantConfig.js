require('dotenv').config();

const tenantConfig = {
  clinicName: process.env.CLINIC_NAME || 'Clínica Nassif',
  businessHours: {
    weekday: {
      start: parseInt(process.env.BH_WEEKDAY_START || '8', 10),
      end: parseInt(process.env.BH_WEEKDAY_END || '18', 10)
    },
    saturday: {
      start: parseInt(process.env.BH_SATURDAY_START || '8', 10),
      end: parseInt(process.env.BH_SATURDAY_END || '12', 10)
    }
  },
  secretary: {
    phone: process.env.SECRETARY_PHONE || '+55 31 98600-3666',
    email: process.env.SECRETARY_EMAIL || 'contato@gabrielanassif.com'
  }
};

module.exports = tenantConfig;
