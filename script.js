// =============================================
// SCRIPT.JS - AGRINHO 2026
// Interatividade e funcionalidades dinâmicas
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // ANIMAÇÃO DOS NÚMEROS (Counters)
    // ======================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Para valores com decimal (ex: 24.5)
                if (end % 1 !== 0) {
                    element.textContent = end;
                }
            }
        };
        window.requestAnimationFrame(step);
    }

    function startCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const startValue = 0;
            
            // Animação suave
            animateValue(counter, startValue, target, 2200);
        });
    }

    // ======================
    // CALCULADORA DE IMPACTO
    // ======================
    window.calcularImpacto = function() {
        const hectaresInput = document.getElementById('hectares');
        const resultadoDiv = document.getElementById('resultado');
        
        if (!hectaresInput || !resultadoDiv) return;
        
        const hectares = parseFloat(hectaresInput.value) || 0;
        
        if (hectares <= 0) {
            resultadoDiv.innerHTML = `
                <p class="text-amber-300 text-xl">Por favor, insira um número válido de hectares.</p>
            `;
            return;
        }
        
        // Cálculo aproximado de emissão de CO₂
