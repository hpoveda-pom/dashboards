// Sistema de Análisis y Recomendaciones de IA
let currentAIMetric = null;

// Función para mostrar análisis de IA
window.showAIAnalysis = function(metricId, metricName) {
    console.log('Mostrando análisis IA de:', metricId, metricName);
    
    const modal = document.getElementById('aiModal');
    if (!modal) {
        console.error('Modal de IA no encontrado');
        return;
    }
    
    currentAIMetric = { metricId, metricName };
    modal.classList.add('show');
    
    // Cargar contenido de análisis IA
    loadAIAnalysis(metricId, metricName);
};

// Función para cerrar modal de IA
window.closeAIModal = function() {
    const modal = document.getElementById('aiModal');
    if (modal) {
        modal.classList.remove('show');
    }
    currentAIMetric = null;
};

// Cargar análisis de IA
function loadAIAnalysis(metricId, metricName) {
    const content = document.getElementById('aiModalContent');
    if (!content) return;
    
    // Mostrar loading
    content.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">✨</div>
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #8b5cf6;"></i>
            <p style="margin-top: 1rem; color: #64748b;">Analizando con IA...</p>
        </div>
    `;
    
    // Simular análisis de IA
    setTimeout(() => {
        const analysisContent = generateAIAnalysis(metricId, metricName);
        content.innerHTML = analysisContent;
    }, 800);
}

// Generar análisis de IA según métrica
function generateAIAnalysis(metricId, metricName) {
    const analyses = {
        'sla': generateSLAAnalysis(),
        'aht': generateAHTAnalysis(),
        'fcr': generateFCRAnalysis(),
        'nps': generateNPSAnalysis(),
        'abandon': generateAbandonAnalysis(),
        'wait': generateWaitAnalysis(),
        'agents': generateAgentsAnalysis(),
        'calls': generateCallsAnalysis(),
        'recaudacion': generateRecaudacionAnalysis(),
        'tasa-recuperacion': generateTasaRecuperacionAnalysis(),
        'anomalias': generateAnomaliasAnalysis(),
        'cuellos-botella': generateCuellosBotellaAnalysis(),
        'intencion-pago': generateIntencionPagoAnalysis(),
        'drift-datos': generateDriftDatosAnalysis(),
        'incumplimientos': generateIncumplimientosAnalysis()
    };
    
    return analyses[metricId] || generateGenericAnalysis(metricId, metricName);
}

// Análisis de SLA
function generateSLAAnalysis() {
    const currentSLA = Math.random() * 10 + 85;
    const trend = currentSLA > 85 ? 'positiva' : 'negativa';
    
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Service Level (SLA)
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> El SLA está en <strong style="color: #8b5cf6;">${currentSLA.toFixed(1)}%</strong>, 
                    ${currentSLA >= 85 ? 'cumpliendo el objetivo operativo' : 'por debajo del objetivo del 85%'}. 
                    Análisis de los últimos 7 días muestra que entre las <strong>14:00-16:00</strong> el SLA cae a <strong>72-78%</strong> 
                    debido a pico de llamadas de clientes que no pagaron en fecha de vencimiento.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Root cause identificado:</strong> Hay 12 agentes en turno matutino (8:00-14:00) con tiempo ocioso del 23%, 
                    mientras que en el turno vespertino (14:00-20:00) hay 8 agentes con cola promedio de 15 llamadas esperando. 
                    El 68% de las llamadas abandonadas ocurren entre 14:30-15:30, justo cuando los clientes salen de trabajo y llaman.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Reasignar Agentes de Alta Efectividad al Pico Vespertino</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes María González, Carlos Ramírez y Ana Martínez tienen tasa de recuperación del 34%, 
                    28% y 31% respectivamente, pero están en turno matutino donde el volumen es bajo. 
                    <strong>Acción:</strong> Moverlos al turno 14:00-20:00 donde hay mayor concentración de deudores activos. 
                    <strong>Impacto esperado:</strong> Aumentar SLA del 76% al 84% en horario pico y recuperar ₡45,000 adicionales semanales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Implementar Priorización por Monto de Deuda en Cola</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Actualmente las llamadas se distribuyen por orden de llegada. 
                    Análisis muestra que el 42% de las llamadas abandonadas tienen deuda > ₡5,000. 
                    <strong>Acción:</strong> Configurar ACD para que priorice automáticamente llamadas con deuda > ₡3,000. 
                    <strong>Impacto esperado:</strong> Reducir abandono de cuentas grandes del 42% al 18%, 
                    recuperando ₡120,000 mensuales que actualmente se pierden por abandono.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Activar Callback Automático para Clientes con Historial de Pago</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> 156 clientes que abandonaron llamada en últimos 30 días tienen historial de pago del 78% 
                    cuando se contactan. Estos clientes esperan en promedio 8 minutos antes de abandonar. 
                    <strong>Acción:</strong> Ofrecer callback automático a clientes con score de pago > 70% que esperan > 5 minutos. 
                    <strong>Impacto esperado:</strong> Recuperar 78 de esos 156 clientes (50%), generando ₡89,000 adicionales mensuales.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Reasignar 3 Agentes Top al Turno Vespertino
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Quién:</strong> María González (ID: 1247), Carlos Ramírez (ID: 1189), Ana Martínez (ID: 1321). 
                    <strong>Cuándo:</strong> A partir de mañana, cambiar horario de 8:00-14:00 a 14:00-20:00. 
                    <strong>Por qué:</strong> Tienen tasa de recuperación 2.3x superior al promedio y el pico vespertino tiene 
                    mayor concentración de deudores con capacidad de pago. <strong>ROI esperado:</strong> ₡12,500 semanales adicionales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar hoy</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Configurar Priorización por Monto en ACD
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Modificar reglas de routing en sistema ACD para que llamadas con deuda > ₡3,000 
                    salten al frente de la cola. <strong>Configuración:</strong> Contactar a IT para ajustar parámetros de priorización. 
                    <strong>Impacto:</strong> Reducir abandono de cuentas grandes y aumentar recuperación en ₡30,000 mensuales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    PRÓXIMOS 15 DÍAS - Implementar Callback Inteligente
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Integrar sistema de callback que analice historial de pago del cliente y ofrezca 
                    callback automático si score > 70% y tiempo de espera > 5 min. <strong>Requisito:</strong> Coordinar con 
                    proveedor de telefonía y CRM. <strong>ROI:</strong> ₡89,000 mensuales adicionales en recuperación.
                </p>
                <span class="action-priority priority-medium">Media Prioridad - Próximos 15 días</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> 2,847 llamadas analizadas | <strong>Período:</strong> Últimos 7 días | 
            <strong>Confianza del modelo:</strong> 89% | <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

// Análisis de AHT
function generateAHTAnalysis() {
    const currentAHT = Math.random() * 2 + 4.5;
    
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - AHT Promedio
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> El AHT está en <strong style="color: #8b5cf6;">${currentAHT.toFixed(1)} minutos</strong>. 
                    Análisis de 1,234 llamadas muestra que el <strong>34% de las llamadas</strong> exceden los 6 minutos, 
                    principalmente porque los agentes pasan <strong>2.1 minutos en promedio</strong> consultando sistemas 
                    (CRM, historial de pagos, estados de cuenta) mientras el cliente espera en línea.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Root cause identificado:</strong> Los agentes con AHT > 6 min tienen en común que: 
                    (1) No tienen acceso rápido a información de pagos previos del cliente, 
                    (2) Preguntan datos que ya están en el sistema, 
                    (3) No usan scripts de negociación eficientes. 
                    El <strong>67% del tiempo en hold</strong> es por consultas a sistemas externos que deberían estar integrados.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Dashboard Unificado de Cliente en Pantalla del Agente</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes abren 4-5 ventanas diferentes (CRM, sistema de pagos, historial, 
                    calculadora de planes) y tardan 1.8 min en encontrar información. <strong>Acción:</strong> Crear dashboard 
                    único que muestre: monto adeudado, últimos 3 pagos, capacidad de pago estimada (según IA), y opciones de 
                    planes de pago pre-calculados. <strong>Impacto:</strong> Reducir tiempo de consulta de 1.8 min a 0.3 min, 
                    bajando AHT de ${currentAHT.toFixed(1)} min a ${(currentAHT - 1.5).toFixed(1)} min. 
                    Esto permite atender <strong>18% más llamadas diarias</strong>, aumentando recuperación en ₡67,000 mensuales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Scripts Dinámicos Basados en Perfil de Cliente</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes usan el mismo script para todos los clientes, perdiendo tiempo en 
                    preguntas innecesarias. Cliente con historial de pago del 89% no necesita validación de identidad extensa. 
                    <strong>Acción:</strong> Sistema IA que detecta perfil del cliente (buen pagador, negociador, evasivo) y 
                    muestra script personalizado. Para buen pagador: ir directo a negociación. Para evasivo: validar identidad 
                    y aplicar presión controlada. <strong>Impacto:</strong> Reducir tiempo de habla de ${(currentAHT * 0.75).toFixed(1)} min 
                    a ${(currentAHT * 0.75 * 0.85).toFixed(1)} min, aumentando productividad del 15% y recuperación en ₡45,000 mensuales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Automatizar Documentación Post-Call con IA</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes gastan ${(currentAHT * 0.10).toFixed(1)} min documentando la llamada 
                    manualmente después de cada contacto. <strong>Acción:</strong> Sistema de transcripción automática que genera 
                    resumen de la llamada, compromisos de pago, y actualiza CRM automáticamente. Agente solo valida y confirma. 
                    <strong>Impacto:</strong> Reducir post-call de ${(currentAHT * 0.10).toFixed(1)} min a ${(currentAHT * 0.10 * 0.3).toFixed(1)} min, 
                    liberando <strong>12 minutos por hora</strong> por agente para más llamadas. Esto representa ₡38,000 mensuales 
                    adicionales en recuperación.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Capacitar a 8 Agentes con AHT > 6 min en Uso de Dashboard
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Quiénes:</strong> Agentes identificados: Luis Pérez (AHT: 7.2 min), Carmen Díaz (AHT: 6.8 min), 
                    Roberto Silva (AHT: 7.5 min), y 5 más. <strong>Qué:</strong> Sesión de 2 horas mostrando cómo usar el 
                    dashboard unificado para reducir consultas. <strong>Meta:</strong> Bajar AHT de estos 8 agentes a < 5.5 min 
                    en 7 días. <strong>ROI:</strong> ₡15,000 mensuales adicionales en recuperación.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    PRÓXIMOS 10 DÍAS - Implementar Dashboard Unificado
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Coordinar con IT para integrar sistemas y crear vista única del cliente. 
                    <strong>Requisitos:</strong> Mostrar deuda actual, últimos pagos, score de pago IA, y planes sugeridos. 
                    <strong>Impacto:</strong> Reducir AHT general en 1.5 min, aumentando capacidad de atención en 18% 
                    y recuperación en ₡67,000 mensuales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Próximos 10 días</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> 1,234 llamadas analizadas | <strong>Agentes evaluados:</strong> 24 | 
            <strong>Confianza del modelo:</strong> 91% | <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

// Análisis de FCR
function generateFCRAnalysis() {
    const fcr = Math.random() * 15 + 75;
    
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - FCR (Primera Resolución)
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> El FCR está en <strong style="color: #8b5cf6;">${fcr.toFixed(1)}%</strong>. 
                    Análisis de <strong>892 llamadas</strong> que requirieron seguimiento muestra que el <strong>67%</strong> 
                    no se resolvieron en primera llamada porque: (1) <strong>34%</strong> - El agente no tenía autorización 
                    para ofrecer descuentos/planes, (2) <strong>28%</strong> - El cliente pidió "pensarlo" y el agente no cerró, 
                    (3) <strong>23%</strong> - Faltó información del cliente (documentos, estados de cuenta) que no se solicitó 
                    en primera llamada, (4) <strong>15%</strong> - Problemas técnicos (sistema caído, no se procesó pago).
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Root cause identificado:</strong> Los agentes promedio no tienen autorización para aprobar planes 
                    de pago > $2,000 o descuentos > 10%, entonces dicen "tengo que consultar con supervisor" y el cliente 
                    se va. Los top performers (María, Carlos, Ana) tienen autorización extendida y cierran el 89% en primera 
                    llamada. Cada llamada que requiere seguimiento cuesta $12 adicionales en tiempo de agente y reduce 
                    probabilidad de pago del 67% (primera llamada) al 34% (seguimiento).
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Ampliar Autorización de Agentes para Cerrar en Primera Llamada</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El 34% de las llamadas que no se resuelven es porque el agente no puede aprobar 
                    planes > ₡2,000. <strong>Acción:</strong> Dar autorización a agentes con experiencia > 6 meses para aprobar 
                    planes hasta ₡5,000 y descuentos hasta 15% sin consultar supervisor. Para agentes nuevos, mantener límite 
                    actual pero con proceso de escalamiento rápido (supervisor disponible en < 2 min). <strong>Impacto:</strong> 
                    Aumentar FCR del ${fcr.toFixed(1)}% al ${(fcr + 12).toFixed(1)}%, reduciendo costos de seguimiento en ₡8,500 
                    mensuales y aumentando recuperación en ₡67,000 mensuales (por cerrar más en primera llamada).
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Técnica de Cierre: "Cerrar Hoy o Perder Oportunidad"</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El 28% de clientes piden "pensarlo" y solo el 34% vuelve a pagar. 
                    <strong>Acción:</strong> Capacitar agentes en técnica: "Entiendo que quiere pensarlo. Sin embargo, este plan 
                    de ₡500 x 4 meses solo está disponible hoy. Si llama mañana, el plan puede cambiar. ¿Prefiere asegurar este 
                    plan ahora o arriesgarse a que cambie?" <strong>Impacto:</strong> Reducir tasa de "pensarlo" del 28% al 12%, 
                    aumentando cierres inmediatos y recuperación en ₡45,000 mensuales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Solicitar Toda la Información en Primera Llamada</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El 23% requiere seguimiento porque faltó información (estado de cuenta, comprobante 
                    de pago, etc.) que no se solicitó inicialmente. <strong>Acción:</strong> Checklist obligatorio en pantalla del 
                    agente: antes de terminar llamada, verificar que tiene: monto adeudado confirmado, plan de pago acordado, 
                    método de pago, y documentación necesaria. <strong>Impacto:</strong> Reducir seguimientos por información faltante 
                    del 23% al 8%, ahorrando ₡4,200 mensuales en tiempo de agente.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Ampliar Autorización a 12 Agentes con Experiencia
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Quiénes:</strong> Agentes con > 6 meses de experiencia y tasa de recuperación > 30%. 
                    <strong>Qué:</strong> Autorizar aprobar planes hasta ₡5,000 y descuentos hasta 15%. 
                    <strong>ROI:</strong> Aumentar FCR en 12% y recuperación en ₡67,000 mensuales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Capacitación en Técnica de Cierre Inmediato
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Sesión de 2 horas para todos los agentes sobre cómo cerrar en primera llamada, 
                    incluyendo scripts para manejar objeciones de "pensarlo". <strong>Instructor:</strong> María González. 
                    <strong>ROI:</strong> ₡45,000 mensuales adicionales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar hoy</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> 892 llamadas con seguimiento analizadas | <strong>Agentes evaluados:</strong> 24 | 
            <strong>Confianza del modelo:</strong> 88% | <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

// Análisis genéricos para otras métricas
function generateNPSAnalysis() {
    return generateGenericAnalysis('nps', 'NPS');
}

function generateAbandonAnalysis() {
    return generateGenericAnalysis('abandon', 'Tasa de Abandono');
}

function generateWaitAnalysis() {
    return generateGenericAnalysis('wait', 'Tiempo de Espera');
}

function generateAgentsAnalysis() {
    return generateGenericAnalysis('agents', 'Agentes Activos');
}

function generateCallsAnalysis() {
    return generateGenericAnalysis('calls', 'Llamadas por Hora');
}

function generateRecaudacionAnalysis() {
    const recaudacionHoy = (Math.random() * 50000 + 150000).toFixed(0);
    const recaudacionPromedio = 180000;
    const diferencia = recaudacionHoy - recaudacionPromedio;
    
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Recaudación del Día
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> La recaudación de hoy es <strong style="color: #8b5cf6;">₡${parseFloat(recaudacionHoy).toLocaleString('es-ES')}</strong>, 
                    ${diferencia > 0 ? `₡${Math.abs(diferencia).toLocaleString('es-ES')} por encima` : `₡${Math.abs(diferencia).toLocaleString('es-ES')} por debajo`} 
                    del promedio diario de ₡${recaudacionPromedio.toLocaleString('es-ES')}. 
                    Análisis de las <strong>347 transacciones</strong> de hoy muestra que el <strong>top 5 agentes</strong> 
                    (María González, Carlos Ramírez, Ana Martínez, Luis Pérez, Carmen Díaz) concentran el <strong>42% de la recaudación</strong> 
                    pero solo representan el 21% del equipo.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Root cause identificado:</strong> Los top performers tienen en común: 
                    (1) Enfocan llamadas en clientes con deuda ₡3,000-₡15,000 (zona de mayor probabilidad de pago), 
                    (2) Ofrecen planes de pago de 3-6 cuotas (no 1 pago único), 
                    (3) Llaman en horarios específicos según perfil del cliente (ej: ejecutivos entre 9-11am, 
                    empleados entre 6-8pm). Los agentes promedio no aplican estas estrategias.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Replicar Estrategia de Segmentación por Monto de Deuda</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los top 5 agentes priorizan clientes con deuda ₡3,000-₡15,000 porque tienen 
                    tasa de recuperación del 67% vs 34% en otros rangos. Los demás agentes llaman sin priorización. 
                    <strong>Acción:</strong> Configurar sistema para que asigne automáticamente clientes en rango ₡3,000-₡15,000 
                    a agentes con experiencia > 6 meses. Para agentes nuevos, asignar deudas < ₡3,000 para práctica. 
                    <strong>Impacto:</strong> Aumentar tasa de recuperación general del 34% al 52%, incrementando recaudación 
                    diaria en ₡28,000 (15.6% más), equivalente a ₡840,000 mensuales adicionales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Capacitar en Técnica de Planes de Pago Multi-Cuota</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los top performers ofrecen planes de 3-6 cuotas y logran aceptación del 78%, 
                    mientras que agentes promedio ofrecen pago único y solo logran 23% de aceptación. 
                    <strong>Acción:</strong> Sesión de capacitación de 3 horas enseñando cómo estructurar planes de pago: 
                    "¿Puede pagar ₡500 hoy y ₡500 los próximos 3 meses?" vs "¿Puede pagar ₡2,000 hoy?". 
                    <strong>Impacto:</strong> Aumentar tasa de aceptación de planes del 23% al 65%, incrementando recaudación 
                    en ₡45,000 diarios (₡1.35M mensuales adicionales).
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Optimizar Horarios de Llamada según Perfil de Cliente</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Análisis muestra que clientes ejecutivos (segmento A) responden mejor entre 9-11am 
                    (tasa de contacto 67%), mientras que empleados (segmento C) responden entre 6-8pm (tasa 58%). 
                    Actualmente se llama sin considerar perfil. <strong>Acción:</strong> Sistema IA que sugiere mejor horario 
                    de llamada según perfil del cliente y muestra en pantalla del agente. <strong>Impacto:</strong> Aumentar 
                    tasa de contacto del 42% al 58%, incrementando oportunidades de cobro en ₡32,000 diarios (₡960,000 mensuales).
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Reasignar Top 5 Agentes a Segmento de Deuda ₡3,000-₡15,000
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Quiénes:</strong> María González, Carlos Ramírez, Ana Martínez, Luis Pérez, Carmen Díaz. 
                    <strong>Qué:</strong> Cambiar su cola de trabajo para que solo reciban clientes con deuda ₡3,000-₡15,000. 
                    <strong>Por qué:</strong> Tienen tasa de recuperación 2x superior en este segmento. 
                    <strong>ROI esperado:</strong> ₡15,000 diarios adicionales (₡450,000 mensuales).
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar hoy</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Capacitación Masiva en Planes Multi-Cuota
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Sesión de 3 horas para 19 agentes restantes, enseñada por María González (top performer). 
                    <strong>Contenido:</strong> Cómo estructurar planes, qué montos sugerir, cómo manejar objeciones. 
                    <strong>Meta:</strong> Aumentar aceptación de planes del 23% al 55% en 14 días. 
                    <strong>ROI:</strong> ₡1.35M mensuales adicionales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> 347 transacciones de hoy | <strong>Agentes analizados:</strong> 24 | 
            <strong>Período comparativo:</strong> Últimos 30 días | <strong>Confianza del modelo:</strong> 93% | 
            <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

function generateTasaRecuperacionAnalysis() {
    return generateGenericAnalysis('tasa-recuperacion', 'Tasa de Recuperación');
}

function generateAnomaliasAnalysis() {
    const anomalias = Math.floor(Math.random() * 5 + 3);
    
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Anomalías Detectadas
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> Se detectaron <strong style="color: #8b5cf6;">${anomalias} anomalías</strong> 
                    en los últimos 7 días que se desvían significativamente del comportamiento normal: 
                    (1) <strong>Pico inusual de llamadas</strong> el martes 15:30-16:30 (234 llamadas vs promedio de 89), 
                    (2) <strong>Caída abrupta en tasa de recuperación</strong> el jueves (23% vs promedio de 34%), 
                    (3) <strong>Incremento anómalo en abandono</strong> el viernes 14:00-15:00 (47% vs promedio de 18%), 
                    (4) <strong>Agente con comportamiento atípico</strong> - Roberto Silva procesó 12 pagos en 1 hora 
                    (normalmente procesa 4-5 por hora).
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Root cause identificado:</strong> El pico del martes fue por campaña de email masivo que se envió 
                    a las 15:00 anunciando "última oportunidad de pago". La caída del jueves fue porque 3 agentes top (María, 
                    Carlos, Ana) estuvieron en capacitación. El abandono del viernes fue por falla técnica en sistema de pagos 
                    que hizo que clientes esperaran 12+ minutos. El comportamiento de Roberto Silva requiere investigación: 
                    puede ser excelente día o posible fraude (necesita auditoría).
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Coordinar Campañas de Email con Capacidad Operativa</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El email masivo del martes generó 234 llamadas en 1 hora cuando la capacidad es 89. 
                    Esto resultó en cola de 15+ minutos y abandono del 42%. <strong>Acción:</strong> Antes de enviar campaña masiva, 
                    verificar capacidad disponible. Si se envía email a 5,000 clientes, asegurar que hay 12+ agentes disponibles 
                    en las siguientes 2 horas. Alternativamente, escalonar envío: 1,000 emails cada 30 min. 
                    <strong>Impacto:</strong> Reducir abandono de picos del 42% al 18%, recuperando ₡23,000 que se perdieron 
                    por abandono en ese pico.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. No Programar Capacitaciones en Días de Alta Demanda</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El jueves la tasa de recuperación cayó al 23% porque los 3 agentes top (que 
                    representan el 42% de la recuperación) estaban en capacitación. <strong>Acción:</strong> Programar capacitaciones 
                    en días de baja demanda (lunes temprano, viernes tarde) o escalonar: capacitar 2 agentes por vez, no 3. 
                    <strong>Impacto:</strong> Evitar pérdida de ₡34,000 en recuperación que ocurrió el jueves por ausencia de top performers.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Auditoría Inmediata de Comportamiento Atípico de Agente</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Roberto Silva procesó 12 pagos en 1 hora (2.4x su promedio). Esto puede ser: 
                    (a) Excelente día legítimo, (b) Posible fraude (pagos falsos para cumplir meta), (c) Error en sistema. 
                    <strong>Acción:</strong> Auditoría inmediata: revisar grabaciones de esas 12 llamadas, verificar que los pagos 
                    se procesaron correctamente, y validar que los clientes existen. Si es legítimo, replicar su técnica. 
                    Si es fraude, suspender inmediatamente. <strong>Impacto:</strong> Proteger integridad operativa y evitar 
                    pérdidas por fraude potencial de ₡15,000+.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Auditar Comportamiento de Roberto Silva
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Revisar grabaciones y transacciones de las 12 llamadas procesadas en 1 hora. 
                    Validar autenticidad. <strong>Por qué:</strong> Puede ser excelente técnica a replicar o posible fraude. 
                    <strong>Riesgo:</strong> Si es fraude, puede costar ₡15,000+ a la empresa.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar HOY</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Protocolo de Coordinación para Campañas Masivas
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Crear proceso donde marketing/operaciones coordinen antes de enviar emails masivos. 
                    Verificar capacidad disponible y escalonar envío si es necesario.                     <strong>Impacto:</strong> Evitar pérdidas 
                    de ₡23,000 por abandono en picos.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> Detección de anomalías usando distancia estadística (2σ) | <strong>Período:</strong> Últimos 7 días | 
            <strong>Confianza del modelo:</strong> 92% | <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

function generateCuellosBotellaAnalysis() {
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Cuellos de Botella
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> Se identificaron <strong>3 cuellos de botella críticos</strong> que están 
                    limitando la capacidad de recuperación: (1) <strong>Procesamiento de pagos</strong> - Los agentes tardan 
                    <strong>4.2 minutos promedio</strong> en procesar un pago porque el sistema requiere 3 pasos manuales y 
                    validación de supervisor para montos > $1,000, (2) <strong>Consulta de historial de cliente</strong> - Los agentes 
                    abren 4-5 sistemas diferentes y tardan <strong>2.1 minutos</strong> en encontrar información completa, 
                    (3) <strong>Autorización de planes de pago</strong> - El 34% de las llamadas requiere esperar <strong>8-12 minutos</strong> 
                    para que supervisor apruebe plan > $2,000, y el 67% de esos clientes abandona mientras espera.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Impacto operativo:</strong> Estos cuellos de botella resultan en:                     (1) <strong>₡45,000 mensuales perdidos</strong> 
                    porque clientes abandonan mientras esperan autorización, (2) <strong>18% menos llamadas atendidas</strong> por día 
                    debido a tiempo perdido en consultas, (3) <strong>Frustración de agentes</strong> porque pasan más tiempo en procesos 
                    que en hablar con clientes. Si se eliminan estos cuellos, la capacidad operativa aumentaría 23% sin contratar más agentes.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Automatizar Procesamiento de Pagos con Integración Directa</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes procesan pagos manualmente en 3 pasos (ingresar datos, validar, confirmar) 
                    y tardan 4.2 min. Para montos > ₡1,000 necesitan aprobación de supervisor que tarda 8-12 min. 
                    <strong>Acción:</strong> Integrar sistema de pagos directamente con CRM para que el agente solo ingrese monto y 
                    método, y el sistema procese automáticamente. Para montos ₡1,000-₡5,000, dar autorización automática a agentes 
                    con experiencia > 6 meses. <strong>Impacto:</strong> Reducir tiempo de procesamiento de 4.2 min a 0.8 min, 
                    liberando <strong>14 minutos por hora</strong> por agente para más llamadas. Esto aumenta capacidad en 23% 
                    y recuperación en ₡78,000 mensuales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Dashboard Unificado que Elimine Necesidad de Múltiples Sistemas</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes abren CRM, sistema de pagos, historial, y calculadora de planes, 
                    tardando 2.1 min en encontrar información. <strong>Acción:</strong> Crear dashboard único que muestre: deuda actual, 
                    últimos 3 pagos, capacidad de pago estimada (IA), y 3 planes de pago pre-calculados. Todo en una pantalla. 
                    <strong>Impacto:</strong> Reducir tiempo de consulta de 2.1 min a 0.3 min, liberando <strong>9 minutos por hora</strong> 
                    y aumentando recuperación en ₡45,000 mensuales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Autorización Automática de Planes Basada en Score de Cliente</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El 34% de llamadas requiere esperar 8-12 min para aprobación de supervisor, 
                    y el 67% de esos clientes abandona. <strong>Acción:</strong> Sistema IA que aprueba automáticamente planes 
                    hasta ₡5,000 si el cliente tiene: (a) Score de pago > 60%, (b) Al menos 1 pago previo en últimos 12 meses, 
                    (c) Deuda < ₡15,000. Solo escalar a supervisor si no cumple estos criterios. <strong>Impacto:</strong> 
                    Eliminar espera del 67% de casos, reduciendo abandono y recuperando ₡45,000 mensuales que se pierden 
                    por clientes que abandonan mientras esperan.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    PRÓXIMOS 15 DÍAS - Automatizar Procesamiento de Pagos
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Coordinar con IT y proveedor de pagos para integrar sistema directo. 
                    <strong>Requisitos:</strong> Procesamiento automático, autorización hasta ₡5,000 para agentes experimentados. 
                    <strong>ROI:</strong> ₡78,000 mensuales adicionales en recuperación.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Próximos 15 días</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Implementar Autorización Automática por Score
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Configurar sistema para aprobar automáticamente planes hasta ₡5,000 basado en score de cliente. 
                    <strong>Impacto:</strong> Eliminar espera del 67% de casos y recuperar ₡45,000 mensuales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> Análisis de tiempos de proceso en 1,247 llamadas | <strong>Cuellos identificados:</strong> 3 críticos | 
            <strong>Confianza del modelo:</strong> 90% | <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

function generateIntencionPagoAnalysis() {
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Intención de Pago Detectada
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> El modelo de IA analizó <strong>1,847 llamadas</strong> de los últimos 7 días 
                    y detectó <strong>alta intención de pago (>70%)</strong> en el <strong>68% de los clientes contactados</strong>. 
                    Sin embargo, solo el <strong>34% de estos clientes con alta intención</strong> terminan pagando, 
                    lo que indica que los agentes no están capitalizando estas oportunidades.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Root cause identificado:</strong> Análisis de grabaciones muestra que cuando el modelo detecta intención > 80%, 
                    los agentes promedio no ajustan su estrategia: siguen usando el mismo script genérico en lugar de ir directo a 
                    negociación. Los clientes con alta intención que no pagan (66%) abandonan porque: 
                    (1) El agente no ofrece plan de pago inmediatamente, 
                    (2) Pide demasiada documentación, 
                    (3) No cierra la venta en la primera llamada. 
                    Los top performers (María, Carlos, Ana) cierran el 78% de clientes con intención > 80% porque ofrecen plan de pago 
                    en los primeros 2 minutos de la llamada.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Alerta en Tiempo Real para Agentes cuando Intención > 80%</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El modelo IA detecta intención alta en tiempo real durante la llamada, pero los agentes 
                    no lo saben hasta después. <strong>Acción:</strong> Implementar alerta visual en pantalla del agente que aparezca cuando 
                    intención > 80%: "⚠️ ALTA INTENCIÓN DETECTADA - Ofrecer plan de pago ahora". El sistema también debe mostrar automáticamente 
                    3 opciones de planes de pago pre-calculados.                     <strong>Impacto:</strong> Aumentar tasa de cierre de clientes con alta 
                    intención del 34% al 72%, recuperando ₡156,000 mensuales adicionales que actualmente se pierden.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Asignar Agentes Top a Clientes con Intención > 85%</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los clientes con intención > 85% tienen probabilidad de pago del 89% si se manejan bien, 
                    pero solo 34% pagan con agentes promedio. <strong>Acción:</strong> Configurar sistema para que cuando IA detecte 
                    intención > 85% en llamada entrante, la rutee automáticamente a uno de los top 5 agentes (María, Carlos, Ana, Luis, Carmen). 
                    <strong>Impacto:</strong> Aumentar tasa de cierre del 34% al 82% en este segmento crítico, recuperando ₡234,000 mensuales 
                    adicionales. Esto representa el 18% de la recaudación mensual total.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Script Automático para Alta Intención: "Cerrar en Primera Llamada"</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los agentes promedio piden "pensarlo" o "llamar mañana" cuando detectan interés, 
                    perdiendo el 67% de estos clientes. <strong>Acción:</strong> Cuando intención > 80%, el sistema debe mostrar 
                    script específico: "Veo que está interesado. Tengo 3 opciones de pago listas. ¿Cuál le funciona mejor: 
                    ₡500 hoy y 3 cuotas de ₡500, o ₡300 hoy y 6 cuotas de ₡300?" <strong>Impacto:</strong> Reducir tasa de "llamar 
                    después" del 67% al 18%, aumentando cierres inmediatos y recuperación en ₡89,000 mensuales.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Implementar Alerta de Alta Intención en Pantalla
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Coordinar con IT para integrar modelo IA con sistema de agentes y mostrar alerta visual 
                    cuando intención > 80%. <strong>Requisitos:</strong> Alerta debe aparecer en primeros 90 segundos de llamada, 
                    mostrar score de intención, y sugerir 3 planes de pago. <strong>Impacto:</strong> Aumentar cierre de alta intención 
                    del 34% al 72%, recuperando ₡156,000 mensuales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Capacitar en Técnica de Cierre Inmediato
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Sesión de 1.5 horas para todos los agentes, enseñando cómo identificar señales de alta 
                    intención (tono colaborativo, preguntas sobre planes, disponibilidad de pago) y cerrar en primera llamada. 
                    <strong>Instructor:</strong> María González (top performer con 78% de cierre en alta intención). 
                    <strong>ROI:</strong> ₡89,000 mensuales adicionales.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar hoy</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> 1,847 llamadas analizadas | <strong>Modelo IA:</strong> Análisis de voz + texto + historial | 
            <strong>Precisión del modelo:</strong> 87% | <strong>Confianza del análisis:</strong> 91% | 
            <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

function generateDriftDatosAnalysis() {
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Drift de Datos Detectado
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> Se detectó <strong>drift de datos del 2.3%</strong>, lo que significa que el 
                    comportamiento actual de los clientes ha cambiado significativamente respecto a los datos con los que se entrenó 
                    el modelo (hace 4 meses). Análisis comparativo muestra que: 
                    (1) <strong>La tasa de intención de pago real</strong> es 12% menor que la predicha por el modelo, 
                    (2) <strong>Los clientes ahora responden mejor a planes de 6-12 cuotas</strong> (antes preferían 3-6), 
                    (3) <strong>El horario óptimo de contacto cambió</strong> de 10am-2pm a 6pm-8pm.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Impacto operativo:</strong> El modelo está sobre-estimando intención de pago en 12%, lo que hace que los agentes 
                    prioricen clientes incorrectos. Esto resulta en: 
                    (1) <strong>₡45,000 mensuales menos en recuperación</strong> por asignar mal los recursos, 
                    (2) <strong>Agentes frustrados</strong> porque el modelo les dice "alta intención" pero el cliente no paga, 
                    (3) <strong>Pérdida de confianza</strong> en el sistema IA por parte del equipo operativo.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Reentrenar Modelo con Datos Recientes (Últimos 60 Días)</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El modelo fue entrenado hace 4 meses con datos de enero-marzo, pero el comportamiento 
                    del cliente cambió (probablemente por factores económicos, estacionalidad, o cambios en productos). 
                    <strong>Acción:</strong> Reentrenar modelo con datos de últimos 60 días (2,847 llamadas, 1,234 pagos procesados) 
                    para capturar nuevo patrón: preferencia por planes largos, horarios vespertinos, y menor intención general. 
                    <strong>Impacto:</strong> Aumentar precisión del modelo del 73% al 89%, mejorando asignación de recursos y 
                    recuperando los ₡45,000 mensuales perdidos por drift.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Ajustar Manualmente Parámetros Críticos Mientras se Reentrena</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El reentrenamiento toma 5-7 días. Mientras tanto, el modelo sigue dando predicciones 
                    incorrectas. <strong>Acción:</strong> Ajustar manualmente: (1) Reducir umbral de "alta intención" de 80% a 72% 
                    (compensando el -12% de drift),                     (2) Priorizar planes de 6-12 cuotas en lugar de 3-6, (3) Cambiar horario sugerido 
                    a 6pm-8pm. <strong>Impacto:</strong> Mitigar pérdida de ₡45,000 mensuales durante la semana de reentrenamiento, 
                    recuperando aproximadamente ₡10,000 semanales.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Implementar Monitoreo Continuo de Drift (Alertas Automáticas)</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El drift se detectó tarde (2.3% ya acumulado). Si se detecta antes, se puede ajustar 
                    proactivamente. <strong>Acción:</strong> Configurar sistema que monitoree drift semanalmente y alerte cuando > 1.5%. 
                    El sistema debe comparar distribución de: montos de deuda, horarios de contacto, tasas de pago, y preferencias 
                    de planes.                     <strong>Impacto:</strong> Detectar drift temprano y ajustar antes de que impacte operación, evitando 
                    pérdidas futuras de ₡45,000+ mensuales.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Ajustar Parámetros Manuales para Compensar Drift
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Coordinar con equipo de IA para ajustar: umbral de alta intención de 80% a 72%, 
                    priorizar planes 6-12 cuotas, cambiar horario sugerido a 6pm-8pm. <strong>Por qué:</strong> Mitigar impacto 
                    inmediato mientras se reentrena. <strong>ROI:</strong> Recuperar ₡10,000 semanales durante reentrenamiento.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar hoy</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Iniciar Reentrenamiento del Modelo
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Coordinar con equipo de Data Science para reentrenar modelo con datos de últimos 60 días. 
                    <strong>Datos necesarios:</strong> 2,847 llamadas, 1,234 pagos, perfiles de clientes, resultados de planes. 
                    <strong>Duración:</strong> 5-7 días.                     <strong>Impacto:</strong> Restaurar precisión del modelo y recuperar 
                    ₡45,000 mensuales perdidos.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <strong>Análisis basado en:</strong> Comparación de 2,847 llamadas recientes vs 3,124 del período de entrenamiento | 
            <strong>Métrica de drift:</strong> Distancia de Kolmogorov-Smirnov = 2.3% | <strong>Confianza del análisis:</strong> 94% | 
            <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

function generateIncumplimientosAnalysis() {
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - Incumplimientos Legales Detectados
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    <strong>Escenario detectado:</strong> Se detectaron <strong>7 incumplimientos legales</strong> en los últimos 7 días: 
                    (1) <strong>3 llamadas fuera de horario</strong> (después de las 21:00), 
                    (2) <strong>2 casos de lenguaje indebido</strong> (amenazas de embargo, presión excesiva), 
                    (3) <strong>2 casos de acoso</strong> (más de 3 llamadas al mismo cliente en < 2 horas). 
                    Análisis de grabaciones muestra que el <strong>agente Luis Pérez (ID: 1189)</strong> está involucrado en 4 de los 7 casos.
                </p>
                <p style="margin: 0.75rem 0 0 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Riesgo legal:</strong> Si estos incumplimientos continúan, la empresa puede enfrentar: 
                    (1) <strong>Multas de ₡50,000-₡200,000</strong> por violación de normativa de protección al consumidor, 
                    (2) <strong>Demandas colectivas</strong> de clientes afectados, 
                    (3) <strong>Pérdida de licencia</strong> para operar en cobranza. 
                    El costo de un solo caso de demanda puede ser ₡150,000+ en multas y honorarios legales.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA para Cobranza
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">1. Suspender Temporalmente a Agente con Múltiples Incumplimientos</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> El agente Luis Pérez (ID: 1189) tiene 4 incumplimientos en 7 días: 2 llamadas fuera de horario, 
                    1 lenguaje indebido, 1 acoso. Esto representa el 57% de todos los incumplimientos. <strong>Acción:</strong> Suspender 
                    inmediatamente de llamadas salientes y asignar a revisión de calidad y capacitación legal obligatoria de 8 horas. 
                    Solo reactivar después de aprobar examen de cumplimiento. <strong>Impacto:</strong> Reducir incumplimientos del 57% 
                    inmediatamente y evitar riesgo de multas de ₡50,000-₡200,000.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">2. Bloquear Llamadas Automáticamente Después de las 21:00</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Las 3 llamadas fuera de horario ocurrieron porque agentes manualmente marcaron números 
                    después de las 21:00, ignorando la política. <strong>Acción:</strong> Configurar sistema ACD para que bloquee 
                    automáticamente cualquier intento de llamada saliente después de las 21:00 y antes de las 8:00. El sistema debe 
                    mostrar mensaje: "Horario no permitido. Llamada bloqueada por normativa legal." <strong>Impacto:</strong> Eliminar 
                    completamente riesgo de llamadas fuera de horario y evitar multas de ₡25,000 por cada violación.
                </p>
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #92400e;">3. Alerta en Tiempo Real para Lenguaje Prohibido</p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Situación:</strong> Los 2 casos de lenguaje indebido incluyeron frases como "le vamos a embargar" y 
                    "tiene que pagar ya o habrá consecuencias", que están                     prohibidas. <strong>Acción:</strong> Implementar sistema 
                    de detección en tiempo real que analice transcripción de llamada y alerte al supervisor cuando detecte palabras 
                    prohibidas. El supervisor puede intervenir inmediatamente. <strong>Impacto:</strong> Detectar y prevenir lenguaje 
                    indebido antes de que el cliente presente queja, evitando multas de ₡50,000+ y demandas.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-rocket"></i>
                Acciones Operativas Inmediatas
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    HOY - Suspender Agente Luis Pérez y Revisar Todas sus Llamadas
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Suspender inmediatamente de llamadas salientes, revisar sus últimas 50 llamadas para detectar 
                    más incumplimientos, y asignar a capacitación legal obligatoria.                     <strong>Por qué:</strong> Tiene 57% de todos los 
                    incumplimientos. <strong>Riesgo:</strong> Si continúa, puede generar demanda que cueste ₡150,000+ a la empresa.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Ejecutar HOY</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    ESTA SEMANA - Configurar Bloqueo Automático de Horarios
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Coordinar con IT para configurar bloqueo automático en ACD de llamadas fuera de 8:00-21:00. 
                    <strong>Requisitos:</strong> Bloqueo debe ser a nivel de sistema, no solo advertencia. <strong>Impacto:</strong> 
                    Eliminar riesgo de multas de ₡25,000 por cada llamada fuera de horario.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Esta semana</span>
            </div>
            <div class="ai-action-card">
                <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #065f46;">
                    PRÓXIMOS 7 DÍAS - Capacitación Legal Masiva para Todo el Equipo
                </p>
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    <strong>Qué:</strong> Sesión de 4 horas para todos los 24 agentes sobre: lenguaje permitido vs prohibido, 
                    horarios legales, límites de llamadas, y consecuencias legales.                     <strong>Incluir:</strong> Casos reales de multas 
                    y demandas. <strong>Impacto:</strong> Reducir incumplimientos del 100% y evitar riesgo de ₡200,000+ en multas.
                </p>
                <span class="action-priority priority-high">Alta Prioridad - Próximos 7 días</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #fee2e2; border-radius: 8px; font-size: 0.875rem; color: #991b1b; border-left: 4px solid #dc2626;">
            <strong>⚠️ RIESGO LEGAL CRÍTICO:</strong> Si estos incumplimientos continúan, la empresa puede enfrentar multas de ₡50,000-₡200,000 
            y pérdida de licencia. Acción inmediata requerida. | <strong>Última actualización:</strong> ${new Date().toLocaleString('es-ES')}
        </div>
    `;
}

function generateGenericAnalysis(metricId, metricName) {
    return `
        <div class="ai-modal-header">
            <div class="ai-modal-title">
                Análisis IA - ${metricName}
            </div>
            <button class="ai-modal-close" onclick="closeAIModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-brain"></i>
                Análisis de la Situación
            </div>
            <div class="ai-analysis-card">
                <p style="margin: 0; color: #475569; line-height: 1.6;">
                    Análisis de IA para la métrica <strong>${metricName}</strong>. 
                    El sistema está procesando datos en tiempo real para generar insights y recomendaciones.
                </p>
            </div>
        </div>
        
        <div class="ai-section">
            <div class="ai-section-title">
                <i class="fas fa-lightbulb"></i>
                Recomendaciones de IA
            </div>
            <div class="ai-recommendation-card">
                <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
                    Continuar monitoreando esta métrica y ajustar estrategias según las tendencias detectadas.
                </p>
            </div>
        </div>
    `;
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAIModal();
    }
});

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('aiModal');
    if (modal && e.target === modal) {
        closeAIModal();
    }
});
