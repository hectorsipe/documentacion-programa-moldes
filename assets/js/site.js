/* Documentación de Gestión de Moldes · SIPE Informática
   Este archivo monta la cabecera, el menú lateral, el buscador, los enlaces
   "anterior / siguiente" y el visor de imágenes de todas las páginas.
   Para añadir una página: créala copiando otra y añádela a NAV. */

const NAV = [
  { seccion: "Empezar", paginas: [
    ["index.html", "Inicio"],
    ["recorrido.html", "Recorrido por el programa"],
    ["que-hace.html", "Qué hace el programa"],
    ["acceso.html", "Acceder y moverse por la aplicación"],
    ["guia-puesta-en-marcha.html", "Puesta en marcha: configurar la empresa"],
    ["listados.html", "Trabajar con los listados"],
  ]},
  { seccion: "Guías: presupuestos", paginas: [
    ["guia-presupuesto-crear.html", "Crear un presupuesto"],
    ["guia-presupuesto-estimar.html", "Estimar costes con detalle"],
    ["guia-presupuesto-ficha.html", "Rellenar la ficha técnica"],
    ["guia-presupuesto-versiones.html", "Versiones y duplicados"],
    ["guia-presupuesto-aprobar.html", "Aprobar y generar el proyecto"],
  ]},
  { seccion: "Guías: proyectos", paginas: [
    ["guia-proyecto-seguimiento.html", "Seguir un proyecto"],
    ["guia-proyecto-situacion.html", "Informar al cliente de la situación"],
    ["guia-proyecto-costes.html", "Controlar costes y beneficio"],
    ["guia-proyecto-cerrar.html", "Facturar y cerrar un proyecto"],
  ]},
  { seccion: "Guías: taller y compras", paginas: [
    ["guia-taller-fichar.html", "Fichar en el taller"],
    ["guia-produccion-revisar.html", "Revisar y corregir fichajes"],
    ["guia-compras-albaran.html", "Registrar un albarán de proveedor"],
    ["guia-compras-movil.html", "Albaranes desde el móvil"],
  ]},
  { seccion: "Guías: venta e informes", paginas: [
    ["guia-venta-albaran.html", "Emitir un albarán al cliente"],
    ["guia-informes.html", "Exportar listados e informes"],
  ]},
  { seccion: "Pantallas", paginas: [
    ["ref-presupuestos.html", "Presupuestos"],
    ["ref-proyectos.html", "Proyectos"],
    ["ref-produccion.html", "Producción"],
    ["ref-terminal.html", "Terminal de fichaje"],
    ["ref-albaranes-proyecto.html", "Albaranes de proyecto"],
    ["ref-albaranes-proveedor.html", "Albaranes de proveedor"],
    ["ref-clientes-proveedores.html", "Clientes y proveedores"],
    ["ref-configuracion.html", "Configuración"],
  ]},
  { seccion: "Ayuda", paginas: [
    ["faq.html", "Preguntas frecuentes"],
    ["glosario.html", "Glosario"],
    ["historial-versiones.html", "Historial de versiones"],
  ]},
];

(function () {
  const actual = (location.pathname.split("/").pop() || "index.html");
  const lista = NAV.flatMap(s => s.paginas.map(p => ({ url: p[0], titulo: p[1], seccion: s.seccion })));

  // Tema claro / oscuro recordado en este navegador
  try { const t = localStorage.getItem("tema"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

  // Cabecera
  const cab = document.createElement("header");
  cab.className = "cabecera";
  cab.innerHTML = `
    <button class="boton-icono boton-menu" aria-label="Abrir menú">☰</button>
    <a class="marca" href="index.html"><img src="img/logo-sipe.png" alt="SIPE Informática">
      <span>Gestión de Moldes<small>Documentación de uso</small></span></a>
    <div class="buscador">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="search" placeholder="Buscar… (fichar, versión, albarán)" aria-label="Buscar">
      <div class="resultados" role="listbox"></div>
    </div>
    <a class="enlace-recorrido" href="recorrido.html">Recorrido</a>
    <button class="boton-icono boton-tema" aria-label="Cambiar entre tema claro y oscuro" title="Tema claro / oscuro"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg></button>`;
  document.body.prepend(cab);

  // Menú lateral
  const menu = document.createElement("nav");
  menu.className = "menu";
  menu.innerHTML = NAV.map(s => `<h3>${s.seccion}</h3>` + s.paginas.map(p =>
    `<a href="${p[0]}"${p[0] === actual ? ' class="actual"' : ""}>${p[1]}</a>`).join("")).join("");
  cab.after(menu);
  cab.querySelector(".boton-menu").onclick = () => menu.classList.toggle("abierto");
  cab.querySelector(".boton-tema").onclick = () => {
    const oscuro = getComputedStyle(document.documentElement).getPropertyValue("--fondo").trim().toLowerCase() !== "#ffffff";
    const nuevo = oscuro ? "light" : "dark";
    document.documentElement.dataset.theme = nuevo;
    try { localStorage.setItem("tema", nuevo); } catch (e) {}
  };
  const enMenu = menu.querySelector(".actual");
  if (enMenu) enMenu.scrollIntoView({ block: "center" });

  // Migas, anterior / siguiente y pie
  const art = document.querySelector("article");
  const i = lista.findIndex(p => p.url === actual);
  if (art && i >= 0) {
    if (actual !== "index.html") {
      const m = document.createElement("div");
      m.className = "migas"; m.textContent = lista[i].seccion;
      art.prepend(m);
    }
    const ant = lista[i - 1], sig = lista[i + 1];
    const nav = document.createElement("div");
    nav.className = "anterior-siguiente";
    nav.innerHTML = (ant ? `<a href="${ant.url}"><small>← Anterior</small>${ant.titulo}</a>` : "<span></span>") +
                    (sig ? `<a href="${sig.url}" style="text-align:right"><small>Siguiente →</small>${sig.titulo}</a>` : "");
    art.append(nav);
    const pie = document.createElement("p");
    pie.className = "pie";
    pie.innerHTML = "Gestión de Moldes · SIPE Informática S.L. · <a href=\"https://sipeinformatica.com\">sipeinformatica.com</a>";
    art.append(pie);
  }

  // Visor de imágenes
  const visor = document.createElement("div");
  visor.className = "visor"; visor.innerHTML = "<img alt=''>";
  document.body.append(visor);
  visor.onclick = () => visor.classList.remove("abierto");
  document.addEventListener("keydown", e => { if (e.key === "Escape") visor.classList.remove("abierto"); });
  document.querySelectorAll("figure img").forEach(img => img.addEventListener("click", () => {
    visor.querySelector("img").src = img.src; visor.querySelector("img").alt = img.alt; visor.classList.add("abierto");
  }));

  // Buscador: lee las páginas la primera vez que se usa y busca en su texto
  const input = cab.querySelector(".buscador input");
  const caja = cab.querySelector(".resultados");
  const normal = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  let indice = null, cargando = null, seleccion = -1;
  function cargar() {
    if (indice) return Promise.resolve(indice);
    if (cargando) return cargando;
    cargando = Promise.all(lista.map(p => fetch(p.url).then(r => r.text()).then(html => {
      html = html.replace(/<\/(p|li|td|th|h\d|figcaption|summary|div|tr|span)>/g, " $&");
      const doc = new DOMParser().parseFromString(html, "text/html");
      const a = doc.querySelector("article");
      const titulos = [...(a ? a.querySelectorAll("h2, h3") : [])].map(h => ({ texto: h.textContent, id: h.id }));
      const texto = a ? a.textContent.replace(/\s+/g, " ") : "";
      return { ...p, texto, norm: normal(texto), titulos };
    }).catch(() => null))).then(r => (indice = r.filter(Boolean)));
    return cargando;
  }
  function resaltar(texto, palabras) {
    let t = texto.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    palabras.forEach(w => {
      const re = new RegExp("(" + w.split("").map(ch => ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[\\u0300-\\u036f]*") + ")", "gi");
      t = t.normalize("NFD").replace(re, "<mark>$1</mark>").normalize("NFC");
    });
    return t;
  }
  function buscar() {
    const q = normal(input.value.trim());
    if (q.length < 2) { caja.classList.remove("abierto"); return; }
    const palabras = q.split(/\s+/).filter(w => w.length > 1);
    cargar().then(idx => {
      const res = idx.map(p => {
        let puntos = 0;
        const nt = normal(p.titulo);
        for (const w of palabras) {
          if (!p.norm.includes(w) && !nt.includes(w)) return null;
          if (nt.includes(w)) puntos += 10;
          puntos += Math.min(10, p.norm.split(w).length - 1);
          if (p.titulos.some(h => normal(h.texto).includes(w))) puntos += 4;
        }
        const pos = p.norm.indexOf(palabras[0]);
        const ini = Math.max(0, pos - 60);
        const trozo = (ini > 0 ? "…" : "") + p.texto.substr(ini, 170) + "…";
        const sub = p.titulos.find(h => h.id && palabras.some(w => normal(h.texto).includes(w)));
        return { p, puntos, trozo, ancla: sub ? "#" + sub.id : "" };
      }).filter(Boolean).sort((a, b) => b.puntos - a.puntos).slice(0, 8);
      seleccion = -1;
      caja.innerHTML = res.length ? res.map(r =>
        `<a href="${r.p.url}${r.ancla}"><b>${r.p.titulo}</b><span>${resaltar(r.trozo, palabras)}</span></a>`).join("")
        : `<div class="vacio">No hay resultados. Prueba con otra palabra o consulta las <a href="faq.html">preguntas frecuentes</a>.</div>`;
      caja.classList.add("abierto");
    });
  }
  input.addEventListener("focus", cargar);
  input.addEventListener("input", buscar);
  input.addEventListener("keydown", e => {
    const items = [...caja.querySelectorAll("a")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      seleccion = Math.max(0, Math.min(items.length - 1, seleccion + (e.key === "ArrowDown" ? 1 : -1)));
      items.forEach((a, k) => a.classList.toggle("activo", k === seleccion));
    } else if (e.key === "Enter" && items.length) {
      location.href = (items[seleccion] || items[0]).href;
    } else if (e.key === "Escape") { caja.classList.remove("abierto"); input.blur(); }
  });
  document.addEventListener("click", e => { if (!cab.querySelector(".buscador").contains(e.target)) caja.classList.remove("abierto"); });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input) { e.preventDefault(); input.focus(); }
  });
})();
