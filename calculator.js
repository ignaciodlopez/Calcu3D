// Calculadora de Costos de Impresión 3D
// Basado en las fórmulas del Excel

// Función principal de cálculo
function calcularCostos() {
    // Obtener valores de entrada - Variables Iniciales
    const consumoImpresora = parseFloat(document.getElementById('consumoImpresora').value) || 0;
    const valorKgFilamento = parseFloat(document.getElementById('valorKgFilamento').value) || 0;
    const valorKwh = parseFloat(document.getElementById('valorKwh').value) || 0;
    const amortizacion = parseFloat(document.getElementById('amortizacion').value) || 0;
    const otrasVariables = parseFloat(document.getElementById('otrasVariables').value) || 0;
    const utilidad = parseFloat(document.getElementById('utilidad').value) || 0;
    
    // Obtener valores de entrada - Variables del Modelo
    const pesoImpresion = parseFloat(document.getElementById('pesoImpresion').value) || 0;
    const tiempoImpresion = parseFloat(document.getElementById('tiempoImpresion').value) || 0;
    
    // Cálculos intermedios
    // Costo del filamento: (peso en gramos / 1000) * precio por kg
    const costoFilamento = (pesoImpresion / 1000) * valorKgFilamento;
    
    // Costo de energía: (consumo en kw * tiempo en horas * precio kwh)
    const tiempoHoras = tiempoImpresion / 60;
    const costoEnergia = consumoImpresora * tiempoHoras * valorKwh;
    
    // Fórmulas según el Excel:
    
    // 1. Costo sin amortización/mantención
    const costoSinAmortizacion = costoFilamento + costoEnergia;
    
    // 2. Costo con amortización/mantención
    const costoConAmortizacion = costoSinAmortizacion * (1 + (amortizacion / 100));
    
    // 3. Costo con otras variables
    const costoConOtrasVariables = costoConAmortizacion * (1 + (otrasVariables / 100));
    
    // 4. Valor con utilidad
    const valorConUtilidad = costoConOtrasVariables * (1 + (utilidad / 100));
    
    // Mostrar resultados con formato de moneda
    document.getElementById('costoSinAmortizacion').textContent = formatearMoneda(costoSinAmortizacion);
    document.getElementById('costoConAmortizacion').textContent = formatearMoneda(costoConAmortizacion);
    document.getElementById('costoConOtrasVariables').textContent = formatearMoneda(costoConOtrasVariables);
    document.getElementById('valorConUtilidad').textContent = formatearMoneda(valorConUtilidad);
}

// Función para formatear números como moneda
function formatearMoneda(valor) {
    return '$' + valor.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Event listeners para todos los inputs
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    
    // Agregar event listener a cada input
    inputs.forEach(input => {
        input.addEventListener('input', calcularCostos);
        input.addEventListener('change', calcularCostos);
    });
    
    // Calcular valores iniciales al cargar la página
    calcularCostos();
    
    // Modo oscuro
    inicializarModoOscuro();
});

// Funciones para modo oscuro
function inicializarModoOscuro() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Verificar si hay preferencia guardada
    const darkModePreference = localStorage.getItem('darkMode');
    
    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    // Toggle al hacer click
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}
