// =============================================
// SCRIPT.JS - AGRINHO 2026
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Site Agrinho 2026 carregado com sucesso!");

    // Smooth scroll para os links da navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
