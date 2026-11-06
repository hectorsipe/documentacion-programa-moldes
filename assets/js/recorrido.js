/* Recorrido por el programa: pestañas de capturas y menú de pantallas con resaltado.
   Sin JavaScript la página sigue funcionando: se ven todas las capturas una debajo de otra. */
(function () {
  document.querySelectorAll(".galeria").forEach(function (g) {
    var paneles = Array.prototype.slice.call(g.querySelectorAll(".gal-panel"));
    var tabs = g.querySelector(".gal-tabs");
    if (!tabs || paneles.length < 2) return;
    tabs.innerHTML = "";
    paneles.forEach(function (p, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.textContent = p.getAttribute("data-titulo") || ("Vista " + (i + 1));
      b.onclick = function () { activar(i); };
      tabs.appendChild(b);
    });
    function activar(n) {
      paneles.forEach(function (p, i) { p.classList.toggle("activo", i === n); });
      Array.prototype.forEach.call(tabs.children, function (b, i) { b.setAttribute("aria-selected", i === n ? "true" : "false"); });
    }
    tabs.setAttribute("role", "tablist");
    g.classList.add("js");
    activar(0);
  });

  var enlaces = Array.prototype.slice.call(document.querySelectorAll(".rec-nav a"));
  if (enlaces.length && "IntersectionObserver" in window) {
    var mapa = {};
    enlaces.forEach(function (a) { mapa[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        enlaces.forEach(function (a) { a.classList.remove("activo"); });
        var a = mapa[e.target.id];
        if (a) {
          a.classList.add("activo");
          var nav = a.parentNode;
          nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2, behavior: "smooth" });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(mapa).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }
})();
