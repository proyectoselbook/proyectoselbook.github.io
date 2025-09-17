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
    image: "assets/img/leyendo_mente.webp", // cámbiala por tu imagen real
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
    image: "assets/img/eleccion-personajes-2.jpg",
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
    image: "assets/img/experiencia-360.png",
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


// ======================================================
// SCRIPT PARA LA SIMULACIÓN DE ELECCIÓN DE PERSONAJES
// ======================================================
document.addEventListener('DOMContentLoaded', () => {

    // Comprobamos que el modal existe en la página antes de ejecutar nada
    const modal = document.getElementById('sim-personajes-modal');
    if (!modal) {
        console.log("El modal de personajes no se encuentra en esta página.");
        return; // Detiene la ejecución si el modal no existe
    }

    // --- Datos de los Personajes ---
    const characters = [
        {
            name: 'Samuel Rot',
            img: 'assets/img/samuel-rot-eleccion.png',
			isIncluded: true,
            genres: ['Intriga', 'Drama', 'Amor'],
			prestaciones: [
				{ label: 'Ready-to-Play', icon: 'fa-gamepad', type: 'count', value: 2, total: 3 },
				{ label: 'Vídeos', icon: 'fa-video', type: 'count', value: 8, total: 12 },
				{ label: 'Modo Cómic', icon: 'fa-book-open', type: 'count', value: 1, total: 4 },
				{ label: 'Podcast', icon: 'fa-headphones-alt', type: 'check', value: true },
				{ label: 'Imágenes', icon: 'fa-image', type: 'text', value: 'Ilimitado' },
				{ label: 'Ventana', icon: 'fa-window-restore', type: 'count', value: 4, total: 8 },
				{ label: 'Salto Dimensión', icon: 'fa-dungeon', type: 'count', value: 2, total: 5 },
				{ label: 'Chat Personajes', icon: 'fa-comments', type: 'count', value: 3, total: 8 },
				{ label: 'Versión Usuario', icon: 'fa-user-edit', type: 'check', value: false }
			],
            relatos: [
				{ text: 'Relato Paralelo 1', available: true },
				{ text: 'El Caso Livi', available: true }, // <-- Desactivado
				{ text: 'Sam Rot, Detective', available: false }
			],
            multimedia: { 'Ready-to-play': 3, videos: 7, comics: 3 },
            rutas: [
				{ label: 'Nudos Invisibles', value: 6, total: 10 },
				{ label: 'Nudos Inconscientes', value: 4, total: 6 },
				{ label: 'Nudos Conscientes', value: 2, total: 5 }
			],
            bio: 'No pudo resolver el asesinato de su mujer, pero esta vez no permitirá que pase lo mismo. Decidido y firme se enfrentará a un Asesino Perfecto que hará tambalear su equilibrio frente al tormento de los recuerdos que no consigue borrar.'
        },
        {
            name: 'El Gorrión Rojo',
            img: 'assets/img/gorrion-rojo-eleccion.png',
			isIncluded: true,
            genres: ['Misterio', 'Noir', 'Psicológica'],
			prestaciones: [
				{ label: 'Ready-to-Play', icon: 'fa-gamepad', type: 'count', value: 1, total: 2 },
				{ label: 'Vídeos', icon: 'fa-video', type: 'count', value: 6, total: 7 },
				{ label: 'Modo Cómic', icon: 'fa-book-open', type: 'count', value: 2, total: 3 },
				{ label: 'Podcast', icon: 'fa-headphones-alt', type: 'check', value: true },
				{ label: 'Imágenes', icon: 'fa-image', type: 'text', value: 'Ilimitado' },
				{ label: 'Ventana', icon: 'fa-window-restore', type: 'count', value: 3, total: 5 },
				{ label: 'Salto Dimensión', icon: 'fa-dungeon', type: 'count', value: 1, total: 3 },
				{ label: 'Chat Personajes', icon: 'fa-comments', type: 'count', value: 3, total: 6 },
				{ label: 'Versión Usuario', icon: 'fa-user-edit', type: 'check', value: true }
			],
            relatos: [
				{ text: 'La Biblioteca', available: true },
				{ text: 'Asesinato por Gravedad', available: false }, // <-- Desactivado
				{ text: 'El Gorrión Blanco', available: true }
			],
            multimedia: { 'Ready-to-play': 2, videos: 8, comics: 1 },
            rutas: [
				{ label: 'Nudos Invisibles', value: 4, total: 7 },
				{ label: 'Nudos Inconscientes', value: 3, total: 3},
				{ label: 'Nudos Conscientes', value: 1, total: 2 }
			],
            bio: 'Las bibliotecas son su refugio. Los Libros sus Armas. De ellos aprendió todo lo que debía saber para investigar, para juzgar y para ejecutar un plan sencillo y macabro: Acabar con las asquerosas palomas de la ciudad. Palomas que... unas vuelan y otras andan.'
        },
        {
            name: 'René Sánchez',
            img: 'assets/img/rene-sanchez-eleccion.png',
			isIncluded: false,
            genres: ['Thriller', 'Investigación', 'Suspense'],
			prestaciones: [
				{ label: 'Ready-to-Play', icon: 'fa-gamepad', type: 'count', value: 2, total: 3 },
				{ label: 'Vídeos', icon: 'fa-video', type: 'count', value: 4, total: 7 },
				{ label: 'Modo Cómic', icon: 'fa-book-open', type: 'count', value: 2, total: 2 },
				{ label: 'Podcast', icon: 'fa-headphones-alt', type: 'check', value: true },
				{ label: 'Imágenes', icon: 'fa-image', type: 'text', value: 'Ilimitado' },
				{ label: 'Ventana', icon: 'fa-window-restore', type: 'count', value: 1, total: 2 },
				{ label: 'Salto Dimensión', icon: 'fa-dungeon', type: 'count', value: 1, total: 3 },
				{ label: 'Chat Personajes', icon: 'fa-comments', type: 'count', value: 2, total: 2 },
				{ label: 'Versión Usuario', icon: 'fa-user-edit', type: 'check', value: false }
			],			
            relatos: [
				{ text: 'George Sanchez. Policía', available: false },
				{ text: 'Asesinato por Gravedad', available: false }, // <-- Desactivado
				{ text: 'El Gorrión Blanco', available: false }
			],
            multimedia: { 'Ready-to-play': 4, videos: 4, comics: 5 },
            rutas: [
				{ label: 'Nudos Invisibles', value: 4, total: 5 },
				{ label: 'Nudos Inconscientes', value: 3, total: 3 },
				{ label: 'Nudos Conscientes', value: 2, total: 2 }
			],
            bio: 'Jamás imaginó que trabajaría con el gran Samuel Rot. Y jamás imaginó que aquello no sería tan fácil. Un hombre roto que ella misma sacó de su casa y que ahora debía cuidar que no volviera a romperse en su persecución obsesiva de El Gorrión Rojo.'
        }
    ];

    // --- Referencias a los elementos INTERNOS del modal ---
    const closeButton = modal.querySelector('.close-modal-btn');
    const carousel = modal.querySelector('.character-carousel');
    const charName = modal.querySelector('#char-name');
    const charBio = modal.querySelector('#char-bio');
    const charGenres = modal.querySelector('#char-genres');
    const charMultimedia = modal.querySelector('#char-multimedia');
    const charRelatos = modal.querySelector('#char-relatos');
    const charRutas = modal.querySelector('#char-rutas');
    const prevBtn = modal.querySelector('#prev-char');
    const nextBtn = modal.querySelector('#next-char');
	const btnEmpezar = modal.querySelector('#btn-empezar-historia');
	const btnIncluido = modal.querySelector('#btn-incluido');
	const btnComprar = modal.querySelector('#btn-comprar');
    // --- Estado del Carrusel ---
    let currentIndex = 0;
    let characterSlides = [];

    // --- Funciones del Carrusel ---

    function initCarousel() {
        carousel.innerHTML = '';
        characters.forEach((char, index) => {
            const slide = document.createElement('div');
            slide.classList.add('character-slide');
            slide.dataset.index = index;
            slide.innerHTML = `<img src="${char.img}" alt="${char.name}">`;
            carousel.appendChild(slide);
        });
        characterSlides = modal.querySelectorAll('.character-slide');
    }

    /**
     * Actualiza la información mostrada en las tarjetas con ICONOS.
     * @param {object} charData - El objeto del personaje a mostrar.
     */
function updateCharacterInfo(charData) {
    charName.textContent = charData.name;
    charBio.textContent = charData.bio;
    
    charGenres.innerHTML = charData.genres.map(genre => `<span class="chip">${genre}</span>`).join('');
    
    // --- LÓGICA RECONSTRUIDA PARA LA TARJETA DE PRESTACIONES ---
    charMultimedia.innerHTML = charData.prestaciones.map(item => {
        let valueHtml = '';
        // Generamos el HTML del valor según el tipo de prestación
        switch (item.type) {
            case 'count':
                valueHtml = `<span class="prestacion-value"><span class="active-count">${item.value}</span><span class="total-count">/${item.total}</span></span>`;
                break;
            case 'check':
                valueHtml = `<span class="prestacion-value"><i class="fas fa-check-circle ${item.value ? 'check-active' : 'check-inactive'}"></i></span>`;
                break;
            case 'text':
                valueHtml = `<span class="prestacion-value prestacion-text">${item.value}</span>`;
                break;
        }
        // Devolvemos el elemento de la lista completo con icono y valor
        return `<li><i class="fas ${item.icon}" title="${item.label}"></i> ${valueHtml}</li>`;
    }).join('');
        
    charRelatos.innerHTML = charData.relatos
        .map(relato => {
            // Añadimos la clase 'is-disabled' si el relato no está disponible
            const disabledClass = relato.available ? '' : 'is-disabled';
            return `<li class="${disabledClass}"><i class="fas fa-book icon-lime"></i>${relato.text}</li>`;
        })
        .join('');

    charRutas.innerHTML = charData.rutas
        .map(ruta => {
            const counterHtml = `<span class="ruta-counter"><span class="active-count">${ruta.value}</span><span class="total-count">/${ruta.total}</span></span>`;
            return `<li><i class="fas fa-route icon-lime"></i>${ruta.label}: ${counterHtml}</li>`;
        })
        .join('');

    // Lógica para los botones (sin cambios)
    if (charData.isIncluded) {
        btnIncluido.classList.add('is-active');
        btnIncluido.removeAttribute('disabled');
        btnComprar.classList.remove('is-active');
        btnComprar.setAttribute('disabled', 'true');
        btnEmpezar.removeAttribute('disabled');
        btnEmpezar.classList.add('is-active');
    } else {
        btnIncluido.classList.remove('is-active');
        btnIncluido.setAttribute('disabled', 'true');
        btnComprar.classList.add('is-active');
        btnComprar.removeAttribute('disabled');
        btnEmpezar.setAttribute('disabled', 'true');
        btnEmpezar.classList.remove('is-active');
    }
}
    
    /**
     * ¡LA FUNCIÓN QUE FALTABA!
     * Actualiza la posición y clases del carrusel.
     * @param {number} newIndex - El nuevo índice del personaje central.
     */
    function updateCarousel(newIndex) {
        currentIndex = (newIndex + characters.length) % characters.length;

        const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
        const nextIndex = (currentIndex + 1) % characters.length;

        characterSlides.forEach((slide, index) => {
            slide.classList.remove('is-active', 'is-prev', 'is-next');
            if (index === currentIndex) {
                slide.classList.add('is-active');
            } else if (index === prevIndex) {
                slide.classList.add('is-prev');
            } else if (index === nextIndex) {
                slide.classList.add('is-next');
            }
        });
        
        updateCharacterInfo(characters[currentIndex]);
    }


    // --- Event Listeners del Carrusel ---
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'true');
            // Si tu script general de modales usa una clase para mostrar/ocultar,
            // puede que necesites una línea como: modal.classList.remove('is-visible'); 
        });
    }

    document.addEventListener('keydown', (e) => {
        if (modal.getAttribute('aria-hidden') === 'true' || !modal.hasAttribute('aria-hidden') === false) return;
        if (e.key === 'ArrowRight') nextBtn.click();
        else if (e.key === 'ArrowLeft') prevBtn.click();
        else if (e.key === 'Escape' && closeButton) closeButton.click();
    });

    carousel.addEventListener('click', (e) => {
        const clickedSlide = e.target.closest('.character-slide');
        if (!clickedSlide) return;
        if (clickedSlide.classList.contains('is-next')) nextBtn.click();
        else if (clickedSlide.classList.contains('is-prev')) prevBtn.click();
    });

    // --- Inicialización del Carrusel ---
    initCarousel();
    updateCarousel(0); // <-- Esta línea ahora funcionará porque updateCarousel existe
});

// ▼▼▼ PEGA ESTE BLOQUE COMPLETO AL FINAL DE TU ARCHIVO script_user.js ▼▼▼

// ======================================================
// SCRIPT PARA LA GUÍA INTERACTIVA TIPO TOOLTIP
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('sim-personajes-modal');
    if (!modal) return;

// ▼▼▼ REEMPLAZA TU ARRAY tourSteps POR ESTE ▼▼▼
const tourSteps = [
    { 
        element: '#next-char', 
        position: 'top', // Lo colocamos a la izquierda de la flecha
        text: 'Podrás desplazarte por todos los Protagonistas del Stringbook. La información de las Tarjetas Flotantes cambiará y podrás hacerte una pequeña idea sobre cómo vivirás la Historia desde ese personaje. Pruebalo y pasa a la siguiente burbuja!' 
    },
    { 
        element: '.genres-card', 
        position: 'right', // A la derecha de la tarjeta de géneros
        text: 'Cada personaje tiene sus particularidades en cuanto a géneros literarios dentro de la Historia...'
    },
    { 
        element: '.bio-card', 
        position: 'right', // Encima de los botones de "Incluido/Comprar"
        align: 'start', // <-- AÑADE ESTA LÍNEA
		text: 'Una pequeña reseña sobre ese Protagonista te pondrá sobre la pista de lo que podrías vivir...'
    },
    { 
        element: '.multimedia-card', 
        position: 'left', // A la izquierda de la tarjeta de prestaciones
        text: 'Podrás ver toda la información sobre las opciones multimedia que tiene tu versión de Stringbook...'
    },
    { 
        element: '.relatos-card', 
        position: 'left', // A la izquierda de la tarjeta de relatos
        text: 'Recuerda, son Relatos que complementan la historia principal...'
    },
    { 
        element: '.rutas-card', 
        position: 'left', // A la izquierda de la tarjeta de rutas
        text: 'Desde aquí se te informa del potencial narrativo del Stringbook...'
    },
    { 
        element: '#btn-empezar-historia', 
        position: 'top', // Encima del botón principal
        text: '¡Ya está todo listo! Cuando te hayas decidido, comienza tu aventura!' 
    }
];

    const popover = document.getElementById('tutorial-popover');
    const nextBtn = document.getElementById('tutorial-next-btn');
    const closeBtn = document.getElementById('tutorial-close-btn');
    const textEl = document.getElementById('tutorial-text');
    const arrowEl = popover.querySelector('.tutorial-popover__arrow');
    
    let currentStep = -1;

    function startTour() {
        if (currentStep !== -1) return;
        currentStep = 0;
        showStep(currentStep);
    }

    function endTour() {
        popover.classList.remove('is-visible');
        popover.classList.add('is-hidden');
        currentStep = -1;
    }

// ▼▼▼ REEMPLAZA TU FUNCIÓN showStep POR ESTA ▼▼▼
function showStep(stepIndex) {
    if (stepIndex >= tourSteps.length) {
        endTour();
        return;
    }

    const step = tourSteps[stepIndex];
    const targetElement = modal.querySelector(step.element);
    if (!targetElement) { endTour(); return; }
    
    textEl.textContent = step.text;
    nextBtn.textContent = (stepIndex === tourSteps.length - 1) ? 'Finalizar' : 'Siguiente';

    popover.classList.remove('is-hidden');
    popover.classList.add('is-visible');

    const targetRect = targetElement.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    
    let popoverTop, popoverLeft, arrowClass;
    const offset = 15;

    switch (step.position) {
        case 'top':
            popoverTop = targetRect.top - popoverRect.height - offset;
            popoverLeft = targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2);
            arrowClass = 'arrow-bottom';
            break;
        case 'left':
            popoverLeft = targetRect.left - popoverRect.width - offset;
            // -- NUEVA LÓGICA DE ALINEACIÓN --
            if (step.align === 'start') {
                popoverTop = targetRect.top; // Alinear con el borde superior
            } else {
                popoverTop = targetRect.top + (targetRect.height / 2) - (popoverRect.height / 2); // Centrar (por defecto)
            }
            arrowClass = 'arrow-right';
            break;
        case 'right':
            popoverLeft = targetRect.right + offset;
            // -- NUEVA LÓGICA DE ALINEACIÓN --
            if (step.align === 'start') {
                popoverTop = targetRect.top; // Alinear con el borde superior
            } else {
                popoverTop = targetRect.top + (targetRect.height / 2) - (popoverRect.height / 2); // Centrar (por defecto)
            }
            arrowClass = 'arrow-left';
            break;
        default: // 'bottom'
            popoverTop = targetRect.bottom + offset;
            popoverLeft = targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2);
            arrowClass = 'arrow-top';
            break;
    }

    // (El resto de la función para corregir bordes y posicionar la flecha se mantiene igual)
    if (popoverLeft < 10) popoverLeft = 10;
    if (popoverLeft + popoverRect.width > window.innerWidth) {
        popoverLeft = window.innerWidth - popoverRect.width - 10;
    }

    popover.style.top = `${popoverTop}px`;
    popover.style.left = `${popoverLeft}px`;
    popover.className = 'tutorial-popover is-visible';
    popover.classList.add(arrowClass);

    if (arrowClass === 'arrow-top' || arrowClass === 'arrow-bottom') {
        const arrowLeft = targetRect.left + (targetRect.width / 2) - popoverLeft;
        arrowEl.style.left = `clamp(10px, ${arrowLeft}px, ${popoverRect.width - 20}px)`;
        arrowEl.style.top = '';
    } else {
        // -- LÓGICA DE FLECHA MEJORADA --
        if (step.align === 'start') {
             // Alinear la flecha con el centro de la primera línea de texto aprox.
            arrowEl.style.top = '20px';
        } else {
            const arrowTop = targetRect.top + (targetRect.height / 2) - popoverTop;
            arrowEl.style.top = `clamp(10px, ${arrowTop}px, ${popoverRect.height - 20}px)`;
        }
        arrowEl.style.left = '';
    }
}

    nextBtn.addEventListener('click', () => { currentStep++; showStep(currentStep); });
    closeBtn.addEventListener('click', endTour);

    // Observador para iniciar/cerrar el tutorial con el modal
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'aria-hidden') {
                if (modal.getAttribute('aria-hidden') === 'false') {
                    setTimeout(startTour, 300); // Pequeña espera para que el modal se anime
                } else {
                    endTour();
                }
            }
        });
    });
    observer.observe(modal, { attributes: true });
});
