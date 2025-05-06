// Animación de aparición para las cards y el botón principal
window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const ctaBtn = document.querySelector('.cta-btn');

  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(40px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });

  if (ctaBtn) {
    ctaBtn.style.opacity = 0;
    ctaBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      ctaBtn.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
      ctaBtn.style.opacity = 1;
      ctaBtn.style.transform = 'scale(1)';
    }, 400);
  }

  const openMenuBtn = document.getElementById('open-menu');
  const closeMenuBtn = document.getElementById('close-menu');
  const sideMenu = document.getElementById('side-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openMenuBtn && closeMenuBtn && sideMenu && menuOverlay) {
    openMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
  }
});

// Efecto de foco en el buscador
const searchInputHeader = document.querySelector('.search');
if (searchInputHeader) {
  searchInputHeader.addEventListener('focus', () => {
    searchInputHeader.style.boxShadow = '0 0 0 2px #80e6c5';
  });
  searchInputHeader.addEventListener('blur', () => {
    searchInputHeader.style.boxShadow = 'none';
  });
}

// Buscador de estaciones con sugerencias
const estaciones = [
  "Madrid Puerta de Atocha",
  "Barcelona Sants",
  "Sevilla Santa Justa",
  "Valencia Joaquín Sorolla",
  "Málaga María Zambrano",
  "Zaragoza Delicias",
  "Alicante-Terminal",
  "Córdoba Central",
  "Bilbao Abando",
  "Santiago de Compostela"
];
const stationSearchInput = document.getElementById('station-search');
const stationSuggestionsList = document.getElementById('station-suggestions');

if (stationSearchInput && stationSuggestionsList) {
  let currentFocus = -1;
  stationSearchInput.addEventListener('input', function() {
    const value = this.value.trim().toLowerCase();
    stationSuggestionsList.innerHTML = '';
    if (!value) {
      stationSuggestionsList.classList.remove('visible');
      return;
    }
    const filtered = estaciones.filter(est => est.toLowerCase().includes(value));
    if (filtered.length === 0) {
      stationSuggestionsList.classList.remove('visible');
      return;
    }
    filtered.forEach((est, idx) => {
      const li = document.createElement('li');
      li.textContent = est;
      li.addEventListener('mousedown', function(e) {
        e.preventDefault();
        stationSearchInput.value = est;
        stationSuggestionsList.classList.remove('visible');
      });
      stationSuggestionsList.appendChild(li);
    });
    stationSuggestionsList.classList.add('visible');
    currentFocus = -1;
  });

  stationSearchInput.addEventListener('keydown', function(e) {
    const items = stationSuggestionsList.querySelectorAll('li');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      currentFocus++;
      if (currentFocus >= items.length) currentFocus = 0;
      setActive(items, currentFocus);
    } else if (e.key === 'ArrowUp') {
      currentFocus--;
      if (currentFocus < 0) currentFocus = items.length - 1;
      setActive(items, currentFocus);
    } else if (e.key === 'Enter') {
      if (currentFocus > -1) {
        e.preventDefault();
        items[currentFocus].dispatchEvent(new Event('mousedown'));
      }
    }
  });

  document.addEventListener('click', function(e) {
    if (!stationSearchInput.contains(e.target) && !stationSuggestionsList.contains(e.target)) {
      stationSuggestionsList.classList.remove('visible');
    }
  });
}
function setActive(items, idx) {
  items.forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

// Buscador de la hero con sugerencias
const heroEstaciones = [
  "Madrid Puerta de Atocha",
  "Barcelona Sants",
  "Sevilla Santa Justa",
  "Valencia Joaquín Sorolla",
  "Málaga María Zambrano",
  "Zaragoza Delicias",
  "Alicante-Terminal",
  "Córdoba Central",
  "Bilbao Abando",
  "Santiago de Compostela"
];
const heroSearchInput = document.getElementById('hero-station-search');
const heroSuggestionsList = document.getElementById('hero-station-suggestions');

if (heroSearchInput && heroSuggestionsList) {
  let currentFocus = -1;
  heroSearchInput.addEventListener('input', function() {
    const value = this.value.trim().toLowerCase();
    heroSuggestionsList.innerHTML = '';
    if (!value) {
      heroSuggestionsList.classList.remove('visible');
      return;
    }
    const filtered = heroEstaciones.filter(est => est.toLowerCase().includes(value));
    if (filtered.length === 0) {
      heroSuggestionsList.classList.remove('visible');
      return;
    }
    filtered.forEach((est, idx) => {
      const li = document.createElement('li');
      li.textContent = est;
      li.addEventListener('mousedown', function(e) {
        e.preventDefault();
        heroSearchInput.value = est;
        heroSuggestionsList.classList.remove('visible');
      });
      heroSuggestionsList.appendChild(li);
    });
    heroSuggestionsList.classList.add('visible');
    currentFocus = -1;
  });

  heroSearchInput.addEventListener('keydown', function(e) {
    const items = heroSuggestionsList.querySelectorAll('li');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      currentFocus++;
      if (currentFocus >= items.length) currentFocus = 0;
      setActiveHero(items, currentFocus);
    } else if (e.key === 'ArrowUp') {
      currentFocus--;
      if (currentFocus < 0) currentFocus = items.length - 1;
      setActiveHero(items, currentFocus);
    } else if (e.key === 'Enter') {
      if (currentFocus > -1) {
        e.preventDefault();
        items[currentFocus].dispatchEvent(new Event('mousedown'));
      }
    }
  });

  document.addEventListener('click', function(e) {
    if (!heroSearchInput.contains(e.target) && !heroSuggestionsList.contains(e.target)) {
      heroSuggestionsList.classList.remove('visible');
    }
  });
}
function setActiveHero(items, idx) {
  items.forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

// Modal de selección de idioma (nuevo modal grande)
const langModal = document.getElementById('lang-modal');
const openLangBtn = document.getElementById('open-lang-modal');
const closeLangBtn = document.getElementById('close-lang-modal');
if (openLangBtn && langModal) {
  openLangBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langModal.classList.add('open');
    openLangBtn.classList.add('active');
  });
  if (closeLangBtn) {
    closeLangBtn.addEventListener('click', function() {
      langModal.classList.remove('open');
      openLangBtn.classList.remove('active');
    });
  }
  langModal.addEventListener('click', function(e) {
    if (e.target === langModal) {
      langModal.classList.remove('open');
      openLangBtn.classList.remove('active');
    }
  });
  langModal.querySelectorAll('.lang-modal-item').forEach(btn => {
    btn.addEventListener('click', function() {
      langModal.classList.remove('open');
      openLangBtn.classList.remove('active');
    });
  });
}

// Panel lateral de selección de idioma
const langSidePanel = document.getElementById('lang-modal');
const langSidePanelOverlay = document.getElementById('lang-modal-overlay');
const langPanelBtn = document.getElementById('open-lang-modal');
const langPanelCloseBtn = document.getElementById('close-lang-modal');
if (langPanelBtn && langSidePanel) {
  langPanelBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langSidePanel.classList.add('open');
    langPanelBtn.classList.add('active');
  });
  if (langPanelCloseBtn) {
    langPanelCloseBtn.addEventListener('click', function() {
      langSidePanel.classList.remove('open');
      langPanelBtn.classList.remove('active');
    });
  }
  if (langSidePanelOverlay) {
    langSidePanelOverlay.addEventListener('click', function() {
      langSidePanel.classList.remove('open');
      langPanelBtn.classList.remove('active');
    });
  }
  langSidePanel.querySelectorAll('.lang-modal-item').forEach(btn => {
    btn.addEventListener('click', function() {
      langSidePanel.classList.remove('open');
      langPanelBtn.classList.remove('active');
    });
  });
}

// Panel lateral de búsqueda - IMPLEMENTACIÓN MEJORADA
document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('open-search-modal');
  const searchPanel = document.getElementById('search-modal');
  const closeBtn = document.getElementById('close-search-modal');
  const overlay = document.getElementById('search-modal-overlay');
  const searchInput = document.getElementById('search-input');
  
  console.log('Elementos de búsqueda detectados (nueva implementación):', {
    button: searchBtn,
    panel: searchPanel,
    close: closeBtn,
    overlay: overlay,
    input: searchInput
  });
  
  if (searchBtn && searchPanel) {
    // Abrir panel
    searchBtn.addEventListener('click', function(e) {
      console.log('Abriendo panel de búsqueda');
      e.preventDefault();
      e.stopPropagation();
      searchPanel.classList.add('open');
      
      // Enfocar el campo de búsqueda
      if (searchInput) {
        setTimeout(function() {
          searchInput.focus();
        }, 400);
      }
    });
    
    // Cerrar panel con botón de cierre
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        console.log('Cerrando panel de búsqueda (botón)');
        searchPanel.classList.remove('open');
      });
    }
    
    // Cerrar panel con overlay
    if (overlay) {
      overlay.addEventListener('click', function() {
        console.log('Cerrando panel de búsqueda (overlay)');
        searchPanel.classList.remove('open');
      });
    }
    
    // Cerrar panel con ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchPanel.classList.contains('open')) {
        console.log('Cerrando panel de búsqueda (escape)');
        searchPanel.classList.remove('open');
      }
    });
    
    // Buscar al presionar Enter
    if (searchInput) {
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          console.log('Realizando búsqueda: ' + searchInput.value);
          // Implementar lógica de búsqueda aquí
        }
      });
    }
    
    // Asegurarse de que el botón sea clickeable
    searchBtn.style.cursor = 'pointer';
    
    console.log('Eventos del panel de búsqueda configurados correctamente');
  } else {
    console.error('No se encontraron los elementos necesarios para el panel de búsqueda');
  }
}); 