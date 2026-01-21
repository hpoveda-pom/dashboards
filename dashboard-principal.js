// Dashboard Principal
let principalCharts = {};

function initDashboardPrincipal() {
    console.log('=== INICIALIZANDO DASHBOARD PRINCIPAL ===');
    const container = document.getElementById('principalContent');
    if (!container) {
        console.error('❌ Contenedor principalContent no encontrado');
        return;
    }
    console.log('✓ Contenedor encontrado, cargando contenido...');
    
    // Asegurar que el dashboard esté visible
    const dashboard = document.getElementById('dashboard-principal');
    if (dashboard) {
        dashboard.classList.remove('dashboard-hidden');
    }
    
    // Destruir gráficos existentes antes de recrear el HTML
    if (principalCharts.calls) {
        principalCharts.calls.destroy();
        principalCharts.calls = null;
    }
    if (principalCharts.sla) {
        principalCharts.sla.destroy();
        principalCharts.sla = null;
    }
    if (principalCharts.channel) {
        principalCharts.channel.destroy();
        principalCharts.channel = null;
    }
    if (principalCharts.agents) {
        principalCharts.agents.destroy();
        principalCharts.agents = null;
    }
    
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('sla', 'Service Level (SLA)')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('sla', 'Service Level (SLA)');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-bullseye"></i>
                </div>
                <div class="metric-label">
                    Service Level (SLA)
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Service Level (SLA)</strong>
                            <p>Porcentaje de llamadas atendidas dentro del tiempo objetivo (típicamente 20 segundos).</p>
                            <div class="formula">SLA = (Llamadas atendidas en ≤20s / Total llamadas) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="slaValue">0%</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-success" id="slaBadge">Excelente</span>
                    <div class="metric-change positive" id="slaTrend">
                        <i class="fas fa-arrow-up"></i>
                        <span>+2.3%</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; background: #f1f5f9; height: 6px; border-radius: 6px; overflow: hidden;">
                    <div id="slaBar" style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb); width: 0%; transition: width 0.6s ease;"></div>
                </div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('aht', 'AHT Promedio')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('aht', 'AHT Promedio');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="metric-label">
                    AHT Promedio
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>AHT (Average Handle Time)</strong>
                            <p>Tiempo promedio desde que se contesta hasta que se finaliza la llamada, incluyendo tiempo de habla, hold y post-call.</p>
                            <div class="formula">AHT = (Tiempo Habla + Tiempo Hold + Tiempo Post-Call) / Total Llamadas</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="ahtValue">0 min</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-success" id="ahtBadge">Óptimo</span>
                    <div class="metric-change positive" id="ahtTrend">
                        <i class="fas fa-arrow-down"></i>
                        <span>-2.3%</span>
                    </div>
                </div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('fcr', 'FCR (Primera Resolución)')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('fcr', 'FCR (Primera Resolución)');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="metric-label">
                    FCR (Primera Resolución)
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>FCR (First Call Resolution)</strong>
                            <p>Porcentaje de consultas resueltas en el primer contacto, sin necesidad de seguimiento.</p>
                            <div class="formula">FCR = (Consultas resueltas en 1ra llamada / Total consultas) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="fcrValue">0%</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-success" id="fcrBadge">Alto</span>
                    <div class="metric-change positive" id="fcrTrend">
                        <i class="fas fa-arrow-up"></i>
                        <span>+1.5%</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; background: #f1f5f9; height: 6px; border-radius: 6px; overflow: hidden;">
                    <div id="fcrBar" style="height: 100%; background: linear-gradient(90deg, #8b5cf6, #7c3aed); width: 0%; transition: width 0.6s ease;"></div>
                </div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('nps', 'NPS (Satisfacción)')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('nps', 'NPS (Satisfacción)');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-star"></i>
                </div>
                <div class="metric-label">
                    NPS (Satisfacción)
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>NPS (Net Promoter Score)</strong>
                            <p>Mide la lealtad del cliente. Promotores (9-10), Pasivos (7-8), Detractores (0-6).</p>
                            <div class="formula">NPS = % Promotores - % Detractores</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="npsValue">0</div>
                <div class="flex items-center justify-between">
                    <span class="badge badge-warning" id="npsBadge">Bueno</span>
                    <div class="metric-change positive" id="npsTrend">
                        <i class="fas fa-arrow-up"></i>
                        <span>+5.2</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card clickable" onclick="showMetricDetail('abandon', 'Tasa de Abandono')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('abandon', 'Tasa de Abandono');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                    <i class="fas fa-phone-slash"></i>
                </div>
                <div class="metric-label">
                    Tasa de Abandono
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tasa de Abandono</strong>
                            <p>Porcentaje de llamadas que se cuelgan antes de ser atendidas por un agente.</p>
                            <div class="formula">Tasa Abandono = (Llamadas abandonadas / Total llamadas entrantes) × 100</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="abandonValue">0%</div>
                <span class="badge badge-danger" id="abandonBadge">Alto</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('wait', 'Tiempo Espera Promedio')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('wait', 'Tiempo Espera Promedio');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #f97316, #ea580c); color: white;">
                    <i class="fas fa-hourglass-half"></i>
                </div>
                <div class="metric-label">
                    Tiempo Espera Promedio
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Tiempo de Espera Promedio</strong>
                            <p>Tiempo promedio que los clientes esperan en cola antes de ser atendidos.</p>
                            <div class="formula">Tiempo Espera = Suma de tiempos de espera / Total llamadas atendidas</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="waitValue">0 seg</div>
                <span class="badge badge-warning" id="waitBadge">Moderado</span>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('agents', 'Agentes Activos')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('agents', 'Agentes Activos');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;">
                    <i class="fas fa-users"></i>
                </div>
                <div class="metric-label">
                    Agentes Activos
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Agentes Activos</strong>
                            <p>Número total de agentes que están actualmente disponibles o en llamada.</p>
                            <div class="formula">Agentes Activos = Agentes Disponibles + Agentes en Llamada</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="agentsValue">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Total: <span id="agentsTotal">0</span> agentes</div>
            </div>
            
            <div class="metric-card clickable" onclick="showMetricDetail('calls', 'Llamadas por Hora')" style="position: relative;">
                <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('calls', 'Llamadas por Hora');" title="Análisis IA"></div>
                <div class="metric-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488); color: white;">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="metric-label">
                    Llamadas/Hora
                    <span class="metric-tooltip">
                        <span class="metric-tooltip-icon">?</span>
                        <span class="metric-tooltip-content">
                            <strong>Llamadas por Hora</strong>
                            <p>Volumen promedio de llamadas recibidas por hora en el contact center.</p>
                            <div class="formula">Llamadas/Hora = Total llamadas en período / Horas del período</div>
                        </span>
                    </span>
                </div>
                <div class="metric-value" id="callsValue">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Hoy: <span id="callsToday">0</span> llamadas</div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('calls', 'Volumen de Llamadas')">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #3b82f6;"></i>
                    Volumen de Llamadas por Hora
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="principalCallsChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('sla', 'Service Level (SLA)')">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #10b981;"></i>
                    Service Level (SLA) Histórico
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="principalSLAChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="chart-container chart-clickable" onclick="showMetricDetail('channels', 'Distribución por Canal')">
                <div class="chart-title">
                    <i class="fas fa-chart-pie" style="color: #8b5cf6;"></i>
                    Distribución por Canal
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="principalChannelChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container chart-clickable" onclick="showMetricDetail('agents', 'Top Agentes Performance')">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #f59e0b;"></i>
                    Top 5 Agentes - Performance
                    <span style="font-size: 0.75rem; color: #64748b; margin-left: 0.5rem;">(Click para detalles)</span>
                </div>
                <div class="chart-canvas-container">
                    <canvas id="principalAgentsChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    // Esperar un momento para que el DOM se actualice antes de inicializar gráficos
    setTimeout(() => {
        updatePrincipalMetrics();
        // Asegurar que el dashboard esté visible antes de inicializar gráficos
        if (dashboard) {
            dashboard.classList.remove('dashboard-hidden');
        }
        initPrincipalCharts();
    }, 200);
}

function updatePrincipalMetrics() {
    const data = generatePrincipalData();
    
    // Actualizar valores con animación suave
    animateMetricValue('slaValue', data.sla, (val) => val.toFixed(1) + '%');
    animateMetricValue('ahtValue', data.aht, (val) => val.toFixed(1) + ' min');
    animateMetricValue('fcrValue', data.fcr, (val) => val.toFixed(1) + '%');
    animateMetricValue('npsValue', data.nps, (val) => Math.round(val).toString());
    animateMetricValue('abandonValue', data.abandonRate, (val) => val.toFixed(1) + '%');
    animateMetricValue('waitValue', data.waitTime, (val) => Math.round(val) + ' seg');
    animateMetricValue('agentsValue', data.activeAgents, (val) => Math.round(val).toString());
    animateMetricValue('callsValue', data.callsPerHour, (val) => Math.round(val).toString());
    
    // Actualizar badges y estados
    updateBadge('slaBadge', data.sla >= 80 ? 'badge-success' : (data.sla >= 70 ? 'badge-warning' : 'badge-danger'), 
                data.sla >= 80 ? 'Excelente' : (data.sla >= 70 ? 'Bueno' : 'Bajo'));
    updateBadge('ahtBadge', data.aht <= 6 ? 'badge-success' : (data.aht <= 8 ? 'badge-warning' : 'badge-danger'),
                data.aht <= 6 ? 'Óptimo' : (data.aht <= 8 ? 'Aceptable' : 'Alto'));
    updateBadge('fcrBadge', data.fcr >= 75 ? 'badge-success' : (data.fcr >= 65 ? 'badge-warning' : 'badge-danger'),
                data.fcr >= 75 ? 'Alto' : (data.fcr >= 65 ? 'Medio' : 'Bajo'));
    updateBadge('npsBadge', data.nps >= 50 ? 'badge-success' : (data.nps >= 30 ? 'badge-warning' : 'badge-danger'),
                data.nps >= 50 ? 'Excelente' : (data.nps >= 30 ? 'Bueno' : 'Bajo'));
    updateBadge('abandonBadge', data.abandonRate <= 5 ? 'badge-success' : (data.abandonRate <= 8 ? 'badge-warning' : 'badge-danger'),
                data.abandonRate <= 5 ? 'Bajo' : (data.abandonRate <= 8 ? 'Moderado' : 'Alto'));
    updateBadge('waitBadge', data.waitTime <= 30 ? 'badge-success' : (data.waitTime <= 60 ? 'badge-warning' : 'badge-danger'),
                data.waitTime <= 30 ? 'Bajo' : (data.waitTime <= 60 ? 'Moderado' : 'Alto'));
    
    // Actualizar valores sin animación para algunos
    const agentsTotalEl = document.getElementById('agentsTotal');
    if (agentsTotalEl) agentsTotalEl.textContent = data.totalAgents;
    
    const callsTodayEl = document.getElementById('callsToday');
    if (callsTodayEl) {
        const current = parseInt(callsTodayEl.textContent.replace(/,/g, '')) || 0;
        if (window.animateValue) {
            window.animateValue(callsTodayEl, current, data.callsToday, 500, (val) => Math.round(val).toLocaleString());
        } else {
            callsTodayEl.textContent = data.callsToday.toLocaleString();
        }
    }
    
    // Actualizar barras con animación
    animateBarWidth('slaBar', data.sla);
    animateBarWidth('fcrBar', data.fcr);
}

// Función auxiliar para actualizar badges
function updateBadge(elementId, badgeClass, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.className = 'badge ' + badgeClass;
        element.textContent = text;
    }
}

// Función auxiliar para animar valores de métricas
function animateMetricValue(elementId, targetValue, formatter) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentText = element.textContent;
    let currentValue = 0;
    
    // Extraer número del texto actual
    const match = currentText.match(/[\d.]+/);
    if (match) {
        currentValue = parseFloat(match[0]);
    }
    
    if (window.animateValue) {
        window.animateValue(element, currentValue, targetValue, 500, formatter);
    } else {
        element.textContent = formatter(targetValue);
    }
}

// Función auxiliar para animar ancho de barras
function animateBarWidth(elementId, targetWidth) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentWidth = parseFloat(element.style.width) || 0;
    const startTime = performance.now();
    const duration = 500;
    const difference = targetWidth - currentWidth;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        const current = currentWidth + (difference * easeOutQuad);
        
        if (element) {
            element.style.width = current + '%';
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (element) {
                element.style.width = targetWidth + '%';
            }
        }
    }
    
    requestAnimationFrame(update);
}

// Función auxiliar para animar valores numéricos (reutilizable) - Global
window.animateValue = function(element, start, end, duration, formatter) {
    if (!element) return;
    
    const startTime = performance.now();
    const difference = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        const current = start + (difference * easeOutQuad);
        
        if (element && element.textContent !== undefined) {
            element.textContent = formatter(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (element && element.textContent !== undefined) {
                element.textContent = formatter(end);
            }
        }
    }
    
    requestAnimationFrame(update);
};

function generatePrincipalData() {
    return {
        sla: Math.random() * 15 + 80, // 80-95%
        aht: Math.random() * 2 + 4, // 4-6 min
        fcr: Math.random() * 15 + 70, // 70-85%
        nps: Math.floor(Math.random() * 30 + 45), // 45-75
        abandonRate: Math.random() * 4 + 3, // 3-7%
        waitTime: Math.floor(Math.random() * 25 + 15), // 15-40 seg
        activeAgents: Math.floor(Math.random() * 8 + 45), // 45-53
        totalAgents: 52,
        callsPerHour: Math.floor(Math.random() * 60 + 100), // 100-160
        callsToday: Math.floor(Math.random() * 500 + 2500) // 2500-3000
    };
}

function initPrincipalCharts() {
    // Destruir gráficos existentes primero
    if (principalCharts.calls) {
        try {
            principalCharts.calls.destroy();
        } catch(e) {
            console.warn('Error al destruir gráfico de llamadas:', e);
        }
        principalCharts.calls = null;
    }
    if (principalCharts.sla) {
        try {
            principalCharts.sla.destroy();
        } catch(e) {
            console.warn('Error al destruir gráfico de SLA:', e);
        }
        principalCharts.sla = null;
    }
    if (principalCharts.channel) {
        try {
            principalCharts.channel.destroy();
        } catch(e) {
            console.warn('Error al destruir gráfico de canales:', e);
        }
        principalCharts.channel = null;
    }
    if (principalCharts.agents) {
        try {
            principalCharts.agents.destroy();
        } catch(e) {
            console.warn('Error al destruir gráfico de agentes:', e);
        }
        principalCharts.agents = null;
    }
    
    // Asegurar que Chart.js esté disponible
    if (typeof Chart === 'undefined') {
        console.error('Chart.js no está disponible');
        return;
    }
    
    // Datos dummy
    const hours = [];
    for (let i = 11; i >= 0; i--) {
        const hour = new Date();
        hour.setHours(hour.getHours() - i);
        const hourStr = hour.getHours().toString().padStart(2, '0');
        hours.push(hourStr + ':00');
    }
    
    // Chart: Llamadas
    const callsCtx = document.getElementById('principalCallsChart');
    if (callsCtx) {
        try {
            principalCharts.calls = new Chart(callsCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: hours,
                    datasets: [{
                        label: 'Llamadas',
                        data: hours.map(() => Math.floor(Math.random() * 150) + 80),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3
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
            console.log('✓ Gráfico de llamadas inicializado');
        } catch(e) {
            console.error('Error al crear gráfico de llamadas:', e);
        }
    } else {
        console.warn('Canvas principalCallsChart no encontrado');
    }
    
    // Chart: SLA
    const slaCtx = document.getElementById('principalSLAChart');
    if (slaCtx) {
        try {
            principalCharts.sla = new Chart(slaCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: hours,
                    datasets: [{
                        label: 'SLA %',
                        data: hours.map(() => Math.random() * 15 + 80),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3
                    }, {
                        label: 'Meta (80%)',
                        data: Array(12).fill(80),
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
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: { min: 70, max: 100, grid: { color: '#f1f5f9' } },
                        x: { grid: { display: false } }
                    }
                }
            });
            console.log('✓ Gráfico de SLA inicializado');
        } catch(e) {
            console.error('Error al crear gráfico de SLA:', e);
        }
    } else {
        console.warn('Canvas principalSLAChart no encontrado');
    }
    
    // Chart: Canales
    const channelCtx = document.getElementById('principalChannelChart');
    if (channelCtx) {
        try {
            principalCharts.channel = new Chart(channelCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Teléfono', 'Chat', 'Email', 'Redes Sociales'],
                    datasets: [{
                        data: [65, 20, 10, 5],
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
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
            console.log('✓ Gráfico de canales inicializado');
        } catch(e) {
            console.error('Error al crear gráfico de canales:', e);
        }
    } else {
        console.warn('Canvas principalChannelChart no encontrado');
    }
    
    // Chart: Agentes
    const agentsCtx = document.getElementById('principalAgentsChart');
    if (agentsCtx) {
        try {
            principalCharts.agents = new Chart(agentsCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['María González', 'Carlos Ruiz', 'Ana Martínez', 'Luis Fernández', 'Sofia López'],
                    datasets: [{
                        label: 'Llamadas',
                        data: [145, 138, 132, 128, 125],
                        backgroundColor: '#f59e0b',
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
            console.log('✓ Gráfico de agentes inicializado');
        } catch(e) {
            console.error('Error al crear gráfico de agentes:', e);
        }
    } else {
        console.warn('Canvas principalAgentsChart no encontrado');
    }
}

// Función para actualizar gráficos en tiempo real
function updatePrincipalChartsRealTime() {
    if (!principalCharts.calls || !principalCharts.sla) return;
    
    // Actualizar gráfico de llamadas
    if (principalCharts.calls) {
        const newData = Array(12).fill(0).map(() => Math.floor(Math.random() * 150) + 80);
        principalCharts.calls.data.datasets[0].data = newData;
        principalCharts.calls.update('none'); // 'none' para animación suave
    }
    
    // Actualizar gráfico de SLA
    if (principalCharts.sla) {
        const newSLA = Array(12).fill(0).map(() => Math.random() * 15 + 80);
        principalCharts.sla.data.datasets[0].data = newSLA;
        principalCharts.sla.update('none');
    }
    
    // Actualizar gráfico de canales (rotar datos)
    if (principalCharts.channel) {
        const currentData = principalCharts.channel.data.datasets[0].data;
        const newChannelData = currentData.map(val => {
            const change = (Math.random() - 0.5) * 5;
            return Math.max(1, Math.min(99, val + change));
        });
        // Normalizar para que sume 100
        const sum = newChannelData.reduce((a, b) => a + b, 0);
        principalCharts.channel.data.datasets[0].data = newChannelData.map(v => Math.round((v / sum) * 100));
        principalCharts.channel.update('none');
    }
    
    // Actualizar gráfico de agentes
    if (principalCharts.agents) {
        const newAgentsData = [145, 138, 132, 128, 125].map(val => {
            return val + Math.floor((Math.random() - 0.5) * 10);
        });
        principalCharts.agents.data.datasets[0].data = newAgentsData;
        principalCharts.agents.update('none');
    }
}

// Auto-actualizar métricas cada 3 segundos
setInterval(() => {
    if (window.currentDashboard === 'principal') {
        updatePrincipalMetrics();
        updatePrincipalChartsRealTime();
    }
}, 3000);
