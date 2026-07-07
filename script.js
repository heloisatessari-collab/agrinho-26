/* =============================================
   STYLE.CSS - AGRINHO 2026 (Versão Premium)
   ============================================= */

:root {
    --primaria: #065F46;
    --secundaria: #10B981;
    --destaque: #34D399;
    --dark: #022C22;
}

/* Configurações Gerais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    overflow-x: hidden;
}

/* Navbar */
nav {
    background-color: var(--dark);
    color: white;
    position: fixed;
    width: 100%;
    z-index: 50;
    transition: all 0.4s ease;
}

nav.scrolled {
    background-color: rgba(2, 44, 34, 0.97);
    backdrop-filter: blur(12px);
}

/* Links da Navbar */
.nav-link {
    position: relative;
    transition: color 0.3s;
}

.nav-link:after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -6px;
    left: 0;
    background: linear-gradient(to right, var(--secundaria), var(--destaque));
    transition: width 0.4s ease;
}

.nav-link:hover:after {
    width: 100%;
}

/* Hero Section */
.hero-bg {
    background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.75)), 
                      url('https://images.unsplash.com/photo-1625246333195-78d9c38ad2d6?w=2000');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    color: white;
    position: relative;
}

/* Títulos */
h1, h2 {
    font-family: 'Playfair Display', sans-serif;
    font-weight: 700;
    line-height: 1.1;
}

h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 4rem;
    color: var(--primaria);
}

/* Cards */
.card-hover {
    transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
    border: 1px solid #f3f4f6;
}

.card-hover:hover {
    transform: translateY(-18px);
    box-shadow: 0 30px 60px -15px rgb(16 185 129 / 0.25);
    border-color: var(--secundaria);
}

/* Imagens */
img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 1.5rem;
    transition: transform 0.6s ease;
}

img:hover {
    transform: scale(1.05);
}

/* Calculadora e Quiz */
input[type="number"] {
    background-color: rgba(255,255,255,0.08);
    color: white;
    border: 2px solid rgba(255,255,255,0.25);
    border-radius: 1.25rem;
    padding: 1.75rem 1rem;
    font-size: 2.8rem;
    text-align: center;
    width: 100%;
    transition: all 0.3s;
}

input[type="number"]:focus {
    outline: none;
    border-color: var(--destaque);
    box-shadow: 0 0 0 5px rgba(52, 211, 153, 0.2);
}

/* Botões */
button {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;
}

button:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 25px -5px rgb(16 185 129 / 0.3);
}

/* Quiz */
#quiz button {
    background-color: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,255,255,0.2);
    color: white;
    transition: all 0.3s;
}

#quiz button:hover {
    background-color: rgba(255,255,255,0.2);
    border-color: var(--destaque);
    transform: translateX(8px);
}

/* Seções */
section {
    padding: 7rem 0;
    scroll-margin-top: 90px;
}

/* Footer */
footer {
    background-color: var(--dark);
    color: #a1a1aa;
}

/* Responsividade */
@media (max-width: 768px) {
    h2 {
        font-size: 2.4rem;
    }
    
    .hero-bg h1 {
        font-size: 2.8rem;
    }
    
    section {
        padding: 5rem 0;
    }
}

/* Efeito suave no scroll */
html {
    scroll-behavior: smooth;
}
