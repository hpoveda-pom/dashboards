// Dashboard Calidad
let calidadCharts = {};

function initDashboardCalidad() {
    const container = document.getElementById('calidadContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-star"></i>
                </div>
                <div class="metric-label">Score de Calidad Promedio</div>
                <div class="metric-value" id="scoreCalidad">0</div>
                <span class="badge badge-success" id="scoreCalidadBadge">Excelente</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="metric-label">Cumplimiento de Proceso</div>
                <div class="metric-value" id="cumplimientoProceso">0%</div>
                <span class="badge badge-success" id="cumplimientoProcesoBadge">Alto</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="metric-label">Evaluaciones Completadas</div>
                <div class="metric-value" id="evaluacionesCompletadas">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Meta: <span id="metaEvaluaciones" class="font-semibold">500</span></div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-thumbs-up"></i>
                </div>
                <div class="metric-label">Satisfacción del Cliente</div>
                <div class="metric-value" id="satisfaccionCliente">0%</div>
                <span class="badge badge-success" id="satisfaccionClienteBadge">Alta</span>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #10b981;"></i>
                    Score de Calidad por Día
                </div>
                <div class="chart-canvas-container">
                    <canvas id="calidadScoreChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-bar" style="color: #3b82f6;"></i>
                    Distribución de Scores
                </div>
                <div class="chart-canvas-container">
                    <canvas id="calidadDistribucionChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-title">
                <i class="fas fa-chart-pie" style="color: #f59e0b;"></i>
                Áreas de Mejora Identificadas
            </div>
            <div class="chart-canvas-container">
                <canvas id="calidadMejorasChart"></canvas>
            </div>
        </div>
    `;
    
    updateCalidadMetrics();
    initCalidadCharts();
}

function updateCalidadMetrics() {
    const data = generateCalidadData();
    
    document.getElementById('scoreCalidad').textContent = data.scoreCalidad;
    document.getElementById('cumplimientoProceso').textContent = data.cumplimientoProceso.toFixed(1) + '%';
    document.getElementById('evaluacionesCompletadas').textContent = data.evaluacionesCompletadas;
    document.getElementById('satisfaccionCliente').textContent = data.satisfaccionCliente.toFixed(1) + '%';
}

function generateCalidadData() {
    return {
        scoreCalidad: Math.floor(Math.random() * 10 + 90),
        cumplimientoProceso: Math.random() * 10 + 88,
        evaluacionesCompletadas: Math.floor(Math.random() * 100 + 450),
        satisfaccionCliente: Math.random() * 10 + 87
    };
}

function initCalidadCharts() {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    // Chart: Score
    const scoreCtx = document.getElementById('calidadScoreChart');
    if (scoreCtx && !calidadCharts.score) {
        calidadCharts.score = new Chart(scoreCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Score de Calidad',
                    data: days.map(() => Math.random() * 10 + 88),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Meta',
                    data: Array(7).fill(90),
                    borderColor: '#ef4444',
                    borderDash: [5, 5],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: { min: 80, max: 100, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Distribución
    const distribucionCtx = document.getElementById('calidadDistribucionChart');
    if (distribucionCtx && !calidadCharts.distribucion) {
        calidadCharts.distribucion = new Chart(distribucionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['90-100', '80-89', '70-79', '60-69', '<60'],
                datasets: [{
                    label: 'Agentes',
                    data: [35, 12, 3, 1, 1],
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
    
    // Chart: Mejoras
    const mejorasCtx = document.getElementById('calidadMejorasChart');
    if (mejorasCtx && !calidadCharts.mejoras) {
        calidadCharts.mejoras = new Chart(mejorasCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Comunicación', 'Proceso', 'Conocimiento', 'Cumplimiento', 'Otros'],
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

setInterval(() => {
    if (currentDashboard === 'calidad') {
        updateCalidadMetrics();
    }
}, 30000);
