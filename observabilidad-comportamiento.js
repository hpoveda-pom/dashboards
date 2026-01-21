// Observabilidad del Comportamiento del Cliente - IA
let obsComportamientoCharts = {};

function initObservabilidadComportamiento() {
    const container = document.getElementById('observabilidadComportamientoContent');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Predicciones y Análisis IA -->
        <div class="prediction-card mb-6">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.5rem;">Análisis Predictivo - IA</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Predicción de Recuperación</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">
                        Basado en análisis de voz, texto y comportamiento histórico de <strong>1,247</strong> clientes similares
                    </div>
                </div>
                <div style="font-size: 2.5rem; font-weight: 700; font-family: 'JetBrains Mono', monospace;">
                    78%
                </div>
            </div>
        </div>
        
        <!-- Métricas de Comportamiento -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('intencion-pago', 'Intención de Pago Detectada')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('intencion-pago', 'Intención de Pago Detectada');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-handshake"></i>
                </div>
                <div class="metric-label">
                    Intención de Pago Detectada
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Intención de Pago</strong>
                            <p>Probabilidad detectada por IA de que el cliente tenga intención de pagar, basada en análisis de voz y texto.</p>
                            <div class="formula">Intención = Modelo IA (Análisis voz + texto + historial)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="intencionPago">0%</div>
                <span class="badge badge-success" id="intencionPagoBadge">Alta</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('tono-emocional', 'Tono Emocional Promedio')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('tono-emocional', 'Tono Emocional Promedio');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-smile"></i>
                </div>
                <div class="metric-label">
                    Tono Emocional Promedio
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tono Emocional</strong>
                            <p>Clasificación del estado emocional del cliente mediante análisis de IA de voz y lenguaje.</p>
                            <div class="formula">Tono = Clasificación IA (Frecuencia voz + Palabras clave + Entonación)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="tonoEmocional">Neutro</div>
                <span class="badge badge-warning" id="tonoEmocionalBadge">Moderado</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('senales-evasion', 'Señales de Evasión')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('senales-evasion', 'Señales de Evasión');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="metric-label">
                    Señales de Evasión
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Señales de Evasión</strong>
                            <p>Porcentaje de clientes que muestran patrones de comportamiento evasivo detectados por IA.</p>
                            <div class="formula">Evasión = (Clientes con patrón evasivo / Total clientes) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="senalesEvasion">0%</div>
                <span class="badge badge-danger" id="senalesEvasionBadge">Bajo</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('probabilidad-recuperacion', 'Probabilidad de Recuperación')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('probabilidad-recuperacion', 'Probabilidad de Recuperación');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="metric-label">
                    Probabilidad de Recuperación
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Probabilidad de Recuperación</strong>
                            <p>Probabilidad predicha por IA de recuperar el pago basada en múltiples factores de comportamiento.</p>
                            <div class="formula">Prob. Recuperación = Modelo Predictivo (Intención + Tono + Historial + Deuda)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="probabilidadRecuperacion">0%</div>
                <span class="badge badge-success" id="probabilidadRecuperacionBadge">Alta</span>
            </div>
        </div>
        
        <!-- Análisis por Segmento -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('intencion-pago', 'Intención de Pago por Segmento')">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #8b5cf6;"></i>
                    Distribución de Intención de Pago por Segmento
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsIntencionChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('tono-emocional', 'Análisis de Tono Emocional')">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #f59e0b;"></i>
                    Análisis de Tono Emocional
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsTonoChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('probabilidad-recuperacion', 'Probabilidad de Recuperación')">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #10b981;"></i>
                    Probabilidad de Recuperación - Tendencias
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsProbabilidadChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('senales-evasion', 'Señales de Evasión')">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #ef4444;"></i>
                    Señales de Evasión - Tiempo Real
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsEvasionChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Priorización de Clientes -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-sort-amount-down" style="color: #3b82f6;"></i>
                Priorización de Clientes - ¿A Quién Llamar Ahora?
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Cliente ID</th>
                            <th>Deuda</th>
                            <th>Intención Pago</th>
                            <th>Tono Emocional</th>
                            <th>Prob. Recuperación</th>
                            <th>Recomendación IA</th>
                            <th>Prioridad</th>
                        </tr>
                    </thead>
                    <tbody id="priorizacionTableBody">
                        <!-- Se llena dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Análisis de Patrones -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-brain" style="color: #8b5cf6;"></i>
                Patrones de Comportamiento Detectados por IA
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="alert-card info">
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Patrón 1: Clientes Responsivos</div>
                    <div style="font-size: 0.875rem; color: #64748b;">
                        Clientes que responden mejor a llamadas entre 10:00-12:00. 
                        <strong>Probabilidad de recuperación: 85%</strong>
                    </div>
                </div>
                <div class="alert-card warning">
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Patrón 2: Evasión Temprana</div>
                    <div style="font-size: 0.875rem; color: #64748b;">
                        Clientes que muestran señales de evasión en primeros 30 segundos.
                        <strong>Acción recomendada: Cambiar estrategia</strong>
                    </div>
                </div>
                <div class="alert-card success">
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Patrón 3: Negociación Exitosa</div>
                    <div style="font-size: 0.875rem; color: #64748b;">
                        Cuando el tono cambia de defensivo a colaborativo, éxito aumenta 60%.
                        <strong>Momentum detectado: 142 casos</strong>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    updateObservabilidadComportamiento();
    updatePriorizacionTable();
    initObservabilidadComportamientoCharts();
    
    if (obsComportamientoInterval) clearInterval(obsComportamientoInterval);
    obsComportamientoInterval = setInterval(() => {
        if (currentDashboard === 'observabilidad-comportamiento') {
            updateObservabilidadComportamiento();
            updatePriorizacionTable();
        }
    }, 15000);
}

let obsComportamientoInterval = null;

function updateObservabilidadComportamiento() {
    const data = generateObservabilidadComportamientoData();
    
    document.getElementById('intencionPago').textContent = data.intencionPago.toFixed(1) + '%';
    document.getElementById('tonoEmocional').textContent = data.tonoEmocional;
    document.getElementById('senalesEvasion').textContent = data.senalesEvasion.toFixed(1) + '%';
    document.getElementById('probabilidadRecuperacion').textContent = data.probabilidadRecuperacion.toFixed(1) + '%';
}

function generateObservabilidadComportamientoData() {
    const tonos = ['Neutro', 'Positivo', 'Negativo', 'Ansioso', 'Colaborativo'];
    return {
        intencionPago: Math.random() * 15 + 70,
        tonoEmocional: tonos[Math.floor(Math.random() * tonos.length)],
        senalesEvasion: Math.random() * 10 + 12,
        probabilidadRecuperacion: Math.random() * 20 + 70
    };
}

function updatePriorizacionTable() {
    const clientes = [
        { id: 'CL-5421', deuda: 1250, intencion: 92, tono: 'Colaborativo', probabilidad: 89, recomendacion: 'Llamar ahora', prioridad: 'Alta' },
        { id: 'CL-3847', deuda: 3200, intencion: 78, tono: 'Neutro', probabilidad: 82, recomendacion: 'Llamar hoy', prioridad: 'Alta' },
        { id: 'CL-9823', deuda: 850, intencion: 65, tono: 'Ansioso', probabilidad: 71, recomendacion: 'Llamar mañana', prioridad: 'Media' },
        { id: 'CL-1245', deuda: 2100, intencion: 45, tono: 'Evitativo', probabilidad: 58, recomendacion: 'Enviar email primero', prioridad: 'Baja' },
        { id: 'CL-6732', deuda: 1500, intencion: 88, tono: 'Positivo', probabilidad: 86, recomendacion: 'Llamar ahora', prioridad: 'Alta' },
        { id: 'CL-2891', deuda: 950, intencion: 35, tono: 'Defensivo', probabilidad: 42, recomendacion: 'Revisar estrategia', prioridad: 'Baja' }
    ];
    
    const tableBody = document.getElementById('priorizacionTableBody');
    tableBody.innerHTML = clientes.map(cliente => {
        const prioridadClass = cliente.prioridad === 'Alta' ? 'badge-danger' : 
                              cliente.prioridad === 'Media' ? 'badge-warning' : 'badge-info';
        const probClass = cliente.probabilidad >= 80 ? 'badge-success' : 
                         cliente.probabilidad >= 60 ? 'badge-warning' : 'badge-danger';
        return `
            <tr>
                <td style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">${cliente.id}</td>
                <td style="font-family: 'JetBrains Mono', monospace;">$${cliente.deuda.toLocaleString('es-ES')}</td>
                <td>${cliente.intencion}%</td>
                <td>${cliente.tono}</td>
                <td><span class="badge ${probClass}">${cliente.probabilidad}%</span></td>
                <td style="color: #3b82f6; font-weight: 500;">${cliente.recomendacion}</td>
                <td><span class="badge ${prioridadClass}">${cliente.prioridad}</span></td>
            </tr>
        `;
    }).join('');
}

function initObservabilidadComportamientoCharts() {
    // Chart: Intención de Pago
    const intencionCtx = document.getElementById('obsIntencionChart');
    if (intencionCtx && !obsComportamientoCharts.intencion) {
        obsComportamientoCharts.intencion = new Chart(intencionCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Alta (>80%)', 'Media (50-80%)', 'Baja (<50%)'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    
    // Chart: Tono Emocional
    const tonoCtx = document.getElementById('obsTonoChart');
    if (tonoCtx && !obsComportamientoCharts.tono) {
        obsComportamientoCharts.tono = new Chart(tonoCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Positivo', 'Neutro', 'Ansioso', 'Defensivo', 'Evitativo'],
                datasets: [{
                    label: 'Frecuencia',
                    data: [35, 28, 18, 12, 7],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#64748b'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Probabilidad
    const probabilidadCtx = document.getElementById('obsProbabilidadChart');
    if (probabilidadCtx && !obsComportamientoCharts.probabilidad) {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        obsComportamientoCharts.probabilidad = new Chart(probabilidadCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Probabilidad de Recuperación',
                    data: days.map(() => Math.random() * 15 + 70),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Meta',
                    data: Array(7).fill(75),
                    borderColor: '#ef4444',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: { min: 50, max: 100, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Evasión
    const evasionCtx = document.getElementById('obsEvasionChart');
    if (evasionCtx && !obsComportamientoCharts.evasion) {
        const hours = [];
        for (let i = 7; i <= 20; i++) {
            hours.push(i + ':00');
        }
        obsComportamientoCharts.evasion = new Chart(evasionCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Señales de Evasión %',
                    data: hours.map(() => Math.random() * 10 + 10),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Alerta',
                    data: Array(hours.length).fill(20),
                    borderColor: '#f59e0b',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: { beginAtZero: true, max: 30, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}
