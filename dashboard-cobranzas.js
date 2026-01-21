// Dashboard de Cobranzas
let cobranzasCharts = {};

function initDashboardCobranzas() {
    const container = document.getElementById('cobranzasContent');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Métricas Clave de Cobranzas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('recaudacion', 'Recaudación del Día')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('recaudacion', 'Recaudación del Día');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="metric-label">
                    Recaudación del Día
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Recaudación del Día</strong>
                            <p>Suma total de pagos procesados durante el día, incluyendo pagos completos y parciales.</p>
                            <div class="formula">Recaudación = Suma de todos los pagos procesados</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="recaudacionDia">$0.00</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-success" id="recaudacionBadge">Excelente</span>
                    <div class="metric-change positive" id="recaudacionTrend">
                        <i class="fas fa-arrow-up"></i>
                        <span>+15.3%</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; font-size: 0.875rem; color: #64748b;">Meta: $<span id="metaRecaudacion">45,000</span></div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('tasa-recuperacion', 'Tasa de Recuperación')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('tasa-recuperacion', 'Tasa de Recuperación');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-percentage"></i>
                </div>
                <div class="metric-label">
                    Tasa de Recuperación
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tasa de Recuperación</strong>
                            <p>Porcentaje de deuda vencida que se logra recuperar mediante los contactos realizados.</p>
                            <div class="formula">Tasa Recuperación = (Monto recuperado / Deuda vencida total) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="tasaRecuperacion">0%</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-warning" id="tasaRecuperacionBadge">Buena</span>
                    <div class="metric-change positive" id="tasaRecuperacionTrend">
                        <i class="fas fa-arrow-up"></i>
                        <span>+2.1%</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; background: #f1f5f9; height: 6px; border-radius: 6px; overflow: hidden;">
                    <div id="tasaRecuperacionBar" style="height: 100%; background: linear-gradient(90deg, #f59e0b, #d97706); width: 0%; transition: width 0.6s ease;"></div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-hand-holding-usd"></i>
                </div>
                <div class="metric-label">Promedio por Contacto</div>
                <div class="metric-value" id="promedioContacto">$0.00</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-success" id="promedioContactoBadge">Óptimo</span>
                    <div class="metric-change positive" id="promedioContactoTrend">
                        <i class="fas fa-arrow-up"></i>
                        <span>+3.5%</span>
                    </div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="metric-label">Deuda Vencida Total</div>
                <div class="metric-value" id="deudaVencida">$0.00</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-danger" id="deudaVencidaBadge">Alta</span>
                    <div class="metric-change negative" id="deudaVencidaTrend">
                        <i class="fas fa-arrow-down"></i>
                        <span>-8.2%</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; font-size: 0.875rem; color: #64748b;"><span id="cuentasVencidas">0</span> cuentas vencidas</div>
            </div>
        </div>
        
        <!-- Segunda Fila de Métricas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-check-double"></i>
                </div>
                <div class="metric-label">Compromisos de Pago</div>
                <div class="metric-value" id="compromisosPago">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Cumplidos: <span id="compromisosCumplidos" class="font-semibold">0</span></div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488); color: white;">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <div class="metric-label">Contactos Exitosos</div>
                <div class="metric-value" id="contactosExitosos">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Tasa: <span id="tasaContacto" class="font-semibold">0%</span></div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f97316, #ea580c); color: white;">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="metric-label">Tiempo Promedio Gestión</div>
                <div class="metric-value" id="tiempoGestion">0 min</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Meta: ≤ 8 minutos</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="metric-label">Agentes en Cobranzas</div>
                <div class="metric-value" id="agentesCobranzas">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Ocupación: <span id="ocupacionCobranzas" class="font-semibold">0%</span></div>
            </div>
        </div>
        
        <!-- Gráficos Principales -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('recaudacion', 'Recaudación Diaria')">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #10b981;"></i>
                    Recaudación Diaria (Últimos 7 Días)
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="cobranzasRecaudacionChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('tasa-recuperacion', 'Tasa de Recuperación')">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #f59e0b;"></i>
                    Tasa de Recuperación por Día
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="cobranzasTasaChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #8b5cf6;"></i>
                    Distribución de Deuda por Vencimiento
                </div>
                <div class="chart-canvas-container">
                    <canvas id="cobranzasDeudaChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #3b82f6;"></i>
                    Top 5 Agentes - Recaudación
                </div>
                <div class="chart-canvas-container">
                    <canvas id="cobranzasAgentesChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Tabla de Métricas Detalladas -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-table" style="color: #3b82f6;"></i>
                Métricas Operacionales de Cobranzas
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Métrica</th>
                            <th>Valor Actual</th>
                            <th>Meta</th>
                            <th>Tendencia</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody id="cobranzasTableBody">
                        <!-- Se llena dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Gráfico de Compromisos de Pago -->
        <div class="chart-container">
            <div class="chart-title">
                <i class="fas fa-calendar-check" style="color: #14b8a6;"></i>
                Seguimiento de Compromisos de Pago (Últimos 30 Días)
            </div>
            <div class="chart-canvas-container">
                <canvas id="cobranzasCompromisosChart"></canvas>
            </div>
        </div>
    `;
    
    updateCobranzasMetrics();
    updateCobranzasTable();
    initCobranzasCharts();
}

function updateCobranzasMetrics() {
    const data = generateCobranzasData();
    
    // Actualizar valores
    document.getElementById('recaudacionDia').textContent = '$' + data.recaudacion.toLocaleString('es-ES', {minimumFractionDigits: 2});
    document.getElementById('tasaRecuperacion').textContent = data.tasaRecuperacion.toFixed(1) + '%';
    document.getElementById('promedioContacto').textContent = '$' + data.promedioContacto.toFixed(2);
    document.getElementById('deudaVencida').textContent = '$' + data.deudaVencida.toLocaleString('es-ES', {minimumFractionDigits: 2});
    document.getElementById('cuentasVencidas').textContent = data.cuentasVencidas.toLocaleString();
    document.getElementById('compromisosPago').textContent = data.compromisosPago.toLocaleString();
    document.getElementById('compromisosCumplidos').textContent = data.compromisosCumplidos.toLocaleString();
    document.getElementById('contactosExitosos').textContent = data.contactosExitosos.toLocaleString();
    document.getElementById('tasaContacto').textContent = data.tasaContacto.toFixed(1) + '%';
    document.getElementById('tiempoGestion').textContent = data.tiempoGestion.toFixed(1) + ' min';
    document.getElementById('agentesCobranzas').textContent = data.agentes;
    document.getElementById('ocupacionCobranzas').textContent = data.ocupacion.toFixed(1) + '%';
    
    // Actualizar barras
    document.getElementById('tasaRecuperacionBar').style.width = data.tasaRecuperacion + '%';
}

function generateCobranzasData() {
    return {
        recaudacion: Math.random() * 10000 + 45000,
        tasaRecuperacion: Math.random() * 10 + 25,
        promedioContacto: Math.random() * 50 + 150,
        deudaVencida: Math.random() * 500000 + 1500000,
        cuentasVencidas: Math.floor(Math.random() * 500 + 1500),
        compromisosPago: Math.floor(Math.random() * 200 + 800),
        compromisosCumplidos: Math.floor(Math.random() * 150 + 650),
        contactosExitosos: Math.floor(Math.random() * 300 + 1200),
        tasaContacto: Math.random() * 10 + 45,
        tiempoGestion: Math.random() * 3 + 6.5,
        agentes: Math.floor(Math.random() * 3 + 28),
        ocupacion: Math.random() * 10 + 82
    };
}

function updateCobranzasTable() {
    const data = generateCobranzasData();
    const tableBody = document.getElementById('cobranzasTableBody');
    
    const metrics = [
        {
            name: 'Recaudación del Día',
            value: '$' + data.recaudacion.toLocaleString('es-ES', {minimumFractionDigits: 2}),
            target: '≥ $45,000',
            trend: data.recaudacion >= 45000 ? '↗ Excelente' : '↘ Mejorar',
            status: data.recaudacion >= 45000 ? 'success' : (data.recaudacion >= 40000 ? 'warning' : 'danger')
        },
        {
            name: 'Tasa de Recuperación',
            value: data.tasaRecuperacion.toFixed(1) + '%',
            target: '≥ 25%',
            trend: data.tasaRecuperacion >= 25 ? '↗ Óptima' : '↘ Mejorar',
            status: data.tasaRecuperacion >= 25 ? 'success' : (data.tasaRecuperacion >= 20 ? 'warning' : 'danger')
        },
        {
            name: 'Promedio por Contacto',
            value: '$' + data.promedioContacto.toFixed(2),
            target: '≥ $150',
            trend: data.promedioContacto >= 150 ? '↗ Alto' : '↘ Mejorar',
            status: data.promedioContacto >= 150 ? 'success' : (data.promedioContacto >= 120 ? 'warning' : 'danger')
        },
        {
            name: 'Compromisos de Pago',
            value: data.compromisosPago.toLocaleString(),
            target: '≥ 800',
            trend: data.compromisosPago >= 800 ? '↗ Bueno' : '↘ Mejorar',
            status: data.compromisosPago >= 800 ? 'success' : (data.compromisosPago >= 700 ? 'warning' : 'danger')
        },
        {
            name: 'Tasa de Cumplimiento Compromisos',
            value: ((data.compromisosCumplidos / data.compromisosPago) * 100).toFixed(1) + '%',
            target: '≥ 80%',
            trend: (data.compromisosCumplidos / data.compromisosPago) >= 0.8 ? '↗ Excelente' : '↘ Mejorar',
            status: (data.compromisosCumplidos / data.compromisosPago) >= 0.8 ? 'success' : 'warning'
        },
        {
            name: 'Tasa de Contacto Exitoso',
            value: data.tasaContacto.toFixed(1) + '%',
            target: '≥ 45%',
            trend: data.tasaContacto >= 45 ? '↗ Buena' : '↘ Mejorar',
            status: data.tasaContacto >= 45 ? 'success' : (data.tasaContacto >= 40 ? 'warning' : 'danger')
        },
        {
            name: 'Tiempo Promedio de Gestión',
            value: data.tiempoGestion.toFixed(1) + ' min',
            target: '≤ 8 min',
            trend: data.tiempoGestion <= 8 ? '↗ Eficiente' : '↘ Optimizar',
            status: data.tiempoGestion <= 8 ? 'success' : (data.tiempoGestion <= 10 ? 'warning' : 'danger')
        }
    ];
    
    tableBody.innerHTML = metrics.map(metric => {
        const statusClass = metric.status === 'success' ? 'badge-success' : 
                          metric.status === 'warning' ? 'badge-warning' : 'badge-danger';
        const statusText = metric.status === 'success' ? '✓ Óptimo' : 
                          metric.status === 'warning' ? '⚠ Atención' : '✗ Crítico';
        return `
            <tr>
                <td class="font-semibold">${metric.name}</td>
                <td style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">${metric.value}</td>
                <td class="text-gray-600">${metric.target}</td>
                <td class="font-semibold" style="color: ${metric.status === 'success' ? '#10b981' : metric.status === 'warning' ? '#f59e0b' : '#ef4444'};">${metric.trend}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    }).join('');
}

function initCobranzasCharts() {
    // Datos para últimos 7 días
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        days.push(['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day.getDay()]);
    }
    
    // Chart: Recaudación
    const recaudacionCtx = document.getElementById('cobranzasRecaudacionChart');
    if (recaudacionCtx && !cobranzasCharts.recaudacion) {
        cobranzasCharts.recaudacion = new Chart(recaudacionCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Recaudación',
                    data: days.map(() => Math.random() * 15000 + 40000),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#10b981'
                }, {
                    label: 'Meta',
                    data: Array(7).fill(45000),
                    borderColor: '#ef4444',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
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
    
    // Chart: Tasa de Recuperación
    const tasaCtx = document.getElementById('cobranzasTasaChart');
    if (tasaCtx && !cobranzasCharts.tasa) {
        cobranzasCharts.tasa = new Chart(tasaCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Tasa de Recuperación %',
                    data: days.map(() => Math.random() * 10 + 25),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#f59e0b'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40,
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
    
    // Chart: Deuda por Vencimiento
    const deudaCtx = document.getElementById('cobranzasDeudaChart');
    if (deudaCtx && !cobranzasCharts.deuda) {
        cobranzasCharts.deuda = new Chart(deudaCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['0-30 días', '31-60 días', '61-90 días', '91-120 días', '>120 días'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#dc2626', '#991b1b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
    
    // Chart: Top Agentes
    const agentesCtx = document.getElementById('cobranzasAgentesChart');
    if (agentesCtx && !cobranzasCharts.agentes) {
        cobranzasCharts.agentes = new Chart(agentesCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['María González', 'Carlos Ruiz', 'Ana Martínez', 'Luis Fernández', 'Sofia López'],
                datasets: [{
                    label: 'Recaudación $',
                    data: [8500, 8200, 7900, 7600, 7300],
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
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
    
    // Chart: Compromisos de Pago
    const compromisosCtx = document.getElementById('cobranzasCompromisosChart');
    if (compromisosCtx && !cobranzasCharts.compromisos) {
        const compromisosDays = [];
        const compromisosHechos = [];
        const compromisosCumplidos = [];
        
        for (let i = 29; i >= 0; i--) {
            const day = new Date();
            day.setDate(day.getDate() - i);
            compromisosDays.push(day.getDate() + '/' + (day.getMonth() + 1));
            compromisosHechos.push(Math.floor(Math.random() * 50 + 70));
            compromisosCumplidos.push(Math.floor(Math.random() * 40 + 55));
        }
        
        cobranzasCharts.compromisos = new Chart(compromisosCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: compromisosDays,
                datasets: [{
                    label: 'Compromisos Hechos',
                    data: compromisosHechos,
                    backgroundColor: '#14b8a6',
                    borderRadius: 4
                }, {
                    label: 'Compromisos Cumplidos',
                    data: compromisosCumplidos,
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f1f5f9' }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: {
                            maxTicksLimit: 15
                        }
                    }
                }
            }
        });
    }
}

// Auto-actualizar cada 30 segundos
setInterval(() => {
    if (currentDashboard === 'cobranzas') {
        updateCobranzasMetrics();
        updateCobranzasTable();
    }
}, 30000);
