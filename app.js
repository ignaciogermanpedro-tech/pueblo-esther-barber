/**
 * ============================================================================
 * LÓGICA PRINCIPAL — PUEBLO ESTHER'S BARBER SHOP
 * JavaScript Vanilla (0 dependencias)
 * - Tracking de conversiones Meta Pixel (fbq) y Google Tag Manager (dataLayer)
 * - Pestañas interactivas de Servicios y Planes Prepagos desde servicios.js
 * - Menú móvil accesible y navbar reactiva al scroll
 * - Fallbacks elegantes para imágenes aún no cargadas
 * - Resaltado dinámico del día actual en la tabla de horarios
 * ============================================================================
 */

(function () {
  "use strict";

  const config = window.BARBER_CONFIG;

  /* --------------------------------------------------------------------------
     1. TRACKING DE CONVERSIONES (META PIXEL + GTM DATALAYER)
     -------------------------------------------------------------------------- */
  function trackConversion(eventName, details) {
    const payload = details || {};

    // Meta Pixel (fbq): dispara solo si el píxel fue cargado en el <head>
    if (typeof window.fbq === "function") {
      try {
        window.fbq("track", eventName, payload);
      } catch (err) {
        // Evita interrumpir la navegación si un bloqueador intercepta fbq
      }
    }

    // Google Tag Manager (dataLayer): compatible si se instala GTM en el futuro
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "barber_" + eventName.toLowerCase(),
        conversion_type: eventName,
        ...payload,
      });
    }
  }

  // Exponemos la función por si se quiere invocar desde GTM o atributos inline
  window.trackConversion = trackConversion;

  // Delegación global de clicks para todos los botones con data-track
  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-track]");
    if (!trigger) return;

    const eventName = trigger.getAttribute("data-track");
    const label = trigger.getAttribute("data-track-label") || trigger.textContent.trim();

    if (eventName === "Schedule" || eventName === "Contact") {
      trackConversion(eventName, {
        content_name: label,
      });
    }
  });

  /* --------------------------------------------------------------------------
     2. FORMATEO DE MONEDA ARGENTINA ($14.000)
     -------------------------------------------------------------------------- */
  const arsFormatter = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 0,
  });

  function formatPrice(value) {
    return "$" + arsFormatter.format(Number(value) || 0);
  }

  /* --------------------------------------------------------------------------
     3. PESTAÑAS DE SERVICIOS Y PLANES PREPAGOS
     -------------------------------------------------------------------------- */
  const tabListEl = document.getElementById("services-tablist");
  const panelEl = document.getElementById("services-panel");
  let activeTierId = config && config.niveles && config.niveles[0] ? config.niveles[0].id : "staff";

  function renderTabs() {
    if (!tabListEl || !config || !Array.isArray(config.niveles)) return;

    tabListEl.innerHTML = config.niveles
      .map(function (nivel) {
        const isActive = nivel.id === activeTierId;
        return `
          <button
            type="button"
            role="tab"
            id="tab-${nivel.id}"
            aria-selected="${isActive ? "true" : "false"}"
            aria-controls="services-panel"
            data-tier-id="${nivel.id}"
            tabindex="${isActive ? "0" : "-1"}"
            class="group relative flex-1 min-w-0 px-3 sm:px-5 py-3.5 rounded-lg text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
              isActive
                ? "bg-[#D4AF37] text-[#0D0D0D] shadow-lg shadow-[#D4AF37]/15"
                : "text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#1E1E1E]"
            }"
          >
            <span class="block font-display text-sm sm:text-base font-bold tracking-[0.12em] uppercase leading-tight">
              ${nivel.etiquetaTab}
            </span>
            <span class="block text-xs mt-0.5 font-medium ${
              isActive ? "text-[#0D0D0D]/80" : "text-[#737373] group-hover:text-[#A3A3A3]"
            }">
              (${nivel.barbero})
            </span>
          </button>
        `;
      })
      .join("");
  }

  function renderPanel(tierId) {
    if (!panelEl || !config || !Array.isArray(config.niveles)) return;

    const nivel =
      config.niveles.find(function (item) {
        return item.id === tierId;
      }) || config.niveles[0];

    if (!nivel) return;

    const serviciosHtml = nivel.servicios
      .map(function (servicio) {
        return `
          <li class="flex items-center justify-between gap-4 py-4 border-b border-[#262626] last:border-b-0">
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-base sm:text-lg font-semibold text-[#F5F5F5]">
                  ${servicio.nombre}
                </h3>
                ${
                  servicio.destacado
                    ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">Popular</span>`
                    : ""
                }
              </div>
              <p class="text-sm text-[#A3A3A3] mt-0.5">${servicio.descripcion}</p>
            </div>
            <div class="shrink-0 text-right">
              <span class="font-display text-xl sm:text-2xl font-bold tracking-wide text-[#F5F5F5]">
                ${formatPrice(servicio.precio)}
              </span>
            </div>
          </li>
        `;
      })
      .join("");

    const planesHtml = nivel.planes
      .map(function (plan) {
        return `
          <div class="relative rounded-xl border border-[#D4AF37]/50 plan-card-glow p-5 sm:p-6 flex flex-col justify-between gap-4 transition-colors duration-200 hover:border-[#D4AF37]">
            <div class="flex items-start justify-between gap-3">
              <div>
                <span class="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] mb-1.5">
                  ${plan.badge || "Plan Prepago"}
                </span>
                <h4 class="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#F5F5F5]">
                  ${plan.nombre}
                </h4>
                <p class="text-sm text-[#A3A3A3] mt-0.5">${plan.detalle}</p>
              </div>
              ${
                plan.ahorro
                  ? `<span class="shrink-0 inline-flex items-center rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-2.5 py-1 text-[11px] font-semibold text-[#E5C158]">
                      Ahorrás ${formatPrice(plan.ahorro)}
                    </span>`
                  : ""
              }
            </div>
            <div class="pt-3 border-t border-[#262626] flex items-baseline justify-between gap-3">
              <span class="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                ${formatPrice(plan.precioTotal)}
              </span>
              <span class="text-xs sm:text-sm font-medium text-[#D4D4D4] bg-[#202020] px-2.5 py-1 rounded-md border border-[#2E2E2E]">
                ${formatPrice(plan.precioUnitario)} c/u
              </span>
            </div>
          </div>
        `;
      })
      .join("");

    const wonomaLink = nivel.wonomaUrl || (config.enlaces && config.enlaces.wonoma) || "https://puebloesther.wonoma.com";

    panelEl.setAttribute("aria-labelledby", "tab-" + nivel.id);
    panelEl.innerHTML = `
      <div class="tab-panel-animate">
        <!-- Cabecera del barbero seleccionado -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5 mb-2 border-b border-[#262626]">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Nivel seleccionado
            </p>
            <h3 class="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] mt-0.5">
              ${nivel.tituloTab}
            </h3>
          </div>
          <p class="text-sm text-[#A3A3A3] max-w-md sm:text-right">
            ${nivel.subtitulo}
          </p>
        </div>

        <!-- Lista de servicios individuales -->
        <ul class="divide-y divide-[#262626]" aria-label="Servicios individuales ${nivel.tituloTab}">
          ${serviciosHtml}
        </ul>

        <!-- Bloque destacado de Planes Prepagos -->
        <div class="mt-8 rounded-2xl border border-[#D4AF37]/60 bg-[#121212] p-5 sm:p-7">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div class="flex items-center gap-2.5">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30" aria-hidden="true">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <h4 class="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#F5F5F5]">
                  Planes Prepagos
                </h4>
                <p class="text-xs sm:text-sm text-[#A3A3A3]">
                  Pagás 4 servicios juntos, ahorrás y congelás tu precio.
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${planesHtml}
          </div>
        </div>

        <!-- CTA principal del barbero -->
        <div class="mt-7">
          <a
            href="${wonomaLink}"
            target="_blank"
            rel="noopener noreferrer"
            data-track="Schedule"
            data-track-label="Reservar ${nivel.tituloTab}"
            class="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] active:scale-[0.99] text-[#0D0D0D] font-bold text-sm sm:text-base tracking-[0.08em] uppercase px-6 py-4 transition-all duration-200 shadow-lg shadow-[#D4AF37]/15"
          >
            <span>${nivel.ctaTexto}</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p class="text-center text-xs text-[#737373] mt-3">
            Reserva online inmediata vía Wonoma · Elegí día y horario sin esperas
          </p>
        </div>
      </div>
    `;
  }

  function selectTier(tierId) {
    if (!tierId || tierId === activeTierId) return;
    activeTierId = tierId;
    renderTabs();
    renderPanel(activeTierId);
  }

  if (tabListEl) {
    tabListEl.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-tier-id]");
      if (!btn) return;
      selectTier(btn.getAttribute("data-tier-id"));
    });

    // Navegación accesible con teclado (flechas izquierda/derecha)
    tabListEl.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const tabs = Array.from(tabListEl.querySelectorAll('[role="tab"]'));
      const currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      event.preventDefault();
      const nextIndex =
        event.key === "ArrowRight"
          ? (currentIndex + 1) % tabs.length
          : (currentIndex - 1 + tabs.length) % tabs.length;

      const nextTab = tabs[nextIndex];
      selectTier(nextTab.getAttribute("data-tier-id"));
      const refreshedTab = document.getElementById(nextTab.id);
      if (refreshedTab) refreshedTab.focus();
    });
  }

  // Permite seleccionar el nivel directamente desde las tarjetas de "Nuestro Equipo"
  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-select-tier]");
    if (!trigger) return;
    const tierId = trigger.getAttribute("data-select-tier");
    if (tierId) {
      selectTier(tierId);
    }
  });

  // Render inicial de pestañas y contenido
  renderTabs();
  renderPanel(activeTierId);

  /* --------------------------------------------------------------------------
     4. MENÚ MÓVIL Y NAVBAR SCROLL
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  function setMobileMenu(open) {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.classList.toggle("hidden", !open);
    mobileMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (iconOpen) iconOpen.classList.toggle("hidden", open);
    if (iconClose) iconClose.classList.toggle("hidden", !open);
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      const isCurrentlyHidden = mobileMenu.classList.contains("hidden");
      setMobileMenu(isCurrentlyHidden);
    });

    // Cerrar al hacer click en cualquier enlace interno del menú móvil
    mobileMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMobileMenu(false);
      }
    });

    // Cerrar con tecla Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMobileMenu(false);
      }
    });
  }

  function onScrollNavbar() {
    if (!navbar) return;
    if (window.scrollY > 24) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  window.addEventListener("scroll", onScrollNavbar, { passive: true });
  onScrollNavbar();

  /* --------------------------------------------------------------------------
     5. FALLBACK ELEGANTE PARA IMÁGENES AÚN NO SUBIDAS
     -------------------------------------------------------------------------- */
  function attachImageFallbacks() {
    const images = document.querySelectorAll("img[data-fallback]");
    images.forEach(function (img) {
      const fallbackId = img.getAttribute("data-fallback");
      const fallbackEl = fallbackId ? document.getElementById(fallbackId) : null;

      function showFallback() {
        img.classList.add("hidden");
        if (fallbackEl) {
          fallbackEl.classList.remove("hidden");
          fallbackEl.classList.add("flex");
        }
      }

      function showImage() {
        img.classList.remove("hidden");
        if (fallbackEl) {
          fallbackEl.classList.add("hidden");
          fallbackEl.classList.remove("flex");
        }
      }

      img.addEventListener("error", showFallback);
      img.addEventListener("load", function () {
        if (img.naturalWidth > 0) {
          showImage();
        } else {
          showFallback();
        }
      });

      // Si la imagen ya falló antes de que corra este script
      if (img.complete) {
        if (img.naturalWidth === 0) {
          showFallback();
        } else {
          showImage();
        }
      }
    });
  }

  attachImageFallbacks();

  /* --------------------------------------------------------------------------
     6. RESALTADO DEL DÍA ACTUAL EN HORARIOS
     -------------------------------------------------------------------------- */
  function highlightTodaySchedule() {
    const day = new Date().getDay(); // 0: Dom, 1: Lun, 2-5: Mar-Vie, 6: Sab
    const rows = document.querySelectorAll("[data-schedule-days]");
    rows.forEach(function (row) {
      const days = row
        .getAttribute("data-schedule-days")
        .split(",")
        .map(Number);

      if (days.includes(day)) {
        row.classList.add("border-[#D4AF37]/40", "bg-[#D4AF37]/[0.06]");
        const badge = row.querySelector("[data-today-badge]");
        if (badge) badge.classList.remove("hidden");
      }
    });
  }

  highlightTodaySchedule();

  /* --------------------------------------------------------------------------
     7. ANIMACIÓN SUTIL AL HACER SCROLL (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* --------------------------------------------------------------------------
     8. AÑO DINÁMICO EN EL FOOTER
     -------------------------------------------------------------------------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
