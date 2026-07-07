// =============================================
// SCRIPT.JS - AGRINHO 2026 (Versão Premium)
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // ======================
    // CALCULADORA DE IMPACTO
    // ======================
    window.calcularImpacto = function() {
        const hectares = parseFloat(document.getElementById('hectares').value) || 0;
        const resultado = document.getElementById('resultado');
        
        if (hectares <= 0) {
            resultado.innerHTML = `
                <p class="text-amber-300 text-center">Por favor, digite um número válido de hectares.</p>
            `;
            return;
        }

        const emissaoCO2 = (hectares * 2.8).toFixed(1);
        const aguaEconomizada = Math.round(hectares * 8500).toLocaleString('pt-BR');

        resultado.innerHTML = `
            <div class="text-center">
                <p class="text-emerald-200 text-lg">Em <span class="font-bold text-white">${hectares}</span> hectares você emite aproximadamente:</p>
                <p class="text-6xl font-black text-white mt-4 mb-2">${emissaoCO2} ton CO₂/ano</p>
                <p class="text-emerald-100">Com práticas sustentáveis você pode:</p>
                <p class="text-3xl font-bold text-emerald-300 mt-6">Economizar até ${aguaEconomizada} litros de água por ano</p>
            </div>
        `;
    };

    // ======================
    // QUIZ INTERATIVO
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

    let currentQuestion = 0;

    function loadQuiz() {
        const quizContainer = document.getElementById('quiz');
        if (!quizContainer) return;

        let html = `<p class="text-2xl mb-8 font-medium">${questions[currentQuestion].q}</p>`;
        
        questions[currentQuestion].options.forEach((option, index) => {
            html += `
                <button onclick="answerQuiz(${index})" 
                        class="block w-full p-5 mb-4 text-left border border-white/30 hover:border-emerald-400 rounded-2xl transition-all">
                    ${option}
                </button>`;
        });

        quizContainer.innerHTML = html;
    }

    window.answerQuiz = function(selectedIndex) {
        const correctAnswer = questions[currentQuestion].a;
        const selectedAnswer = questions[currentQuestion].options[selectedIndex];
        const quizContainer = document.getElementById('quiz');

        if (selectedAnswer === correctAnswer) {
            quizContainer.innerHTML = `
                <p class="text-4xl font-bold text-emerald-300 text-center py-8">
                    ✅ Excelente! Você acertou!
                </p>`;
        } else {
            quizContainer.innerHTML = `
                <p class="text-3xl font-bold text-red-300 text-center py-8">
                    A resposta certa era: <strong>${correctAnswer}</strong>
                </p>`;
        }

        // Carrega próxima pergunta
        setTimeout(() => {
            currentQuestion = (currentQuestion + 1) % questions.length;
            loadQuiz();
        }, 2800);
    };

    // ======================
    // EFEITO NO NAVBAR (scroll)
    // ======================
    function handleNavbarScroll() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // ======================
    // INICIALIZAÇÃO
    // ======================
    loadQuiz();
    window.calcularImpacto(); // Calcula com valor inicial

    // Smooth Scroll para links da navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Evento de scroll para navbar
    window.addEventListener('scroll', handleNavbarScroll);

});
