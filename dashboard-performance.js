// Dashboard Performance de Agentes
let performanceCharts = {};

function initDashboardPerformance() {
    const container = document.getElementById('performanceContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="metric-label">Productividad Promedio</div>
                <div class="metric-value" id="productividadPromedio">0</div>
                <span class="badge badge-success" id="productividadBadge">Óptima</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669); color: white;">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="metric-label">Agentes Activos</div>
                <div class="metric-value" id="agentesActivos">0</div>
                <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;">Total: <span id="totalAgentes">0</span> agentes</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="metric-label">Ocupación Promedio</div>
                <div class="metric-value" id="ocupacionPromedio">0%</div>
                <span class="badge badge-warning" id="ocupacionBadge">Buena</span>
            </div>
            
            <div class="metric-card">
                <div class="metric-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="metric-label">Adherencia Promedio</div>
                <div class="metric-value" id="adherenciaPromedio">0%</div>
                <span class="badge badge-success" id="adherenciaBadge">Excelente</span>
            </div>
        </div>
        
        <div class="chart-container mb-6">
            <div class="chart-title">
                <i class="fas fa-chart-bar" style="color: #3b82f6;"></i>
                Performance por Agente (Top 10)
            </div>
            <div class="chart-canvas-container">
                <canvas id="performanceAgentesChart"></canvas>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-line" style="color: #10b981;"></i>
                    Productividad Diaria
                </div>
                <div class="chart-canvas-container">
                    <canvas id="performanceProductividadChart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-title">
                    <i class="fas fa-chart-area" style="color: #f59e0b;"></i>
                    Ocupación vs Adherencia
                </div>
                <div class="chart-canvas-container">
                    <canvas id="performanceOcupacionChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">
                <i class="fas fa-table" style="color: #3b82f6;"></i>
                Ranking de Agentes - Performance
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Agente</th>
                            <th>Llamadas</th>
                            <th>AHT</th>
                            <th>FCR</th>
                            <th>Ocupación</th>
                            <th>Adherencia</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody id="performanceTableBody">
                        <!-- Se llena dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    updatePerformanceMetrics();
    updatePerformanceTable();
    initPerformanceCharts();
}

function updatePerformanceMetrics() {
    const data = generatePerformanceData();
    
    document.getElementById('productividadPromedio').textContent = data.productividadPromedio;
    document.getElementById('agentesActivos').textContent = data.agentesActivos;
    document.getElementById('totalAgentes').textContent = data.totalAgentes;
    document.getElementById('ocupacionPromedio').textContent = data.ocupacionPromedio.toFixed(1) + '%';
    document.getElementById('adherenciaPromedio').textContent = data.adherenciaPromedio.toFixed(1) + '%';
}

function generatePerformanceData() {
    return {
        productividadPromedio: Math.floor(Math.random() * 20 + 130),
        agentesActivos: Math.floor(Math.random() * 5 + 48),
        totalAgentes: 52,
        ocupacionPromedio: Math.random() * 10 + 82,
        adherenciaPromedio: Math.random() * 8 + 88
    };
}

function updatePerformanceTable() {
    const tableBody = document.getElementById('performanceTableBody');
    const agentes = [
        { nombre: 'María González', llamadas: 145, aht: 4.2, fcr: 92, ocupacion: 88, adherencia: 95, score: 98 },
        { nombre: 'Carlos Ruiz', llamadas: 138, aht: 4.5, fcr: 88, ocupacion: 85, adherencia: 92, score: 95 },
        { nombre: 'Ana Martínez', llamadas: 132, aht: 4.8, fcr: 90, ocupacion: 87, adherencia: 94, score: 94 },
        { nombre: 'Luis Fernández', llamadas: 128, aht: 4.3, fcr: 87, ocupacion: 86, adherencia: 91, score: 92 },
        { nombre: 'Sofia López', llamadas: 125, aht: 4.6, fcr: 89, ocupacion: 84, adherencia: 93, score: 91 },
        { nombre: 'Pedro Sánchez', llamadas: 120, aht: 5.0, fcr: 85, ocupacion: 83, adherencia: 90, score: 89 },
        { nombre: 'Laura Torres', llamadas: 118, aht: 4.7, fcr: 86, ocupacion: 82, adherencia: 91, score: 88 },
        { nombre: 'Juan Pérez', llamadas: 115, aht: 5.2, fcr: 84, ocupacion: 81, adherencia: 89, score: 86 },
        { nombre: 'Carmen Díaz', llamadas: 112, aht: 4.9, fcr: 83, ocupacion: 80, adherencia: 88, score: 85 },
        { nombre: 'Miguel Vega', llamadas: 110, aht: 5.1, fcr: 82, ocupacion: 79, adherencia: 87, score: 83 }
    ];
    
    tableBody.innerHTML = agentes.map((agente, index) => `
        <tr>
            <td style="font-weight: 700; color: #3b82f6;">${index + 1}</td>
            <td class="font-semibold">${agente.nombre}</td>
            <td style="font-family: 'JetBrains Mono', monospace;">${agente.llamadas}</td>
            <td style="font-family: 'JetBrains Mono', monospace;">${agente.aht.toFixed(1)} min</td>
            <td style="font-family: 'JetBrains Mono', monospace;">${agente.fcr}%</td>
            <td style="font-family: 'JetBrains Mono', monospace;">${agente.ocupacion}%</td>
            <td style="font-family: 'JetBrains Mono', monospace;">${agente.adherencia}%</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${agente.score >= 95 ? '#10b981' : agente.score >= 90 ? '#f59e0b' : '#ef4444'};">${agente.score}</td>
        </tr>
    `).join('');
}

function initPerformanceCharts() {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    // Chart: Agentes
    const agentesCtx = document.getElementById('performanceAgentesChart');
    if (agentesCtx && !performanceCharts.agentes) {
        performanceCharts.agentes = new Chart(agentesCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['María G.', 'Carlos R.', 'Ana M.', 'Luis F.', 'Sofia L.', 'Pedro S.', 'Laura T.', 'Juan P.', 'Carmen D.', 'Miguel V.'],
                datasets: [{
                    label: 'Llamadas',
                    data: [145, 138, 132, 128, 125, 120, 118, 115, 112, 110],
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
    
    // Chart: Productividad
    const productividadCtx = document.getElementById('performanceProductividadChart');
    if (productividadCtx && !performanceCharts.productividad) {
        performanceCharts.productividad = new Chart(productividadCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Productividad',
                    data: days.map(() => Math.random() * 30 + 120),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Chart: Ocupación
    const ocupacionCtx = document.getElementById('performanceOcupacionChart');
    if (ocupacionCtx && !performanceCharts.ocupacion) {
        performanceCharts.ocupacion = new Chart(ocupacionCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Ocupación',
                    data: days.map(() => Math.random() * 10 + 80),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Adherencia',
                    data: days.map(() => Math.random() * 8 + 88),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
                    y: { min: 70, max: 100, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

setInterval(() => {
    if (currentDashboard === 'performance') {
        updatePerformanceMetrics();
    }
}, 30000);
