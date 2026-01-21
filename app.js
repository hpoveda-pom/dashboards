// Configuración de colores profesionales
const chartColors = {
    grid: '#e9ecef',
    text: '#495057',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    purple: '#6f42c1',
    orange: '#fd7e14'
};

// Data Dummy para el Dashboard
const generateDummyData = () => {
    const now = new Date();
    const hours = [];
    const callsData = [];
    const slaData = [];
    
    // Generar datos de las últimas 12 horas
    for (let i = 11; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
        hours.push(hour.getHours() + ':00');
        callsData.push(Math.floor(Math.random() * 150) + 80);
        slaData.push(Math.random() * 15 + 80);
    }
    
    return {
        hours,
        callsData,
        slaData,
        currentMetrics: {
            sla: Math.random() * 10 + 85,
            aht: Math.random() * 2 + 4.5,
            fcr: Math.random() * 10 + 70,
            nps: Math.floor(Math.random() * 30 + 45),
            abandonRate: Math.random() * 3 + 3,
            waitTime: Math.floor(Math.random() * 20 + 20),
            activeAgents: Math.floor(Math.random() * 5 + 48),
            totalAgents: 52,
            callsPerHour: Math.floor(Math.random() * 50 + 120),
            callsToday: Math.floor(Math.random() * 500 + 2500),
            costPerCall: (Math.random() * 1.5 + 7.5).toFixed(2),
            revenue: (Math.random() * 5000 + 45000).toFixed(2),
            roi: (Math.random() * 10 + 25).toFixed(1),
            adherence: Math.random() * 10 + 88,
            occupancy: Math.random() * 10 + 82
        },
        channelDistribution: {
            telefono: Math.floor(Math.random() * 10 + 65),
            chat: Math.floor(Math.random() * 10 + 20),
            email: Math.floor(Math.random() * 5 + 10),
            social: Math.floor(Math.random() * 3 + 5)
        },
        topAgents: [
            { name: 'María González', calls: 145, aht: 4.2, fcr: 92 },
            { name: 'Carlos Ruiz', calls: 138, aht: 4.5, fcr: 88 },
            { name: 'Ana Martínez', calls: 132, aht: 4.8, fcr: 90 },
            { name: 'Luis Fernández', calls: 128, aht: 4.3, fcr: 87 },
            { name: 'Sofia López', calls: 125, aht: 4.6, fcr: 89 }
        ],
        adherenceData: [],
        occupancyData: [],
        financialData: {
            days: [],
            revenue: [],
            costs: [],
            profit: []
        }
    };
};

// Inicializar data
let data = generateDummyData();

// Función para actualizar la hora de última actualización
const updateLastUpdate = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES');
    document.getElementById('lastUpdate').textContent = timeString;
};

// Función para actualizar métricas principales
const updateMetrics = () => {
    const m = data.currentMetrics;
    
    // SLA
    const slaElement = document.getElementById('slaValue');
    const slaBadge = document.getElementById('slaBadge');
    const slaBar = document.getElementById('slaBar');
    slaElement.textContent = m.sla.toFixed(1) + '%';
    slaBar.style.width = m.sla + '%';
    if (m.sla >= 80) {
        slaBadge.className = 'badge-professional badge-success-professional';
        slaBadge.textContent = 'Excelente';
        slaBar.className = 'progress-fill-professional';
        slaBar.style.background = chartColors.primary;
    } else if (m.sla >= 70) {
        slaBadge.className = 'badge-professional badge-warning-professional';
        slaBadge.textContent = 'Bueno';
        slaBar.className = 'progress-fill-professional';
        slaBar.style.background = chartColors.warning;
    } else {
        slaBadge.className = 'badge-professional badge-danger-professional';
        slaBadge.textContent = 'Bajo';
        slaBar.className = 'progress-fill-professional';
        slaBar.style.background = chartColors.danger;
    }
    
    // AHT
    document.getElementById('ahtValue').textContent = m.aht.toFixed(1) + ' min';
    const ahtBadge = document.getElementById('ahtBadge');
    if (m.aht <= 6) {
        ahtBadge.className = 'badge-professional badge-success-professional';
        ahtBadge.textContent = 'Óptimo';
    } else if (m.aht <= 8) {
        ahtBadge.className = 'badge-professional badge-warning-professional';
        ahtBadge.textContent = 'Aceptable';
    } else {
        ahtBadge.className = 'badge-professional badge-danger-professional';
        ahtBadge.textContent = 'Alto';
    }
    
    // FCR
    const fcrElement = document.getElementById('fcrValue');
    const fcrBadge = document.getElementById('fcrBadge');
    const fcrBar = document.getElementById('fcrBar');
    fcrElement.textContent = m.fcr.toFixed(1) + '%';
        fcrBar.style.width = m.fcr + '%';
        fcrBar.style.background = chartColors.purple;
    if (m.fcr >= 75) {
        fcrBadge.className = 'badge-professional badge-success-professional';
        fcrBadge.textContent = 'Alto';
    } else if (m.fcr >= 65) {
        fcrBadge.className = 'badge-professional badge-warning-professional';
        fcrBadge.textContent = 'Medio';
    } else {
        fcrBadge.className = 'badge-professional badge-danger-professional';
        fcrBadge.textContent = 'Bajo';
    }
    
    // NPS
    document.getElementById('npsValue').textContent = m.nps;
    const npsBadge = document.getElementById('npsBadge');
    if (m.nps >= 50) {
        npsBadge.className = 'badge-professional badge-success-professional';
        npsBadge.textContent = 'Excelente';
    } else if (m.nps >= 30) {
        npsBadge.className = 'badge-professional badge-warning-professional';
        npsBadge.textContent = 'Bueno';
    } else {
        npsBadge.className = 'badge-professional badge-danger-professional';
        npsBadge.textContent = 'Bajo';
    }
    
    // Abandono
    document.getElementById('abandonValue').textContent = m.abandonRate.toFixed(1) + '%';
    const abandonBadge = document.getElementById('abandonBadge');
    if (m.abandonRate <= 5) {
        abandonBadge.className = 'badge-professional badge-success-professional';
        abandonBadge.textContent = 'Bajo';
    } else if (m.abandonRate <= 8) {
        abandonBadge.className = 'badge-professional badge-warning-professional';
        abandonBadge.textContent = 'Moderado';
    } else {
        abandonBadge.className = 'badge-professional badge-danger-professional';
        abandonBadge.textContent = 'Alto';
    }
    
    // Tiempo en espera
    document.getElementById('waitValue').textContent = m.waitTime + ' seg';
    const waitBadge = document.getElementById('waitBadge');
    if (m.waitTime <= 30) {
        waitBadge.className = 'badge-professional badge-success-professional';
        waitBadge.textContent = 'Bajo';
    } else if (m.waitTime <= 60) {
        waitBadge.className = 'badge-professional badge-warning-professional';
        waitBadge.textContent = 'Moderado';
    } else {
        waitBadge.className = 'badge-professional badge-danger-professional';
        waitBadge.textContent = 'Alto';
    }
    
    // Agentes
    document.getElementById('agentsValue').textContent = m.activeAgents;
    document.getElementById('agentsTotal').textContent = m.totalAgents;
    const agentsBadge = document.getElementById('agentsBadge');
    agentsBadge.className = 'badge-professional badge-success-professional';
    
    // Llamadas
    document.getElementById('callsValue').textContent = m.callsPerHour;
    document.getElementById('callsToday').textContent = m.callsToday.toLocaleString();
    const callsBadge = document.getElementById('callsBadge');
    callsBadge.className = 'badge-professional badge-success-professional';
    
    // Financiero
    document.getElementById('costPerCall').textContent = '$' + m.costPerCall;
    document.getElementById('revenue').textContent = '$' + parseFloat(m.revenue).toLocaleString('es-ES', {minimumFractionDigits: 2});
    document.getElementById('roi').textContent = m.roi + '%';
};

// Función para generar datos de adherencia (últimas 7 horas del día)
const generateAdherenceData = () => {
    const adherenceData = [];
    const occupancyData = [];
    const hours = [];
    
    for (let i = 6; i >= 0; i--) {
        const hour = new Date();
        hour.setHours(hour.getHours() - i);
        hours.push(hour.getHours() + ':00');
        adherenceData.push(Math.random() * 8 + 88);
        occupancyData.push(Math.random() * 10 + 80);
    }
    
    data.adherenceData = adherenceData;
    data.occupancyData = occupancyData;
    data.adherenceHours = hours;
};

// Función para generar datos financieros (últimos 7 días)
const generateFinancialData = () => {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const revenue = [];
    const costs = [];
    const profit = [];
    
    for (let i = 0; i < 7; i++) {
        const rev = Math.random() * 10000 + 40000;
        const cost = Math.random() * 8000 + 35000;
        revenue.push(rev);
        costs.push(cost);
        profit.push(rev - cost);
    }
    
    data.financialData = { days, revenue, costs, profit };
};

// Gráfico de Volumen de Llamadas
let callsChart;
const initCallsChart = () => {
    const ctx = document.getElementById('callsChart').getContext('2d');
    callsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.hours,
            datasets: [{
                label: 'Llamadas',
                data: data.callsData,
                borderColor: '#60a5fa',
                backgroundColor: 'rgba(96, 165, 250, 0.15)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#60a5fa',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text,
                        stepSize: 50
                    }
                }
            }
        }
    });
};

// Gráfico de Service Level
let slaChart;
const initSLAChart = () => {
    const ctx = document.getElementById('slaChart').getContext('2d');
    slaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.hours,
            datasets: [{
                label: 'SLA %',
                data: data.slaData,
                borderColor: chartColors.success,
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: chartColors.success,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1
            }, {
                label: 'Meta (80%)',
                data: Array(12).fill(80),
                borderColor: chartColors.danger,
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: chartColors.text,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                }
            }
        }
    });
};

// Gráfico de Distribución por Canal
let channelChart;
const initChannelChart = () => {
    const ctx = document.getElementById('channelChart').getContext('2d');
    channelChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Teléfono', 'Chat', 'Email', 'Redes Sociales'],
            datasets: [{
                data: [
                    data.channelDistribution.telefono,
                    data.channelDistribution.chat,
                    data.channelDistribution.email,
                    data.channelDistribution.social
                ],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.purple,
                    chartColors.success,
                    chartColors.orange
                ],
                borderColor: '#0a0e27',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: chartColors.text,
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
};

// Gráfico de Top Agentes
let agentsChart;
const initAgentsChart = () => {
    const ctx = document.getElementById('agentsChart').getContext('2d');
    agentsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.topAgents.map(a => a.name),
            datasets: [{
                label: 'Llamadas Atendidas',
                data: data.topAgents.map(a => a.calls),
                backgroundColor: chartColors.orange,
                borderColor: chartColors.orange,
                borderWidth: 2,
                borderRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: chartColors.grid,
                        display: false
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                }
            }
        }
    });
};

// Gráfico de Adherencia
let adherenceChart;
const initAdherenceChart = () => {
    generateAdherenceData();
    const ctx = document.getElementById('adherenceChart').getContext('2d');
    adherenceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.adherenceHours,
            datasets: [{
                label: 'Adherencia %',
                data: data.adherenceData,
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 2,
                borderRadius: 0
            }, {
                label: 'Meta (90%)',
                data: Array(data.adherenceData.length).fill(90),
                borderColor: chartColors.danger,
                borderDash: [5, 5],
                type: 'line',
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: chartColors.text,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: chartColors.grid,
                        display: false
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                }
            }
        }
    });
};

// Gráfico de Ocupación
let occupancyChart;
const initOccupancyChart = () => {
    const ctx = document.getElementById('occupancyChart').getContext('2d');
    occupancyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.adherenceHours,
            datasets: [{
                label: 'Ocupación %',
                data: data.occupancyData,
                borderColor: chartColors.info,
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: chartColors.info,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1
            }, {
                label: 'Meta (85%)',
                data: Array(data.occupancyData.length).fill(85),
                borderColor: chartColors.danger,
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: chartColors.text,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                }
            }
        }
    });
};

// Gráfico Financiero
let financialChart;
const initFinancialChart = () => {
    generateFinancialData();
    const ctx = document.getElementById('financialChart').getContext('2d');
    financialChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.financialData.days,
            datasets: [{
                label: 'Ingresos',
                data: data.financialData.revenue,
                borderColor: chartColors.success,
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: chartColors.success,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Costos',
                data: data.financialData.costs,
                borderColor: chartColors.danger,
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: chartColors.danger,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Ganancia Neta',
                data: data.financialData.profit,
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: chartColors.primary,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1,
                yAxisID: 'y'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: chartColors.text,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text,
                        callback: function(value) {
                            return '$' + value.toLocaleString('es-ES');
                        }
                    }
                }
            }
        }
    });
};

// Actualizar tabla de métricas
const updateMetricsTable = () => {
    const m = data.currentMetrics;
    const tableBody = document.getElementById('metricsTableBody');
    
    const metrics = [
        {
            name: 'Service Level (SLA)',
            value: m.sla.toFixed(1) + '%',
            target: '≥ 80%',
            trend: m.sla >= 80 ? '↗ Excelente' : '↘ Mejorar',
            status: m.sla >= 80 ? 'success' : (m.sla >= 70 ? 'warning' : 'danger')
        },
        {
            name: 'AHT Promedio',
            value: m.aht.toFixed(1) + ' min',
            target: '≤ 6 min',
            trend: m.aht <= 6 ? '↗ Óptimo' : '↘ Reducir',
            status: m.aht <= 6 ? 'success' : (m.aht <= 8 ? 'warning' : 'danger')
        },
        {
            name: 'FCR (Primera Resolución)',
            value: m.fcr.toFixed(1) + '%',
            target: '≥ 75%',
            trend: m.fcr >= 75 ? '↗ Alto' : '↘ Mejorar',
            status: m.fcr >= 75 ? 'success' : (m.fcr >= 65 ? 'warning' : 'danger')
        },
        {
            name: 'NPS (Satisfacción)',
            value: m.nps,
            target: '≥ 50',
            trend: m.nps >= 50 ? '↗ Excelente' : '↘ Mejorar',
            status: m.nps >= 50 ? 'success' : (m.nps >= 30 ? 'warning' : 'danger')
        },
        {
            name: 'Tasa de Abandono',
            value: m.abandonRate.toFixed(1) + '%',
            target: '≤ 5%',
            trend: m.abandonRate <= 5 ? '↗ Bajo' : '↘ Reducir',
            status: m.abandonRate <= 5 ? 'success' : (m.abandonRate <= 8 ? 'warning' : 'danger')
        },
        {
            name: 'Tiempo Espera Promedio',
            value: m.waitTime + ' seg',
            target: '≤ 30 seg',
            trend: m.waitTime <= 30 ? '↗ Bajo' : '↘ Reducir',
            status: m.waitTime <= 30 ? 'success' : (m.waitTime <= 60 ? 'warning' : 'danger')
        },
        {
            name: 'Adherencia al Horario',
            value: m.adherence.toFixed(1) + '%',
            target: '≥ 90%',
            trend: m.adherence >= 90 ? '↗ Excelente' : '↘ Mejorar',
            status: m.adherence >= 90 ? 'success' : (m.adherence >= 85 ? 'warning' : 'danger')
        },
        {
            name: 'Ocupación de Agentes',
            value: m.occupancy.toFixed(1) + '%',
            target: '≥ 85%',
            trend: m.occupancy >= 85 ? '↗ Óptimo' : '↘ Mejorar',
            status: m.occupancy >= 85 ? 'success' : (m.occupancy >= 80 ? 'warning' : 'danger')
        },
        {
            name: 'Costo por Llamada',
            value: '$' + m.costPerCall,
            target: '≤ $8.50',
            trend: parseFloat(m.costPerCall) <= 8.5 ? '↗ Eficiente' : '↘ Optimizar',
            status: parseFloat(m.costPerCall) <= 8.5 ? 'success' : (parseFloat(m.costPerCall) <= 10 ? 'warning' : 'danger')
        },
        {
            name: 'ROI Operacional',
            value: m.roi + '%',
            target: '≥ 25%',
            trend: parseFloat(m.roi) >= 25 ? '↗ Positivo' : '↘ Mejorar',
            status: parseFloat(m.roi) >= 25 ? 'success' : (parseFloat(m.roi) >= 20 ? 'warning' : 'danger')
        }
    ];
    
    tableBody.innerHTML = metrics.map(metric => {
        const statusColor = metric.status === 'success' ? 'text-green-700' : 
                          metric.status === 'warning' ? 'text-yellow-700' : 'text-red-700';
        return `
            <tr>
                <td class="font-semibold">${metric.name}</td>
                <td class="font-semibold" style="font-family: 'Roboto Mono', monospace;">${metric.value}</td>
                <td class="text-gray-600">${metric.target}</td>
                <td class="${statusColor} font-semibold">${metric.trend}</td>
                <td>
                    <span class="badge-professional badge-${metric.status}-professional">${metric.status === 'success' ? '✓ Óptimo' : metric.status === 'warning' ? '⚠ Atención' : '✗ Crítico'}</span>
                </td>
            </tr>
        `;
    }).join('');
};

// Función para actualizar todos los gráficos
const updateCharts = () => {
    // Actualizar datos
    data = generateDummyData();
    generateAdherenceData();
    generateFinancialData();
    
    // Actualizar gráficos
    callsChart.data.labels = data.hours;
    callsChart.data.datasets[0].data = data.callsData;
    callsChart.update('none');
    
    slaChart.data.labels = data.hours;
    slaChart.data.datasets[0].data = data.slaData;
    slaChart.update('none');
    
    channelChart.data.datasets[0].data = [
        data.channelDistribution.telefono,
        data.channelDistribution.chat,
        data.channelDistribution.email,
        data.channelDistribution.social
    ];
    channelChart.update('none');
    
    agentsChart.data.labels = data.topAgents.map(a => a.name);
    agentsChart.data.datasets[0].data = data.topAgents.map(a => a.calls);
    agentsChart.update('none');
    
    adherenceChart.data.labels = data.adherenceHours;
    adherenceChart.data.datasets[0].data = data.adherenceData;
    adherenceChart.update('none');
    
    occupancyChart.data.labels = data.adherenceHours;
    occupancyChart.data.datasets[0].data = data.occupancyData;
    occupancyChart.update('none');
    
    financialChart.data.datasets[0].data = data.financialData.revenue;
    financialChart.data.datasets[1].data = data.financialData.costs;
    financialChart.data.datasets[2].data = data.financialData.profit;
    financialChart.update('none');
};

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateLastUpdate();
    updateMetrics();
    updateMetricsTable();
    
    initCallsChart();
    initSLAChart();
    initChannelChart();
    initAgentsChart();
    initAdherenceChart();
    initOccupancyChart();
    initFinancialChart();
    
    // Actualizar cada 30 segundos
    setInterval(() => {
        data = generateDummyData();
        updateLastUpdate();
        updateMetrics();
        updateMetricsTable();
        updateCharts();
    }, 30000);
    
    // Actualizar hora cada segundo
    setInterval(updateLastUpdate, 1000);
});
