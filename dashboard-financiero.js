// Dashboard Financiero
let financieroCharts = {};

function initDashboardFinanciero() {
    const container = document.getElementById('financieroContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="metric-label">Ingresos del Mes</div>
                <div class="metric-value" id="ingresosMes">$0</div>
                <span class="badge badge-success" id="ingresosMesBadge">Alto</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="metric-label">Costos Operativos</div>
                <div class="metric-value" id="costosOperativos">$0</div>
                <span class="badge badge-warning" id="costosOperativosBadge">Controlado</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="metric-label">Ganancia Neta</div>
                <div class="metric-value" id="gananciaNeta">$0</div>
                <span class="badge badge-success" id="gananciaNetaBadge">Positiva</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-percentage"></i>
                </div>
                <div class="metric-label">ROI Operacional</div>
                <div class="metric-value" id="roiOperacional">0%</div>
                <span class="badge badge-success" id="roiOperacionalBadge">Óptimo</span>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-calculator"></i>
                </div>
                <div class="metric-label">Costo por Contacto</div>
                <div class="metric-value" id="costoContacto">$0.00</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Meta: ≤ $8.50</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488); color: white;">
                    <i class="fas fa-hand-holding-usd"></i>
                </div>
                <div class="metric-label">Valor por Contacto</div>
                <div class="metric-value" id="valorContacto">$0.00</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Ingreso promedio</div>
            </div>
        </div>
        
        <div class="chart-container mb-6">
            <div class="chart-title">
                <i class="fas fa-chart-line" style="color: #3b82f6;"></i>
                Tendencias Financieras (Últimos 30 Días)
            </div>
            <div class="chart-canvas-container">
                <canvas id="financieroTendenciasChart"></canvas>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #10b981;"></i>
                    Distribución de Ingresos
                </div>
                <div class="chart-canvas-container">
                    <canvas id="financieroIngresosChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #f59e0b;"></i>
                    Análisis de Costos
                </div>
                <div class="chart-canvas-container">
                    <canvas id="financieroCostosChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    updateFinancieroMetrics();
    initFinancieroCharts();
}

function updateFinancieroMetrics() {
    const data = generateFinancieroData();
    
    document.getElementById('ingresosMes').textContent = '$' + data.ingresosMes.toLocaleString('es-ES');
    document.getElementById('costosOperativos').textContent = '$' + data.costosOperativos.toLocaleString('es-ES');
    document.getElementById('gananciaNeta').textContent = '$' + data.gananciaNeta.toLocaleString('es-ES');
    document.getElementById('roiOperacional').textContent = data.roiOperacional.toFixed(1) + '%';
    document.getElementById('costoContacto').textContent = '$' + data.costoContacto.toFixed(2);
    document.getElementById('valorContacto').textContent = '$' + data.valorContacto.toFixed(2);
}

function generateFinancieroData() {
    const ingresos = Math.random() * 300000 + 1200000;
    const costos = Math.random() * 200000 + 900000;
    const ganancia = ingresos - costos;
    const roi = (ganancia / costos) * 100;
    
    return {
        ingresosMes: ingresos,
        costosOperativos: costos,
        gananciaNeta: ganancia,
        roiOperacional: roi,
        costoContacto: Math.random() * 2 + 7.5,
        valorContacto: Math.random() * 3 + 15.5
    };
}

function initFinancieroCharts() {
    const days = [];
    for (let i = 29; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        days.push((day.getMonth() + 1) + '/' + day.getDate());
    }
    
    // Chart: Tendencias
    const tendenciasCtx = document.getElementById('financieroTendenciasChart');
    if (tendenciasCtx && !financieroCharts.tendencias) {
        financieroCharts.tendencias = new Chart(tendenciasCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days.filter((_, i) => i % 3 === 0), // Mostrar cada 3 días
                datasets: [{
                    label: 'Ingresos',
                    data: days.filter((_, i) => i % 3 === 0).map(() => Math.random() * 20000 + 40000),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Costos',
                    data: days.filter((_, i) => i % 3 === 0).map(() => Math.random() * 15000 + 30000),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Ganancia',
                    data: days.filter((_, i) => i % 3 === 0).map(() => Math.random() * 10000 + 8000),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-ES');
                            }
                        },
                        grid: { color: '#f1f5f9' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Ingresos
    const ingresosCtx = document.getElementById('financieroIngresosChart');
    if (ingresosCtx && !financieroCharts.ingresos) {
        financieroCharts.ingresos = new Chart(ingresosCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Cobranzas', 'Ventas', 'Servicios', 'Otros'],
                datasets: [{
                    data: [65, 20, 10, 5],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    
    // Chart: Costos
    const costosCtx = document.getElementById('financieroCostosChart');
    if (costosCtx && !financieroCharts.costos) {
        financieroCharts.costos = new Chart(costosCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Personal', 'Tecnología', 'Infraestructura', 'Marketing', 'Otros'],
                datasets: [{
                    label: 'Costos',
                    data: [65, 15, 10, 5, 5],
                    backgroundColor: '#ef4444',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: { color: '#f1f5f9' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

setInterval(() => {
    if (currentDashboard === 'financiero') {
        updateFinancieroMetrics();
    }
}, 30000);
