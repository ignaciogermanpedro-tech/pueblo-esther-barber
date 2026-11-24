/**
 * ============================================================================
 * CONFIGURACIÓN DE PRECIOS, SERVICIOS Y ENLACES — PUEBLO ESTHER'S BARBER SHOP
 * ============================================================================
 *
 * CÓMO ACTUALIZAR PRECIOS EN 30 SEGUNDOS:
 * 1. Buscá el nivel del barbero que querés modificar: "staff", "senior" o "director".
 * 2. Cambiá el número en el campo `precio` (sin puntos ni signo $, ej: 14000).
 *    La web agrega automáticamente el signo "$" y el separador de miles (ej: "$14.000").
 * 3. Para los Planes Prepagos, modificá `precioTotal` y `precioUnitario` (y opcionalmente `ahorro`).
 * 4. Guardá el archivo y subilo (o hacé push a GitHub para que Vercel actualice solo).
 * ============================================================================
 */

window.BARBER_CONFIG = {
  // Enlaces principales del negocio
  enlaces: {
    wonoma: "https://puebloesther.wonoma.com",
    whatsappNumero: "5493402595364",
    whatsappFlotanteTexto: "Hola! Quisiera hacer una consulta sobre los turnos.",
    instagram: "https://instagram.com/estherbarberoficial",
    googleMaps:
      "https://www.google.com/maps/place/Pueblo+Esther's+Barber+Shop/@-33.0802691,-60.591917,15z/data=!4m20!1m13!4m12!1m4!2m2!1d-60.5566762!2d-33.0805635!4e1!1m6!1m2!1s0x95b7092fe3a7ddd3:0xdc8f27cbe93b921a!2sPueblo+Esther's+Barber+Shop,+ruta+21+y,+12+de+Octubre,+S2126+Pueblo+Esther,+Santa+Fe,+Argentina!2m2!1d-60.5738944!2d-33.0802696!3m5!1s0x95b7092fe3a7ddd3:0xdc8f27cbe93b921a!8m2!3d-33.0802696!4d-60.5738944!16s%2Fg%2F11r113zpym",
  },

  // Niveles de experiencia, servicios individuales y planes prepagos
  niveles: [
    {
      id: "staff",
      etiquetaTab: "STAFF",
      barbero: "Maxi",
      tituloTab: "STAFF (Maxi)",
      subtitulo: "Prolijidad, técnica actualizada y atención dedicada en cada turno.",
      ctaTexto: "RESERVAR CON ESTE BARBERO",
      wonomaUrl: "https://puebloesther.wonoma.com",
      servicios: [
        {
          nombre: "Corte",
          descripcion: "Servicio individual regular",
          precio: 14000,
        },
        {
          nombre: "Corte y Barba",
          descripcion: "Combo completo",
          precio: 21000,
          destacado: true,
        },
        {
          nombre: "Full",
          descripcion: "Corte + mascarilla Black Mask",
          precio: 19000,
        },
        {
          nombre: "Arreglo o afeitado de barba",
          descripcion: "Perfilado, rebaje o afeitado clásico",
          precio: 12000,
        },
        {
          nombre: "Black Mask",
          descripcion: "Limpieza facial profunda",
          precio: 6000,
        },
      ],
      planes: [
        {
          nombre: "Plan Classic",
          detalle: "4 cortes",
          precioTotal: 48000,
          precioUnitario: 12000,
          ahorro: 8000,
          badge: "Congelá tu precio",
        },
        {
          nombre: "Plan Prime",
          detalle: "4 cortes + barba",
          precioTotal: 72000,
          precioUnitario: 18000,
          ahorro: 12000,
          badge: "Más elegido",
        },
      ],
    },
    {
      id: "senior",
      etiquetaTab: "SENIOR",
      barbero: "Facu",
      tituloTab: "SENIOR (Facu)",
      subtitulo: "Experiencia consolidada en cortes clásicos, fades modernos y perfilado.",
      ctaTexto: "RESERVAR CON ESTE BARBERO",
      wonomaUrl: "https://puebloesther.wonoma.com",
      servicios: [
        {
          nombre: "Corte",
          descripcion: "Servicio individual regular",
          precio: 15000,
        },
        {
          nombre: "Corte y Barba",
          descripcion: "Combo completo",
          precio: 22000,
          destacado: true,
        },
        {
          nombre: "Full",
          descripcion: "Corte + mascarilla Black Mask",
          precio: 20000,
        },
        {
          nombre: "Arreglo o afeitado de barba",
          descripcion: "Perfilado, rebaje o afeitado clásico",
          precio: 12000,
        },
        {
          nombre: "Black Mask",
          descripcion: "Limpieza facial profunda",
          precio: 6000,
        },
      ],
      planes: [
        {
          nombre: "Plan Classic",
          detalle: "4 cortes",
          precioTotal: 52000,
          precioUnitario: 13000,
          ahorro: 8000,
          badge: "Congelá tu precio",
        },
        {
          nombre: "Plan Prime",
          detalle: "4 cortes + barba",
          precioTotal: 76000,
          precioUnitario: 19000,
          ahorro: 12000,
          badge: "Más elegido",
        },
      ],
    },
    {
      id: "director",
      etiquetaTab: "DIRECTOR",
      barbero: "Nacho",
      tituloTab: "DIRECTOR (Nacho)",
      subtitulo: "Fundador del estudio. Asesoramiento integral y máximo nivel de detalle.",
      ctaTexto: "RESERVAR CON ESTE BARBERO",
      wonomaUrl: "https://puebloesther.wonoma.com",
      servicios: [
        {
          nombre: "Corte",
          descripcion: "Servicio individual regular",
          precio: 16000,
        },
        {
          nombre: "Corte y Barba",
          descripcion: "Combo completo",
          precio: 24000,
          destacado: true,
        },
        {
          nombre: "Full",
          descripcion: "Corte + mascarilla Black Mask",
          precio: 21000,
        },
        {
          nombre: "Arreglo o afeitado de barba",
          descripcion: "Perfilado, rebaje o afeitado clásico",
          precio: 12000,
        },
        {
          nombre: "Black Mask",
          descripcion: "Limpieza facial profunda",
          precio: 6000,
        },
      ],
      planes: [
        {
          nombre: "Plan Classic",
          detalle: "4 cortes",
          precioTotal: 56000,
          precioUnitario: 14000,
          ahorro: 8000,
          badge: "Congelá tu precio",
        },
        {
          nombre: "Plan Prime",
          detalle: "4 cortes + barba",
          precioTotal: 80000,
          precioUnitario: 20000,
          ahorro: 16000,
          badge: "Más elegido",
        },
      ],
    },
  ],
};
