// === data.js (versão atualizada com todos os programas) ===

// Dados de Saúde (completo, baseado na planilha)
const programasSaude = {
  labels: [
    'PSF', 'EPI (Custeio)', 'EPI (Invest)', 'ASSFARM',
    'ESP', 'SAMU', 'RAPS', 'SOCIOEDUCATIVO', 'COFAVS', 'PCE'
  ],
  data: [
    1637452.70,  // PSF
    370000,      // EPI Custeio
    300000,      // EPI Investimento
    246247.20,   // ASSFARM
    221964,      // ESP
    204750,      // SAMU
    109345.60,   // RAPS
    70000,       // SOCIOEDUCATIVO
    17455.61,    // COFAVS
    485.48       // PCE (possível erro, mas mantido)
  ],
  backgroundColor: [
    '#1a3a6e',   // PSF
    '#4CAF50',   // EPI Custeio
    '#FF9800',   // EPI Investimento
    '#2196F3',   // ASSFARM
    '#9C27B0',   // ESP
    '#F44336',   // SAMU
    '#FF5722',   // RAPS
    '#795548',   // SOCIOEDUCATIVO
    '#607D8B',   // COFAVS
    '#9E9E9E'    // PCE
  ]
};

// Dados de Vacinas (completo, baseado no PDF)
const vacinas = {
  labels: [
    'Polio Oral', 'Tríplice 1ª', 'Pneumo 10', 'Meningo C (Reforço)',
    'Pneumo 10 (Reforço)', 'Rotavírus', 'DTP (Reforço)', 'Polio Injetável',
    'Meningo C', 'Tríplice 2ª', 'DTP', 'Penta', 'HepB', 'dTpa Gestantes',
    'BCG', 'Varicela', 'HepA Infantil', 'Febre Amarela', 'HepB <30d'
  ],
  data: [
    98.2, 95.6, 94.4, 91.5, 91.0, 90.3, 87.7, 86.8,
    81.9, 78.6, 77.3, 77.1, 76.6, 76.2, 73.0, 71.1,
    70.2, 69.1, 69.0
  ],
  backgroundColor: (ctx) => {
    const value = ctx.parsed.y;
    if (value >= 90) return '#4CAF50';  // Excelente
    if (value >= 80) return '#FFC107';  // Regular
    return '#F44336';                   // Crítico
  }
};

// Dados de Educação (mantido)
const educacao = {
  labels: ['Infantil', 'Anos Iniciais', 'Anos Finais', 'EJA'],
  data: [89.5, 91.5, 84.5, 70.7],
  backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336']
};

// Dados de Finanças (FPM + FUNDEB) - com dados completos até 2025
const financas = {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  datasets: [
    {
      label: 'FPM',
      data: [29554086, 39222576, 48963388, 54733733, 67323840, 36904927],
      backgroundColor: '#1a3a6e',
      borderColor: '#ffffff',
      borderWidth: 2
    },
    {
      label: 'FUNDEB (ICMS)',
      data: [35848598, 45002074, 49841571, 56024127, 66033121, 37152401],
      backgroundColor: '#4CAF50',
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
};

// Dados de Saneamento
const saneamento = {
  labels: ['Água', 'Esgoto', 'Resíduos'],
  data: [62.95, 38.61, 39.04],
  backgroundColor: ['#2196F3', '#F44336', '#FF9800']
};