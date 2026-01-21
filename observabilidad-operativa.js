// Observabilidad Operativa - Tiempo Real
let obsOperativaCharts = {};

function initObservabilidadOperativa() {
    const container = document.getElementById('observabilidadOperativaContent');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Alertas y Anomalías Detectadas -->
        <div class="mb-6" id="alertasOperativas">
            <!-- Se carga dinámicamente -->
        </div>
        
        <!-- Métricas en Tiempo Real -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('anomalias', 'Anomalías Detectadas')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('anomalias', 'Anomalías Detectadas');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="metric-label">
                    Anomalías Detectadas
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Anomalías Detectadas</strong>
                            <p>Eventos que se desvían significativamente del comportamiento normal del sistema operativo.</p>
                            <div class="formula">Anomalía = Desviación > 2σ del promedio histórico</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="anomaliasDetectadas">0</div>
                <span class="badge badge-danger" id="anomaliasBadge">Crítico</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('cuellos-botella', 'Cuellos de Botella')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('cuellos-botella', 'Cuellos de Botella');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-hourglass-half"></i>
                </div>
                <div class="metric-label">
                    Cuellos de Botella
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Cuellos de Botella</strong>
                            <p>Puntos donde el flujo de trabajo se ralentiza debido a capacidad insuficiente o ineficiencias.</p>
                            <div class="formula">Cuello = Volumen > Capacidad × 1.2</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="cuellosBotella">0</div>
                <span class="badge badge-warning" id="cuellosBadge">Atención</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('tiempo-muerto', 'Tiempo Muerto Acumulado')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('tiempo-muerto', 'Tiempo Muerto Acumulado');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-phone-slash"></i>
                </div>
                <div class="metric-label">
                    Tiempo Muerto Acumulado
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tiempo Muerto</strong>
                            <p>Tiempo total en que los agentes están disponibles pero no reciben llamadas.</p>
                            <div class="formula">Tiempo Muerto = Suma de períodos (Agente disponible sin llamada)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="tiempoMuerto">0 min</div>
                <span class="badge badge-warning" id="tiempoMuertoBadge">Moderado</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('cumplimiento-scripts', 'Cumplimiento de Scripts')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('cumplimiento-scripts', 'Cumplimiento de Scripts');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="metric-label">
                    Cumplimiento de Scripts
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Cumplimiento de Scripts</strong>
                            <p>Porcentaje de agentes que siguen correctamente los scripts establecidos.</p>
                            <div class="formula">Cumplimiento = (Agentes cumpliendo script / Total agentes) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="cumplimientoScripts">0%</div>
                <span class="badge badge-success" id="cumplimientoScriptsBadge">Óptimo</span>
            </div>
        </div>
        
        <!-- Métricas Operativas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('volumen-actual', 'Volumen Actual')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('volumen-actual', 'Volumen Actual');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-phone-volume"></i>
                </div>
                <div class="metric-label">
                    Volumen Actual
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Volumen Actual</strong>
                            <p>Número de llamadas activas en este momento en el sistema.</p>
                            <div class="formula">Volumen = Llamadas en cola + Llamadas en curso</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="volumenActual">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Por hora: <span id="volumenHora" class="font-semibold">0</span></div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('duracion-promedio', 'Duración Promedio')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('duracion-promedio', 'Duración Promedio');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488); color: white;">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="metric-label">
                    Duración Promedio
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Duración Promedio</strong>
                            <p>Tiempo promedio de duración de las llamadas en curso.</p>
                            <div class="formula">Duración = Suma de duraciones / Total llamadas</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="duracionPromedio">0 min</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Tendencia: <span id="duracionTendencia" class="font-semibold">↗</span></div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('tasa-abandono-obs', 'Tasa de Abandono')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('tasa-abandono-obs', 'Tasa de Abandono');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f97316, #ea580c); color: white;">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <div class="metric-label">
                    Tasa de Abandono
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tasa de Abandono</strong>
                            <p>Porcentaje de llamadas que se cuelgan antes de ser atendidas.</p>
                            <div class="formula">Tasa Abandono = (Abandonos / Total entrantes) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="tasaAbandono">0%</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Última hora: <span id="abandonoHora" class="font-semibold">0%</span></div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('agentes-cola', 'Agentes en Cola')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('agentes-cola', 'Agentes en Cola');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;">
                    <i class="fas fa-user-clock"></i>
                </div>
                <div class="metric-label">
                    Agentes en Cola
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Agentes en Cola</strong>
                            <p>Número de agentes disponibles esperando recibir llamadas.</p>
                            <div class="formula">Agentes Cola = Agentes Disponibles - Agentes en Llamada</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="agentesCola">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Esperando llamadas</div>
            </div>
        </div>
        
        <!-- Gráficos en Tiempo Real -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('volumen-actual', 'Volumen de Llamadas')">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #ef4444;"></i>
                    Volumen de Llamadas - Tiempo Real (Últimas 2 Horas)
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsVolumenChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('anomalias', 'Anomalías y Cuellos de Botella')">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #f59e0b;"></i>
                    Anomalías y Cuellos de Botella Detectados
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsAnomaliasChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('tiempo-muerto', 'Tiempos Muertos')">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #3b82f6;"></i>
                    Tiempos Muertos por Hora del Día
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsTiempoMuertoChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('cumplimiento-scripts', 'Cumplimiento de Scripts')">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #10b981;"></i>
                    Cumplimiento de Scripts por Categoría
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsScriptsChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Tabla de Cuellos de Botella y Causas -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-search" style="color: #ef4444;"></i>
                Análisis de Cuellos de Botella y Causas Raíz
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                            <th>Severidad</th>
                            <th>Causa Detectada</th>
                            <th>Impacto</th>
                            <th>Recomendación</th>
                        </tr>
                    </thead>
                    <tbody id="cuellosBotellaTableBody">
                        <!-- Se llena dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    updateObservabilidadOperativa();
    updateAlertasOperativas();
    updateCuellosBotellaTable();
    initObservabilidadOperativaCharts();
    
    // Actualizar cada 3 segundos para tiempo real
    if (obsOperativaInterval) clearInterval(obsOperativaInterval);
    obsOperativaInterval = setInterval(() => {
        if (window.currentDashboard === 'observabilidad-operativa') {
            updateObservabilidadOperativa();
            updateAlertasOperativas();
            updateCuellosBotellaTable();
            updateObservabilidadOperativaCharts();
        }
    }, 3000);
}

let obsOperativaInterval = null;

function updateObservabilidadOperativa() {
    const data = generateObservabilidadOperativaData();
    
    document.getElementById('anomaliasDetectadas').textContent = data.anomalias;
    document.getElementById('cuellosBotella').textContent = data.cuellosBotella;
    document.getElementById('tiempoMuerto').textContent = data.tiempoMuerto + ' min';
    document.getElementById('cumplimientoScripts').textContent = data.cumplimientoScripts.toFixed(1) + '%';
    document.getElementById('volumenActual').textContent = data.volumenActual;
    document.getElementById('volumenHora').textContent = data.volumenHora;
    document.getElementById('duracionPromedio').textContent = data.duracionPromedio.toFixed(1) + ' min';
    document.getElementById('duracionTendencia').textContent = data.duracionTendencia > 0 ? '↗ +' + data.duracionTendencia.toFixed(1) : '↘ ' + Math.abs(data.duracionTendencia).toFixed(1);
    document.getElementById('tasaAbandono').textContent = data.tasaAbandono.toFixed(1) + '%';
    document.getElementById('abandonoHora').textContent = data.abandonoHora.toFixed(1) + '%';
    document.getElementById('agentesCola').textContent = data.agentesCola;
}

function generateObservabilidadOperativaData() {
    return {
        anomalias: Math.floor(Math.random() * 5 + 3),
        cuellosBotella: Math.floor(Math.random() * 3 + 1),
        tiempoMuerto: Math.floor(Math.random() * 30 + 15),
        cumplimientoScripts: Math.random() * 10 + 88,
        volumenActual: Math.floor(Math.random() * 50 + 120),
        volumenHora: Math.floor(Math.random() * 40 + 100),
        duracionPromedio: Math.random() * 2 + 5.5,
        duracionTendencia: (Math.random() - 0.5) * 0.5,
        tasaAbandono: Math.random() * 3 + 3.5,
        abandonoHora: Math.random() * 5 + 3,
        agentesCola: Math.floor(Math.random() * 10 + 5)
    };
}

function updateAlertasOperativas() {
    const alertas = [
        {
            tipo: 'critical',
            titulo: 'Cuello de Botella Detectado',
            descripcion: 'Volumen de llamadas excede capacidad en un 35%. Tiempo de espera promedio: 8.5 minutos',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            causa: 'Falta de agentes disponibles en turno vespertino'
        },
        {
            tipo: 'warning',
            titulo: 'Tiempo Muerto Elevado',
            descripcion: 'Agentes en estado "disponible" durante 25 minutos consecutivos',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            causa: 'Distribución ineficiente de llamadas'
        },
        {
            tipo: 'info',
            titulo: 'Script No Cumplido',
            descripcion: '15% de agentes no están siguiendo el script de identificación',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            causa: 'Falta de capacitación en nuevo proceso'
        }
    ];
    
    const container = document.getElementById('alertasOperativas');
    if (!container) return;
    
    container.innerHTML = alertas.map(alerta => `
        <div class="alert-card ${alerta.tipo}">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.5rem; color: ${alerta.tipo === 'critical' ? '#991b1b' : alerta.tipo === 'warning' ? '#92400e' : '#1e40af'};">
                        ${alerta.titulo}
                    </div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem;">
                        ${alerta.descripcion}
                    </div>
                    <div style="font-size: 0.75rem; color: #94a3b8;">
                        <strong>Causa detectada:</strong> ${alerta.causa}
                    </div>
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-left: 1rem;">
                    ${alerta.timestamp}
                </div>
            </div>
        </div>
    `).join('');
}

function updateCuellosBotellaTable() {
    const cuellos = [
        {
            tipo: 'Volumen',
            descripcion: 'Pico de llamadas excede capacidad',
            severidad: 'Crítica',
            causa: 'Horario laboral (14:00-15:00), falta 3 agentes',
            impacto: 'Tiempo espera: 8.5 min (meta: <2 min)',
            recomendacion: 'Asignar 3 agentes adicionales o habilitar callback'
        },
        {
            tipo: 'Recursos',
            descripcion: 'Agentes en cola sin asignación',
            severidad: 'Media',
            causa: 'Sistema de distribución lento (5 seg de latencia)',
            impacto: '25 min tiempo muerto acumulado',
            recomendacion: 'Optimizar algoritmo de distribución de llamadas'
        },
        {
            tipo: 'Proceso',
            descripcion: 'Script de identificación no seguido',
            severidad: 'Baja',
            causa: 'Falta de capacitación en nuevo proceso',
            impacto: '15% de agentes no cumplen script',
            recomendacion: 'Capacitación inmediata y refuerzo del proceso'
        }
    ];
    
    const tableBody = document.getElementById('cuellosBotellaTableBody');
    tableBody.innerHTML = cuellos.map(cuello => {
        const severidadClass = cuello.severidad === 'Crítica' ? 'badge-danger' : 
                              cuello.severidad === 'Media' ? 'badge-warning' : 'badge-info';
        return `
            <tr>
                <td class="font-semibold">${cuello.tipo}</td>
                <td>${cuello.descripcion}</td>
                <td><span class="badge ${severidadClass}">${cuello.severidad}</span></td>
                <td style="color: #3b82f6; font-weight: 500;">${cuello.causa}</td>
                <td style="color: #64748b;">${cuello.impacto}</td>
                <td style="color: #10b981; font-weight: 500;">${cuello.recomendacion}</td>
            </tr>
        `;
    }).join('');
}

function initObservabilidadOperativaCharts() {
    // Datos de las últimas 2 horas (120 puntos, uno por minuto)
    const timestamps = [];
    const volumenData = [];
    for (let i = 119; i >= 0; i--) {
        const time = new Date();
        time.setMinutes(time.getMinutes() - i);
        timestamps.push(time.getHours() + ':' + String(time.getMinutes()).padStart(2, '0'));
        volumenData.push(Math.random() * 20 + 100);
    }
    
    // Chart: Volumen Tiempo Real
    const volumenCtx = document.getElementById('obsVolumenChart');
    if (volumenCtx && !obsOperativaCharts.volumen) {
        obsOperativaCharts.volumen = new Chart(volumenCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: timestamps.filter((_, i) => i % 10 === 0), // Mostrar cada 10 minutos
                datasets: [{
                    label: 'Volumen de Llamadas',
                    data: volumenData.filter((_, i) => i % 10 === 0),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 2
                }, {
                    label: 'Capacidad Máxima',
                    data: Array(timestamps.filter((_, i) => i % 10 === 0).length).fill(130),
                    borderColor: '#10b981',
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
                    y: { beginAtZero: false, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false }, ticks: { maxTicksLimit: 12 } }
                }
            }
        });
    }
    
    // Chart: Anomalías
    const anomaliasCtx = document.getElementById('obsAnomaliasChart');
    if (anomaliasCtx && !obsOperativaCharts.anomalias) {
        const hours = [];
        for (let i = 7; i <= 20; i++) {
            hours.push(i + ':00');
        }
        obsOperativaCharts.anomalias = new Chart(anomaliasCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Anomalías Detectadas',
                    data: hours.map(() => Math.floor(Math.random() * 5)),
                    backgroundColor: '#ef4444',
                    borderRadius: 6
                }, {
                    label: 'Cuellos de Botella',
                    data: hours.map(() => Math.floor(Math.random() * 3)),
                    backgroundColor: '#f59e0b',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Tiempo Muerto
    const tiempoMuertoCtx = document.getElementById('obsTiempoMuertoChart');
    if (tiempoMuertoCtx && !obsOperativaCharts.tiempoMuerto) {
        const hours = [];
        for (let i = 7; i <= 20; i++) {
            hours.push(i + ':00');
        }
        obsOperativaCharts.tiempoMuerto = new Chart(tiempoMuertoCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Minutos de Tiempo Muerto',
                    data: hours.map(() => Math.random() * 30 + 10),
                    backgroundColor: '#3b82f6',
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
    
    // Chart: Scripts
    const scriptsCtx = document.getElementById('obsScriptsChart');
    if (scriptsCtx && !obsOperativaCharts.scripts) {
        obsOperativaCharts.scripts = new Chart(scriptsCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Cumplido', 'Parcial', 'No Cumplido'],
                datasets: [{
                    data: [88, 10, 2],
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
}

// Función para actualizar gráficos en tiempo real
function updateObservabilidadOperativaCharts() {
    // Actualizar gráfico de volumen (agregar nuevo punto y remover el más antiguo)
    if (obsOperativaCharts.volumen) {
        const chart = obsOperativaCharts.volumen;
        const currentData = chart.data.datasets[0].data;
        const currentLabels = chart.data.labels;
        
        // Agregar nuevo punto al final
        const newValue = Math.random() * 20 + 100;
        const now = new Date();
        const newLabel = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
        
        // Mantener solo los últimos 12 puntos (cada 10 minutos)
        if (currentData.length >= 12) {
            currentData.shift();
            currentLabels.shift();
        }
        currentData.push(newValue);
        currentLabels.push(newLabel);
        
        chart.update('none');
    }
    
    // Actualizar gráfico de anomalías
    if (obsOperativaCharts.anomalias) {
        const newAnomalias = obsOperativaCharts.anomalias.data.datasets[0].data.map(val => {
            const change = Math.floor((Math.random() - 0.5) * 2);
            return Math.max(0, val + change);
        });
        const newCuellos = obsOperativaCharts.anomalias.data.datasets[1].data.map(val => {
            const change = Math.floor((Math.random() - 0.5) * 2);
            return Math.max(0, val + change);
        });
        obsOperativaCharts.anomalias.data.datasets[0].data = newAnomalias;
        obsOperativaCharts.anomalias.data.datasets[1].data = newCuellos;
        obsOperativaCharts.anomalias.update('none');
    }
    
    // Actualizar gráfico de tiempo muerto
    if (obsOperativaCharts.tiempoMuerto) {
        const newData = obsOperativaCharts.tiempoMuerto.data.datasets[0].data.map(val => {
            const change = (Math.random() - 0.5) * 5;
            return Math.max(0, val + change);
        });
        obsOperativaCharts.tiempoMuerto.data.datasets[0].data = newData;
        obsOperativaCharts.tiempoMuerto.update('none');
    }
    
    // Actualizar gráfico de scripts (rotar porcentajes)
    if (obsOperativaCharts.scripts) {
        const currentData = obsOperativaCharts.scripts.data.datasets[0].data;
        const newData = [
            Math.max(80, Math.min(95, currentData[0] + (Math.random() - 0.5) * 2)),
            Math.max(5, Math.min(15, currentData[1] + (Math.random() - 0.5) * 1)),
            Math.max(0, Math.min(5, currentData[2] + (Math.random() - 0.5) * 1))
        ];
        // Normalizar para que sume 100
        const sum = newData.reduce((a, b) => a + b, 0);
        obsOperativaCharts.scripts.data.datasets[0].data = newData.map(v => Math.round((v / sum) * 100));
        obsOperativaCharts.scripts.update('none');
    }
}
