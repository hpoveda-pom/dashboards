// Observabilidad de Modelos de IA
let obsIACharts = {};

function initObservabilidadIA() {
    const container = document.getElementById('observabilidadIAContent');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Estado General de Modelos IA -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('drift-datos', 'Drift de Datos Detectado')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('drift-datos', 'Drift de Datos Detectado');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="metric-label">
                    Drift de Datos Detectado
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Drift de Datos</strong>
                            <p>Cambio en la distribución de datos actuales vs datos de entrenamiento del modelo.</p>
                            <div class="formula">Drift = Distancia estadística (Distribución actual - Distribución entrenamiento)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="driftDatos">2.3%</div>
                <span class="badge badge-warning" id="driftBadge">Alerta</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('tasa-error-ia', 'Tasa de Error de Predicción')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('tasa-error-ia', 'Tasa de Error de Predicción');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-bug"></i>
                </div>
                <div class="metric-label">
                    Tasa de Error de Predicción
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tasa de Error</strong>
                            <p>Porcentaje de predicciones incorrectas del modelo comparadas con resultados reales.</p>
                            <div class="formula">Error = (Predicciones incorrectas / Total predicciones) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="tasaError">3.8%</div>
                <span class="badge badge-warning" id="errorBadge">Moderado</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('sesgos-ia', 'Sesgos Detectados')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('sesgos-ia', 'Sesgos Detectados');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <div class="metric-label">
                    Sesgos Detectados
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Sesgos en IA</strong>
                            <p>Número de sesgos sistemáticos detectados que discriminan injustamente a ciertos grupos.</p>
                            <div class="formula">Sesgo = Diferencia significativa en predicciones por grupo demográfico</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="sesgos">1</div>
                <span class="badge badge-danger" id="sesgosBadge">Crítico</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('confianza-modelo', 'Confianza del Modelo')">
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="metric-label">
                    Confianza del Modelo
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Confianza del Modelo</strong>
                            <p>Nivel general de confiabilidad basado en precisión, consistencia y estabilidad.</p>
                            <div class="formula">Confianza = (Precisión × Consistencia × Estabilidad) / 3</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="confianzaModelo">87%</div>
                <span class="badge badge-success" id="confianzaBadge">Buena</span>
            </div>
        </div>
        
        <!-- Alertas de Modelos IA -->
        <div class="mb-6" id="alertasIA">
            <!-- Se carga dinámicamente -->
        </div>
        
        <!-- Gráficos de Observabilidad IA -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('drift-datos', 'Drift de Datos')">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #ef4444;"></i>
                    Drift de Datos - Evolución Temporal
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsDriftChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('tasa-error-ia', 'Tasa de Error de Predicción')">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #f59e0b;"></i>
                    Tasa de Error de Predicción por Modelo
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsErrorChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('sesgos-ia', 'Distribución de Sesgos')">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #8b5cf6;"></i>
                    Distribución de Sesgos por Categoría
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsSesgosChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('confianza-modelo', 'Confiabilidad por Tipo de Decisión')">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #3b82f6;"></i>
                    Confiabilidad por Tipo de Decisión IA
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsConfiabilidadChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Errores y Respuestas Incorrectas -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>
                Errores de Predicción y Respuestas Incorrectas Detectadas
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Modelo</th>
                            <th>Tipo de Error</th>
                            <th>Predicción</th>
                            <th>Realidad</th>
                            <th>Riesgo</th>
                            <th>Acción Requerida</th>
                        </tr>
                    </thead>
                    <tbody id="erroresIATableBody">
                        <!-- Se llena dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Sesgos Detectados -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-balance-scale" style="color: #8b5cf6;"></i>
                Sesgos en Modelos de IA Detectados
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="alert-card critical">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: #991b1b;">Sesgo Detectado: Género</div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem;">
                        El modelo predice probabilidad de recuperación 15% menor para mujeres vs hombres con características similares.
                    </div>
                    <div style="font-size: 0.75rem; color: #94a3b8;">
                        <strong>Impacto:</strong> 342 predicciones afectadas | <strong>Recomendación:</strong> Reentrenar modelo con datos balanceados
                    </div>
                </div>
                <div class="alert-card info">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: #1e40af;">Drift de Datos: Cambio de Patrón</div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem;">
                        Distribución de edad de deudores ha cambiado significativamente (K-S test: p < 0.05).
                    </div>
                    <div style="font-size: 0.75rem; color: #94a3b8;">
                        <strong>Impacto:</strong> Modelo entrenado con datos antiguos | <strong>Recomendación:</strong> Reentrenar con datos recientes
                    </div>
                </div>
            </div>
        </div>
    `;
    
    updateObservabilidadIA();
    updateAlertasIA();
    updateErroresIATable();
    initObservabilidadIACharts();
    
    if (obsIAInterval) clearInterval(obsIAInterval);
    obsIAInterval = setInterval(() => {
        if (currentDashboard === 'observabilidad-ia') {
            updateObservabilidadIA();
            updateAlertasIA();
        }
    }, 20000);
}

let obsIAInterval = null;

function updateObservabilidadIA() {
    const data = generateObservabilidadIAData();
    
    document.getElementById('driftDatos').textContent = data.driftDatos.toFixed(1) + '%';
    document.getElementById('tasaError').textContent = data.tasaError.toFixed(1) + '%';
    document.getElementById('sesgos').textContent = data.sesgos;
    document.getElementById('confianzaModelo').textContent = data.confianzaModelo.toFixed(0) + '%';
}

function generateObservabilidadIAData() {
    return {
        driftDatos: Math.random() * 2 + 2,
        tasaError: Math.random() * 2 + 3.5,
        sesgos: Math.floor(Math.random() * 2 + 1),
        confianzaModelo: Math.random() * 10 + 85
    };
}

function updateAlertasIA() {
    const alertas = [
        {
            tipo: 'critical',
            titulo: 'Drift de Datos Detectado',
            descripcion: 'El comportamiento del cliente ha cambiado significativamente. Modelo puede estar perdiendo precisión.',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            accion: 'Reentrenar modelo con datos recientes (últimos 30 días)'
        },
        {
            tipo: 'warning',
            titulo: 'Error de Predicción Elevado',
            descripcion: 'Tasa de error en predicción de intención de pago: 3.8% (umbral: 3%)',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            accion: 'Revisar modelo y ajustar parámetros'
        },
        {
            tipo: 'critical',
            titulo: 'Sesgo de Género Detectado',
            descripcion: 'Modelo muestra sesgo sistemático contra segmento femenino en predicciones de recuperación',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            accion: 'REQUIERE ACCIÓN INMEDIATA - Reentrenar con datos balanceados'
        }
    ];
    
    const container = document.getElementById('alertasIA');
    container.innerHTML = alertas.map(alerta => `
        <div class="alert-card ${alerta.tipo}">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.5rem; color: ${alerta.tipo === 'critical' ? '#991b1b' : '#92400e'};">
                        ${alerta.titulo}
                    </div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem;">
                        ${alerta.descripcion}
                    </div>
                    <div style="font-size: 0.75rem; color: #94a3b8;">
                        <strong>Acción requerida:</strong> ${alerta.accion}
                    </div>
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-left: 1rem;">
                    ${alerta.timestamp}
                </div>
            </div>
        </div>
    `).join('');
}

function updateErroresIATable() {
    const errores = [
        {
            timestamp: new Date(Date.now() - 300000).toLocaleTimeString('es-ES'),
            modelo: 'Predicción Intención',
            tipo: 'Falso Positivo',
            prediccion: 'Intención Alta (85%)',
            realidad: 'Cliente evasivo',
            riesgo: 'Alto',
            accion: 'Ajustar umbral de confianza'
        },
        {
            timestamp: new Date(Date.now() - 600000).toLocaleTimeString('es-ES'),
            modelo: 'Priorización',
            tipo: 'Falso Negativo',
            prediccion: 'Prioridad Baja',
            realidad: 'Cliente recuperado',
            riesgo: 'Medio',
            accion: 'Revisar características del modelo'
        },
        {
            timestamp: new Date(Date.now() - 900000).toLocaleTimeString('es-ES'),
            modelo: 'Análisis Tono',
            tipo: 'Clasificación Incorrecta',
            prediccion: 'Tono: Positivo',
            realidad: 'Tono: Evasivo',
            riesgo: 'Alto',
            accion: 'Mejorar extracción de características'
        },
        {
            timestamp: new Date(Date.now() - 1200000).toLocaleTimeString('es-ES'),
            modelo: 'Asignación Agente',
            tipo: 'Decisión Subóptima',
            prediccion: 'Agente A recomendado',
            realidad: 'Mejor match: Agente B',
            riesgo: 'Bajo',
            accion: 'Optimizar algoritmo de matching'
        }
    ];
    
    const tableBody = document.getElementById('erroresIATableBody');
    tableBody.innerHTML = errores.map(error => {
        const riesgoClass = error.riesgo === 'Alto' ? 'badge-danger' : 
                           error.riesgo === 'Medio' ? 'badge-warning' : 'badge-info';
        return `
            <tr>
                <td style="font-family: 'JetBrains Mono', monospace;">${error.timestamp}</td>
                <td class="font-semibold">${error.modelo}</td>
                <td>${error.tipo}</td>
                <td style="color: #64748b;">${error.prediccion}</td>
                <td style="color: #3b82f6; font-weight: 500;">${error.realidad}</td>
                <td><span class="badge ${riesgoClass}">${error.riesgo}</span></td>
                <td style="color: #10b981; font-weight: 500;">${error.accion}</td>
            </tr>
        `;
    }).join('');
}

function initObservabilidadIACharts() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        days.push(['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day.getDay()]);
    }
    
    // Chart: Drift
    const driftCtx = document.getElementById('obsDriftChart');
    if (driftCtx && !obsIACharts.drift) {
        obsIACharts.drift = new Chart(driftCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Drift de Datos %',
                    data: days.map(() => Math.random() * 2 + 1.5),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Umbral Crítico',
                    data: Array(7).fill(3),
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
                    y: { beginAtZero: true, max: 5, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Error
    const errorCtx = document.getElementById('obsErrorChart');
    if (errorCtx && !obsIACharts.error) {
        obsIACharts.error = new Chart(errorCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Intención Pago', 'Priorización', 'Tono Emocional', 'Asignación Agente', 'Probabilidad Recuperación'],
                datasets: [{
                    label: 'Tasa de Error %',
                    data: [3.8, 2.5, 4.2, 1.8, 3.1],
                    backgroundColor: ['#ef4444', '#f59e0b', '#ef4444', '#10b981', '#f59e0b'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 5, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Sesgos
    const sesgosCtx = document.getElementById('obsSesgosChart');
    if (sesgosCtx && !obsIACharts.sesgos) {
        obsIACharts.sesgos = new Chart(sesgosCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Género', 'Edad', 'Zona Geográfica', 'Monto Deuda'],
                datasets: [{
                    label: 'Magnitud del Sesgo',
                    data: [15, 8, 5, 3],
                    backgroundColor: ['#ef4444', '#f59e0b', '#f59e0b', '#10b981'],
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
    
    // Chart: Confiabilidad
    const confiabilidadCtx = document.getElementById('obsConfiabilidadChart');
    if (confiabilidadCtx && !obsIACharts.confiabilidad) {
        obsIACharts.confiabilidad = new Chart(confiabilidadCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Alta (>90%)', 'Media (70-90%)', 'Baja (<70%)'],
                datasets: [{
                    data: [65, 28, 7],
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
