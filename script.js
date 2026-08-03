// =============================================
// SCRIPT.JS - AGRINHO 2026
// Versão completa e profissional
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ======================================
    // 1. MENU MOBILE
    // ======================================
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
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                menuBtn.setAttribute('aria-expanded', 'true');
            }
        });

        document.querySelectorAll('.nav-link-mobile').forEach(l =>
            l.addEventListener('click', fecharMenuMobile)
        );

        // Fecha o menu com a tecla Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') fecharMenuMobile();
        });
    }

    // ======================================
    // 2. HEADER / BARRA DE PROGRESSO / SCROLLSPY / TOPO
    // ======================================
    const header = document.getElementById('header');
    const progressBar = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav .nav-link');

    function onScroll() {
        const y = window.scrollY;

        // Header transparente/sólido
        if (header) header.classList.toggle('scrolled', y > 80);

        // Barra de progresso de leitura
        if (progressBar) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        }

        // Botão voltar ao topo
        if (backToTop) {
            const show = y > 500;
            backToTop.classList.toggle('opacity-0', !show);
            backToTop.classList.toggle('invisible', !show);
            backToTop.classList.toggle('opacity-100', show);
            backToTop.classList.toggle('visible', show);
        }

        // Scrollspy - destaque do link ativo
        const pos = y + 160;
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                navLinks.forEach(link =>
                    link.classList.toggle('active', link.getAttribute('href') === '#' + sec.id)
                );
            }
        });
    }

    // Scroll otimizado com requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
        );
    }

    // ======================================
    // 3. CONTADORES ANIMADOS (Hero)
    // ======================================
    function animateCounter(el, target, suffix) {
        if (reducedMotion) {
            el.textContent = String(target).replace('.', ',') + suffix;
            return;
        }
        const duration = 2000, steps = 60;
        let current = 0;
        const inc = target / steps, stepTime = duration / steps;
        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const val = target % 1 !== 0 ? current.toFixed(1) : Math.floor(current);
            el.textContent = String(val).replace('.', ',') + suffix;
        }, stepTime);
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target.querySelector('p:first-child');
                animateCounter(el, parseFloat(el.dataset.target), el.dataset.suffix || '');
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(i => counterObserver.observe(i));

    // ======================================
    // 4. REVEAL ON SCROLL + BARRAS DE GRÁFICO
    // ======================================
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.querySelectorAll('.chart-bar').forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
                if (entry.target.classList.contains('chart-bar')) {
                    entry.target.style.width = entry.target.dataset.width;
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ======================================
    // 5. CALCULADORA DE IMPACTO
    // ======================================
    const emissionFactors = {
        soja: 2.8,
        milho: 2.5,
        cafe: 3.2,
        pecuaria: 4.5,
        cana: 2.3
    };

    const practiceReductions = {
        pratica1: 0.15,  // Plantio direto
        pratica2: 0.25,  // Sistema ILPF
        pratica3: 0.10,  // Irrigação inteligente
        pratica4: 0.08   // Energia renovável
    };

    window.calcularImpacto = function () {
        const hectaresInput = document.getElementById('hectares');
        const atividadeSelect = document.getElementById('atividade');
        const resultado = document.getElementById('resultado');
        if (!hectaresInput || !atividadeSelect || !resultado) return;

        const hectares = parseFloat(hectaresInput.value);
        if (isNaN(hectares) || hectares <= 0) {
            resultado.innerHTML = `
                <div class="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                    <p class="text-red-700 font-medium">
                        Digite um número válido de hectares (maior que zero).
                    </p>
                </div>`;
            return;
        }

        const baseline = hectares * emissionFactors[atividadeSelect.value];
        let reduction = 0, practices = 0;

        Object.keys(practiceReductions).forEach(id => {
            const cb = document.getElementById(id);
            if (cb && cb.checked) {
                reduction += practiceReductions[id];
                practices++;
            }
        });
        reduction = Math.min(reduction, 0.5); // teto de 50%

        const reduced = baseline * (1 - reduction);
        const saved = baseline - reduced;
        const trees = Math.round(saved * 7.5);
        const water = Math.round(hectares * 8500 * (practices > 0 ? 1 : 0.3));

        resultado.innerHTML = `
            <div class="space-y-4">
                <div class="bg-leaf/10 p-5 rounded-xl border border-leaf/20">
                    <p class="text-sm text-leaf font-semibold mb-1">Emissão estimada (sem práticas)</p>
                    <p class="text-2xl font-display font-bold text-forest">
                        ${baseline.toFixed(1).replace('.', ',')}
                        <span class="text-base">ton CO₂e/ano</span>
                    </p>
                </div>
                ${practices > 0 ? `
                <div class="bg-fresh/20 p-5 rounded-xl border border-fresh/40">
                    <p class="text-sm text-leaf font-semibold mb-1">
                        <i class="fa-solid fa-leaf" aria-hidden="true"></i>
                        Com ${practices} prática${practices > 1 ? 's' : ''} sustentável${practices > 1 ? 's' : ''}
                    </p>
                    <p class="text-3xl font-display font-bold text-forest">
                        ${reduced.toFixed(1).replace('.', ',')}
                        <span class="text-base">ton CO₂e/ano</span>
                    </p>
                    <div class="mt-3">
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-forest">Redução</span>
                            <span class="font-bold text-leaf">-${(reduction * 100).toFixed(0)}%</span>
                        </div>
                        <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-leaf to-fresh rounded-full"
                                 style="width:${(reduction * 100).toFixed(0)}%"></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-leaf/20 text-center">
                        <div>
                            <p class="text-xl font-bold text-forest">${saved.toFixed(1).replace('.', ',')}</p>
                            <p class="text-xs text-gray-600">ton CO₂e evitadas</p>
                        </div>
                        <div>
                            <p class="text-xl font-bold text-forest">${trees}</p>
                            <p class="text-xs text-gray-600">árvores equivalentes</p>
                        </div>
                    </div>
                </div>` : `
                <div class="bg-harvest/20 p-5 rounded-xl border border-harvest/40">
                    <p class="text-sm text-earth font-semibold">
                        <i class="fa-solid fa-lightbulb" aria-hidden="true"></i>
                        Marque práticas sustentáveis acima e reduza até 50% das emissões!
                    </p>
                </div>`}
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-center gap-3">
                    <i class="fa-solid fa-droplet text-blue-500 text-xl" aria-hidden="true"></i>
                    <div>
                        <p class="text-sm font-semibold text-blue-900">Economia de água</p>
                        <p class="text-lg font-bold text-blue-700">${water.toLocaleString('pt-BR')} litros/ano</p>
                    </div>
                </div>
                <p class="text-xs text-gray-500 italic">
                    * Estimativas educativas baseadas em Embrapa e estudos do setor.
                </p>
            </div>`;
    };

    // ======================================
    // 6. QUIZ INTERATIVO
    // ======================================
    const questions = [
        {
            q: "Qual percentual do PIB brasileiro vem do agronegócio?",
            options: ["15%", "24,5%", "35%", "10%"],
            a: "24,5%",
            ex: "Segundo o Cepea/USP, o agro responde por cerca de 24,5% do PIB brasileiro."
        },
        {
            q: "O que significa ILPF?",
            options: [
                "Integração Lavoura-Pecuária-Floresta",
                "Irrigação Localizada de Precisão Florestal",
                "Índice de Logística e Produção Familiar",
                "Inovação em Lavouras de Pequeno Porte"
            ],
            a: "Integração Lavoura-Pecuária-Floresta",
            ex: "A ILPF combina diferentes atividades na mesma área, aumentando renda e sequestrando carbono."
        },
        {
            q: "Qual gás de efeito estufa é mais associado à pecuária?",
            options: ["Dióxido de carbono (CO₂)", "Metano (CH₄)", "Ozônio (O₃)", "Vapor d'água"],
            a: "Metano (CH₄)",
            ex: "O metano é liberado na digestão dos ruminantes (fermentação entérica)."
        },
        {
            q: "Quanta água a irrigação inteligente pode economizar?",
            options: ["5–15%", "10–20%", "30–50%", "Nenhuma"],
            a: "30–50%",
            ex: "Sensores de umidade e gotejamento reduzem o consumo em 30% a 50%."
        },
        {
            q: "O que é intensificação sustentável?",
            options: [
                "Expandir a lavoura sobre a floresta",
                "Produzir mais na mesma área, sem desmatar",
                "Usar mais fertilizantes químicos",
                "Reduzir a produção agrícola"
            ],
            a: "Produzir mais na mesma área, sem desmatar",
            ex: "É o coração do agro sustentável: mais produtividade por hectare, preservando os biomas."
        }
    ];

    let currentQuestion = 0, score = 0, answered = false;

    function loadQuiz() {
        const quiz = document.getElementById('quiz');
        if (!quiz) return;
        if (currentQuestion >= questions.length) return showFinalScore();

        answered = false;
        const q = questions[currentQuestion];
        const progress = (currentQuestion / questions.length) * 100;

        let html = `
            <div class="mb-6">
                <div class="flex justify-between text-sm mb-2">
                    <span class="text-leaf font-semibold">Pergunta ${currentQuestion + 1} de ${questions.length}</span>
                    <span class="text-gray-600">${score} acerto${score !== 1 ? 's' : ''}</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-leaf to-fresh transition-all duration-500"
                         style="width:${progress}%"></div>
                </div>
            </div>
            <p class="text-xl font-semibold text-forest mb-6">${q.q}</p>
            <div class="space-y-3">`;

        q.options.forEach((opt, i) => {
            html += `
                <button onclick="answerQuiz(${i})" id="option-${i}"
                    class="quiz-option w-full p-5 text-left border-2 border-gray-200 hover:border-leaf rounded-2xl text-gray-700 hover:bg-leaf/5 font-medium">
                    ${opt}
                </button>`;
        });

        html += '</div>';
        quiz.innerHTML = html;
    }

    window.answerQuiz = function (i) {
        if (answered) return;
        answered = true;

        const q = questions[currentQuestion];
        const correct = q.options[i] === q.a;
        if (correct) score++;

        q.options.forEach((opt, idx) => {
            const btn = document.getElementById('option-' + idx);
            btn.disabled = true;
            if (opt === q.a) {
                btn.classList.add('border-leaf', 'bg-leaf/10', 'text-forest');
            } else if (idx === i) {
                btn.classList.add('border-red-400', 'bg-red-50', 'text-red-700');
            }
        });

        const quiz = document.getElementById('quiz');
        const div = document.createElement('div');
        div.className = `mt-6 p-4 rounded-xl ${correct ? 'bg-leaf/10 border border-leaf/20' : 'bg-amber-50 border border-amber-200'}`;
        div.innerHTML = `
            <p class="font-semibold mb-2 ${correct ? 'text-leaf' : 'text-amber-900'}">
                ${correct ? '✅ Resposta correta!' : '❌ Não foi dessa vez.'}
            </p>
            <p class="text-sm text-gray-700">${q.ex}</p>
            <button onclick="nextQuestion()"
                class="mt-4 w-full bg-leaf hover:bg-leaf/90 text-white py-3 rounded-xl font-semibold">
                ${currentQuestion < questions.length - 1 ? 'Próxima pergunta' : 'Ver resultado'}
            </button>`;
        quiz.appendChild(div);
    };

    window.nextQuestion = function () {
        currentQuestion++;
        loadQuiz();
    };

    function showFinalScore() {
        const quiz = document.getElementById('quiz');
        if (!quiz) return;
        const pct = Math.round((score / questions.length) * 100);
        let msg, emoji;

        if (pct >= 80) { msg = 'Excelente! Você domina o agro sustentável!'; emoji = '🌟'; }
        else if (pct >= 60) { msg = 'Muito bom! Você entende do assunto!'; emoji = '👏'; }
        else if (pct >= 40) { msg = 'Bom começo! Continue aprendendo!'; emoji = '💪'; }
        else { msg = 'Continue estudando: o futuro verde precisa de você!'; emoji = '📚'; }

        quiz.innerHTML = `
            <div class="text-center py-8 space-y-6">
                <p class="text-6xl">${emoji}</p>
                <p class="text-5xl font-display font-bold text-forest">${score}/${questions.length}</p>
                <p class="text-xl text-gray-600">${pct}% de acertos</p>
                <p class="text-lg text-gray-700">${msg}</p>
                <button onclick="resetQuiz()"
                    class="bg-leaf hover:bg-leaf/90 text-white px-8 py-4 rounded-2xl font-semibold">
                    <i class="fa-solid fa-rotate-left mr-2" aria-hidden="true"></i>Refazer quiz
                </button>
            </div>`;
    }

    window.resetQuiz = function () {
        currentQuestion = 0;
        score = 0;
        loadQuiz();
    };

    // ======================================
    // 7. FORMULÁRIO DE INSCRIÇÃO
    // ======================================
    const form = document.getElementById('form-inscricao');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!nome) {
                showToast('Preencha seu nome completo.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Insira um e-mail válido.', 'error');
                return;
            }

            showToast('Inscrição realizada com sucesso!', 'success');
            setTimeout(() => {
                form.innerHTML = `
                    <div class="text-center py-12 space-y-4">
                        <p class="text-6xl">🌱</p>
                        <h3 class="text-3xl font-display font-bold">Inscrição confirmada!</h3>
                        <p class="text-emerald-100 text-xl">
                            Obrigado, <strong>${nome}</strong>!<br>
                            Em breve enviaremos novidades para <strong>${email}</strong>.
                        </p>
                    </div>`;
            }, 900);
        });
    }

    // ======================================
    // 8. TOAST NOTIFICATIONS
    // ======================================
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast-notification fixed top-24 right-6 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-white ${
            type === 'success' ? 'bg-leaf' : 'bg-red-500'
        }`;
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl"
                   aria-hidden="true"></i>
                <p class="font-medium">${message}</p>
            </div>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.4s';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ======================================
    // 9. SMOOTH SCROLL
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 96,
                    behavior: reducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    // ======================================
    // 10. INICIALIZAÇÃO
    // ======================================
    onScroll();
    loadQuiz();
    if (document.getElementById('hectares')) {
        window.calcularImpacto();
    }
});
