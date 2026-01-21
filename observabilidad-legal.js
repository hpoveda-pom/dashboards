// Observabilidad Legal y Cumplimiento
let obsLegalCharts = {};

function initObservabilidadLegal() {
    const container = document.getElementById('observabilidadLegalContent');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Alertas Críticas Legales -->
        <div class="mb-6" id="alertasLegales">
            <!-- Se carga dinámicamente -->
        </div>
        
        <!-- Métricas de Cumplimiento -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('incumplimientos', 'Incumplimientos Detectados')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('incumplimientos', 'Incumplimientos Detectados');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-ban"></i>
                </div>
                <div class="metric-label">
                    Incumplimientos Detectados
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Incumplimientos</strong>
                            <p>Total de violaciones detectadas a normativas legales y regulatorias.</p>
                            <div class="formula">Incumplimientos = Suma de todas las violaciones legales</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="incumplimientos">0</div>
                <span class="badge badge-danger" id="incumplimientosBadge">Crítico</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('lenguaje-indebido', 'Lenguaje Indebido Detectado')">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-comment-slash"></i>
                </div>
                <div class="metric-label">
                    Lenguaje Indebido Detectado
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Lenguaje Indebido</strong>
                            <p>Casos detectados de uso de lenguaje amenazante, presión excesiva o inapropiado.</p>
                            <div class="formula">Lenguaje Indebido = Detección IA (Palabras prohibidas + Tono amenazante)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="lenguajeIndebido">0</div>
                <span class="badge badge-warning" id="lenguajeIndebidoBadge">Alerta</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('llamadas-fuera-horario', 'Llamadas Fuera de Horario')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('llamadas-fuera-horario', 'Llamadas Fuera de Horario');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="metric-label">
                    Llamadas Fuera de Horario
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Llamadas Fuera de Horario</strong>
                            <p>Llamadas realizadas fuera del horario permitido por normativa legal.</p>
                            <div class="formula">Fuera Horario = Llamadas donde (Hora < 8:00 OR Hora > 21:00)</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="llamadasFueraHorario">0</div>
                <span class="badge badge-danger" id="llamadasFueraHorarioBadge">Crítico</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('nivel-cumplimiento', 'Nivel de Cumplimiento')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('nivel-cumplimiento', 'Nivel de Cumplimiento');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="metric-label">
                    Nivel de Cumplimiento
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Nivel de Cumplimiento</strong>
                            <p>Porcentaje general de cumplimiento con todas las normativas legales aplicables.</p>
                            <div class="formula">Cumplimiento = (Casos cumplidos / Total casos) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="nivelCumplimiento">0%</div>
                <span class="badge badge-success" id="nivelCumplimientoBadge">Óptimo</span>
            </div>
        </div>
        
        <!-- Riesgos Legales Adicionales -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('riesgo-acoso', 'Riesgo de Acoso Detectado')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('riesgo-acoso', 'Riesgo de Acoso Detectado');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="metric-label">
                    Riesgo de Acoso Detectado
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Riesgo de Acoso</strong>
                            <p>Casos detectados de posible acoso, como múltiples llamadas consecutivas en corto tiempo.</p>
                            <div class="formula">Acoso = Llamadas consecutivas > 3 en < 2 horas al mismo cliente</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="riesgoAcoso">2</div>
                <span class="badge badge-danger" id="riesgoAcosoBadge">Alto</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('incumplimiento-datos', 'Incumplimiento Protección Datos')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('incumplimiento-datos', 'Incumplimiento Protección Datos');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-file-shield"></i>
                </div>
                <div class="metric-label">
                    Incumplimiento Protección Datos
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Protección de Datos</strong>
                            <p>Violaciones detectadas en el manejo de datos personales según normativa.</p>
                            <div class="formula">Incumplimiento = Casos sin consentimiento + Uso indebido datos</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="incumplimientoDatos">0</div>
                <span class="badge badge-warning" id="incumplimientoDatosBadge">Bajo</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('cumplimiento-script-legal', 'Cumplimiento Script Legal')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('cumplimiento-script-legal', 'Cumplimiento Script Legal');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488); color: white;">
                    <i class="fas fa-check-double"></i>
                </div>
                <div class="metric-label">
                    Cumplimiento Script Legal
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Cumplimiento Script Legal</strong>
                            <p>Porcentaje de agentes que siguen correctamente los scripts legales obligatorios.</p>
                            <div class="formula">Cumplimiento = (Agentes cumpliendo script legal / Total) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="cumplimientoScriptLegal">96%</div>
                <span class="badge badge-success" id="cumplimientoScriptLegalBadge">Excelente</span>
            </div>
        </div>
        
        <!-- Gráficos de Cumplimiento -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('incumplimientos', 'Incumplimientos por Día')">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #ef4444;"></i>
                    Incumplimientos por Día (Últimos 7 Días)
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsIncumplimientosChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('lenguaje-indebido', 'Lenguaje Indebido')">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #f59e0b;"></i>
                    Lenguaje Indebido por Tipo
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsLenguajeChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('riesgos-legales', 'Distribución de Riesgos Legales')">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #8b5cf6;"></i>
                    Distribución de Riesgos Legales
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsRiesgosChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('llamadas-fuera-horario', 'Llamadas por Horario')">
                <div class="chart-title">
                    <i class="fas fa-clock" style="color: #3b82f6;"></i>
                    Llamadas por Horario (Cumplimiento)
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="obsHorarioChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Tabla de Incidentes Legales -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>
                Incidentes de Cumplimiento Detectados - Acción Requerida
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Agente/Bot</th>
                            <th>Tipo de Incidente</th>
                            <th>Descripción</th>
                            <th>Severidad</th>
                            <th>Cliente Afectado</th>
                            <th>Acción Requerida</th>
                        </tr>
                    </thead>
                    <tbody id="incidentesLegalesTableBody">
                        <!-- Se llena dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Resumen de Cumplimiento -->
        <div class="section">
            <div class="section-title">
                <i class="fas fa-shield-alt" style="color: #10b981;"></i>
                Estado de Cumplimiento Normativo
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="alert-card success">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: #065f46;">✓ Protección de Datos Personales</div>
                    <div style="font-size: 0.875rem; color: #64748b;">
                        Cumplimiento: 99.2% | No se detectaron violaciones en los últimos 30 días
                    </div>
                </div>
                <div class="alert-card warning">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: #92400e;">⚠ Horarios Permitidos</div>
                    <div style="font-size: 0.875rem; color: #64748b;">
                        Cumplimiento: 94.5% | 3 llamadas fuera de horario detectadas hoy (requiere acción)
                    </div>
                </div>
                <div class="alert-card critical">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: #991b1b;">✗ Lenguaje y Prácticas</div>
                    <div style="font-size: 0.875rem; color: #64748b;">
                        Cumplimiento: 97.8% | 2 casos de lenguaje indebido detectados (ACCIÓN INMEDIATA)
                    </div>
                </div>
            </div>
        </div>
    `;
    
    updateObservabilidadLegal();
    updateAlertasLegales();
    updateIncidentesLegalesTable();
    initObservabilidadLegalCharts();
    
    if (obsLegalInterval) clearInterval(obsLegalInterval);
    obsLegalInterval = setInterval(() => {
        if (currentDashboard === 'observabilidad-legal') {
            updateObservabilidadLegal();
            updateAlertasLegales();
        }
    }, 15000);
}

let obsLegalInterval = null;

function updateObservabilidadLegal() {
    const data = generateObservabilidadLegalData();
    
    document.getElementById('incumplimientos').textContent = data.incumplimientos;
    document.getElementById('lenguajeIndebido').textContent = data.lenguajeIndebido;
    document.getElementById('llamadasFueraHorario').textContent = data.llamadasFueraHorario;
    document.getElementById('nivelCumplimiento').textContent = data.nivelCumplimiento.toFixed(1) + '%';
    document.getElementById('riesgoAcoso').textContent = data.riesgoAcoso;
    document.getElementById('incumplimientoDatos').textContent = data.incumplimientoDatos;
    document.getElementById('cumplimientoScriptLegal').textContent = data.cumplimientoScriptLegal.toFixed(1) + '%';
}

function generateObservabilidadLegalData() {
    return {
        incumplimientos: Math.floor(Math.random() * 3 + 2),
        lenguajeIndebido: Math.floor(Math.random() * 3 + 1),
        llamadasFueraHorario: Math.floor(Math.random() * 3),
        nivelCumplimiento: Math.random() * 3 + 96,
        riesgoAcoso: Math.floor(Math.random() * 2 + 1),
        incumplimientoDatos: Math.floor(Math.random() * 2),
        cumplimientoScriptLegal: Math.random() * 4 + 94
    };
}

function updateAlertasLegales() {
    const alertas = [
        {
            tipo: 'critical',
            titulo: 'Lenguaje Indebido Detectado',
            descripcion: 'Agente #45 usó lenguaje amenazante durante llamada a cliente CL-5421',
            timestamp: new Date().toLocaleTimeString('es-ES'),
            accion: 'DETENER LLAMADA - Revisión inmediata de grabación y acción disciplinaria'
        },
        {
            tipo: 'critical',
            titulo: 'Riesgo de Acoso Detectado',
            descripcion: 'Múltiples llamadas consecutivas a mismo cliente en menos de 2 horas (6 llamadas)',
            timestamp: new Date(Date.now() - 300000).toLocaleTimeString('es-ES'),
            accion: 'BLOQUEAR AGENTE - Investigar práctica de acoso'
        },
        {
            tipo: 'warning',
            titulo: 'Llamada Fuera de Horario Permitido',
            descripcion: 'Llamada realizada a las 22:15 (Horario permitido: 08:00-21:00)',
            timestamp: new Date(Date.now() - 600000).toLocaleTimeString('es-ES'),
            accion: 'Registrar incumplimiento y notificar al supervisor'
        }
    ];
    
    const container = document.getElementById('alertasLegales');
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

function updateIncidentesLegalesTable() {
    const incidentes = [
        {
            timestamp: new Date().toLocaleTimeString('es-ES'),
            agente: 'Agente #45',
            tipo: 'Lenguaje Indebido',
            descripcion: 'Uso de lenguaje amenazante y presión excesiva',
            severidad: 'Crítica',
            cliente: 'CL-5421',
            accion: 'Detener llamada - Acción disciplinaria'
        },
        {
            timestamp: new Date(Date.now() - 300000).toLocaleTimeString('es-ES'),
            agente: 'Agente #23',
            tipo: 'Posible Acoso',
            descripcion: '6 llamadas consecutivas en 2 horas al mismo cliente',
            severidad: 'Crítica',
            cliente: 'CL-3847',
            accion: 'Bloquear agente - Investigación'
        },
        {
            timestamp: new Date(Date.now() - 600000).toLocaleTimeString('es-ES'),
            agente: 'Sistema Bot',
            tipo: 'Fuera de Horario',
            descripcion: 'Llamada automática realizada a las 22:15',
            severidad: 'Media',
            cliente: 'CL-9823',
            accion: 'Corregir programación de llamadas'
        },
        {
            timestamp: new Date(Date.now() - 900000).toLocaleTimeString('es-ES'),
            agente: 'Agente #12',
            tipo: 'No Consentimiento',
            descripcion: 'Grabación iniciada sin consentimiento explícito del cliente',
            severidad: 'Alta',
            cliente: 'CL-1245',
            accion: 'Capacitación inmediata en consentimiento'
        }
    ];
    
    const tableBody = document.getElementById('incidentesLegalesTableBody');
    tableBody.innerHTML = incidentes.map(incidente => {
        const severidadClass = incidente.severidad === 'Crítica' ? 'badge-danger' : 
                              incidente.severidad === 'Alta' ? 'badge-danger' : 'badge-warning';
        return `
            <tr>
                <td style="font-family: 'JetBrains Mono', monospace;">${incidente.timestamp}</td>
                <td class="font-semibold">${incidente.agente}</td>
                <td>${incidente.tipo}</td>
                <td style="color: #64748b;">${incidente.descripcion}</td>
                <td><span class="badge ${severidadClass}">${incidente.severidad}</span></td>
                <td style="font-family: 'JetBrains Mono', monospace;">${incidente.cliente}</td>
                <td style="color: #ef4444; font-weight: 600;">${incidente.accion}</td>
            </tr>
        `;
    }).join('');
}

function initObservabilidadLegalCharts() {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    // Chart: Incumplimientos
    const incumplimientosCtx = document.getElementById('obsIncumplimientosChart');
    if (incumplimientosCtx && !obsLegalCharts.incumplimientos) {
        obsLegalCharts.incumplimientos = new Chart(incumplimientosCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Incumplimientos',
                    data: days.map(() => Math.floor(Math.random() * 4)),
                    backgroundColor: '#ef4444',
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
    
    // Chart: Lenguaje
    const lenguajeCtx = document.getElementById('obsLenguajeChart');
    if (lenguajeCtx && !obsLegalCharts.lenguaje) {
        obsLegalCharts.lenguaje = new Chart(lenguajeCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Amenazas', 'Presión', 'Lenguaje Inapropiado', 'Falsas Promesas'],
                datasets: [{
                    label: 'Casos Detectados',
                    data: [1, 3, 2, 1],
                    backgroundColor: ['#ef4444', '#f59e0b', '#f59e0b', '#3b82f6'],
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
    
    // Chart: Riesgos
    const riesgosCtx = document.getElementById('obsRiesgosChart');
    if (riesgosCtx && !obsLegalCharts.riesgos) {
        obsLegalCharts.riesgos = new Chart(riesgosCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Lenguaje Indebido', 'Fuera Horario', 'Acoso', 'Protección Datos', 'Otros'],
                datasets: [{
                    data: [40, 30, 20, 5, 5],
                    backgroundColor: ['#ef4444', '#f59e0b', '#ef4444', '#3b82f6', '#64748b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    
    // Chart: Horario
    const horarioCtx = document.getElementById('obsHorarioChart');
    if (horarioCtx && !obsLegalCharts.horario) {
        const hours = [];
        for (let i = 8; i <= 21; i++) {
            hours.push(i + ':00');
        }
        obsLegalCharts.horario = new Chart(horarioCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Llamadas Permitidas',
                    data: hours.map((h, i) => {
                        const hour = parseInt(h.split(':')[0]);
                        if (hour >= 8 && hour <= 21) {
                            return Math.random() * 50 + 80;
                        }
                        return 0;
                    }),
                    backgroundColor: '#10b981',
                    borderRadius: 6
                }, {
                    label: 'Llamadas No Permitidas',
                    data: hours.map((h, i) => {
                        const hour = parseInt(h.split(':')[0]);
                        if (hour < 8 || hour > 21) {
                            return Math.random() * 5 + 2;
                        }
                        return 0;
                    }),
                    backgroundColor: '#ef4444',
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
}
