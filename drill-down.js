// Sistema de Drill-Down y Exploración de Datos
let currentDetailView = null;

// Función para mostrar detalle de métrica
window.showMetricDetail = function(metricId, metricName) {
    console.log('Mostrando detalle de:', metricId, metricName);
    
    const modal = document.getElementById('detailModal');
    if (!modal) {
        console.error('Modal de detalle no encontrado');
        return;
    }
    
    currentDetailView = { metricId, metricName };
    modal.classList.add('show');
    
    // Cargar contenido según la métrica
    loadMetricDetail(metricId, metricName);
};

// Función para cerrar modal
window.closeDetailModal = function() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.classList.remove('show');
    }
    currentDetailView = null;
};

// Cargar detalle de métrica específica
function loadMetricDetail(metricId, metricName) {
    const content = document.getElementById('detailModalContent');
    if (!content) return;
    
    // Mostrar loading
    content.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #3b82f6;"></i>
            <p style="margin-top: 1rem; color: #64748b;">Cargando detalles...</p>
        </div>
    `;
    
    // Generar contenido según métrica
    setTimeout(() => {
        const detailContent = generateDetailContent(metricId, metricName);
        content.innerHTML = detailContent;
        
        // Inicializar gráficos de detalle si los hay
        initDetailCharts(metricId);
    }, 300);
}

// Generar contenido de detalle
function generateDetailContent(metricId, metricName) {
    const details = {
        'sla': generateSLADetail(),
        'aht': generateAHTDetail(),
        'fcr': generateFCRDetail(),
        'nps': generateNPSDetail(),
        'abandon': generateAbandonDetail(),
        'wait': generateWaitDetail(),
        'agents': generateAgentsDetail(),
        'calls': generateCallsDetail(),
        'recaudacion': generateRecaudacionDetail(),
        'tasa-recuperacion': generateTasaRecuperacionDetail(),
        // Observabilidad Operativa
        'anomalias': generateAnomaliasDetail(),
        'cuellos-botella': generateCuellosBotellaDetail(),
        'tiempo-muerto': generateTiempoMuertoDetail(),
        'cumplimiento-scripts': generateCumplimientoScriptsDetail(),
        'volumen-actual': generateVolumenActualDetail(),
        'duracion-promedio': generateDuracionPromedioDetail(),
        'tasa-abandono-obs': generateTasaAbandonoObsDetail(),
        'agentes-cola': generateAgentesColaDetail(),
        // Observabilidad Comportamiento
        'intencion-pago': generateIntencionPagoDetail(),
        'tono-emocional': generateTonoEmocionalDetail(),
        'senales-evasion': generateSenalesEvasionDetail(),
        'probabilidad-recuperacion': generateProbabilidadRecuperacionDetail(),
        // Observabilidad IA
        'drift-datos': generateDriftDatosDetail(),
        'tasa-error-ia': generateTasaErrorIADetail(),
        'sesgos-ia': generateSesgosIADetail(),
        'confianza-modelo': generateConfianzaModeloDetail(),
        // Observabilidad Legal
        'incumplimientos': generateIncumplimientosDetail(),
        'lenguaje-indebido': generateLenguajeIndebidoDetail(),
        'llamadas-fuera-horario': generateLlamadasFueraHorarioDetail(),
        'nivel-cumplimiento': generateNivelCumplimientoDetail(),
        'riesgo-acoso': generateRiesgoAcosoDetail(),
        'incumplimiento-datos': generateIncumplimientoDatosDetail(),
        'cumplimiento-script-legal': generateCumplimientoScriptLegalDetail(),
        'riesgos-legales': generateRiesgosLegalesDetail()
    };
    
    return details[metricId] || generateGenericDetail(metricId, metricName);
}

// Detalle de SLA
function generateSLADetail() {
    const data = generateSLADetailData();
    
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Service Level (SLA) - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-bullseye" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                    Service Level (SLA) - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="metric-card">
                    <div class="metric-label">SLA Actual</div>
                    <div class="metric-value" style="font-size: 2.5rem;">${data.sla.toFixed(1)}%</div>
                    <span class="badge badge-success">Excelente</span>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Meta</div>
                    <div class="metric-value" style="font-size: 2.5rem;">80%</div>
                    <span class="badge badge-info">Objetivo</span>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Desviación</div>
                    <div class="metric-value" style="font-size: 2.5rem; color: #10b981;">+${(data.sla - 80).toFixed(1)}%</div>
                    <span class="badge badge-success">Sobre Meta</span>
                </div>
            </div>
            
            <div class="section mb-6">
                <div class="section-title">
                    <i class="fas fa-chart-line" style="color: #3b82f6;"></i>
                    Desglose por Hora del Día
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailSLAChart"></canvas>
                </div>
            </div>
            
            <div class="section mb-6">
                <div class="section-title">
                    <i class="fas fa-users" style="color: #10b981;"></i>
                    Contribución por Agente
                </div>
                <div class="overflow-x-auto">
                    <table class="detail-table">
                        <thead>
                            <tr>
                                <th>Agente</th>
                                <th>Llamadas Atendidas</th>
                                <th>Tiempo Promedio Respuesta</th>
                                <th>SLA Individual</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.agents.map(agent => `
                                <tr>
                                    <td class="font-semibold">${agent.name}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.calls}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.responseTime} seg</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.sla.toFixed(1)}%</td>
                                    <td>
                                        <span class="badge ${agent.sla >= 80 ? 'badge-success' : agent.sla >= 70 ? 'badge-warning' : 'badge-danger'}">
                                            ${agent.sla >= 80 ? '✓ Cumple' : agent.sla >= 70 ? '⚠ Cerca' : '✗ Bajo'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    Factores que Impactan el SLA
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="alert-card success">
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">✓ Factores Positivos</div>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 0.25rem 0;">• 48 agentes activos (92% de capacidad)</li>
                            <li style="padding: 0.25rem 0;">• Distribución eficiente de llamadas</li>
                            <li style="padding: 0.25rem 0;">• Tiempo promedio de respuesta: 18 seg</li>
                        </ul>
                    </div>
                    <div class="alert-card warning">
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">⚠ Áreas de Mejora</div>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 0.25rem 0;">• Pico de llamadas 14:00-15:00 requiere más agentes</li>
                            <li style="padding: 0.25rem 0;">• 3 agentes con SLA individual < 75%</li>
                            <li style="padding: 0.25rem 0;">• Llamadas complejas aumentan tiempo de respuesta</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateSLADetailData() {
    return {
        sla: Math.random() * 10 + 85,
        agents: [
            { name: 'María González', calls: 145, responseTime: 15, sla: 92 },
            { name: 'Carlos Ruiz', calls: 138, responseTime: 18, sla: 88 },
            { name: 'Ana Martínez', calls: 132, responseTime: 20, sla: 85 },
            { name: 'Luis Fernández', calls: 128, responseTime: 22, sla: 82 },
            { name: 'Sofia López', calls: 125, responseTime: 19, sla: 89 },
            { name: 'Pedro Sánchez', calls: 120, responseTime: 25, sla: 78 },
            { name: 'Laura Torres', calls: 118, responseTime: 23, sla: 80 },
            { name: 'Juan Pérez', calls: 115, responseTime: 28, sla: 72 }
        ]
    };
}

// Detalle de AHT
function generateAHTDetail() {
    const data = generateAHTDetailData();
    
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">AHT Promedio - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-clock" style="color: #10b981; margin-right: 0.5rem;"></i>
                    AHT (Average Handle Time) - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="metric-card">
                    <div class="metric-label">AHT Promedio</div>
                    <div class="metric-value">${data.aht.toFixed(1)} min</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Tiempo Habla</div>
                    <div class="metric-value">${data.talkTime.toFixed(1)} min</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Tiempo Hold</div>
                    <div class="metric-value">${data.holdTime.toFixed(1)} min</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Tiempo Post-Call</div>
                    <div class="metric-value">${data.postCall.toFixed(1)} min</div>
                </div>
            </div>
            
            <div class="section mb-6">
                <div class="section-title">
                    <i class="fas fa-chart-bar" style="color: #10b981;"></i>
                    Distribución de AHT por Agente
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailAHTChart"></canvas>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-table" style="color: #3b82f6;"></i>
                    Desglose de Tiempo por Llamada
                </div>
                <div class="overflow-x-auto">
                    <table class="detail-table">
                        <thead>
                            <tr>
                                <th>Agente</th>
                                <th>AHT Total</th>
                                <th>Tiempo Habla</th>
                                <th>Tiempo Hold</th>
                                <th>Post-Call</th>
                                <th>Llamadas</th>
                                <th>Análisis</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.breakdown.map(item => `
                                <tr>
                                    <td class="font-semibold">${item.agent}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.total.toFixed(1)} min</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.talk.toFixed(1)} min</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.hold.toFixed(1)} min</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.post.toFixed(1)} min</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.calls}</td>
                                    <td>
                                        <span class="badge ${item.total <= 6 ? 'badge-success' : item.total <= 8 ? 'badge-warning' : 'badge-danger'}">
                                            ${item.total <= 6 ? '✓ Óptimo' : item.total <= 8 ? '⚠ Aceptable' : '✗ Alto'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function generateAHTDetailData() {
    return {
        aht: Math.random() * 2 + 4.5,
        talkTime: Math.random() * 1.5 + 3.5,
        holdTime: Math.random() * 0.5 + 0.3,
        postCall: Math.random() * 0.5 + 0.4,
        breakdown: [
            { agent: 'María González', total: 4.2, talk: 3.5, hold: 0.3, post: 0.4, calls: 145 },
            { agent: 'Carlos Ruiz', total: 4.5, talk: 3.8, hold: 0.4, post: 0.3, calls: 138 },
            { agent: 'Ana Martínez', total: 4.8, talk: 4.0, hold: 0.5, post: 0.3, calls: 132 },
            { agent: 'Luis Fernández', total: 5.2, talk: 4.3, hold: 0.6, post: 0.3, calls: 128 },
            { agent: 'Sofia López', total: 4.6, talk: 3.9, hold: 0.4, post: 0.3, calls: 125 },
            { agent: 'Pedro Sánchez', total: 6.5, talk: 5.2, hold: 0.8, post: 0.5, calls: 120 }
        ]
    };
}

// Detalle de FCR
function generateFCRDetail() {
    const data = generateFCRDetailData();
    
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">FCR - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-check-circle" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                    FCR (First Call Resolution) - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="metric-card">
                    <div class="metric-label">FCR Actual</div>
                    <div class="metric-value">${data.fcr.toFixed(1)}%</div>
                    <span class="badge badge-success">Alto</span>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Llamadas Resueltas</div>
                    <div class="metric-value">${data.resueltas.toLocaleString()}</div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">De ${data.total.toLocaleString()} total</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Re-llamadas</div>
                    <div class="metric-value" style="color: #ef4444;">${data.rellamadas.toLocaleString()}</div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Requieren seguimiento</div>
                </div>
            </div>
            
            <div class="section mb-6">
                <div class="section-title">
                    <i class="fas fa-chart-pie" style="color: #8b5cf6;"></i>
                    Razones de No Resolución
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailFCRChart"></canvas>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-table" style="color: #3b82f6;"></i>
                    FCR por Agente y Tipo de Consulta
                </div>
                <div class="overflow-x-auto">
                    <table class="detail-table">
                        <thead>
                            <tr>
                                <th>Agente</th>
                                <th>FCR Individual</th>
                                <th>Consultas Técnicas</th>
                                <th>Consultas Facturación</th>
                                <th>Consultas General</th>
                                <th>Razón Principal No Resolución</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.agents.map(agent => `
                                <tr>
                                    <td class="font-semibold">${agent.name}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.fcr.toFixed(1)}%</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.tecnicas} (${agent.fcrTecnicas}%)</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.facturacion} (${agent.fcrFacturacion}%)</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.general} (${agent.fcrGeneral}%)</td>
                                    <td style="color: #64748b;">${agent.razonNoResolucion}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function generateFCRDetailData() {
    return {
        fcr: Math.random() * 10 + 70,
        resueltas: Math.floor(Math.random() * 500 + 1800),
        total: Math.floor(Math.random() * 500 + 2500),
        rellamadas: Math.floor(Math.random() * 200 + 500),
        agents: [
            { name: 'María González', fcr: 92, tecnicas: 45, fcrTecnicas: 88, facturacion: 60, fcrFacturacion: 95, general: 40, fcrGeneral: 93, razonNoResolucion: 'Falta de información del cliente' },
            { name: 'Carlos Ruiz', fcr: 88, tecnicas: 42, fcrTecnicas: 85, facturacion: 58, fcrFacturacion: 92, general: 38, fcrGeneral: 90, razonNoResolucion: 'Problema requiere escalamiento' },
            { name: 'Ana Martínez', fcr: 90, tecnicas: 40, fcrTecnicas: 87, facturacion: 55, fcrFacturacion: 94, general: 37, fcrGeneral: 92, razonNoResolucion: 'Cliente no disponible' },
            { name: 'Luis Fernández', fcr: 87, tecnicas: 38, fcrTecnicas: 82, facturacion: 52, fcrFacturacion: 90, general: 38, fcrGeneral: 89, razonNoResolucion: 'Sistema fuera de línea' }
        ]
    };
}

// Detalles genéricos para otras métricas
function generateNPSDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">NPS - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-star" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    NPS (Net Promoter Score) - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-chart-bar" style="color: #f59e0b;"></i>
                    Distribución de Calificaciones
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailNPSChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateAbandonDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tasa de Abandono - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-phone-slash" style="color: #ef4444; margin-right: 0.5rem;"></i>
                    Tasa de Abandono - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-chart-line" style="color: #ef4444;"></i>
                    Análisis de Abandonos por Hora
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailAbandonChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateWaitDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tiempo de Espera - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-hourglass-half" style="color: #f97316; margin-right: 0.5rem;"></i>
                    Tiempo de Espera Promedio - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-chart-area" style="color: #f97316;"></i>
                    Distribución de Tiempos de Espera
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailWaitChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateAgentsDetail() {
    const agents = generateAgentsDetailData();
    
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Agentes Activos - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-users" style="color: #6366f1; margin-right: 0.5rem;"></i>
                    Agentes Activos - Estado Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-table" style="color: #6366f1;"></i>
                    Estado de Todos los Agentes
                </div>
                <div class="overflow-x-auto">
                    <table class="detail-table">
                        <thead>
                            <tr>
                                <th>Agente</th>
                                <th>Estado</th>
                                <th>Desde</th>
                                <th>Llamadas Hoy</th>
                                <th>Tiempo Activo</th>
                                <th>Última Actividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${agents.map(agent => `
                                <tr>
                                    <td class="font-semibold">${agent.name}</td>
                                    <td>
                                        <span class="badge ${agent.status === 'En Llamada' ? 'badge-danger' : agent.status === 'Disponible' ? 'badge-success' : 'badge-warning'}">
                                            ${agent.status}
                                        </span>
                                    </td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.desde}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.llamadas}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agent.tiempoActivo}</td>
                                    <td style="color: #64748b;">${agent.ultimaActividad}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function generateAgentsDetailData() {
    const estados = ['En Llamada', 'Disponible', 'En Break', 'Reunión', 'Capacitación'];
    const agents = [];
    for (let i = 1; i <= 52; i++) {
        const estado = estados[Math.floor(Math.random() * estados.length)];
        agents.push({
            name: `Agente #${i}`,
            status: estado,
            desde: `${Math.floor(Math.random() * 3 + 7)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            llamadas: Math.floor(Math.random() * 50 + 80),
            tiempoActivo: `${Math.floor(Math.random() * 3 + 5)}h ${Math.floor(Math.random() * 60)}m`,
            ultimaActividad: `${Math.floor(Math.random() * 5)} min ago`
        });
    }
    return agents;
}

function generateCallsDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard Principal</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Llamadas - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-phone" style="color: #14b8a6; margin-right: 0.5rem;"></i>
                    Volumen de Llamadas - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-chart-line" style="color: #14b8a6;"></i>
                    Llamadas por Hora - Detalle
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailCallsChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateRecaudacionDetail() {
    const data = generateRecaudacionDetailData();
    
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard de Cobranzas</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Recaudación - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-money-bill-wave" style="color: #10b981; margin-right: 0.5rem;"></i>
                    Recaudación del Día - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="metric-card">
                    <div class="metric-label">Recaudación Total</div>
                    <div class="metric-value">₡${data.total.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Pagos Completos</div>
                    <div class="metric-value">${data.pagosCompletos}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Pagos Parciales</div>
                    <div class="metric-value">${data.pagosParciales}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Promedio por Pago</div>
                    <div class="metric-value">₡${data.promedio.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="section mb-6">
                <div class="section-title">
                    <i class="fas fa-table" style="color: #10b981;"></i>
                    Detalle de Pagos por Agente
                </div>
                <div class="overflow-x-auto">
                    <table class="detail-table">
                        <thead>
                            <tr>
                                <th>Agente</th>
                                <th>Pagos Procesados</th>
                                <th>Monto Total</th>
                                <th>Promedio</th>
                                <th>Método Principal</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.agentes.map(agente => `
                                <tr>
                                    <td class="font-semibold">${agente.nombre}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${agente.pagos}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">₡${agente.monto.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">₡${agente.promedio.toFixed(2)}</td>
                                    <td>${agente.metodo}</td>
                                    <td>
                                        <span class="badge ${agente.performance >= 90 ? 'badge-success' : agente.performance >= 75 ? 'badge-warning' : 'badge-danger'}">
                                            ${agente.performance}%
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function generateRecaudacionDetailData() {
    return {
        total: Math.random() * 10000 + 45000,
        pagosCompletos: Math.floor(Math.random() * 100 + 200),
        pagosParciales: Math.floor(Math.random() * 50 + 80),
        promedio: Math.random() * 50 + 150,
        agentes: [
            { nombre: 'María González', pagos: 45, monto: 8500, promedio: 188.89, metodo: 'Tarjeta', performance: 95 },
            { nombre: 'Carlos Ruiz', pagos: 42, monto: 8200, promedio: 195.24, metodo: 'Transferencia', performance: 92 },
            { nombre: 'Ana Martínez', pagos: 40, monto: 7900, promedio: 197.50, metodo: 'Tarjeta', performance: 90 },
            { nombre: 'Luis Fernández', pagos: 38, monto: 7600, promedio: 200.00, metodo: 'Efectivo', performance: 88 }
        ]
    };
}

function generateTasaRecuperacionDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard de Cobranzas</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tasa de Recuperación - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-percentage" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    Tasa de Recuperación - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-chart-area" style="color: #f59e0b;"></i>
                    Tasa de Recuperación por Segmento de Deuda
                </div>
                <div class="chart-canvas-container" style="height: 300px;">
                    <canvas id="detailTasaChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateGenericDetail(metricId, metricName) {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Dashboard</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">${metricName} - Detalle</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-chart-bar" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                    ${metricName} - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                    Información Detallada
                </div>
                <p style="color: #64748b;">Vista detallada de ${metricName}. Aquí se mostrarían los datos desglosados, agentes involucrados, causas y análisis específicos.</p>
            </div>
        </div>
    `;
}

// Inicializar gráficos de detalle
function initDetailCharts(metricId) {
    // Dashboard Principal
    if (metricId === 'sla') {
        initSLADetailChart();
    } else if (metricId === 'aht') {
        initAHTDetailChart();
    } else if (metricId === 'fcr') {
        initFCRDetailChart();
    } else if (metricId === 'nps') {
        initNPSDetailChart();
    } else if (metricId === 'abandon') {
        initAbandonDetailChart();
    } else if (metricId === 'wait') {
        initWaitDetailChart();
    } else if (metricId === 'calls') {
        initCallsDetailChart();
    } else if (metricId === 'recaudacion') {
        initRecaudacionDetailChart();
    } else if (metricId === 'tasa-recuperacion') {
        initTasaDetailChart();
    }
    // Las métricas de observabilidad pueden tener gráficos si se necesitan en el futuro
}

function initSLADetailChart() {
    const ctx = document.getElementById('detailSLAChart');
    if (ctx && typeof Chart !== 'undefined') {
        const hours = [];
        for (let i = 7; i <= 20; i++) {
            hours.push(i + ':00');
        }
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'SLA %',
                    data: hours.map(() => Math.random() * 15 + 80),
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, min: 70, max: 100, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

function initAHTDetailChart() {
    const ctx = document.getElementById('detailAHTChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['María G.', 'Carlos R.', 'Ana M.', 'Luis F.', 'Sofia L.', 'Pedro S.'],
                datasets: [{
                    label: 'AHT (min)',
                    data: [4.2, 4.5, 4.8, 5.2, 4.6, 6.5],
                    backgroundColor: '#10b981',
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
}

function initFCRDetailChart() {
    const ctx = document.getElementById('detailFCRChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Falta de Info', 'Requiere Escalamiento', 'Cliente No Disponible', 'Sistema Offline', 'Otros'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b']
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

function initNPSDetailChart() {
    const ctx = document.getElementById('detailNPSChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['0-6 (Detractores)', '7-8 (Pasivos)', '9-10 (Promotores)'],
                datasets: [{
                    label: 'Cantidad',
                    data: [15, 35, 50],
                    backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
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
}

function initAbandonDetailChart() {
    const ctx = document.getElementById('detailAbandonChart');
    if (ctx && typeof Chart !== 'undefined') {
        const hours = [];
        for (let i = 7; i <= 20; i++) {
            hours.push(i + ':00');
        }
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Abandonos',
                    data: hours.map(() => Math.floor(Math.random() * 20 + 5)),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
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
}

function initWaitDetailChart() {
    const ctx = document.getElementById('detailWaitChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['0-15 seg', '16-30 seg', '31-60 seg', '61-120 seg', '>120 seg'],
                datasets: [{
                    label: 'Cantidad',
                    data: [45, 30, 15, 7, 3],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#dc2626'],
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
}

function initCallsDetailChart() {
    const ctx = document.getElementById('detailCallsChart');
    if (ctx && typeof Chart !== 'undefined') {
        const hours = [];
        for (let i = 7; i <= 20; i++) {
            hours.push(i + ':00');
        }
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Llamadas',
                    data: hours.map(() => Math.floor(Math.random() * 50 + 100)),
                    borderColor: '#14b8a6',
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
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
}

function initRecaudacionDetailChart() {
    // Gráfico se puede agregar si es necesario
}

function initTasaDetailChart() {
    const ctx = document.getElementById('detailTasaChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['0-30 días', '31-60 días', '61-90 días', '91-120 días', '>120 días'],
                datasets: [{
                    label: 'Tasa de Recuperación %',
                    data: [35, 28, 20, 15, 8],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#dc2626'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 40, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

// ========== FUNCIONES DE DETALLE PARA OBSERVABILIDAD ==========

// Observabilidad Operativa
function generateAnomaliasDetail() {
    const data = {
        total: Math.floor(Math.random() * 5 + 3),
        porTipo: [
            { tipo: 'Volumen Excesivo', cantidad: 2, severidad: 'Crítica', causa: 'Pico de llamadas 35% sobre capacidad' },
            { tipo: 'Tiempo de Espera Alto', cantidad: 1, severidad: 'Alta', causa: 'Falta de agentes disponibles' },
            { tipo: 'Sistema Lento', cantidad: 1, severidad: 'Media', causa: 'Latencia en base de datos' }
        ]
    };
    
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Anomalías Detectadas</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-exclamation-triangle" style="color: #ef4444; margin-right: 0.5rem;"></i>
                    Anomalías Detectadas - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="metric-card">
                    <div class="metric-label">Total Anomalías</div>
                    <div class="metric-value">${data.total}</div>
                    <span class="badge badge-danger">Crítico</span>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Anomalías Críticas</div>
                    <div class="metric-value">${data.porTipo.filter(a => a.severidad === 'Crítica').length}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Última Detección</div>
                    <div class="metric-value" style="font-size: 1.25rem;">${new Date().toLocaleTimeString('es-ES')}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-table" style="color: #ef4444;"></i>
                    Desglose de Anomalías por Tipo
                </div>
                <div class="overflow-x-auto">
                    <table class="detail-table">
                        <thead>
                            <tr>
                                <th>Tipo de Anomalía</th>
                                <th>Cantidad</th>
                                <th>Severidad</th>
                                <th>Causa Detectada</th>
                                <th>Impacto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.porTipo.map(anomalia => `
                                <tr>
                                    <td class="font-semibold">${anomalia.tipo}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${anomalia.cantidad}</td>
                                    <td>
                                        <span class="badge ${anomalia.severidad === 'Crítica' ? 'badge-danger' : anomalia.severidad === 'Alta' ? 'badge-danger' : 'badge-warning'}">
                                            ${anomalia.severidad}
                                        </span>
                                    </td>
                                    <td style="color: #3b82f6;">${anomalia.causa}</td>
                                    <td style="color: #64748b;">Requiere acción inmediata</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function generateCuellosBotellaDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Cuellos de Botella</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-hourglass-half" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    Cuellos de Botella - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    Análisis de Cuellos de Botella
                </div>
                <p style="color: #64748b;">Los cuellos de botella se detectan cuando el volumen de llamadas excede la capacidad disponible o cuando hay ineficiencias en la distribución de recursos.</p>
            </div>
        </div>
    `;
}

function generateTiempoMuertoDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tiempo Muerto Acumulado</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-phone-slash" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                    Tiempo Muerto Acumulado - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                    Análisis de Tiempo Muerto
                </div>
                <p style="color: #64748b;">El tiempo muerto representa períodos en los que los agentes están disponibles pero no reciben llamadas, indicando posibles ineficiencias en la distribución.</p>
            </div>
        </div>
    `;
}

function generateCumplimientoScriptsDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Cumplimiento de Scripts</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-check-circle" style="color: #10b981; margin-right: 0.5rem;"></i>
                    Cumplimiento de Scripts - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #10b981;"></i>
                    Análisis de Cumplimiento de Scripts
                </div>
                <p style="color: #64748b;">Mide el porcentaje de agentes que siguen correctamente los scripts establecidos para cada tipo de interacción.</p>
            </div>
        </div>
    `;
}

function generateVolumenActualDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Volumen Actual</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-phone-volume" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                    Volumen Actual - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #8b5cf6;"></i>
                    Análisis de Volumen
                </div>
                <p style="color: #64748b;">Volumen actual de llamadas en tiempo real, comparado con la capacidad disponible y tendencias históricas.</p>
            </div>
        </div>
    `;
}

function generateDuracionPromedioDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Duración Promedio</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-clock" style="color: #14b8a6; margin-right: 0.5rem;"></i>
                    Duración Promedio - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #14b8a6;"></i>
                    Análisis de Duración
                </div>
                <p style="color: #64748b;">Tiempo promedio de duración de las llamadas, incluyendo tendencias y comparación con objetivos.</p>
            </div>
        </div>
    `;
}

function generateTasaAbandonoObsDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tasa de Abandono</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-phone-alt" style="color: #f97316; margin-right: 0.5rem;"></i>
                    Tasa de Abandono - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f97316;"></i>
                    Análisis de Abandono
                </div>
                <p style="color: #64748b;">Porcentaje de llamadas que son abandonadas antes de ser atendidas, indicador clave de satisfacción y eficiencia operativa.</p>
            </div>
        </div>
    `;
}

function generateAgentesColaDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad Operativa</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Agentes en Cola</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-user-clock" style="color: #6366f1; margin-right: 0.5rem;"></i>
                    Agentes en Cola - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #6366f1;"></i>
                    Análisis de Agentes en Cola
                </div>
                <p style="color: #64748b;">Número de agentes disponibles esperando recibir llamadas, indicador de eficiencia en la distribución de carga.</p>
            </div>
        </div>
    `;
}

// Observabilidad Comportamiento
function generateIntencionPagoDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Comportamiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Intención de Pago</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-handshake" style="color: #10b981; margin-right: 0.5rem;"></i>
                    Intención de Pago Detectada - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #10b981;"></i>
                    Análisis de Intención de Pago
                </div>
                <p style="color: #64748b;">Análisis basado en IA que detecta señales de intención de pago en las conversaciones, usando análisis de voz y texto.</p>
            </div>
        </div>
    `;
}

function generateTonoEmocionalDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Comportamiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tono Emocional</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-smile" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    Tono Emocional Promedio - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    Análisis de Tono Emocional
                </div>
                <p style="color: #64748b;">Análisis del tono emocional en las conversaciones para identificar estados como ansiedad, colaboración, evasión, etc.</p>
            </div>
        </div>
    `;
}

function generateSenalesEvasionDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Comportamiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Señales de Evasión</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-exclamation-circle" style="color: #ef4444; margin-right: 0.5rem;"></i>
                    Señales de Evasión - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #ef4444;"></i>
                    Análisis de Señales de Evasión
                </div>
                <p style="color: #64748b;">Detección de patrones que indican que el cliente está intentando evadir el pago o la comunicación.</p>
            </div>
        </div>
    `;
}

function generateProbabilidadRecuperacionDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Comportamiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Probabilidad de Recuperación</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-chart-line" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                    Probabilidad de Recuperación - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                    Análisis de Probabilidad de Recuperación
                </div>
                <p style="color: #64748b;">Modelo predictivo que calcula la probabilidad de recuperar el pago basado en comportamiento, historial y señales detectadas.</p>
            </div>
        </div>
    `;
}

// Observabilidad IA
function generateDriftDatosDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Modelos de IA</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Drift de Datos</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-exclamation-triangle" style="color: #ef4444; margin-right: 0.5rem;"></i>
                    Drift de Datos Detectado - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #ef4444;"></i>
                    Análisis de Drift de Datos
                </div>
                <p style="color: #64748b;">El drift de datos indica que la distribución de los datos actuales ha cambiado respecto a los datos de entrenamiento, lo que puede reducir la precisión del modelo.</p>
            </div>
        </div>
    `;
}

function generateTasaErrorIADetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Modelos de IA</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Tasa de Error de Predicción</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-bug" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    Tasa de Error de Predicción - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    Análisis de Errores de Predicción
                </div>
                <p style="color: #64748b;">Porcentaje de predicciones incorrectas del modelo de IA, comparado con los resultados reales.</p>
            </div>
        </div>
    `;
}

function generateSesgosIADetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Modelos de IA</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Sesgos Detectados</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-balance-scale" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                    Sesgos Detectados - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #8b5cf6;"></i>
                    Análisis de Sesgos
                </div>
                <p style="color: #64748b;">Detección de sesgos sistemáticos en las predicciones del modelo que pueden discriminar injustamente a ciertos grupos.</p>
            </div>
        </div>
    `;
}

function generateConfianzaModeloDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Modelos de IA</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Confianza del Modelo</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-shield-alt" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                    Confianza del Modelo - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                    Análisis de Confianza
                </div>
                <p style="color: #64748b;">Nivel general de confiabilidad del modelo de IA basado en precisión, consistencia y estabilidad de las predicciones.</p>
            </div>
        </div>
    `;
}

// Observabilidad Legal
function generateIncumplimientosDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Incumplimientos Detectados</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-ban" style="color: #ef4444; margin-right: 0.5rem;"></i>
                    Incumplimientos Detectados - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #ef4444;"></i>
                    Análisis de Incumplimientos
                </div>
                <p style="color: #64748b;">Total de incumplimientos detectados en normativas legales, incluyendo lenguaje indebido, horarios, y protección de datos.</p>
            </div>
        </div>
    `;
}

function generateLenguajeIndebidoDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Lenguaje Indebido</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-comment-slash" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    Lenguaje Indebido Detectado - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    Análisis de Lenguaje Indebido
                </div>
                <p style="color: #64748b;">Detección de uso de lenguaje amenazante, presión excesiva, o lenguaje inapropiado durante las llamadas.</p>
            </div>
        </div>
    `;
}

function generateLlamadasFueraHorarioDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Llamadas Fuera de Horario</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-clock" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                    Llamadas Fuera de Horario - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #8b5cf6;"></i>
                    Análisis de Llamadas Fuera de Horario
                </div>
                <p style="color: #64748b;">Llamadas realizadas fuera del horario permitido por normativa, que pueden constituir una violación legal.</p>
            </div>
        </div>
    `;
}

function generateNivelCumplimientoDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Nivel de Cumplimiento</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-shield-alt" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                    Nivel de Cumplimiento - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                    Análisis de Nivel de Cumplimiento
                </div>
                <p style="color: #64748b;">Porcentaje general de cumplimiento con todas las normativas legales y regulatorias aplicables.</p>
            </div>
        </div>
    `;
}

function generateRiesgoAcosoDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Riesgo de Acoso</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-exclamation-triangle" style="color: #ef4444; margin-right: 0.5rem;"></i>
                    Riesgo de Acoso Detectado - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #ef4444;"></i>
                    Análisis de Riesgo de Acoso
                </div>
                <p style="color: #64748b;">Detección de patrones que indican posible acoso, como múltiples llamadas consecutivas en corto tiempo al mismo cliente.</p>
            </div>
        </div>
    `;
}

function generateIncumplimientoDatosDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Incumplimiento Protección Datos</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-file-shield" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                    Incumplimiento Protección Datos - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    Análisis de Protección de Datos
                </div>
                <p style="color: #64748b;">Violaciones detectadas en el manejo de datos personales, incluyendo falta de consentimiento o uso indebido de información.</p>
            </div>
        </div>
    `;
}

function generateCumplimientoScriptLegalDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Cumplimiento Script Legal</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-check-double" style="color: #14b8a6; margin-right: 0.5rem;"></i>
                    Cumplimiento Script Legal - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #14b8a6;"></i>
                    Análisis de Cumplimiento Script Legal
                </div>
                <p style="color: #64748b;">Porcentaje de agentes que siguen correctamente los scripts legales obligatorios, como solicitud de consentimiento y avisos legales.</p>
            </div>
        </div>
    `;
}

function generateRiesgosLegalesDetail() {
    return `
        <div class="detail-modal-header">
            <div>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Observabilidad - Legal y Cumplimiento</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item active">Distribución de Riesgos Legales</span>
                </div>
                <h2 class="detail-modal-title">
                    <i class="fas fa-chart-pie" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                    Distribución de Riesgos Legales - Análisis Detallado
                </h2>
            </div>
            <button class="detail-modal-close" onclick="closeDetailModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="mb-6">
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #8b5cf6;"></i>
                    Análisis de Riesgos Legales
                </div>
                <p style="color: #64748b;">Distribución de los diferentes tipos de riesgos legales detectados en las operaciones del contact center.</p>
            </div>
        </div>
    `;
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDetailModal();
    }
});

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('detailModal');
    if (modal && e.target === modal) {
        closeDetailModal();
    }
});
