// Sistema de Navegación
var currentDashboard = 'principal'; // Global

// Definir showDashboard INMEDIATAMENTE para que esté disponible
(function() {
    'use strict';
    
    // Hacer showDashboard global - Versión simplificada y robusta
    window.showDashboard = function(dashboardId) {
    try {
        console.log('=== NAVEGACIÓN ===');
        console.log('Dashboard ID:', dashboardId);
        
        // Ocultar todos los dashboards
        const allDashboards = document.querySelectorAll('.dashboard');
        console.log('Dashboards encontrados:', allDashboards.length);
        allDashboards.forEach(dash => {
            dash.classList.add('dashboard-hidden');
        });
        
        // Remover active de todos los menús
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Mostrar dashboard seleccionado
        const dashboardIdSelector = `dashboard-${dashboardId}`;
        const dashboard = document.getElementById(dashboardIdSelector);
        console.log('Buscando:', dashboardIdSelector, 'Encontrado:', !!dashboard);
        
        if (dashboard) {
            dashboard.classList.remove('dashboard-hidden');
            currentDashboard = dashboardId;
            console.log('✓ Dashboard mostrado:', dashboardId);
        } else {
            console.error('✗ Dashboard NO encontrado:', dashboardIdSelector);
            // Intentar buscar alternativas
            const allIds = Array.from(document.querySelectorAll('[id^="dashboard-"]')).map(el => el.id);
            console.log('IDs disponibles:', allIds);
            return false;
        }
        
        // Activar menú correspondiente
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item) => {
            const dataDashboard = item.getAttribute('data-dashboard');
            if (dataDashboard === dashboardId) {
                item.classList.add('active');
                console.log('✓ Menú activado');
            }
        });
        
        // Actualizar título de página
        const pageTitle = document.getElementById('pageTitle');
        const titleInfo = dashboardTitles[dashboardId];
        if (titleInfo && pageTitle) {
            pageTitle.innerHTML = `
                <i class="fas ${titleInfo.icon}" style="color: #3b82f6;"></i>
                <span>${titleInfo.title}</span>
            `;
        }
        
        // Inicializar dashboard específico
        const dashboardInitFunctions = {
            principal: 'initDashboardPrincipal',
            cobranzas: 'initDashboardCobranzas',
            performance: 'initDashboardPerformance',
            productividad: 'initDashboardProductividad',
            calidad: 'initDashboardCalidad',
            financiero: 'initDashboardFinanciero',
            'observabilidad-operativa': 'initObservabilidadOperativa',
            'observabilidad-comportamiento': 'initObservabilidadComportamiento',
            'observabilidad-ia': 'initObservabilidadIA',
            'observabilidad-legal': 'initObservabilidadLegal'
        };
        
        const funcName = dashboardInitFunctions[dashboardId];
        if (funcName && typeof window[funcName] === 'function') {
            console.log('Inicializando función:', funcName);
            window[funcName]();
        } else {
            console.warn('Función no encontrada:', funcName, 'Disponible:', typeof window[funcName]);
        }
        
        return true;
    } catch (error) {
        console.error('Error en showDashboard:', error);
        return false;
    }
    };
    
    // Verificar que se definió correctamente
    console.log('showDashboard definido:', typeof window.showDashboard);
})();

const dashboardTitles = {
    principal: {
        title: 'Dashboard Principal',
        icon: 'fa-chart-line'
    },
    cobranzas: {
        title: 'Dashboard de Cobranzas',
        icon: 'fa-dollar-sign'
    },
    performance: {
        title: 'Performance de Agentes',
        icon: 'fa-users'
    },
    productividad: {
        title: 'Productividad',
        icon: 'fa-tasks'
    },
    calidad: {
        title: 'Calidad',
        icon: 'fa-star'
    },
    financiero: {
        title: 'Dashboard Financiero',
        icon: 'fa-chart-pie'
    },
    'observabilidad-operativa': {
        title: 'Observabilidad Operativa',
        icon: 'fa-tachometer-alt'
    },
    'observabilidad-comportamiento': {
        title: 'Observabilidad - Comportamiento del Cliente',
        icon: 'fa-brain'
    },
    'observabilidad-ia': {
        title: 'Observabilidad - Modelos de IA',
        icon: 'fa-robot'
    },
    'observabilidad-legal': {
        title: 'Observabilidad - Legal y Cumplimiento',
        icon: 'fa-gavel'
    }
};


// Actualizar hora
function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES');
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = timeString;
    }
}

// Configurar event listeners para los menús - Versión simplificada
function setupMenuListeners() {
    console.log('=== CONFIGURANDO MENÚ ===');
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('Items encontrados:', menuItems.length);
    
    menuItems.forEach((item, index) => {
        const dashboardId = item.getAttribute('data-dashboard');
        console.log(`Item ${index}:`, dashboardId, item.textContent.trim());
        
        if (dashboardId) {
            // Limpiar cualquier listener anterior
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            newItem.style.cursor = 'pointer';
            newItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ CLICK DETECTADO en:', dashboardId);
                if (typeof window.showDashboard === 'function') {
                    window.showDashboard(dashboardId);
                } else {
                    alert('Error: showDashboard no está disponible. Revisa la consola.');
                    console.error('showDashboard no está disponible');
                }
            });
            console.log('✓ Listener configurado para:', dashboardId);
        } else {
            console.warn('✗ No tiene data-dashboard:', item.textContent.trim());
        }
    });
    
    console.log('=== FIN CONFIGURACIÓN MENÚ ===');
}

// Inicializar - Versión robusta
function initNavigation() {
    console.log('=== INICIALIZANDO NAVEGACIÓN ===');
    console.log('showDashboard disponible:', typeof window.showDashboard);
    console.log('Menu items encontrados:', document.querySelectorAll('.menu-item').length);
    
    updateLastUpdate();
    setInterval(updateLastUpdate, 1000);
    
    // Configurar listeners de menú
    setupMenuListeners();
    
    // Mostrar dashboard principal por defecto - solo si no se ha mostrado ya
    setTimeout(() => {
        const principalDash = document.getElementById('dashboard-principal');
        if (principalDash && principalDash.classList.contains('dashboard-hidden')) {
            if (typeof window.showDashboard === 'function') {
                console.log('Mostrando dashboard principal desde navigation.js...');
                window.showDashboard('principal');
            } else {
                console.error('✗ showDashboard NO está disponible');
            }
        } else {
            console.log('Dashboard principal ya está visible o no existe');
        }
    }, 800);
}

// Múltiples formas de inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded - Inicializando...');
        initNavigation();
    });
} else {
    console.log('DOM ya listo - Inicializando inmediatamente...');
    initNavigation();
}

// Fallback cuando todo esté cargado
window.addEventListener('load', () => {
    console.log('=== WINDOW LOADED ===');
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('Menu items:', menuItems.length);
    console.log('showDashboard:', typeof window.showDashboard);
    
    // Re-configurar si es necesario
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            const dashboardId = item.getAttribute('data-dashboard');
            if (dashboardId && !item.hasAttribute('data-listener-added')) {
                item.setAttribute('data-listener-added', 'true');
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Click desde window.load:', dashboardId);
                    if (typeof window.showDashboard === 'function') {
                        window.showDashboard(dashboardId);
                    }
                });
            }
        });
    }
});
