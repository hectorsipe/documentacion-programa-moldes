# Documentación de Gestión de Moldes

Web de ayuda para los clientes de **Gestión de Moldes** (SIPE Informática). Es HTML estático y se publica con GitHub Pages.

## Estructura

| Ruta | Contenido |
|------|-----------|
| `*.html` | Una página por tema: inicio, guías (`guia-*.html`), pantallas (`ref-*.html`), preguntas frecuentes y glosario. |
| `assets/css/style.css` | Estilos (tema claro y oscuro). |
| `assets/js/site.js` | Menú lateral, buscador, enlaces anterior/siguiente y visor de imágenes. **El menú se define aquí, en `NAV`.** |
| `img/` | Capturas de pantalla, logo y favicon. |

## Editar o añadir una página

1. Copia una página parecida y cambia el `<title>`, la `description`, el `<h1>` y el contenido de `<article>`.
2. Añádela a `NAV` en `assets/js/site.js`, en la sección y posición que corresponda.
3. Las capturas van en `img/` (JPG, unos 1.500 px de ancho) y se insertan con:

```html
<figure><img src="img/nombre.jpg" alt="Descripción" loading="lazy"><figcaption>Descripción</figcaption></figure>
```

Elementos disponibles en el contenido: `<ol class="pasos">` (pasos numerados), `<div class="nota">`, `<div class="consejo">`,
`<div class="aviso">`, `<span class="boton">` (botón de la aplicación), `<span class="campo">` (campo o pestaña), tablas y `<details>`
(preguntas desplegables).

El buscador lee las páginas que hay en `NAV`, así que no hay que mantener ningún índice aparte.

## Publicar una versión nueva

Añade un bloque al principio de `historial-versiones.html` (copia uno existente), actualiza la tabla «Resumen» y mueve la etiqueta «Última» a la versión nueva.

## Ver la web en local

Desde esta carpeta: `python -m http.server 8000` y abre http://localhost:8000. (Abrir los HTML con doble clic funciona, pero el buscador
necesita un servidor.)

## Publicación

GitHub Pages sirve la rama `main` desde la raíz (Settings › Pages › Deploy from a branch › `main` / `root`).
