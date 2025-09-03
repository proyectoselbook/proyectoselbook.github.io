/* =================================================================
   ARCHIVO DE SCRIPTS GENERALES: SCRIPTS.JS (VERSIÓN CON MEMORIA MEJORADA)
   ================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  
  const STORAGE_KEY = 'selbookVisitedLinks';

  /**
   * MÓDULO 1: LÓGICA DEL HEADER
   */
  function initializeHeader() {
    const routeBtn = document.getElementById('show-route');
    const routeContainer = document.getElementById('route-container');
    if (routeBtn && routeContainer) { 
      routeBtn.addEventListener('click', () => {
        routeContainer.classList.toggle('open');
      }); 
    }
  }

  /**
   * MÓDULO 2: LÓGICA DEL MENÚ LATERAL (SIDEBAR)
   */
  function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    let visitedLinks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // --- ¡CAMBIO CLAVE AQUÍ! ---
    // Función para guardar un ID de enlace como visitado.
    function saveVisitedLinkById(linkId) {
      if (linkId && !visitedLinks.includes(linkId)) {
        visitedLinks.push(linkId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedLinks));
      }
    }
    
    // Al cargar CUALQUIER página, intentamos marcarla como visitada.
    // Usamos el `data-current-page` que ya tienes en el body.
    const currentPageId = document.body.dataset.currentPage;
    saveVisitedLinkById(currentPageId);
    // --- FIN DEL CAMBIO CLAVE ---


    // Aplicar checks de visitado al cargar la página
    sidebar.querySelectorAll('.submenu a').forEach(link => {
      const linkId = link.dataset.subsection;
      if (linkId && visitedLinks.includes(linkId)) {
        link.classList.add('visited');
      }
    });
	
	//añadido por GPT5
	// Aplicar "visitado" también a enlaces directos (sin submenú)
	// Aplicar checks de visitado también a enlaces top-level (sin submenú)
	sidebar.querySelectorAll('.menu-item a[data-subsection]').forEach(function (link) {
	  var linkId = link.dataset.subsection;
	  if (linkId && visitedLinks.includes(linkId)) {
		link.classList.add('visited');
	  }
	});


    // Añadir listeners a los items del menú para desplegar
    sidebar.querySelectorAll('.menu-item').forEach(item => {
      const submenu = item.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const isAlreadyOpen = submenu.classList.contains('open');
          sidebar.querySelectorAll('.submenu.open').forEach(openSubmenu => {
            openSubmenu.classList.remove('open');
            openSubmenu.previousElementSibling.classList.remove('active');
          });
          if (!isAlreadyOpen) {
            submenu.classList.add('open');
            item.classList.add('active');
          }
        });

        // Al hacer clic en un enlace del menú, también guardamos (como respaldo)
        submenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            saveVisitedLinkById(link.dataset.subsection);
          });
        });
      }
    });
      
    // Comprobar y marcar secciones completadas
    sidebar.querySelectorAll('.menu-item').forEach(item => {
        const submenu = item.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
            const linksInSection = submenu.querySelectorAll('a');
            const allVisited = Array.from(linksInSection).every(l => l.classList.contains('visited'));
            if (allVisited && linksInSection.length > 0) {
                const titleSpan = item.querySelector('.section-title');
                if (titleSpan) {
                    titleSpan.classList.add('completed');
                }
            }
        }
    });

    // Auto-desplegar la sección activa
    const activeSectionName = document.body.dataset.activeSection;
    if (activeSectionName) {
      const activeMenuItem = sidebar.querySelector(`.menu-item[data-section-toggle="${activeSectionName}"]`);
      if (activeMenuItem) {
        activeMenuItem.click();
      }
    }
    
    // Resaltar el enlace de la página actual en el menú
     if (currentPageId) {
        // const currentLink = sidebar.querySelector(`.submenu a[data-subsection="${currentPageId}"]`);
		const currentLink = sidebar.querySelector(`.submenu a[data-subsection="${currentPageId}"], .menu-item a[data-subsection="${currentPageId}"]`);

        if (currentLink) {
          currentLink.classList.add('current-page');
        }
    }
  } 
  

  /**
   * MÓDULO 3: LÓGICA DEL CARRUSEL DE DIAPOSITIVAS
   */
  function initializeCarousel() {
    const viewport = document.getElementById('slider-viewport-v3');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (viewport && sliderWrapper) {
      const leftArrow = sliderWrapper.querySelector('.slider-arrow.left');
      const rightArrow = sliderWrapper.querySelector('.slider-arrow.right');
      const scrollAmount = 420;
      if (leftArrow && rightArrow) {
        rightArrow.addEventListener('click', () => { viewport.scrollLeft += scrollAmount; });
        leftArrow.addEventListener('click', () => { viewport.scrollLeft -= scrollAmount; });
      }
    }
  }


/**
   * MÓDULO 4: LÓGICA DE LA CAJA DE LUZ (LIGHTBOX)
   * AHORA USA LA CLASE '.image-full-width'
   */
  function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // --- LÍNEA MODIFICADA AQUÍ ---
    const imageTriggers = document.querySelectorAll('.image-full-width');

    imageTriggers.forEach(image => {
      image.addEventListener('click', () => {
        lightboxContent.src = image.src;
        lightbox.classList.add('active');
      });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => { lightboxContent.src = ''; }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
  }
/**
   * MÓDULO 5: LÓGICA DEL PANEL DESLIZANTE (SLIDEOUT)
   * Se ejecuta si hay un disparador en la página.
   
  function initializeSlideoutPanel() {
    const trigger = document.getElementById('recordatorio-trigger');
    const panel = document.getElementById('reminder-slideout');
    const overlay = document.getElementById('slideout-overlay');
    const closeButton = document.getElementById('slideout-close-button');

    // Si no existen los elementos necesarios, no hacemos nada.
    if (!trigger || !panel || !overlay || !closeButton) {
      return;
    }

    function openPanel() {
      panel.classList.add('active');
      overlay.classList.add('active');
    }

    function closePanel() {
      panel.classList.remove('active');
      overlay.classList.remove('active');
    }

    trigger.addEventListener('click', openPanel);
    closeButton.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
  }*/

/**
 * MÓDULO: SLIDEOUT MULTI-INSTANCIA (deslizantes laterales)
 * Uso: cada trigger lleva data-slideout-target con el selector del panel (#id o .clase)
 *      y data-slideout-overlay con el selector del overlay (opcional: por defecto '#slideout-overlay').
 */
function initializeSlideoutPanels() {
  // 1) Soporta múltiples triggers
  const triggers = document.querySelectorAll('[data-slideout-target]');
  if (!triggers.length) return;

  // 2) Overlay reutilizable (global) o por panel (opcional)
  //    Si no existe, no rompemos; solo no habrá oscurecimiento
  const defaultOverlay = document.querySelector('#slideout-overlay');

  // Funciones de abrir/cerrar
  const openPanel = (panel, overlay) => {
    if (!panel) return;
    panel.classList.add('active');
    if (overlay) overlay.classList.add('active');
  };
  const closePanel = (panel, overlay) => {
    if (!panel) return;
    panel.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  };

  // 3) Click en cada trigger -> abre su panel
  triggers.forEach(trigger => {
    const targetSelector = trigger.getAttribute('data-slideout-target');
    const overlaySelector = trigger.getAttribute('data-slideout-overlay');
    const panel = targetSelector ? document.querySelector(targetSelector) : null;
    const overlay = overlaySelector ? document.querySelector(overlaySelector) : defaultOverlay;

    if (!panel) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openPanel(panel, overlay);
    });
  });

  // 4) Cierre por botón dentro del panel (usa .slideout-close)
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.slideout-close');
    if (closeBtn) {
      const panel = closeBtn.closest('.slideout-panel');
      // Busca overlay asociado: prioriza el indicado en data-*, si no, usa el global
      const overlaySelector = panel?.getAttribute('data-slideout-overlay');
      const overlay = overlaySelector ? document.querySelector(overlaySelector) : defaultOverlay;
      closePanel(panel, overlay);
    }
  });

  // 5) Cierre al hacer clic en el overlay (cierra cualquier panel activo)
  if (defaultOverlay) {
    defaultOverlay.addEventListener('click', () => {
      document.querySelectorAll('.slideout-panel.active').forEach(p => closePanel(p, defaultOverlay));
    });
  }
}








/* =================================================================
   MÓDULO 6: LÓGICA DEL TIMELINE (VERSIÓN FINAL Y ROBUSTA)
   ================================================================= */
/**
   * MÓDULO 6: LÓGICA DEL TIMELINE INTERACTIVO (ACORDEÓN)
   * Controla los pasos desplegables y hace scroll automático con offset.
   */
function initializeJourneyAccordion() {
  const timeline = document.querySelector('.journey-timeline');
  if (!timeline) return;

  const steps = [...timeline.querySelectorAll('.journey-step')];

  // Cambia a true si en el futuro quieres volver al modo "acordeón" (cerrar otros).
  const AUTO_CLOSE_OTHERS = false;

  const waitNextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const scrollSnap = (headerEl) => headerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

  steps.forEach(step => {
    const header = step.querySelector('.step-header');
    const content = step.querySelector('.step-content');
    if (!header || !content) return;

    header.addEventListener('click', (e) => {
      const badLink = e.target.closest('a[href="#"]');
      if (badLink) e.preventDefault();

      const wasActive = step.classList.contains('active');

      // SOLO si quieres modo acordeón, cierra otros.
      if (AUTO_CLOSE_OTHERS) {
        steps.forEach(s => { if (s !== step) s.classList.remove('active'); });
      }

      // Abre/cierra SOLO el actual (sin tocar los demás)
      step.classList.toggle('active');

      // Si lo acabamos de abrir, alinea con offset tras estabilizar layout
      if (!wasActive) {
        waitNextFrame().then(() => scrollSnap(header));
      }
    });
  });

  // (Opcional) Botón "Cerrar todo"
  const closer = document.querySelector('[data-collapse-all]');
  if (closer) {
    closer.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
    });
  }
}








/**
   * MÓDULO 7: LÓGICA DE LA FICHA DE PRODUCTO (LIGHTBOX)
   */
function initializeProductLightbox() {
  const trigger = document.getElementById('palomas-trigger');
  const lightbox = document.getElementById('product-lightbox');
  
  if (!trigger || !lightbox) return;

  const closeButton = lightbox.querySelector('.lightbox-close');
  const tabButtons = lightbox.querySelectorAll('.tab-button');
  const tabPanels = lightbox.querySelectorAll('.tab-panel');

  function openLightbox() {
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  trigger.addEventListener('click', openLightbox);
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    // Se cierra solo si se hace clic en el fondo oscuro
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Lógica para las pestañas (tabs)
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Ocultar todo
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Mostrar el correcto
      const tabId = button.dataset.tab;
      const targetPanel = document.getElementById(`tab-${tabId}`);
      button.classList.add('active');
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}


(function(){
  const overlay = document.querySelector('.sb-overlay');
  const dialog  = document.querySelector('.sb-dialog');
  if (!overlay || !dialog) return; // por si esta página no usa el modal

  const titleEl = document.getElementById('sb-dialog-title');
  const contentEl = document.getElementById('sb-dialog-content');
  const typeEl = document.getElementById('sb-dialog-type');
  const closeBtn = dialog.querySelector('.sb-close');
  let lastFocus = null;

  function typeLabel(type){
    if (type === 'debate') return '💬 Debate';
    if (type === 'glossary') return '💡 Glosario';
    return '⭐ Punto clave';
  }

  function openDialog({title, content, type}){
    lastFocus = document.activeElement;
    titleEl.textContent = title || '';
    contentEl.textContent = content || '';
    typeEl.textContent = typeLabel(type);
    overlay.classList.add('is-open');
    dialog.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');
    dialog.focus();
  }
  function closeDialog(){
    overlay.classList.remove('is-open');
    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    (lastFocus && lastFocus.focus) && lastFocus.focus();
  }

  // Delegación: sirve para cualquier .sb-note de la página
  document.addEventListener('click', (e) => {
    const t = e.target.closest('.sb-note');
    if (t){
      e.preventDefault();
      openDialog({
        title: t.dataset.sbTitle,
        content: t.dataset.sbContent,
        type: t.dataset.sbType
      });
    }
    if (e.target === overlay || e.target === closeBtn) closeDialog();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.classList.contains('is-open')) closeDialog();
  });
})();



  // --- INICIALIZACIÓN DE TODOS LOS MÓDULOS ---
  initializeHeader();
  initializeSidebar();
  initializeCarousel();
  initializeLightbox();
  //initializeSlideoutPanel();
  initializeSlideoutPanels();
	initializeJourneyAccordion();
	initializeProductLightbox();
});