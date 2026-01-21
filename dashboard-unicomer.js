// Dashboard UNICOMER - 5 Dashboards Especializados

// Dashboard 1: Promesado y Pagado Hoy
function initUnicomerPromesadoPagado() {
    const container = document.getElementById('unicomerPromesadoPagadoContent');
    if (!container) return;
    
    const data = generatePromesadoPagadoData();
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-4" style="color: #0f172a;">
                <i class="fas fa-calendar-day" style="color: #3b82f6; margin-right: 0.5rem;"></i>
                Promesado y Pagado Hoy
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- PROMESADO HOY -->
                <div class="section">
                    <div class="section-title" style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem;">
                        <i class="fas fa-handshake"></i>
                        PROMESADO HOY
                        <span style="float: right; font-weight: 700;">Total: ₡${data.promesadoTotal.toLocaleString('es-ES', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Agente</th>
                                    <th>Monto</th>
                                    <th>Tendencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.promesadoAgentes.map(agente => `
                                    <tr class="clickable" onclick="showMetricDetail('promesado-${agente.nombre.toLowerCase()}', 'Promesado - ${agente.nombre}')" style="position: relative;">
                                        <td class="font-semibold" style="position: relative;">
                                            ${agente.nombre}
                                            <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('promesado-${agente.nombre.toLowerCase()}', 'Promesado - ${agente.nombre}');" title="Análisis IA"></div>
                                        </td>
                                        <td style="font-family: 'JetBrains Mono', monospace;">₡${agente.monto > 0 ? agente.monto.toLocaleString('es-ES', {minimumFractionDigits: 2}) : '-'}</td>
                                        <td>
                                            <span class="badge ${agente.tendencia === 'up' ? 'badge-success' : agente.tendencia === 'down' ? 'badge-danger' : 'badge-warning'}">
                                                <i class="fas fa-arrow-${agente.tendencia === 'up' ? 'up' : agente.tendencia === 'down' ? 'down' : 'right'}"></i>
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- PAGADO HOY -->
                <div class="section">
                    <div class="section-title" style="background: #10b981; color: white; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem;">
                        <i class="fas fa-money-bill-wave"></i>
                        PAGADO HOY
                        <span style="float: right; font-weight: 700;">Total: ₡${data.pagadoTotal.toLocaleString('es-ES', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Agente</th>
                                    <th>Monto</th>
                                    <th>Tendencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.pagadoAgentes.map(agente => `
                                    <tr class="clickable" onclick="showMetricDetail('pagado-${agente.nombre.toLowerCase()}', 'Pagado - ${agente.nombre}')" style="position: relative;">
                                        <td class="font-semibold" style="position: relative;">
                                            ${agente.nombre}
                                            <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('pagado-${agente.nombre.toLowerCase()}', 'Pagado - ${agente.nombre}');" title="Análisis IA"></div>
                                        </td>
                                        <td style="font-family: 'JetBrains Mono', monospace;">₡${agente.monto.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                        <td>
                                            <span class="badge ${agente.tendencia === 'up' ? 'badge-success' : agente.tendencia === 'down' ? 'badge-danger' : 'badge-warning'}">
                                                <i class="fas fa-arrow-${agente.tendencia === 'up' ? 'up' : agente.tendencia === 'down' ? 'down' : 'right'}"></i>
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePromesadoPagadoData() {
    return {
        promesadoTotal: 580500.00,
        pagadoTotal: 1390515.00,
        promesadoAgentes: [
            { nombre: 'SAUL', monto: 305000.00, tendencia: 'up' },
            { nombre: 'CORELLA', monto: 0, tendencia: 'neutral' },
            { nombre: 'ALEXA', monto: 215500.00, tendencia: 'up' },
            { nombre: 'KARLA', monto: 60000.00, tendencia: 'down' }
        ],
        pagadoAgentes: [
            { nombre: 'SAUL', monto: 337000.00, tendencia: 'neutral' },
            { nombre: 'CORELLA', monto: 145000.00, tendencia: 'down' },
            { nombre: 'ALEXA', monto: 300500.00, tendencia: 'neutral' },
            { nombre: 'KARLA', monto: 608015.00, tendencia: 'up' }
        ]
    };
}

// Dashboard 2: Rendimiento de Agentes
function initUnicomerRendimientoAgentes() {
    const container = document.getElementById('unicomerRendimientoAgentesContent');
    if (!container) return;
    
    const data = generateRendimientoAgentesData();
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-4" style="color: #0f172a;">
                <i class="fas fa-users-cog" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                Rendimiento de Agentes UNICOMER
            </h2>
            
            <div class="section">
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr style="background: #1e40af; color: white;">
                                <th>Asesor</th>
                                <th>Cartera</th>
                                <th>Recupero POM</th>
                                <th>Promesado</th>
                                <th>Seguimientos</th>
                                <th>Meta</th>
                                <th>Recupero Unicomer</th>
                                <th>Faltante</th>
                                <th>% Alcanzado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.agentes.map(agente => `
                                <tr class="clickable" onclick="showMetricDetail('rendimiento-${agente.nombre.toLowerCase()}', 'Rendimiento - ${agente.nombre}')" style="position: relative;">
                                    <td class="font-semibold" style="position: relative;">
                                        ${agente.nombre}
                                        <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('rendimiento-${agente.nombre.toLowerCase()}', 'Rendimiento - ${agente.nombre}');" title="Análisis IA"></div>
                                    </td>
                                    <td>${agente.cartera}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">
                                        ₡${agente.recuperoPOM.toLocaleString('es-ES', {minimumFractionDigits: 2})}
                                        ${getTrendIcon(agente.tendenciaRecupero)}
                                    </td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">
                                        ₡${agente.promesado.toLocaleString('es-ES', {minimumFractionDigits: 2})}
                                        ${getTrendIcon(agente.tendenciaPromesado)}
                                    </td>
                                    <td>${agente.seguimientos || '-'}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">₡${agente.meta.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                    <td>${agente.recuperoUnicomer || '-'}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">₡${agente.faltante.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                    <td>
                                        ${agente.porcentajeAlcanzado}%
                                        ${getTrendIcon(agente.tendenciaPorcentaje)}
                                    </td>
                                </tr>
                            `).join('')}
                            <tr style="background: #1e40af; color: white; font-weight: 700;">
                                <td>TOTAL</td>
                                <td>-</td>
                                <td style="font-family: 'JetBrains Mono', monospace;">₡${data.totalRecuperoPOM.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                <td style="font-family: 'JetBrains Mono', monospace;">₡${data.totalPromesado.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                <td>-</td>
                                <td style="font-family: 'JetBrains Mono', monospace;">₡${data.totalMeta.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                <td>-</td>
                                <td style="font-family: 'JetBrains Mono', monospace;">₡${data.totalFaltante.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                <td>${data.totalPorcentaje}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getTrendIcon(tendencia) {
    if (tendencia === 'up') return '<span class="badge badge-success"><i class="fas fa-arrow-up"></i></span>';
    if (tendencia === 'down') return '<span class="badge badge-danger"><i class="fas fa-arrow-down"></i></span>';
    return '<span class="badge badge-warning"><i class="fas fa-arrow-right"></i></span>';
}

function generateRendimientoAgentesData() {
    const agentes = [
        { nombre: 'Alexa', cartera: 'Separada', recuperoPOM: 1243265.91, promesado: 2575679.00, seguimientos: '-', meta: 6700000.00, recuperoUnicomer: '-', faltante: 5456734.09, porcentajeAlcanzado: 19, tendenciaRecupero: 'neutral', tendenciaPromesado: 'neutral', tendenciaPorcentaje: 'neutral' },
        { nombre: 'Karla', cartera: 'Separada', recuperoPOM: 1702025.00, promesado: 1133000.00, seguimientos: '-', meta: 6700000.00, recuperoUnicomer: '-', faltante: 4997975.00, porcentajeAlcanzado: 25, tendenciaRecupero: 'up', tendenciaPromesado: 'down', tendenciaPorcentaje: 'up' },
        { nombre: 'Saul', cartera: 'Separada', recuperoPOM: 778700.00, promesado: 809900.00, seguimientos: '-', meta: 6700000.00, recuperoUnicomer: '-', faltante: 5921300.00, porcentajeAlcanzado: 12, tendenciaRecupero: 'down', tendenciaPromesado: 'down', tendenciaPorcentaje: 'down' },
        { nombre: 'Corella', cartera: 'Separada', recuperoPOM: 482000.00, promesado: 180000.00, seguimientos: '-', meta: 6700000.00, recuperoUnicomer: '-', faltante: 6218000.00, porcentajeAlcanzado: 7, tendenciaRecupero: 'down', tendenciaPromesado: 'down', tendenciaPorcentaje: 'down' }
    ];
    
    const totalRecuperoPOM = agentes.reduce((sum, a) => sum + a.recuperoPOM, 0);
    const totalPromesado = agentes.reduce((sum, a) => sum + a.promesado, 0);
    const totalMeta = agentes.reduce((sum, a) => sum + a.meta, 0);
    const totalFaltante = agentes.reduce((sum, a) => sum + a.faltante, 0);
    const totalPorcentaje = Math.round((totalRecuperoPOM / totalMeta) * 100);
    
    return {
        agentes,
        totalRecuperoPOM,
        totalPromesado,
        totalMeta,
        totalFaltante,
        totalPorcentaje
    };
}

// Dashboard 3: Gestiones
function initUnicomerGestiones() {
    const container = document.getElementById('unicomerGestionesContent');
    if (!container) return;
    
    const data = generateGestionesData();
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-4" style="color: #0f172a;">
                <i class="fas fa-tasks" style="color: #f59e0b; margin-right: 0.5rem;"></i>
                Gestiones UNICOMER
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Gestiones del 1 al 16 -->
                <div class="section">
                    <div class="section-title" style="background: #fbbf24; color: #000; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; font-weight: 700;">
                        Gestiones del 1 al 16
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr style="background: #1e40af; color: white;">
                                    <th>Etiquetas de fila</th>
                                    <th>Cuenta de SubAccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #dbeafe;">
                                    <td class="font-semibold">Unicomer Separadas</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${data.gestiones1a16.total.toLocaleString('es-ES')}</td>
                                </tr>
                                ${data.gestiones1a16.detalle.map(item => `
                                    <tr class="clickable" onclick="showMetricDetail('gestion-${item.tipo.toLowerCase().replace(/\s+/g, '-')}', '${item.tipo}')" style="position: relative; ${item.tipo === 'No localizado' ? 'background: #fee2e2;' : ''}">
                                        <td style="position: relative;">
                                            ${item.tipo}
                                            <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('gestion-${item.tipo.toLowerCase().replace(/\s+/g, '-')}', '${item.tipo}');" title="Análisis IA"></div>
                                        </td>
                                        <td style="font-family: 'JetBrains Mono', monospace;">${item.cantidad.toLocaleString('es-ES')}</td>
                                    </tr>
                                `).join('')}
                                <tr style="background: #1e40af; color: white; font-weight: 700;">
                                    <td>Total general</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${data.gestiones1a16.total.toLocaleString('es-ES')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 p-4" style="background: #fef3c7; border-radius: 8px;">
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">Quitando NO LOCALIZADO</div>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #92400e;">
                            ${data.gestiones1a16.sinNoLocalizado.toLocaleString('es-ES')}
                        </div>
                    </div>
                </div>
                
                <!-- Gestiones del 13 al 16 -->
                <div class="section">
                    <div class="section-title" style="background: #fbbf24; color: #000; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; font-weight: 700;">
                        Gestiones del 13 al 16
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr style="background: #1e40af; color: white;">
                                    <th>Etiquetas de fila</th>
                                    <th>Cuenta de SubAccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #dbeafe;">
                                    <td class="font-semibold">Unicomer Separadas</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${data.gestiones13a16.total.toLocaleString('es-ES')}</td>
                                </tr>
                                ${data.gestiones13a16.detalle.map(item => `
                                    <tr class="clickable" onclick="showMetricDetail('gestion-13-16-${item.tipo.toLowerCase().replace(/\s+/g, '-')}', '${item.tipo} - 13-16')" style="position: relative; ${item.tipo === 'No localizado' ? 'background: #fee2e2;' : ''}">
                                        <td style="position: relative;">
                                            ${item.tipo}
                                            <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('gestion-13-16-${item.tipo.toLowerCase().replace(/\s+/g, '-')}', '${item.tipo} - 13-16');" title="Análisis IA"></div>
                                        </td>
                                        <td style="font-family: 'JetBrains Mono', monospace;">${item.cantidad.toLocaleString('es-ES')}</td>
                                    </tr>
                                `).join('')}
                                <tr style="background: #1e40af; color: white; font-weight: 700;">
                                    <td>Total general</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${data.gestiones13a16.total.toLocaleString('es-ES')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 p-4" style="background: #fef3c7; border-radius: 8px;">
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">Quitando NO LOCALIZADO</div>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #92400e;">
                            ${data.gestiones13a16.sinNoLocalizado.toLocaleString('es-ES')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section" style="background: #fffbeb; border-left: 4px solid #f59e0b;">
                <div class="section-title">
                    <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
                    NOTA
                </div>
                <ol style="list-style: decimal; padding-left: 1.5rem; color: #64748b; line-height: 1.8;">
                    <li>En el primer cuadro deben incluirse todas las gestiones del mes, es decir, todas las realizadas del día 1 al 16.</li>
                    <li>En el segundo cuadro deben mostrarse únicamente las gestiones correspondientes a las fechas en que se envió la mensajería, es decir, las gestiones realizadas del 13 al 16.</li>
                    <li>Se debe eliminar la cantidad de gestiones "NO LOCALIZADO", ya que esta gestión se genera automáticamente por el envío de la mensajería y no corresponde a una acción del gestor.</li>
                    <li>En los cuadros resaltados en amarillo, debe colocarse la cantidad total de gestiones dentro del rango de fechas indicado en cada encabezado.</li>
                </ol>
            </div>
        </div>
    `;
}

function generateGestionesData() {
    const gestiones1a16 = {
        total: 34306,
        detalle: [
            { tipo: 'DEUDOR REPORTA PAGO', cantidad: 151 },
            { tipo: 'ENVIO RECORDATORIO DE PAGO', cantidad: 5 },
            { tipo: 'Fallecido', cantidad: 3 },
            { tipo: 'Ingresos insuficientes', cantidad: 269 },
            { tipo: 'Llamada entrante', cantidad: 137 },
            { tipo: 'No localizado', cantidad: 33000 },
            { tipo: 'No se contacta telefónicamente', cantidad: 380 },
            { tipo: 'Problemas de salud', cantidad: 1 },
            { tipo: 'PROMESA DE PAGO', cantidad: 155 },
            { tipo: 'Sin contacto con titular', cantidad: 125 },
            { tipo: 'Sin trabajo', cantidad: 3 },
            { tipo: 'SOLICITUD REVERSION DE SALDO', cantidad: 39 },
            { tipo: 'VOLVER A LLAMAR CON CONTACTO', cantidad: 38 }
        ]
    };
    
    const gestiones13a16 = {
        total: 30283,
        detalle: [
            { tipo: 'DEUDOR REPORTA PAGO', cantidad: 65 },
            { tipo: 'ENVIO RECORDATORIO DE PAGO', cantidad: 2 },
            { tipo: 'Fallecido', cantidad: 1 },
            { tipo: 'Ingresos insuficientes', cantidad: 110 },
            { tipo: 'Llamada entrante', cantidad: 66 },
            { tipo: 'No localizado', cantidad: 29829 },
            { tipo: 'No se contacta telefónicamente', cantidad: 101 },
            { tipo: 'PROMESA DE PAGO', cantidad: 60 },
            { tipo: 'Sin contacto con titular', cantidad: 19 },
            { tipo: 'SOLICITUD REVERSION DE SALDO', cantidad: 15 },
            { tipo: 'VOLVER A LLAMAR CON CONTACTO', cantidad: 15 }
        ]
    };
    
    gestiones1a16.sinNoLocalizado = gestiones1a16.total - gestiones1a16.detalle.find(d => d.tipo === 'No localizado').cantidad;
    gestiones13a16.sinNoLocalizado = gestiones13a16.total - gestiones13a16.detalle.find(d => d.tipo === 'No localizado').cantidad;
    
    return { gestiones1a16, gestiones13a16 };
}

// Dashboard 4: Alcance Meta DIC VS ENE
function initUnicomerAlcanceMeta() {
    const container = document.getElementById('unicomerAlcanceMetaContent');
    if (!container) return;
    
    const data = generateAlcanceMetaData();
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-4" style="color: #0f172a;">
                <i class="fas fa-chart-bar" style="color: #ef4444; margin-right: 0.5rem;"></i>
                Alcance Meta DIC VS ENE Fuera Balance
            </h2>
            
            <div class="section">
                <div class="chart-canvas-container" style="height: 400px;">
                    <canvas id="alcanceMetaChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar gráfico
    setTimeout(() => {
        initAlcanceMetaChart(data);
    }, 100);
}

function initAlcanceMetaChart(data) {
    const ctx = document.getElementById('alcanceMetaChart');
    if (!ctx || typeof Chart === 'undefined') return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: data.externos.map(e => e.nombre),
            datasets: [
                {
                    label: '% Alc DICIEMBRE',
                    data: data.externos.map(e => e.diciembre),
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                },
                {
                    label: '% ALC ENERO',
                    data: data.externos.map(e => e.enero),
                    backgroundColor: '#f97316',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 70,
                    ticks: {
                        stepSize: 10,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: { color: '#f1f5f9' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function generateAlcanceMetaData() {
    return {
        externos: [
            { nombre: 'Externo 05', diciembre: 64, enero: 50 },
            { nombre: 'Externo 04', diciembre: 34, enero: 40 },
            { nombre: 'Externo 02', diciembre: 24, enero: 24 },
            { nombre: 'Externo 07', diciembre: 36, enero: 23 },
            { nombre: 'Externo 03', diciembre: 39, enero: 23 },
            { nombre: 'Externo 01', diciembre: 31, enero: 22 },
            { nombre: 'Externo 06', diciembre: 35, enero: 21 }
        ]
    };
}

// Dashboard 5: Informe de Estrategia Unicomer
function initUnicomerEstrategia() {
    const container = document.getElementById('unicomerEstrategiaContent');
    if (!container) return;
    
    const data = generateEstrategiaData();
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-4" style="color: #0f172a;">
                <i class="fas fa-chart-line" style="color: #8b5cf6; margin-right: 0.5rem;"></i>
                Informe de Estrategia Unicomer
            </h2>
            
            <!-- 1. Reporte de Estrategia -->
            <div class="section mb-6">
                <div class="section-title" style="background: #fbbf24; color: #000; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; font-weight: 700;">
                    1. Reporte de Estrategia
                </div>
                <p style="color: #64748b; margin-bottom: 1.5rem; font-size: 0.875rem;">
                    Este reporte detalla el flujo de borradores enviados y la efectividad de la recepción técnica.
                </p>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr style="background: #1e40af; color: white;">
                                <th>Métrica</th>
                                <th>Cantidad</th>
                                <th>% Efectividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.reporteEstrategia.map(item => `
                                <tr class="clickable" onclick="showMetricDetail('estrategia-${item.metrica.toLowerCase().replace(/\s+/g, '-')}', '${item.metrica}')" style="position: relative;">
                                    <td class="font-semibold" style="position: relative;">
                                        ${item.metrica}
                                        <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('estrategia-${item.metrica.toLowerCase().replace(/\s+/g, '-')}', '${item.metrica}');" title="Análisis IA"></div>
                                    </td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.cantidad.toLocaleString('es-ES')}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.efectividad.toFixed(2)}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- 2. Segmentación por Perfil Deudor -->
            <div class="section mb-6">
                <div class="section-title" style="background: #fbbf24; color: #000; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; font-weight: 700;">
                    2. Segmentación por Perfil Deudor (SMS)
                </div>
                <p style="color: #64748b; margin-bottom: 1.5rem; font-size: 0.875rem;">
                    Análisis de respuesta segmentado para optimizar el envío de mensajes con descuentos cada 3 días.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="metric-card">
                        <div class="metric-label">Distribución / Perfil</div>
                        <div class="metric-value">Cantidad: ${data.segmentacion.totalCantidad.toLocaleString('es-ES')}</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Monto en Riesgo (Promedio)</div>
                        <div class="metric-value">₡${data.segmentacion.montoRiesgo.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                    </div>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr style="background: #1e40af; color: white;">
                                <th>Perfil</th>
                                <th>Cantidad</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.segmentacion.detalle.map(item => `
                                <tr class="clickable" onclick="showMetricDetail('segmentacion-${item.perfil.toLowerCase().replace(/\s+/g, '-')}', 'Segmentación - ${item.perfil}')" style="position: relative;">
                                    <td class="font-semibold" style="position: relative;">
                                        ${item.perfil}
                                        <div class="ai-insight-icon" onclick="event.stopPropagation(); showAIAnalysis('segmentacion-${item.perfil.toLowerCase().replace(/\s+/g, '-')}', 'Segmentación - ${item.perfil}');" title="Análisis IA"></div>
                                    </td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">${item.cantidad.toLocaleString('es-ES')}</td>
                                    <td style="font-family: 'JetBrains Mono', monospace;">₡${item.monto.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- 4. Control Diario de Recupero y Promesas -->
            <div class="section">
                <div class="section-title" style="background: #fbbf24; color: #000; padding: 1rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; font-weight: 700;">
                    4. Control Diario de Recupero y Promesas
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="metric-card" style="background: #f0fdf4; border-left: 4px solid #10b981;">
                        <div class="metric-label">Monto total Recupero</div>
                        <div style="margin: 0.5rem 0;">
                            <div style="font-size: 0.875rem; color: #64748b;">INICIO: ₡${data.controlDiario.recuperoInicio.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                            <div style="font-size: 0.875rem; color: #64748b;">FINAL: ₡${data.controlDiario.recuperoFinal.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                            <div style="font-size: 1.25rem; font-weight: 700; color: #10b981; margin-top: 0.5rem;">
                                DIFERENCIA: ₡${data.controlDiario.recuperoDiferencia.toLocaleString('es-ES', {minimumFractionDigits: 2})}
                            </div>
                            <span class="badge badge-success" style="margin-top: 0.5rem; display: inline-block;">aumento</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Monto Promesas hoy</div>
                        <div class="metric-value">₡${data.controlDiario.promesasHoy.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">CANTIDAD DE PP</div>
                        <div class="metric-value">${data.controlDiario.cantidadPP}</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 class="font-semibold mb-3" style="color: #0f172a;">RECUPERACION SEMANAL</h3>
                        <div class="overflow-x-auto">
                            <table class="data-table">
                                <thead>
                                    <tr style="background: #1e40af; color: white;">
                                        <th>DIA</th>
                                        <th>MONTO</th>
                                        <th>CANTIDAD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.controlDiario.recuperacionSemanal.map(item => `
                                        <tr>
                                            <td>${item.dia}</td>
                                            <td style="font-family: 'JetBrains Mono', monospace;">${item.monto ? '₡' + item.monto.toLocaleString('es-ES', {minimumFractionDigits: 2}) : '-'}</td>
                                            <td>${item.cantidad || '-'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-3" style="color: #0f172a;">PROMESAS</h3>
                        <div class="overflow-x-auto">
                            <table class="data-table">
                                <thead>
                                    <tr style="background: #1e40af; color: white;">
                                        <th>DIA</th>
                                        <th>MONTO</th>
                                        <th>CANTIDAD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.controlDiario.promesas.map(item => `
                                        <tr>
                                            <td>${item.dia}</td>
                                            <td style="font-family: 'JetBrains Mono', monospace;">${item.monto ? '₡' + item.monto.toLocaleString('es-ES', {minimumFractionDigits: 2}) : '-'}</td>
                                            <td>${item.cantidad || '-'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateEstrategiaData() {
    return {
        reporteEstrategia: [
            { metrica: 'Mensajes Enviados', cantidad: 31738, efectividad: 100.00 },
            { metrica: 'Seguridad de Recepción', cantidad: 29961, efectividad: 94.40 },
            { metrica: 'Reacciones Detectadas', cantidad: 26, efectividad: 0.08 },
            { metrica: 'Promesas Generadas', cantidad: 301332, efectividad: 0.00 },
            { metrica: 'Cantidad PP Generadas', cantidad: 6, efectividad: 0.00 }
        ],
        segmentacion: {
            totalCantidad: 29776,
            montoRiesgo: 7389905291.37,
            detalle: [
                { perfil: 'Femenino', cantidad: 29776, monto: 7389905291.37 },
                { perfil: '10 a 19', cantidad: 2, monto: 1112574.66 },
                { perfil: '20 a 29', cantidad: 6856, monto: 1617987112.51 },
                { perfil: '30 a 39', cantidad: 10001, monto: 2286236040.01 },
                { perfil: '40 a 49', cantidad: 7592, monto: 1913154668.60 },
                { perfil: '50 a 59', cantidad: 3104, monto: 854203565.10 },
                { perfil: '60 a 69', cantidad: 1072, monto: 426828517.30 },
                { perfil: '70 a 79', cantidad: 925, monto: 229601315.52 },
                { perfil: '80 a 89', cantidad: 209, monto: 57781094.82 },
                { perfil: 'Mayor a 90', cantidad: 15, monto: 3000402.85 }
            ]
        },
        controlDiario: {
            recuperoInicio: 6306730.00,
            recuperoFinal: 8142876.00,
            recuperoDiferencia: 1836146.00,
            promesasHoy: 10000.00,
            cantidadPP: 1,
            recuperacionSemanal: [
                { dia: '16/01/2026', monto: null, cantidad: null },
                { dia: '15/01/2026', monto: 1836146.00, cantidad: null },
                { dia: '14/01/2026', monto: 440201.00, cantidad: null },
                { dia: '13/01/2026', monto: 750160.00, cantidad: null },
                { dia: '12/01/2026', monto: null, cantidad: null },
                { dia: '11/01/2026', monto: null, cantidad: null },
                { dia: '10/01/2026', monto: null, cantidad: null },
                { dia: '09/01/2026', monto: null, cantidad: null },
                { dia: '06/01/2026', monto: null, cantidad: null },
                { dia: '05/01/2026', monto: null, cantidad: null }
            ],
            promesas: [
                { dia: '16/01/2026', monto: null, cantidad: null },
                { dia: '15/01/2026', monto: 150000.00, cantidad: null },
                { dia: '14/01/2026', monto: 301332.00, cantidad: null },
                { dia: '13/01/2026', monto: 569919.29, cantidad: null },
                { dia: '12/01/2026', monto: null, cantidad: null },
                { dia: '11/01/2026', monto: null, cantidad: null },
                { dia: '10/01/2026', monto: null, cantidad: null },
                { dia: '07/01/2026', monto: null, cantidad: null },
                { dia: '06/01/2026', monto: null, cantidad: null },
                { dia: '05/01/2026', monto: null, cantidad: null }
            ]
        }
    };
}

// Variables para almacenar intervalos de actualización
let unicomerIntervals = {};

// Función principal de inicialización
window.initDashboardUnicomer = function() {
    const dashboardId = window.currentDashboard;
    
    // Limpiar intervalos anteriores
    Object.values(unicomerIntervals).forEach(interval => {
        if (interval) clearInterval(interval);
    });
    unicomerIntervals = {};
    
    if (dashboardId === 'unicomer-promesado-pagado') {
        initUnicomerPromesadoPagado();
        // Iniciar actualizaciones en tiempo real cada 4 segundos
        unicomerIntervals.promesadoPagado = setInterval(() => {
            if (window.currentDashboard === 'unicomer-promesado-pagado') {
                updateUnicomerPromesadoPagado();
            }
        }, 4000);
    } else if (dashboardId === 'unicomer-rendimiento-agentes') {
        initUnicomerRendimientoAgentes();
    } else if (dashboardId === 'unicomer-gestiones') {
        initUnicomerGestiones();
    } else if (dashboardId === 'unicomer-alcance-meta') {
        initUnicomerAlcanceMeta();
    } else if (dashboardId === 'unicomer-estrategia') {
        initUnicomerEstrategia();
    }
};

// Función para actualizar Promesado y Pagado Hoy en tiempo real
function updateUnicomerPromesadoPagado() {
    const data = generatePromesadoPagadoData();
    
    // Actualizar totales con animación
    const promesadoTotalEl = document.querySelector('#unicomerPromesadoPagadoContent .section:first-child .section-title span');
    if (promesadoTotalEl && window.animateValue) {
        const currentValue = parseFloat(promesadoTotalEl.textContent.replace(/[₡\s,]/g, '')) || 0;
        const newValue = data.promesadoTotal;
        window.animateValue(promesadoTotalEl, currentValue, newValue, 500, (val) => {
            return 'Total: ₡' + val.toLocaleString('es-ES', {minimumFractionDigits: 2});
        });
    } else if (promesadoTotalEl) {
        promesadoTotalEl.textContent = 'Total: ₡' + data.promesadoTotal.toLocaleString('es-ES', {minimumFractionDigits: 2});
    }
    
    const pagadoTotalEl = document.querySelector('#unicomerPromesadoPagadoContent .section:last-child .section-title span');
    if (pagadoTotalEl && window.animateValue) {
        const currentValue = parseFloat(pagadoTotalEl.textContent.replace(/[₡\s,]/g, '')) || 0;
        const newValue = data.pagadoTotal;
        window.animateValue(pagadoTotalEl, currentValue, newValue, 500, (val) => {
            return 'Total: ₡' + val.toLocaleString('es-ES', {minimumFractionDigits: 2});
        });
    } else if (pagadoTotalEl) {
        pagadoTotalEl.textContent = 'Total: ₡' + data.pagadoTotal.toLocaleString('es-ES', {minimumFractionDigits: 2});
    }
    
    // Actualizar valores de agentes en las tablas
    const promesadoRows = document.querySelectorAll('#unicomerPromesadoPagadoContent .section:first-child tbody tr');
    data.promesadoAgentes.forEach((agente, index) => {
        if (promesadoRows[index]) {
            const montoCell = promesadoRows[index].querySelector('td:nth-child(2)');
            if (montoCell) {
                const currentText = montoCell.textContent.trim();
                const currentValue = currentText === '-' ? 0 : parseFloat(currentText.replace(/[₡\s,]/g, '')) || 0;
                if (window.animateValue) {
                    window.animateValue(montoCell, currentValue, agente.monto, 500, (val) => {
                        return agente.monto > 0 ? '₡' + val.toLocaleString('es-ES', {minimumFractionDigits: 2}) : '-';
                    });
                } else {
                    montoCell.textContent = agente.monto > 0 ? '₡' + agente.monto.toLocaleString('es-ES', {minimumFractionDigits: 2}) : '-';
                }
            }
            
            // Actualizar badge de tendencia
            const badgeCell = promesadoRows[index].querySelector('td:nth-child(3)');
            if (badgeCell) {
                const badgeClass = agente.tendencia === 'up' ? 'badge-success' : agente.tendencia === 'down' ? 'badge-danger' : 'badge-warning';
                const arrowIcon = agente.tendencia === 'up' ? 'up' : agente.tendencia === 'down' ? 'down' : 'right';
                badgeCell.innerHTML = `<span class="badge ${badgeClass}"><i class="fas fa-arrow-${arrowIcon}"></i></span>`;
            }
        }
    });
    
    const pagadoRows = document.querySelectorAll('#unicomerPromesadoPagadoContent .section:last-child tbody tr');
    data.pagadoAgentes.forEach((agente, index) => {
        if (pagadoRows[index]) {
            const montoCell = pagadoRows[index].querySelector('td:nth-child(2)');
            if (montoCell) {
                const currentValue = parseFloat(montoCell.textContent.replace(/[₡\s,]/g, '')) || 0;
                if (window.animateValue) {
                    window.animateValue(montoCell, currentValue, agente.monto, 500, (val) => {
                        return '₡' + val.toLocaleString('es-ES', {minimumFractionDigits: 2});
                    });
                } else {
                    montoCell.textContent = '₡' + agente.monto.toLocaleString('es-ES', {minimumFractionDigits: 2});
                }
            }
            
            // Actualizar badge de tendencia
            const badgeCell = pagadoRows[index].querySelector('td:nth-child(3)');
            if (badgeCell) {
                const badgeClass = agente.tendencia === 'up' ? 'badge-success' : agente.tendencia === 'down' ? 'badge-danger' : 'badge-warning';
                const arrowIcon = agente.tendencia === 'up' ? 'up' : agente.tendencia === 'down' ? 'down' : 'right';
                badgeCell.innerHTML = `<span class="badge ${badgeClass}"><i class="fas fa-arrow-${arrowIcon}"></i></span>`;
            }
        }
    });
}

// Usar la función global animateValue si está disponible

// Modificar generatePromesadoPagadoData para generar variaciones
function generatePromesadoPagadoData() {
    // Generar variaciones basadas en valores anteriores o nuevos aleatorios
    const basePromesado = 580500;
    const basePagado = 1390515;
    
    return {
        promesadoTotal: basePromesado + (Math.random() - 0.5) * 50000,
        pagadoTotal: basePagado + (Math.random() - 0.5) * 100000,
        promesadoAgentes: [
            { nombre: 'SAUL', monto: 305000 + (Math.random() - 0.5) * 20000, tendencia: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'neutral' },
            { nombre: 'CORELLA', monto: Math.random() > 0.7 ? (Math.random() * 50000) : 0, tendencia: 'neutral' },
            { nombre: 'ALEXA', monto: 215500 + (Math.random() - 0.5) * 15000, tendencia: Math.random() > 0.4 ? 'up' : 'neutral' },
            { nombre: 'KARLA', monto: 60000 + (Math.random() - 0.5) * 20000, tendencia: Math.random() > 0.5 ? 'down' : 'neutral' }
        ],
        pagadoAgentes: [
            { nombre: 'SAUL', monto: 337000 + (Math.random() - 0.5) * 30000, tendencia: 'neutral' },
            { nombre: 'CORELLA', monto: 145000 + (Math.random() - 0.5) * 20000, tendencia: Math.random() > 0.6 ? 'down' : 'neutral' },
            { nombre: 'ALEXA', monto: 300500 + (Math.random() - 0.5) * 25000, tendencia: 'neutral' },
            { nombre: 'KARLA', monto: 608015 + (Math.random() - 0.5) * 40000, tendencia: Math.random() > 0.3 ? 'up' : 'neutral' }
        ]
    };
}
