// Dashboard Productividad
let productividadCharts = {};

function initDashboardProductividad() {
    const container = document.getElementById('productividadContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="metric-label">Llamadas por Hora</div>
                <div class="metric-value" id="llamadasHora">0</div>
                <span class="badge badge-success" id="llamadasHoraBadge">Óptimo</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-check-double"></i>
                </div>
                <div class="metric-label">Tareas Completadas</div>
                <div class="metric-value" id="tareasCompletadas">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Tasa: <span id="tasaCompletadas" class="font-semibold">0%</span></div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="metric-label">Tiempo Productivo</div>
                <div class="metric-value" id="tiempoProductivo">0%</div>
                <span class="badge badge-warning" id="tiempoProductivoBadge">Bueno</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="metric-label">Eficiencia General</div>
                <div class="metric-value" id="eficienciaGeneral">0%</div>
                <span class="badge badge-success" id="eficienciaGeneralBadge">Alta</span>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #3b82f6;"></i>
                    Productividad por Hora del Día
                </div>
                <div class="chart-canvas-container">
                    <canvas id="productividadHoraChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #10b981;"></i>
                    Tendencias de Productividad
                </div>
                <div class="chart-canvas-container">
                    <canvas id="productividadTendenciasChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-title">
                <i class="fas fa-chart-pie" style="color: #f59e0b;"></i>
                Distribución del Tiempo
            </div>
            <div class="chart-canvas-container">
                <canvas id="productividadTiempoChart"></canvas>
            </div>
        </div>
    `;
    
    updateProductividadMetrics();
    initProductividadCharts();
}

function updateProductividadMetrics() {
    const data = generateProductividadData();
    
    document.getElementById('llamadasHora').textContent = data.llamadasHora;
    document.getElementById('tareasCompletadas').textContent = data.tareasCompletadas;
    document.getElementById('tasaCompletadas').textContent = data.tasaCompletadas.toFixed(1) + '%';
    document.getElementById('tiempoProductivo').textContent = data.tiempoProductivo.toFixed(1) + '%';
    document.getElementById('eficienciaGeneral').textContent = data.eficienciaGeneral.toFixed(1) + '%';
}

function generateProductividadData() {
    return {
        llamadasHora: Math.floor(Math.random() * 20 + 120),
        tareasCompletadas: Math.floor(Math.random() * 100 + 450),
        tasaCompletadas: Math.random() * 10 + 85,
        tiempoProductivo: Math.random() * 10 + 82,
        eficienciaGeneral: Math.random() * 10 + 87
    };
}

function initProductividadCharts() {
    const hours = [];
    for (let i = 7; i <= 20; i++) {
        hours.push(i + ':00');
    }
    
    // Chart: Por Hora
    const horaCtx = document.getElementById('productividadHoraChart');
    if (horaCtx && !productividadCharts.hora) {
        productividadCharts.hora = new Chart(horaCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Llamadas',
                    data: hours.map(() => Math.random() * 30 + 110),
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
    
    // Chart: Tendencias
    const tendenciasCtx = document.getElementById('productividadTendenciasChart');
    if (tendenciasCtx && !productividadCharts.tendencias) {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        productividadCharts.tendencias = new Chart(tendenciasCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Llamadas',
                    data: days.map(() => Math.random() * 40 + 120),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Tareas',
                    data: days.map(() => Math.random() * 80 + 420),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
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
    
    // Chart: Tiempo
    const tiempoCtx = document.getElementById('productividadTiempoChart');
    if (tiempoCtx && !productividadCharts.tiempo) {
        productividadCharts.tiempo = new Chart(tiempoCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['En Llamada', 'Disponible', 'Break', 'Reuniones', 'Otros'],
                datasets: [{
                    data: [65, 20, 8, 5, 2],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444']
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

setInterval(() => {
    if (currentDashboard === 'productividad') {
        updateProductividadMetrics();
    }
}, 30000);
