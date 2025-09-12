// Floating Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${Math.random() > 0.5 ? 'green' : 'orange'}`;
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe magic steps
    document.querySelectorAll('.magic-step').forEach(step => {
        step.style.animationPlayState = 'paused';
        observer.observe(step);
    });
}

// Parallax Effect
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    createParticles();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup parallax
    setupParallax();
    
document.getElementById('whatIsSelbook').addEventListener('click', () => {
  const target = document.getElementById('que-es-selbook-cards');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

    



    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'translateY(0) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }, 150);
        });
    });
    
    // Typing effect for hero title (optional)
    // const heroTitle = document.querySelector('.hero-title');
    // typeWriter(heroTitle, 'SELBOOK', 200);
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});



// Add some interactive effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Add mouse movement effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * 5;
    const rotateY = (centerX - x) / centerX * 5;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

// Reset hero transform when mouse leaves
document.querySelector('.hero-section')?.addEventListener('mouseleave', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
});

// Add dynamic particle generation
setInterval(() => {
    if (document.querySelectorAll('.particle').length < 50) {
        const particle = document.createElement('div');
        particle.className = `particle ${Math.random() > 0.5 ? 'green' : 'orange'}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        document.getElementById('particles').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
}, 2000);

// ====== Contenido de las tarjetas "Imagina" ======
const imagineData = {
  card1: {
    title: "Te leo la mente (emociones en tiempo real)",
    image: "assets/img/imagine-cta", // cámbiala por tu imagen real
    description: `
Imagina que puedo leerte la mente, saber lo que sientes en cada instante, las emociones que te provoca cada escena o personaje... 
Cuando tienes miedo, o cuando te gusta un personaje, o cuando ríes, o cuando lloras...

E imagina que, con toda esa información, soy capaz de adaptar la historia en tiempo real, personalizándola a tus emociones y reacciones. Provocandote nuevas emociones. Creando *Tu* Historia.

Imagina que, al terminar, quieres empezar de nuevo y la historia es la misma, pero... no es igual: vives nuevas escenas, sientes emociones diferentes y vives la historia por rutas y tramas nuevas.

**Eso es un Selbook.**
    `
  },
  card2: {
    title: "Elige el protagonista (misma historia, otra vida)",
    image: "assets/img/placeholder-card2.jpg",
    description: `
Imagina que pudieras elegir el protagonista para recorrer la historia. Que en vez de **Frodo** eliges a **Aragorn**, ¡a Gollum! 
Que en vez de **Sherlock Holmes** eliges a **Watson**; en vez de **Clarice Starling**, eliges a **Hannibal Lecter**... 
y recorres y vives esa historia desde la perspectiva de ese personaje.

Es la misma historia, pero vives **distintas escenas**, te encuentras con **tramas paralelas**, hablas con **otros personajes**...

Imagina que, cuando acabas con uno, decides empezar con otro protagonista. Y es la misma historia, pero, amigo mío, insisto: en el fondo, **es Otra Historia**.
    `
  },
  card3: {
    title: "Elige cómo vivirla (audio, vídeo, cómic… y acción)",
    image: "assets/img/placeholder-card3.jpg",
    description: `
Imagina que una **melodía** acompasa tu lectura; sintiendo tu corazón, su ritmo se adapta. 
Cuando hay tensión, la melodía multiplica esa sensación; cuando hay alegría, la melodía lo acompaña.

Imagina que hay un grito en un oscuro bosque, hay unos pasos que te persiguen, hay disparos cerca, alguien rompe los cristales de una ventana, el asesino baja la escalera... **y tú lo oyes**. Tu corazón se acelera.

Imagina que vuelas y decides **coger los mandos** del aeroplano; que hay un crimen y decides **investigar** tú mismo la escena; que tú mismo **interrogas** al sospechoso; que **conduces** el coche en la huida.

Imagina que te apetece seguir viviendo la historia en un **cómic**. O que prefieres un **vídeo** que recree la escena. O que te vas a caminar, te pones unos **auriculares** y sigues viviendo la historia en un **podcast**.
    `
  }
};

// ====== Apertura de modal de tarjetas ======
function openImagineModal(key) {
  const data = imagineData[key];
  if (!data) return;
  const modal = document.getElementById('imagine-modal');
  const titleEl = document.getElementById('imagine-modal-title');
  const descEl  = document.getElementById('imagine-modal-description');
  const imgEl   = document.getElementById('imagine-modal-image');

  titleEl.textContent = data.title;
  descEl.innerHTML = data.description.trim().replace(/\n{2,}/g, "<br><br>");
  imgEl.src = data.image || "";
  imgEl.alt = data.title || "Ilustración Selbook";

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeImagineModal() {
  const modal = document.getElementById('imagine-modal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Listeners tarjetas
document.querySelectorAll('.imagine-card').forEach(card => {
  // Glow que sigue al ratón
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  });

  card.addEventListener('click', () => {
    const key = card.getAttribute('data-imagine');
    openImagineModal(key);
  });

  // Evita que el botón dentro pare el click del card (no es imprescindible, pero ayuda)
  card.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const key = card.getAttribute('data-imagine');
      openImagineModal(key);
    });
  });
});

// Cierre modal "imagine"
document.getElementById('close-imagine').addEventListener('click', closeImagineModal);

// Cerrar modales al hacer click fuera
document.getElementById('imagine-modal').addEventListener('click', (e) => {
  if (e.target.id === 'imagine-modal') closeImagineModal();
});

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImagineModal();
});
// Focus hover para círculo de 9
document.querySelectorAll('.layout-circle9 .hex-orbit').forEach(orbit => {
  const items = orbit.querySelectorAll('.hexagon-item');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      orbit.classList.add('is-hovering');
      item.classList.add('is-hover');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('is-hover');
      // Si no queda ninguna en hover, quitamos el estado global
      if (!orbit.querySelector('.hexagon-item.is-hover')) {
        orbit.classList.remove('is-hovering');
      }
    });
    // Accesible con teclado
    item.addEventListener('focusin', () => {
      orbit.classList.add('is-hovering');
      item.classList.add('is-hover');
    });
    item.addEventListener('focusout', () => {
      item.classList.remove('is-hover');
      if (!orbit.querySelector('.hexagon-item.is-hover')) {
        orbit.classList.remove('is-hovering');
      }
    });
  });
});

// === Hexágonos: cargar panel con fade desde plantillas ocultas ===
(function(){
  const panel = document.getElementById('hex-detail');
  if (!panel) return;

  const templatesRoot = document.querySelector('.hex-templates');
  const defaultTpl = templatesRoot?.querySelector('.hex-detail-template[data-key="default"]');

  function swapHTML(html){
    panel.classList.add('is-fading');         // fade-out
    setTimeout(()=>{
      panel.innerHTML = html;                 // reemplazo de contenido
      panel.classList.remove('is-fading');    // fade-in
    }, 140); // 120–180 ms va fino
  }

  function loadFromTemplate(key){
    const tpl = templatesRoot?.querySelector(`.hex-detail-template[data-key="${key}"]`) || defaultTpl;
    if (tpl) swapHTML(tpl.innerHTML);

    // marcar activo en el anillo
    document.querySelectorAll('.hexagon-item').forEach(i => i.classList.remove('is-active'));
    const active = document.querySelector(`.hexagon-item[data-hexagon="${key}"]`);
    if (active) active.classList.add('is-active');
  }

  // listeners (click + teclado)
  document.querySelectorAll('.hexagon-item').forEach(item => {
    const key = item.dataset.hexagon;
    item.addEventListener('click', () => loadFromTemplate(key));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadFromTemplate(key); }
    });
  });

  // carga por defecto (no mueve el H2 porque ahora es sticky por CSS)
  loadFromTemplate('default');
})();



/*
// === Flechas adaptativas entre micro-tarjetas ===
(function(){
  const wrapper = document.querySelector('#magic-how .microflow');
  const svg     = document.getElementById('microflow-svg');
  if (!wrapper || !svg) return;

  // Utils
  const NS = 'http://www.w3.org/2000/svg';
  const q  = (sel) => document.querySelector(sel);

  function setSVGSize(){
    const r = wrapper.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    svg.setAttribute('width',  r.width);
    svg.setAttribute('height', r.height);
  }

  function anchor(el, edge){  // punto en un borde del botón
    const r = el.getBoundingClientRect();
    const w = wrapper.getBoundingClientRect();
    const cx = r.left + r.width/2  - w.left;
    const cy = r.top  + r.height/2 - w.top;
    switch(edge){
      case 'top':    return { x: cx, y: r.top    - w.top };
      case 'bottom': return { x: cx, y: r.bottom - w.top };
      case 'left':   return { x: r.left  - w.left,  y: cy };
      case 'right':  return { x: r.right - w.left,  y: cy };
      default:       return { x: cx, y: cy };
    }
  }

  // Ruta ortogonal con escalón superior o inferior (con esquinas suaves)
  function orthPath(p1, p2, side = 'top', offset = 60){
    const yMid = side === 'top'
      ? Math.min(p1.y, p2.y) - offset
      : Math.max(p1.y, p2.y) + offset;
    const r = 16; // radio para suavizar esquinas
    // Mover hasta el escalón con radios
    return [
      `M ${p1.x} ${p1.y}`,
      `L ${p1.x} ${yMid - Math.sign(yMid - p1.y)*r}`,
      `Q ${p1.x} ${yMid} ${p1.x + (p2.x > p1.x ? r : -r)} ${yMid}`,
      `L ${p2.x - (p2.x > p1.x ? r : -r)} ${yMid}`,
      `Q ${p2.x} ${yMid} ${p2.x} ${yMid + Math.sign(p2.y - yMid)*r}`,
      `L ${p2.x} ${p2.y}`
    ].join(' ');
  }

  function marker(id, color='rgba(255,255,255,.7)'){
    const defs = svg.querySelector('defs') || svg.appendChild(document.createElementNS(NS,'defs'));
    let m = svg.querySelector(`#${id}`);
    if (!m){
      m = document.createElementNS(NS,'marker');
      m.setAttribute('id', id);
      m.setAttribute('markerWidth','10'); m.setAttribute('markerHeight','10');
      m.setAttribute('refX','8'); m.setAttribute('refY','5'); m.setAttribute('orient','auto');
      const tip = document.createElementNS(NS,'path');
      tip.setAttribute('d','M0,0 L10,5 L0,10 z');
      tip.setAttribute('fill', color);
      m.appendChild(tip);
      defs.appendChild(m);
    }
    return `url(#${id})`;
  }

  function draw(){
    setSVGSize();
    svg.innerHTML = ''; // limpiar (incluye <defs>, lo recreamos)

    // Re-crear marker en cada draw (simple y seguro)
    const endArrow = marker('mfArrow', 'rgba(255,255,255,.75)');

    // Elementos
    const perfil     = q('#magic-how .microcard[data-key="perfil"]');
    const ia         = q('#magic-how .microcard[data-key="ia"]');
    const decisiones = q('#magic-how .microcard[data-key="decisiones"]');
    const bic        = q('#magic-how .microcard[data-key="bic"]');
    if (!perfil || !ia || !decisiones || !bic) return;

    // 1) Flecha discontinua arriba: Perfil -> IA
    const p1 = anchor(perfil, 'top');
    const p2 = anchor(ia,     'top');
    const path1 = document.createElementNS(NS,'path');
    path1.setAttribute('d', orthPath(p1, p2, 'top', 70));
    path1.setAttribute('fill','none');
    path1.setAttribute('stroke','rgba(255,255,255,.6)');
    path1.setAttribute('stroke-width','2.5');
    path1.setAttribute('stroke-dasharray','8 10');
    path1.setAttribute('marker-end', endArrow);
    svg.appendChild(path1);

    // 2) Flecha inferior en bucle: Decisiones -> BIC
    const p3 = anchor(decisiones, 'bottom');
    const p4 = anchor(bic,        'bottom');
    const path2 = document.createElementNS(NS,'path');
    path2.setAttribute('d', orthPath(p3, p4, 'bottom', 80));
    path2.setAttribute('fill','none');
    path2.setAttribute('stroke','rgba(255,255,255,.45)');
    path2.setAttribute('stroke-width','2.5');
    path2.setAttribute('marker-end', endArrow);
    svg.appendChild(path2);
  }

  // Dibujar y actualizar en cambios de tamaño/flujo
  draw();
  window.addEventListener('resize', draw);
  // redibuja si cambia la altura del wrapper o de las tarjetas
  const ro = new ResizeObserver(draw);
  ro.observe(wrapper);
  document.querySelectorAll('#magic-how .microcard').forEach(el => ro.observe(el));
})();
*/


// Micro-tarjetas -> cargar plantilla en el panel + fade + glow heredado
(function(){
  const panel = document.getElementById('magic-detail');
  if (!panel) return;

  const templatesRoot = document.querySelector('.micro-templates');
  const buttons = document.querySelectorAll('.microcard');

  function loadStep(key, glow) {
    const tpl = templatesRoot?.querySelector(`.tpl[data-key="${key}"]`);
    if (!tpl) return;

    // Fade out rápido
    panel.classList.add('is-fading');

    // Cambiamos glow del panel para que herede el de la tarjeta
    if (glow) panel.style.setProperty('--panel-glow', glow.trim());

    // Al terminar el fade-out, volcamos contenido y hacemos fade-in
    setTimeout(() => {
      panel.innerHTML = tpl.innerHTML;
      panel.classList.remove('is-fading'); // vuelve a opacity:1 por CSS
    }, 160);
  }

  buttons.forEach(btn => {
    const key = btn.dataset.key;
    btn.addEventListener('click', () => {
      const glow = getComputedStyle(btn).getPropertyValue('--glow') || '';
      buttons.forEach(b => b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
      loadStep(key, glow);
    });
    btn.addEventListener('keydown', e => {
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        btn.click();
      }
    });
  });

})();

// === CTA v2: abrir/cerrar modales + estado de envío ===
(function(){
  const body = document.body;

  // Abrir
  const openMvp  = document.getElementById('open-mvp');
  const openTest = document.getElementById('open-test');
  const mvpModal  = document.getElementById('mvp-modal');
  const testModal = document.getElementById('test-modal');

  function open(modal){
    if (!modal) return;
    modal.classList.add('is-open');
    body.style.overflow = 'hidden';
  }
  function close(modal){
    if (!modal) return;
    modal.classList.remove('is-open');
    body.style.overflow = '';
  }

  openMvp  && openMvp.addEventListener('click', ()=> open(mvpModal));
  openTest && openTest.addEventListener('click',()=> open(testModal));

  // Cerrar por botones/backdrop/Escape
  document.querySelectorAll('.cta-modal__close,[data-close]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const id = el.dataset.close;
      close(id === 'mvp' ? mvpModal : id === 'test' ? testModal : el.closest('.cta-modal'));
    });
  });
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      close(mvpModal); close(testModal);
    }
  });

  // Submits (simulados aquí)
  const mvpForm  = document.getElementById('mvp-form');
  const testForm = document.getElementById('test-form');

  mvpForm && mvpForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    mvpForm.hidden = true;
    document.getElementById('mvp-success').hidden = false;
    // Aquí podrías redirigir a thank-you o disparar un fetch()
  });

  testForm && testForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    testForm.hidden = true;
    document.getElementById('test-success').hidden = false;
  });
})();

// NUDGE modal: abrir/cerrar
(function(){
  const btn   = document.getElementById('open-selbook-nudge');
  const modal = document.getElementById('selbook-nudge-modal');
  if (!btn || !modal) return;

  const open  = () => { modal.classList.add('is-open'); document.body.style.overflow='hidden'; };
  const close = () => { modal.classList.remove('is-open'); document.body.style.overflow=''; };

  btn.addEventListener('click', open);
  modal.querySelectorAll('[data-close="nudge"], .cta-modal__close').forEach(el => {
    el.addEventListener('click', close);
  });
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
})();
