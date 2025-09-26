// ======================================================
// SCRIPT DE UTILIDADES GENERALES Y CÓDIGO ORIGINAL
// ======================================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${Math.random() > 0.5 ? 'green' : 'orange'}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

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
    document.querySelectorAll('.magic-step').forEach(step => {
        step.style.animationPlayState = 'paused';
        observer.observe(step);
    });
}

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


// ======================================================
// INICIALIZACIÓN PRINCIPAL DE LA PÁGINA
// ======================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Ejecución de scripts generales ---
    createParticles();
    setupScrollAnimations();
    setupParallax();
    
    document.getElementById('whatIsSelbook')?.addEventListener('click', () => {
      const target = document.getElementById('que-es-selbook-cards');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-2px) scale(1.05)'; });
        btn.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
        btn.addEventListener('click', function() {
            this.style.transform = 'translateY(0) scale(0.95)';
            setTimeout(() => { this.style.transform = 'translateY(-2px) scale(1.05)'; }, 150);
        });
    });



    // --- Efectos de Scroll y MouseMove ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

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

    document.querySelector('.hero-section')?.addEventListener('mouseleave', () => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });

    setInterval(() => {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer && document.querySelectorAll('.particle').length < 50) {
            const particle = document.createElement('div');
            particle.className = `particle ${Math.random() > 0.5 ? 'green' : 'orange'}`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        }
    }, 2000);

    // --- Lógica original de la página (Imagine, Hexágonos, CTAs, etc.) ---
    
    (function ImagineCards() {
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
			image: "assets/img/eleccion-jugar.png",
			description: `
		Imagina que una **melodía** acompasa tu lectura; sintiendo tu corazón, su ritmo se adapta. 
		Cuando hay tensión, la melodía multiplica esa sensación; cuando hay alegría, la melodía lo acompaña.

		Imagina que hay un grito en un oscuro bosque, hay unos pasos que te persiguen, hay disparos cerca, alguien rompe los cristales de una ventana, el asesino baja la escalera... **y tú lo oyes**. Tu corazón se acelera.

		Imagina que vuelas y decides **coger los mandos** del aeroplano; que hay un crimen y decides **investigar** tú mismo la escena; que tú mismo **interrogas** al sospechoso; que **conduces** el coche en la huida.

		Imagina que te apetece seguir viviendo la historia en un **cómic**. O que prefieres un **vídeo** que recree la escena. O que te vas a caminar, te pones unos **auriculares** y sigues viviendo la historia en un **podcast**.
			`
		  }
        };

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

        document.getElementById('close-imagine')?.addEventListener('click', closeImagineModal);
        document.getElementById('imagine-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'imagine-modal') closeImagineModal();
        });
    })();

    (function Hexagons() {
        
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

    (function MicroCards() {
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

    (function CtaModals() {
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
    
    (function NudgeModal() {
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


		// Cerrar con ESC *************************************
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

    // ======================================================
    // INICIO DE SCRIPTS ENCAPSULADOS PARA SIMULACIONES
    // ======================================================

    // --- SIMULACIÓN 1: ELECCIÓN DE PERSONAJES Y SU GUÍA ---
    (function CharacterSimulation() {
                const modal = document.getElementById('sim-personajes-modal');
        if (!modal) return;

        const characters = [
            {
                name: 'Samuel Rot',
                img: 'assets/img/samuel-rot-eleccion.png', isIncluded: true,
                genres: ['Intriga', 'Drama', 'Amor'],
                prestaciones: [
                    { label: 'Ready-to-Play', icon: 'fa-gamepad', type: 'count', value: 2, total: 3 }, { label: 'Vídeos', icon: 'fa-video', type: 'count', value: 8, total: 12 }, { label: 'Modo Cómic', icon: 'fa-book-open', type: 'count', value: 1, total: 4 }, { label: 'Podcast', icon: 'fa-headphones-alt', type: 'check', value: true }, { label: 'Imágenes', icon: 'fa-image', type: 'text', value: 'Ilimitado' }, { label: 'Ventana', icon: 'fa-window-restore', type: 'count', value: 4, total: 8 }, { label: 'Salto Dimensión', icon: 'fa-dungeon', type: 'count', value: 2, total: 5 }, { label: 'Chat Personajes', icon: 'fa-comments', type: 'count', value: 3, total: 8 }, { label: 'Versión Usuario', icon: 'fa-user-edit', type: 'check', value: false }
                ],
                relatos: [
                    { text: 'Relato Paralelo 1', available: true }, { text: 'El Caso Livi', available: true }, { text: 'Sam Rot, Detective', available: false }
                ],
                rutas: [
                    { label: 'Nudos Invisibles', value: 6, total: 10 }, { label: 'Nudos Inconscientes', value: 4, total: 6 }, { label: 'Nudos Conscientes', value: 2, total: 5 }
                ],
                bio: 'No pudo resolver el asesinato de su mujer, pero esta vez no permitirá que pase lo mismo. Decidido y firme se enfrentará a un Asesino Perfecto que hará tambalear su equilibrio frente al tormento de los recuerdos que no consigue borrar.'
            },
            {
                name: 'El Gorrión Rojo',
                img: 'assets/img/gorrion-rojo-eleccion.png', isIncluded: true,
                genres: ['Misterio', 'Noir', 'Psicológica'],
                prestaciones: [
                    { label: 'Ready-to-Play', icon: 'fa-gamepad', type: 'count', value: 1, total: 2 }, { label: 'Vídeos', icon: 'fa-video', type: 'count', value: 6, total: 7 }, { label: 'Modo Cómic', icon: 'fa-book-open', type: 'count', value: 2, total: 3 }, { label: 'Podcast', icon: 'fa-headphones-alt', type: 'check', value: true }, { label: 'Imágenes', icon: 'fa-image', type: 'text', value: 'Ilimitado' }, { label: 'Ventana', icon: 'fa-window-restore', type: 'count', value: 3, total: 5 }, { label: 'Salto Dimensión', icon: 'fa-dungeon', type: 'count', value: 1, total: 3 }, { label: 'Chat Personajes', icon: 'fa-comments', type: 'count', value: 3, total: 6 }, { label: 'Versión Usuario', icon: 'fa-user-edit', type: 'check', value: true }
                ],
                relatos: [
                    { text: 'La Biblioteca', available: true }, { text: 'Asesinato por Gravedad', available: false }, { text: 'El Gorrión Blanco', available: true }
                ],
                rutas: [
                    { label: 'Nudos Invisibles', value: 4, total: 7 }, { label: 'Nudos Inconscientes', value: 3, total: 3}, { label: 'Nudos Conscientes', value: 1, total: 2 }
                ],
                bio: 'Las bibliotecas son su refugio. Los Libros sus Armas. De ellos aprendió todo lo que debía saber para investigar, para juzgar y para ejecutar un plan sencillo y macabro: Acabar con las asquerosas palomas de la ciudad. Palomas que... unas vuelan y otras andan.'
            },
            {
                name: 'René Sánchez',
                img: 'assets/img/rene-sanchez-eleccion.png', isIncluded: false,
                genres: ['Thriller', 'Investigación', 'Suspense'],
                prestaciones: [
                    { label: 'Ready-to-Play', icon: 'fa-gamepad', type: 'count', value: 2, total: 3 }, { label: 'Vídeos', icon: 'fa-video', type: 'count', value: 4, total: 7 }, { label: 'Modo Cómic', icon: 'fa-book-open', type: 'count', value: 2, total: 2 }, { label: 'Podcast', icon: 'fa-headphones-alt', type: 'check', value: true }, { label: 'Imágenes', icon: 'fa-image', type: 'text', value: 'Ilimitado' }, { label: 'Ventana', icon: 'fa-window-restore', type: 'count', value: 1, total: 2 }, { label: 'Salto Dimensión', icon: 'fa-dungeon', type: 'count', value: 1, total: 3 }, { label: 'Chat Personajes', icon: 'fa-comments', type: 'count', value: 2, total: 2 }, { label: 'Versión Usuario', icon: 'fa-user-edit', type: 'check', value: false }
                ],
                relatos: [
                    { text: 'George Sanchez. Policía', available: false }, { text: 'Asesinato por Gravedad', available: false }, { text: 'El Gorrión Blanco', available: false }
                ],
                rutas: [
                    { label: 'Nudos Invisibles', value: 4, total: 5 }, { label: 'Nudos Inconscientes', value: 3, total: 3 }, { label: 'Nudos Conscientes', value: 2, total: 2 }
                ],
                bio: 'Jamás imaginó que trabajaría con el gran Samuel Rot. Y jamás imaginó que aquello no sería tan fácil. Un hombre roto que ella misma sacó de su casa y que ahora debía cuidar que no volviera a romperse en su persecución obsesiva de El Gorrión Rojo.'
            }
        ];

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
        let currentIndex = 0;
        let characterSlides = [];

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

        function updateCharacterInfo(charData) {
            charName.textContent = charData.name;
            charBio.textContent = charData.bio;
            charGenres.innerHTML = charData.genres.map(genre => `<span class="chip">${genre}</span>`).join('');
            charMultimedia.innerHTML = charData.prestaciones.map(item => {
                let valueHtml = '';
                switch (item.type) {
                    case 'count': valueHtml = `<span class="prestacion-value"><span class="active-count">${item.value}</span><span class="total-count">/${item.total}</span></span>`; break;
                    case 'check': valueHtml = `<span class="prestacion-value"><i class="fas fa-check-circle ${item.value ? 'check-active' : 'check-inactive'}"></i></span>`; break;
                    case 'text': valueHtml = `<span class="prestacion-value prestacion-text">${item.value}</span>`; break;
                }
                const liClass = (item.type === 'check' && item.value) ? 'prestacion-activa' : '';
                return `<li class="${liClass}"><i class="fas ${item.icon}" title="${item.label}"></i> ${valueHtml}</li>`;
            }).join('');
            charRelatos.innerHTML = charData.relatos.map(relato => `<li class="${relato.available ? '' : 'is-disabled'}"><i class="fas fa-book icon-lime"></i>${relato.text}</li>`).join('');
            charRutas.innerHTML = charData.rutas.map(ruta => `<li><i class="fas fa-route icon-lime"></i>${ruta.label}: <span class="ruta-counter"><span class="active-count">${ruta.value}</span><span class="total-count">/${ruta.total}</span></span></li>`).join('');
            
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

        function updateCarousel(newIndex) {
            currentIndex = (newIndex + characters.length) % characters.length;
            const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
            const nextIndex = (currentIndex + 1) % characters.length;
            characterSlides.forEach((slide, index) => {
                slide.classList.remove('is-active', 'is-prev', 'is-next');
                if (index === currentIndex) slide.classList.add('is-active');
                else if (index === prevIndex) slide.classList.add('is-prev');
                else if (index === nextIndex) slide.classList.add('is-next');
            });
            updateCharacterInfo(characters[currentIndex]);
        }

        nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
        prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
        if (closeButton) {
            closeButton.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
        }
        document.addEventListener('keydown', (e) => {
            if (modal.getAttribute('aria-hidden') === 'true' || !modal.hasAttribute('aria-hidden') === false) return;
            if (e.key === 'ArrowRight') nextBtn.click();
            else if (e.key === 'ArrowLeft') prevBtn.click();
        });
        carousel.addEventListener('click', (e) => {
            const clickedSlide = e.target.closest('.character-slide');
            if (!clickedSlide) return;
            if (clickedSlide.classList.contains('is-next')) nextBtn.click();
            else if (clickedSlide.classList.contains('is-prev')) prevBtn.click();
        });

        initCarousel();
        updateCarousel(0);
    })();

    // --- GUÍA INTERACTIVA PARA PERSONAJES ---
    (function InteractiveGuide() {
                const modal = document.getElementById('sim-personajes-modal');
        if (!modal) return;

        const tourSteps = [
            { element: '#next-char', position: 'top', text: 'Será una de tus primeras decisiones: Elegir tu Protagonista. Podrás moverte por los protagonistas existentes. Según la versión comprada, tendrás algunos habilitados y otros podrás comprarlos. Si clicas en las flechas verás que cada Protagonista tiene su información, prestaciones y alternativas narrativas. Será la misma historia, pero ¡la vivirás desde diferentes perspectivas!' },
            { element: '.genres-card', position: 'right', text: 'Cada personaje tiene sus particularidades en cuanto a géneros literarios. Puede que quieras una historia cásica policiaca con algo de drama y amor (Sam Rot), o puede que prefieras una versión más ocura y psicológica viviendo la historia desde la perspectiva del asesino... ¡Tu decides!' },
            { element: '.bio-card', position: 'right', align: 'start', text: 'Una pequeña reseña sobre ese Protagonista te pondrá sobre la pista, conocer un poco más a ese protagonista será clave para tu elección...' },
            { element: '.multimedia-card', position: 'left', text: 'Podrás ver toda la información sobre las opciones multimedia. Si te pones encima del icono, verás a qué corresponde. ¿Cuántos vídeos hay en este persobnaje? ¿Cuántas veces podré hacer un Ready-to-play y tomar el control de la investigación o de la persecución? ¿Podré charlar con los personajes y así descubrir más pistas? La versión comprada traerá prestaciones incluidas, pero podrás adquirir las prestaciones que quieras desde esta ventana.' },
            { element: '.relatos-card', position: 'left', text: 'Recuerda, son Relatos que complementan la historia principal. Los Relatos Paralelos son reltos que dan contexto a la historia, por ejemplo, una historia sobre el padre de la detective Rene Sanchez que explica su entrega y dilemas morales. O pueden ser Relatos Tanjenciales, que narran acontecimientos vividos por algún protagonista "fuera" de la historia principal,por ejemplo, el famoso caso del asesinato de la mujer de Samuel Rot, que tanto peso tiene en la historia actual. Unos relatos vendrán incluidos en tu versión, pero podrás comprar Relatos Extras desde esta misma ventana.' },
            { element: '.rutas-card', position: 'left', text: 'Conocer el potencial narrativo de tu versión de Stringbook es esencial. Cuantos más nudos, más sub-tramas y rutas narrativas y, por lo tanto, más horas de experiencia Selbook y más posibilidades de "releer" la historia conociendo nuevos caminos. Podrás ampliar tus nudos desde aquí.' },
            { element: '#btn-empezar-historia', position: 'top', text: '¡Ya está todo listo! Cuando te hayas decidido, comienza tu aventura!' }
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

        function showStep(stepIndex) {
            if (stepIndex >= tourSteps.length) { endTour(); return; }
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
                case 'top': popoverTop = targetRect.top - popoverRect.height - offset; popoverLeft = targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2); arrowClass = 'arrow-bottom'; break;
                case 'left': popoverLeft = targetRect.left - popoverRect.width - offset; popoverTop = (step.align === 'start') ? targetRect.top : targetRect.top + (targetRect.height / 2) - (popoverRect.height / 2); arrowClass = 'arrow-right'; break;
                case 'right': popoverLeft = targetRect.right + offset; popoverTop = (step.align === 'start') ? targetRect.top : targetRect.top + (targetRect.height / 2) - (popoverRect.height / 2); arrowClass = 'arrow-left'; break;
                default: popoverTop = targetRect.bottom + offset; popoverLeft = targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2); arrowClass = 'arrow-top'; break;
            }

            if (popoverLeft < 10) popoverLeft = 10;
            if (popoverLeft + popoverRect.width > window.innerWidth) popoverLeft = window.innerWidth - popoverRect.width - 10;
            
            popover.style.top = `${popoverTop}px`;
            popover.style.left = `${popoverLeft}px`;
            popover.className = 'tutorial-popover is-visible';
            popover.classList.add(arrowClass);

            if (arrowClass === 'arrow-top' || arrowClass === 'arrow-bottom') {
                const arrowLeft = targetRect.left + (targetRect.width / 2) - popoverLeft;
                arrowEl.style.left = `clamp(10px, ${arrowLeft}px, ${popoverRect.width - 20}px)`;
                arrowEl.style.top = '';
            } else {
                const arrowTop = (step.align === 'start') ? 20 : targetRect.top + (targetRect.height / 2) - popoverTop;
                arrowEl.style.top = `clamp(10px, ${arrowTop}px, ${popoverRect.height - 20}px)`;
                arrowEl.style.left = '';
            }
        }

        nextBtn.addEventListener('click', () => { currentStep++; showStep(currentStep); });
        closeBtn.addEventListener('click', endTour);

        const modalObserver = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.attributeName === 'aria-hidden') {
                    if (modal.getAttribute('aria-hidden') === 'false') setTimeout(startTour, 300);
                    else endTour();
                }
            }
        });
        modalObserver.observe(modal, { attributes: true });
		
    })();


    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// --- SIMULACIÓN 3: NUDOS (lectura + tooltips + “pasar página”) ---
(function NudosSimulation(){
  const modal = document.getElementById('sim-nudos-modal');
  if(!modal) return;

  // Elements
  const intro      = modal.querySelector('#nudos-intro');
  const openIntro  = modal.querySelector('#nudos-open-intro');
  const startBtn   = modal.querySelector('#nudos-start-btn');
  const reader     = modal.querySelector('#nudos-reader');
  const pageEl     = modal.querySelector('#nudos-page');
  const prevBtn    = modal.querySelector('#nudos-prev');
  const nextBtn    = modal.querySelector('#nudos-next');
  const closeBtn   = modal.querySelector('#nudos-close');

  const popover        = modal.querySelector('#nudos-popover');
  const popoverTextEl  = modal.querySelector('#nudos-popover-text');
  const popoverArrowEl = popover.querySelector('.tutorial-popover__arrow');

  // ===== Datos de páginas =====
  // Utiliza HTML de texto con <span class="nudo-step" data-step="N">...</span>
  const PAGES = [
    // 1
    {
      id:1, title:'Ejemplo de Nudo Subliminal-Invisible',
		descr:'Recuerda que un Nudo Invisible-Subliminal no es percibido por el lector, pero por detrás está Sely interpretando tus emociones y tomando decisiones de ruta narrativa.',
      body: `
        <p><span class="nudo-step" data-step="1">Tom y Sam</span> mataban el cansancio en los taburetes de la gasolinera, cada sorbo de café era un castigo más que un alivio. La campanilla de la puerta sonó y, como una ráfaga de aire nuevo, <span class="nudo-step" data-step="2">entró Mary. Llevaba una chaqueta de cuero desgastada, el cabello cayéndole en mechones indomables, y una sonrisa breve, casi traviesa, cuando preguntó si podía sentarse. Sus ojos —oscuros, incisivos— parecían medirlos, como si jugara a descubrir algo en ellos</span>. Sam respondió antes que Tom, y en un instante los tres compartían mesa, conversación ligera y una sensación difusa de extraña familiaridad.</p>
        <p>Pero cuando <span class="nudo-step" data-step="3">el rugido de un tráiler atravesó el aire de la noche, algo en Mary se quebró. Su sonrisa se apagó de golpe, la mirada chispeante se volvió alerta, casi asustada. Dejó el vaso sin terminar y se dirigió al baño con pasos rápidos. Sam, confundido, la siguió. Tom alcanzó a ver un cruce de palabras tensas en la penumbra del pasillo… y después, nada.</span></p>
      `
    },
    // 2
    {
      id:2,
      body: `
        <p><span class="nudo-step" data-step="4">Alarmado, salió a buscarlos. Entonces lo vio: Mary y Sam eran empujados hacia el tráiler por un hombre enorme, rostro hundido en sombras, la fuerza de sus brazos imponiendo un silencio brutal. Mary forcejeaba, pero no parecía solo miedo: había rabia también en sus ojos. Sam intentaba resistir, inútil. El camión rugió, engulléndolos.</span></p>
        <p>Tom corrió, gritó, pero el asfalto devolvió su voz en vano. El tráiler se alejaba ya, doblando la curva con un bramido metálico. Con los dedos crispados, <span class="nudo-step" data-step="5">se lanzó al coche, giró la llave y hundió el pie en el acelerador</span>...</p>
        <p class="footnote">Pasa a la siguiente página para vivir un Nudo Visible-inconsciente.</p>
      `
    },
    // 3
    {
      id:3, title:'Ejemplo de Nudo Visible-Inconsciente',
      descr:'Ahora viviremos la misma situación, pero como si fuera un Nudo Inconsciente. Es decir, sabes que estás en un nudo, pero no sabes las consecuencias de tus respuestas.',
      body: `
        <p>Tom y Sam mataban el cansancio en los taburetes de la gasolinera, cada sorbo de café era un castigo más que un alivio. La campanilla de la puerta sonó y, <span class="nudo-step" data-step="6">como una ráfaga de aire nuevo, entró Mary</span>. Llevaba una chaqueta de cuero desgastada, el cabello cayéndole en mechones indomables, y una sonrisa breve, casi traviesa, cuando preguntó si podía sentarse. Sus ojos —oscuros, incisivos— parecían medirlos, como si jugara a descubrir algo en ellos. Sam respondió antes que Tom, y en un instante los tres compartían mesa, conversación ligera y una sensación difusa de extraña familiaridad.</p>
        <p>Pero cuando el rugido de un tráiler atravesó el aire de la noche, algo en Mary se quebró. Su sonrisa se apagó de golpe, la mirada chispeante se volvió alerta, casi asustada. Dejó el vaso sin terminar y se dirigió al baño con pasos rápidos. Sam, confundido, la siguió. Tom alcanzó a ver un cruce de palabras tensas en la penumbra del pasillo… <span class="nudo-step" data-step="7">y después, nada.</span></p>
      `
    },
    // 4 (Pregunta)
    {
      id:4, isQuestion:true, bg:'assets/img/fondo-nudo-inconsciente.png',
      body: `
        <div class="question"><strong><span class="nudo-step" data-step="8">¿Qué te parece Mary?</span></strong></div>
        <div class="options">
          <button class="option-btn" data-goto="5">Me gusta, pero me da mala espina…</button>
          <button class="option-btn" data-goto="6">Me intriga su reacción, ¿por qué se asusta?</button>
          <button class="option-btn" data-goto="7">No quiero líos. Mi viaje es con Sam.</button>
        </div>
      `
    },
    // 5
    {
      id:5,
	  descr:'Por ejemplo, elegiste "Me gusta, pero me da mala espina..."',
      body: `
        <p>Un minuto después Mary regresó sola, como si nada hubiera pasado. Sam no. Tom esperó, inquieto, hasta que la impaciencia le obligó a levantarse. Recorrió el pasillo, llamó a la puerta del baño, buscó entre las sombras: vacío. <span class="nudo-step" data-step="9">Sam había desaparecido</span>...</p>
        <p>De vuelta al salón, Tom encaró a Mary.<br>—¿Qué hablasteis ahí dentro? —preguntó con voz tensa.<br>Mary bajó la mirada y se encogió de hombros. —Nada importante.</p>
        <p>La falta de respuestas encendió la alarma en Tom. Salieron juntos al exterior a buscarlo. Justo entonces, el rugido del tráiler volvió a retumbar. El camión arrancó con estruendo y comenzó a salir del aparcamiento de la gasolinera. El conductor, un hombre corpulento, giró el rostro hacia ellos. Sus ojos se encontraron con los de Tom, aunque por un instante él no supo si la mirada iba dirigida a él… o a Mary.</p>
        <p>El tráiler desaparecía en la curva. ¿Dónde estaba Sam?</p>
        <p class="footnote">Puedes volver a la pregunta o pasar la página para ver el siguiente tipo de Nudo: El Nudo Visible Consciente.</p>
        <div class="options">
          <button class="option-btn" data-goto="4">Volver a la pregunta</button>
          
        </div>
      `
    },
    // 6
    {
      id:6,
	  descr:'En este caso, elegiste "Me intriga su reacción, ¿por qué se asusta?"',
      body: `
        <p>Alarmado, salió a buscarlos. Entonces lo vio: Mary y Sam eran empujados hacia el tráiler por un hombre enorme, rostro hundido en sombras, la fuerza de sus brazos imponiendo un silencio brutal. Mary forcejeaba, pero no parecía solo miedo: había rabia también en sus ojos. <span class="nudo-step" data-step="10">Sam intentaba resistir, inútil</span>. El camión rugió, engulléndolos.</p>
        <p>Tom corrió, gritó, pero el asfalto devolvió su voz en vano. El tráiler se alejaba ya, doblando la curva con un bramido metálico. Con los dedos crispados, se lanzó al coche, giró la llave y hundió el pie en el acelerador.</p>
        <p class="footnote">Puedes volver a la pregunta o pasar la página para ver el siguiente tipo de Nudo: El Nudo Visible Consciente.</p>
        <div class="options">
          <button class="option-btn" data-goto="4">Volver a la pregunta</button>

        </div>
      `
    },
    // 7
    {
      id:7,
	  descr:'Si tu elección fue "No quiero líos. Mi viaje es con Sam.", quizás Sely no te hizo caso...',
      body: `
        <p>Pocos minutos más tarde, Sam regresó. Mary venía tras él, más pálida, con los ojos abiertos de par en par. Se susurraron algo que Tom no alcanzó a oír. Luego Sam, con gesto firme, dijo lo inevitable:<br>—<span class="nudo-step" data-step="11">Debe venir con nosotros.</span></p>
        <p>Tom se irguió de golpe. —¿Estás loco? Ni la conocemos.</p>
        <p>Mary no dijo nada; solo los miraba, con un temblor en los labios, casi suplicando en silencio. Sam se levantó, convencido, como si ya estuviera decidido desde antes. Tom meneó la cabeza, entre resignado y enfadado, consciente de que acababan de cruzar una línea de la que sería difícil volver.</p>
        <p class="footnote">Puedes volver a la pregunta o pasar la página para ver el siguiente tipo de Nudo: El Nudo Visible Consciente.</p>
        <div class="options">
          <button class="option-btn" data-goto="4">Volver a la pregunta</button>

        </div>
      `
    },
    // 8
    {
      id:8, title:'Ejemplo de Nudo Visible-Consciente',
      descr:'La historia continua y llegas a una situación crítica, una Encrucijada Clave en la que tienes que tomar partido de forma directa. Eso son los Nudos Visibles-Conscientes, que te expondrán a un dilema ético-moral. Veamos un ejemplo sencillo:',
      body: `
        <p>Tras varios minutos de polvo y piedras golpeando el parabrisas, la persecución terminó en seco: una cantera abandonada, iluminada por la luz mortecina de unos focos olvidados. El tráiler se detuvo. La puerta del copiloto se abrió con violencia: Mary bajó primero, temblando, y unos segundos después el camionero arrastró a Sam, sujetándolo por el cuello con una sola mano.</p>
        <p>Tom salió del coche de un salto, gritando:<br>—¡Suéltale! ¡Déjalos libres!</p>
        <p>El camionero, un gigante de sombras y sudor, sacudió la cabeza.<br>—No puedo. O es él… o Mary.</p>
        <p>Tom no entendió de inmediato, hasta que vio los dos puntos rojos moverse sobre el pecho de Mary. Miras láser. Estaba en la mira de francotiradores invisibles.</p>
        <p>Mary, con voz quebrada, no pudo contenerse más.<br>—¡Papá! ¡No lo hagas!</p>
        <p>El eco del grito se perdió en la cantera. Tom sintió un nudo en el estómago.</p>
        <p>El camionero apretó los dientes, con lágrimas brillando en su mirada endurecida.<br>—Lo siento, chico… Si no me llevo a tu amigo, ellos matarán a mi hija.</p>
        <p>El silencio se volvió insoportable. <span class="nudo-step" data-step="12">Tom, jadeando, con el corazón en un puño, comprendió que no había salida sin pagar un precio</span>. Tenía que decidir.</p>
      `
    },
    // 9 (Pregunta)
    {
      id:9, isQuestion:true, bg:'assets/img/fondo-nudo-consciente.jpg',
      body: `
        <div class="question"><strong>Tienes que tomar una decisión: <span class="nudo-step" data-step="13">¿Tratas de Salvar a Sam o a Mary?</span></strong></div>
        <div class="options">
          <button class="option-btn" data-goto="10">Salvo a Sam</button>
          <button class="option-btn" data-goto="10">Salvo a Mary</button>
        </div>
      `
    },
    // 10
    {
      id:10,
      body: `
        <p>Así termina el ejemplo (no la historia…). Lo importante de este tipo de Nudos, donde tu decisión sí es vinculante, es que ocurren en situaciones críticas o que suponen un dilema ético-moral.</p>
        <p><strong>Sely</strong> quiere que te involucres a un nivel emocional muy alto; por lo tanto, debes tomar decisiones y aceptar sus consecuencias.</p>
        <div class="options">
          <button class="option-btn" data-goto="9">Página anterior</button>
          <button class="option-btn" data-goto="1">Volver al inicio de la Simulación</button>
          <button class="option-btn" data-close="nudos">Cerrar Simulación</button>
        </div>
      `
    }
  ];

  // ===== Datos de tooltips =====
  // position: 'top' (encima), 'bottom' (debajo)
  const TIPS = {
    1:{ text:'Sely (la IA) creó tu perfil emocional en la configuración inicial y lo ha enriquecido con tus lecturas de este y otros stringbook. Conoce tus preferencias hacia ciertos personajes, por lo que llega preparada al Nudo Subliminal, que empieza aquí sin que lo notes.', position:'bottom' },
    2:{ text:'Entra un personaje importante en escena. Sely comienza a guardar tus reacciones y emociones sobre Mary. Si te gusta, no te gusta, sospechas, pena... Esa información se añade a lo que ya sabe de tí por tu perfil emocional.', position:'top' },
    3:{ text:'Y de pronto, algo que te empuja a tomar partido. La tensión de Mary, su preocupación, Celos hacia Sam que se ha adelantado, una alerta, ¿Mary necesita ayuda?', position:'bottom' },
    4:{ text:'Sely ya ha tomado su decisión. Ha analizado tus datos, emociones, tendencias y gustos, y ha elegido la ruta de la historia. Tenía tres opciones: que Sam y Mary regresaran y el viaje siguiera con los tres; que solo volviera Sam y juntos investigaseis la reacción de Mary, que subió al camión; o la tercera, la elegida: que te quedes solo, rumiando celos y forzándote a un debate interno —¿quién se lleva a Sam y Mary? ¿Por qué van juntos?...', position:'bottom' },
    5:{ text:'Y aunque no es el sitio adecuado, este momento es perfecto para recordarte las opciones Multimedia. Te has subido al coche: ¿quieres ver la persecución en un vídeo o prefieres condicir tu el coche?', position:'top' },
    6:{ text:'Al igual que en los Nudos Invisibles, Sely dispone de tu perfil completo, enriquecido con tu experiencia en otros stringbooks y las emociones recogidas en esta historia. Con la aparición de Mary, esas reacciones adquieren aún más peso.', position:'bottom' },
    7:{ text:'A diferencia del Nudo Invisible, donde no percibes la encrucijada, en el Nudo Visible-Consciente la lectura se interrumpe para pedir tu opinión o hacerte una pregunta. Haz clic en “siguiente página”.', position:'top' },
    8:{ text:'La consulta no busca que decidas la ruta, sino generar expectativa: que expreses emociones y opiniones. Pero tu respuesta no es vinculante. Si marcas “Me gusta…”, Sely no tiene por qué unir a Mary y Tom; quizá use ese deseo para intensificar otras emociones o llevarte por un camino distinto que, en el fondo, disfrutarás más.', position:'top' },
    9:{ text:'Por ejemplo, Sely detecta potencial en tu sospecha y elige la ruta en la que Sam, el mejor amigo de Tom, desaparece. Así Tom queda con una chica que le atrae, pero a la que vio discutir con Sam justo antes de perderle de vista. Sely quiere que convivas con la tensión de esa duda.', position:'bottom' },
    10:{ text:'O puede buscar provocar otras emociones, como la de soledad e incertidumbre, el miedo al ver cómo Sam y Mary se marchan, los Celos (en el fondo te gusta Mary, querrías haber segudo con ella)...', position:'bottom' },
    11:{ text:'Sely tiene como misión crear la mejor historia, aunque eso implique llevarte por rutas que no deseas. Tú preferirías seguir solo con Sam, sin Mary… ¿por qué insiste en que vayan los tres? Porque conoce tu perfil, tus gustos y tendencias, y sabe que por esa ruta vivirás una historia mucho mejor.', position:'top' },
    12:{ text:'A lo largo de la historia, Sely ha “escuchado” tus emociones y reacciones, conoce tus tendencias y personajes favoritos. Llegará un momento en que quiera ponerte a prueba, obligándote a decidir sin saber las consecuencias. Ese simple gesto le dará información valiosa para el futuro: tú vivirás situaciones críticas y Sely te conocerá cada vez mejor.', position:'top' },
    13:{ text:'Ese es el reto. Este es solo un ejemplo sencillo, pero ilustra la idea: deberás elegir sin saber qué implica tu decisión. Puede morir alguien o la ruta puede llevarte a subtramas inesperadas… pero tendrás que decidir, y tu elección tendrá consecuencias narrativas.', position:'top' }
  };

  let current = 1;
  let animating = false;

  function openIntroOverlay(){ intro.classList.add('is-open'); }
  function closeIntroOverlay(){ intro.classList.remove('is-open'); }

  function renderPage(id, direction){ // direction: 'next' | 'prev' | undefined
    const data = PAGES.find(p=>p.id===id); if(!data) return;

    // Animación de salida (si ya hay contenido)
    if(pageEl.innerHTML.trim() && direction && !animating){
      animating = true;
      pageEl.classList.remove('anim-next-in','anim-prev-in','anim-next-out','anim-prev-out');
      pageEl.classList.add(direction==='next' ? 'anim-next-out' : 'anim-prev-out');
      pageEl.addEventListener('animationend', ()=> {
        pageEl.classList.remove('anim-next-out','anim-prev-out');
        _inject(); // inyección y animación de entrada
      }, { once:true });
    } else {
      _inject();
    }

    function _inject(){
      // Fondo de pregunta (4 y 9) con ruta absoluta y sin color sepia debajo
		pageEl.classList.toggle('has-bg', !!data.isQuestion);

		if (data.isQuestion && data.bg) {
		  // Resuelve la ruta a absoluta en base a la URL del documento (respeta subcarpetas y <base>)
		  const abs = new URL(data.bg, document.baseURI).href;
		  pageEl.style.backgroundImage = `url("${abs}")`;
		  pageEl.style.backgroundColor = 'transparent';
		} else {
		  pageEl.style.backgroundImage = '';
		  pageEl.style.backgroundColor = '';
		}

      // Contenido
      const title = data.title ? `<h3>${data.title}</h3>` : '';
      const descr = data.descr ? `<p class="descr">${data.descr}</p>` : '';
      pageEl.innerHTML = `${title}${descr}${data.body}`;

      // Insertar icono info al final de cada frase marcada
      pageEl.querySelectorAll('.nudo-step').forEach(span=>{
        const i = document.createElement('i');
        i.className = 'fa-solid fa-circle-info nudo-icon';
        span.appendChild(i);
        span.addEventListener('click', ()=> openTip(span));
      });

      // Botones internos de opciones
      pageEl.querySelectorAll('.option-btn').forEach(btn=>{
        const goto = btn.getAttribute('data-goto');
        const close = btn.getAttribute('data-close');
        if(goto){
          btn.addEventListener('click', ()=> goTo(parseInt(goto,10), 'next'));
        }else if(close){
          btn.addEventListener('click', ()=> closeModal());
        }
      });

      // Estado de navegación global
//		current = id;
//		const isQ = !!data.isQuestion;        // páginas 4 y 9
//		prevBtn.disabled = isQ || (current === 1);
//		nextBtn.disabled = isQ || (current === PAGES[PAGES.length-1].id);
		// Estado de navegación global
		current = id;
		prevBtn.disabled = (current === 1);
		nextBtn.disabled = (current === PAGES[PAGES.length-1].id);


// Si existe nav inline, muéstralo/ocúltalo según sea pregunta o no
const inline = pageEl.querySelector('.nudos-nav-inline');
if (inline) inline.style.display = isQ ? 'none' : 'flex';

      // Animación de entrada
      if(direction){
        pageEl.classList.add(direction==='next' ? 'anim-next-in' : 'anim-prev-in');
        pageEl.addEventListener('animationend', ()=>{
          pageEl.classList.remove('anim-next-in','anim-prev-in');
          animating = false;
        }, { once:true });
      } else {
        animating = false;
      }
    }
  }

  function goTo(id, direction){
    if(animating || id===current) return;
    renderPage(id, direction || (id>current ? 'next' : 'prev'));
  }

  // Tooltip
  function openTip(target){
    const step = Number(target.getAttribute('data-step')||0);
    const data = TIPS[step]; if(!data) return;

    popoverTextEl.textContent = data.text;

    // Reset clases
    popover.className = 'tutorial-popover is-visible';
    let arrowClass = (data.position==='top') ? 'arrow-bottom' : 'arrow-top';

    // Posicionamiento relativo al viewport
    const rect = target.getBoundingClientRect();
    const pv   = popover.getBoundingClientRect();
    let top, left;

    if(data.position === 'top'){
      top = rect.top - pv.height - 12;
      left = rect.left + (rect.width/2) - (pv.width/2);
    }else{ // bottom
      top = rect.bottom + 12;
      left = rect.left + (rect.width/2) - (pv.width/2);
    }

    // clamp horizontal
    left = Math.max(10, Math.min(left, window.innerWidth - pv.width - 10));

    popover.style.top  = `${Math.max(10, top)}px`;
    popover.style.left = `${left}px`;
    popover.classList.add(arrowClass);

    // Ajuste flecha horizontal
    const arrowLeft = rect.left + (rect.width/2) - left;
    popoverArrowEl.style.left = `clamp(10px, ${arrowLeft}px, ${pv.width - 20}px)`;
    popoverArrowEl.style.top = '';
  }

  function hideTip(){
    popover.classList.remove('is-visible');
    popover.classList.add('is-hidden');
  }

  // Eventos globales
  nextBtn.addEventListener('click', ()=> goTo(Math.min(current+1, PAGES.length), 'next'));
  prevBtn.addEventListener('click', ()=> goTo(Math.max(current-1, 1), 'prev'));
  closeBtn.addEventListener('click', closeModal);
  openIntro.addEventListener('click', openIntroOverlay);
  startBtn.addEventListener('click', ()=>{ closeIntroOverlay(); renderPage(1); });

  // Cierre externo
  function closeModal(){
    // usa el manejador genérico de tu página: cambia aria-hidden
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('has-open-modal');
  }

  // Cierre por click fuera del popover
  document.addEventListener('click', (e)=>{
    if(!modal.contains(e.target)) return;
    const isStep = e.target.closest('.nudo-step'); 
    const isPopover = e.target.closest('#nudos-popover');
    if(!isStep && !isPopover) hideTip();
  });

  // Abrir intro automáticamente cuando abras el modal
  const obs = new MutationObserver(muts=>{
    muts.forEach(m=>{
      if(m.attributeName==='aria-hidden'){
        const open = modal.getAttribute('aria-hidden')==='false';
        if(open){
          openIntroOverlay();
          renderPage(1);
        }else{
          hideTip();
        }
      }
    });
  });
  obs.observe(modal, { attributes:true });

  // Botón Esc cierra popover (y el modal lo gestiona tu listener global)
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hideTip(); });

})();

// === NUDOS: maximizar lienzo, nav dentro del lienzo y páginas con fondo ===
(function NudosLayoutTweaks(){
  const modal = document.getElementById('sim-nudos-modal');
  if(!modal) return;

  const panel     = modal.querySelector('.nudos-sim-panel');
  const header    = modal.querySelector('.nudos-header');
  const reader    = modal.querySelector('#nudos-reader');
  const pageEl    = modal.querySelector('#nudos-page');
  const prevBtn   = modal.querySelector('#nudos-prev');   // existentes (los ocultamos abajo)
  const nextBtn   = modal.querySelector('#nudos-next');
  const closeBtn  = modal.querySelector('#nudos-close');  // lo ocultamos (ya hay X arriba)
  const footerNav = modal.querySelector('.nudos-footer__nav');

  // 1) Limpieza visual inmediata (sin esperar a CSS)
  if (closeBtn)  closeBtn.style.display = 'none';
  if (footerNav) footerNav.style.display = 'none';

  // 2) Crear nav inline dentro del lienzo (conecta con los botones prev/next existentes)
  function ensureInlineNav(){
    if (!pageEl) return;
    let nav = pageEl.querySelector('.nudos-nav-inline');
    if(!nav){
      nav = document.createElement('div');
      nav.className = 'nudos-nav-inline';
      nav.innerHTML = `
        <button type="button" class="nudos-btn nudos-btn--ghost" id="nudos-prev-in" aria-label="Página anterior">‹</button>
        <button type="button" class="nudos-btn nudos-btn--primary" id="nudos-next-in" aria-label="Siguiente página">›</button>
      `;
      pageEl.appendChild(nav);
      // Reutilizamos la lógica ya existente disparando los botones originales
      const prevIn = nav.querySelector('#nudos-prev-in');
      const nextIn = nav.querySelector('#nudos-next-in');
      prevIn.addEventListener('click', ()=> prevBtn && prevBtn.click());
      nextIn.addEventListener('click', ()=> nextBtn && nextBtn.click());
    }
    // Sincronizar estados habilitado/deshabilitado
    const prevIn = pageEl.querySelector('#nudos-prev-in');
    const nextIn = pageEl.querySelector('#nudos-next-in');
    if(prevIn && nextIn && prevBtn && nextBtn){
      prevIn.disabled = !!prevBtn.disabled;
      nextIn.disabled = !!nextBtn.disabled;
    }
  }

  // 3) Calcular altura máxima del lienzo (página de libro) y fijarla
  function setPageCanvasHeight(){
    if(!panel || !header || !pageEl) return;
    const panelH  = panel.clientHeight || window.innerHeight;
    const headerH = header.offsetHeight || 0;
    const topPad  = 12;   // padding superior del reader
    const bottom  = 16;   // margen/respiración inferior
    const target  = Math.max(280, panelH - headerH - topPad - bottom);
    pageEl.style.setProperty('--nudos-page-h', `${target}px`);
  }

  // 4) Cada vez que cambia el contenido de la página, reinyectamos nav inline y recalculamos
  const ro = new MutationObserver(() => {
    ensureInlineNav();
    setPageCanvasHeight();
  });
  ro.observe(pageEl, { childList: true, subtree: true });

  // 5) Al abrir el modal, ajustar; también al redimensionar
  function onOpenCheck(){
    if (modal.getAttribute('aria-hidden') === 'false'){
      setTimeout(() => {
        setPageCanvasHeight();
        ensureInlineNav();
      }, 16);
    }
  }
  const mo = new MutationObserver(onOpenCheck);
  mo.observe(modal, { attributes: true });

  window.addEventListener('resize', setPageCanvasHeight);

  // 6) Por seguridad, primer ajuste ahora
  setTimeout(() => { setPageCanvasHeight(); ensureInlineNav(); }, 0);
})();

