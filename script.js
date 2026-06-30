// =============================================
// SCRIPT.JS - AGRINHO 2026
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // ======================
    // ANIMAÇÃO DOS NÚMEROS
    // ======================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    // ======================
    // CALCULADORA DE IMPACTO
    // ======================
    window.calcularImpacto = function() {
        const hectares = parseFloat(document.getElementById('hectares').value) || 0;
        const resultado = document.getElementById('resultado');
        
        if (hectares <= 0) {
            resultado.innerHTML = `<p class="text-amber-300">Digite um número válido de hectares.</p>`;
            return;
        }

        const emissao = (hectares * 2.8).toFixed(1);
        resultado.innerHTML = `
            <p class="text-emerald-200">Em <span class="text-4xl font-bold">${hectares}</span> hectares você emite aproximadamente:</p>
            <p class="text-6xl font-black text-white mt-4">${emissao} ton CO₂/ano</p>
            <p class="mt-6 text-emerald-100">Com práticas sustentáveis podemos reduzir até 40%!</p>
        `;
    };

    // ======================
    // QUIZ
    // ======================
    const questions = [
        { 
            q: "Qual gás é mais emitido pela pecuária?", 
            options: ["Metano", "CO₂", "Óxido Nitroso"], 
            a: "Metano" 
        },
        { 
            q: "O que significa ILPF?", 
            options: ["Integração Lavoura-Pecuária-Floresta", "Irrigação Local", "Inteligência Artificial"], 
            a: "Integração Lavoura-Pecuária-Floresta" 
        },
        { 
            q: "Qual tecnologia ajuda a economizar água?", 
            options: ["Drones", "Irrigação Inteligente", "Tratores"], 
            a: "Irrigação Inteligente" 
        }
    ];

    let current = 0;

    function loadQuiz() {
        const quizContainer = document.getElementById('quiz');
        let html = `<p class="text-2xl mb-8">${questions[current].q}</p>`;
        
        questions[current].options.forEach((opt, index) => {
            html += `
                <button onclick="answerQuiz(${index})" 
                        class="block w-full p-5 mb-4 text-left border border-white/30 hover:border-white rounded-2xl transition">
                    ${opt}
                </button>`;
        });
        quizContainer.innerHTML = html;
    }

    window.answerQuiz = function(selectedIndex) {
        const correct = questions[current].a;
        const selected = questions[current].options[selectedIndex];
        const quizContainer = document.getElementById('quiz');

        if (selected === correct) {
            quizContainer.innerHTML = `<p class="text-4xl font-bold text-emerald-300">✅ Excelente! Você acertou!</p>`;
        } else {
            quizContainer.innerHTML = `<p class="text-4xl font-bold text-red-300">A resposta certa era: <strong>${correct}</strong></p>`;
        }

        setTimeout(() => {
            current = (current + 1) % questions.length;
            loadQuiz();
        }, 2500);
    };

    // ======================
    // INICIALIZAÇÃO
    // ======================
    loadQuiz();
    window.calcularImpacto(); // Calcula com valor inicial

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({ 
                behavior: "smooth" 
            });
        });
    });
});
