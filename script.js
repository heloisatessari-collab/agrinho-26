// =============================================
// SCRIPT.JS - AGRINHO 2026 (Versão Final Polida)
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // ======================
    // MENU MOBILE
    // ======================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function fecharMenuMobile() {
        if (!mobileMenu || !menuBtn) return;

        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Abrir menu');
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = !mobileMenu.classList.contains('hidden');

            mobileMenu.classList.toggle('hidden');

            const icon = menuBtn.querySelector('i');
            if (isOpen) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Abrir menu');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                menuBtn.setAttribute('aria-expanded', 'true');
                menuBtn.setAttribute('aria-label', 'Fechar menu');
            }
        });

        // Fecha o menu ao clicar em qualquer link do mobile
        document.querySelectorAll('.nav-link-mobile').forEach(link => {
            link.addEventListener('click', fecharMenuMobile);
        });
    }

    // ======================
    // CALCULADORA DE IMPACTO
    // ======================
    window.calcularImpacto = function () {
        const input = document.getElementById('hectares');
        const resultado = document.getElementById('resultado');

        if (!input || !resultado) return;

        const hectares = parseFloat(input.value);

        if (isNaN(hectares) || hectares <= 0) {
            resultado.innerHTML = `
                <p class="text-amber-300 text-center text-lg">
                    Por favor, digite um número válido de hectares.
                </p>
            `;
            return;
        }

        const emissaoCO2 = (hectares * 2.8).toFixed(1);
        const aguaEconomizada = Math.round(hectares * 8500).toLocaleString('pt-BR');

        resultado.innerHTML = `
            <div class="text-center">
                <p class="text-emerald-200 text-lg">
                    Em <span class="font-bold text-white">${hectares}</span> hectares você emite aproximadamente:
                </p>
                <p class="text-5xl md:text-6xl font-black text-white mt-4 mb-2">
                    ${emissaoCO2} <span class="text-3xl">ton CO₂/ano</span>
                </p>
                <p class="text-emerald-100 mt-6">Com práticas sustentáveis você pode:</p>
                <p class="text-2xl md:text-3xl font-bold text-emerald-300 mt-4">
                    Economizar até ${aguaEconomizada} litros de água por ano
                </p>
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

        const question = questions[currentQuestion];

        let html = `
            <p class="text-sm text-emerald-300 mb-3">Pergunta ${currentQuestion + 1} de ${questions.length}</p>
            <p class="text-2xl mb-8 font-medium">${question.q}</p>
        `;

        question.options.forEach((option, index) => {
            html += `
                <button onclick="answerQuiz(${index})"
                        class="block w-full p-5 mb-4 text-left border border-white/30 hover:border-emerald-400 rounded-2xl transition-all">
                    ${option}
                </button>
            `;
        });

        quizContainer.innerHTML = html;
    }

    window.answerQuiz = function (selectedIndex) {
        const quizContainer = document.getElementById('quiz');
        if (!quizContainer) return;

        const correctAnswer = questions[currentQuestion].a;
        const selectedAnswer = questions[currentQuestion].options[selectedIndex];

        if (selectedAnswer === correctAnswer) {
            quizContainer.innerHTML = `
                <p class="text-4xl font-bold text-emerald-300 text-center py-10">
                    ✅ Excelente! Você acertou!
                </p>
            `;
        } else {
            quizContainer.innerHTML = `
                <p class="text-3xl font-bold text-red-300 text-center py-10">
                    A resposta certa era:<br>
                    <strong class="text-white">${correctAnswer}</strong>
                </p>
            `;
        }

        // Próxima pergunta após 2.5 segundos
        setTimeout(() => {
            currentQuestion = (currentQuestion + 1) % questions.length;
            loadQuiz();
        }, 2500);
    };

    // ======================
    // FORMULÁRIO DE INSCRIÇÃO
    // ======================
    const form = document.getElementById('form-inscricao');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');

            const nome = nomeInput?.value.trim();
            const email = emailInput?.value.trim();

            if (!nome || !email) {
                alert('Por favor, preencha pelo menos o nome e o e-mail.');
                return;
            }

            // Mensagem de sucesso
            form.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-6xl mb-6">🌱</p>
                    <p class="text-3xl font-bold text-white mb-4">Inscrição realizada com sucesso!</p>
                    <p class="text-emerald-100 text-xl leading-relaxed">
                        Obrigado, <strong>${nome}</strong>!<br>
                        Em breve você receberá mais informações no e-mail <strong>${email}</strong>.
                    </p>
                </div>
            `;
        });
    }

    // ======================
    // EFEITO DA NAVBAR NO SCROLL
    // ======================
    function handleNavbarScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // ======================
    // SMOOTH SCROLL
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ======================
    // INICIALIZAÇÃO
    // ======================
    loadQuiz();
    window.calcularImpacto();
    window.addEventListener('scroll', handleNavbarScroll);
});
