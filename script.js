document.addEventListener("DOMContentLoaded", function () {
  // Abas
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Configuração global de fonte
  const globalFont = {
    size: 16,       // Tamanho padrão da fonte
    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  // Gráfico Saúde
  new Chart(document.getElementById("graficoSaude"), {
    type: "bar",
    data: {
      labels: programasSaude.labels,
      datasets: [{
        label: "Valor (R$)",
        data: programasSaude.data,
        backgroundColor: "#1a3a6e"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: { ...globalFont, weight: 'bold' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#4CAF50',
          borderWidth: 2,
          cornerRadius: 10,
          displayColors: false,
          titleFont: { ...globalFont, size: 14 },
          bodyFont: { ...globalFont, size: 13 }
        }
      },
      scales: {
        y: {
          ticks: {
            color: '#ffffff',
            font: globalFont,
            callback: function(value) {
              return (value >= 1e6) ? 'R$ ' + (value / 1e6).toFixed(1) + ' mi' :
                     (value >= 1e3) ? 'R$ ' + (value / 1e3).toFixed(1) + ' mil' : 'R$ ' + value;
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        x: {
          ticks: {
            color: '#ffffff',
            font: globalFont
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });

  // === GRÁFICO DE COBERTURA VACINAL - MAPA DE CALOR (ORDEM DECRESCENTE) ===
const ctxVacinas = document.getElementById("graficoVacinas").getContext("2d");

// Dados ordenados da maior para a menor cobertura
const vacinas = [
  { nome: "Polio Oral Bivalente", valor: 98.2 },
  { nome: "Tríplice Viral - 1° Dose", valor: 95.6 },
  { nome: "Pneumo 10", valor: 94.4 },
  { nome: "Meningo C (1° Reforço)", valor: 91.5 },
  { nome: "Pneumo 10 (1° Reforço)", valor: 91.0 },
  { nome: "Rotavírus", valor: 90.3 },
  { nome: "DTP (1° Reforço)", valor: 87.7 },
  { nome: "Polio Injetável (VIP)", valor: 86.8 },
  { nome: "Meningo C", valor: 81.9 },
  { nome: "Tríplice Viral - 2° Dose", valor: 78.6 },
  { nome: "DTP", valor: 77.3 },
  { nome: "Penta (DTP/HepB/Hib)", valor: 77.1 },
  { nome: "Hepatite B", valor: 76.6 },
  { nome: "dTpa Adulto - Gestantes", valor: 76.2 },
  { nome: "BCG", valor: 73.0 },
  { nome: "Varicela", valor: 71.1 },
  { nome: "Hepatite A Infantil", valor: 70.2 },
  { nome: "Febre Amarela", valor: 69.1 },
  { nome: "Hepatite B (<30 dias)", valor: 69.0 }
];

// Extraímos os nomes e valores
const labels = vacinas.map(v => v.nome);
const data = vacinas.map(v => v.valor);

// Função para definir cor com base na cobertura
function getCor(valor) {
  if (valor >= 90) return '#4CAF50';   // Verde (ótimo)
  if (valor >= 80) return '#FFC107';   // Amarelo (bom)
  if (valor >= 70) return '#FF9800';   // Laranja (atenção)
  return '#F44336';                    // Vermelho (crítico)
}

const backgroundColors = data.map(getCor);

new Chart(ctxVacinas, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cobertura Vacinal (%)',
      data: data,
      backgroundColor: backgroundColors,
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Barras horizontais para melhor leitura
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: { size: 13, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4CAF50',
        borderWidth: 2,
        cornerRadius: 10,
        callbacks: {
          label: function(context) {
            const valor = context.parsed.x;
            const cor = getCor(valor);
            return `Cobertura: ${valor}%`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#ffffff',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        title: {
          display: true,
          text: 'Cobertura (%)',
          color: '#ffffff',
          font: { size: 13 }
        }
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: { size: 12 }
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      animateRotate: false,
      animateScale: true,
      duration: 1200,
      easing: 'easeOutQuart'
    }
  }
});

  // Gráfico Educação
  new Chart(document.getElementById("graficoEducacao"), {
    type: "doughnut",
    data: {
      labels: educacao.labels,
      datasets: [{
        data: educacao.data,
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#F44336"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#ffffff',
            font: { ...globalFont, weight: 'bold' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          titleFont: { ...globalFont, size: 14 },
          bodyFont: { ...globalFont, size: 13 }
        }
      },
      cutout: '70%'
    }
  });

  // === GRÁFICO DE FINANÇAS (com pontos grandes e fonte ampliada) ===
  new Chart(document.getElementById("graficoFinancas"), {
    type: "line",
    data: financas,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: { ...globalFont, weight: 'bold', size: 14 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#4CAF50',
          borderWidth: 2,
          cornerRadius: 10,
          displayColors: false,
          titleFont: { ...globalFont, size: 15, weight: 'bold' },
          bodyFont: { ...globalFont, size: 14 }
        }
      },
      scales: {
        y: {
          ticks: {
            color: '#ffffff',
            font: { ...globalFont, size: 14 },
            callback: function(value) {
              return 'R$ ' + (value / 1e6).toFixed(1) + ' mi';
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        x: {
          ticks: {
            color: '#ffffff',
            font: { ...globalFont, size: 14 }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        }
      },
      elements: {
        point: {
          radius: 7,           // Ponto maior
          hoverRadius: 10,     // Efeito hover mais visível
          backgroundColor: '#ffffff',
          borderColor: '#1a3a6e',
          borderWidth: 2,
          hoverBackgroundColor: '#1a3a6e',
          hoverBorderColor: '#ffffff'
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });

  // Gráfico Saneamento
  new Chart(document.getElementById("graficoSaneamento"), {
    type: "polarArea",
    data: {
      labels: saneamento.labels,
      datasets: [{
        data: saneamento.data,
        backgroundColor: saneamento.backgroundColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: { ...globalFont, weight: 'bold', size: 14 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          titleFont: { ...globalFont, size: 14 },
          bodyFont: { ...globalFont, size: 13 }
        }
      },
      scales: {
        r: {
          ticks: {
            color: '#ffffff',
            font: globalFont
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          pointLabels: {
            color: '#ffffff',
            font: { ...globalFont, size: 14, weight: 'bold' }
          }
        }
      }
    }
  });
});