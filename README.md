# LEONES F.C. — Sitio web oficial 🦁

Sitio **multipágina** y responsive, gestionado con una **base de datos** (`data/db.json`).
Garra, corazón y fútbol · Academia infantil de fútbol · Tabasco, México.

## 🗂️ Estructura

```
.
├── index.html        Inicio
├── club.html         El club, valores, historia, himno
├── equipo.html       Plantilla por categorías (1, 2 y 3)
├── calendario.html   Próximos partidos
├── resultados.html   Marcadores e historial
├── galeria.html      Fotos del equipo
├── tienda.html       Uniformes y souvenirs
├── papas.html        Información para papás y avisos
├── contacto.html     Inscripciones (formulario Netlify)
├── admin.html        Panel para administrar la base de datos
├── 404.html
├── data/
│   └── db.json       ⭐ BASE DE DATOS: todo el contenido vive aquí
├── assets/
│   ├── styles.css    Estilos compartidos
│   ├── app.js        Motor: arma cada página leyendo db.json
│   ├── logo.png      Escudo (transparente)
│   ├── hero.jpg, campeon.jpg, anthem.jpg, og.jpg, favicon...
├── netlify.toml, robots.txt, sitemap.xml
```

## ⭐ La base de datos (`data/db.json`)

Todo el contenido del sitio sale de este archivo: club, estadísticas, valores,
categorías, **jugadores, calendario, resultados, noticias, galería, tienda**,
historia, avisos y cuerpo técnico. Las páginas lo leen y se construyen solas.

### Forma fácil de editarla: el panel `admin.html`
1. Abre `tudominio.org/admin.html`.
2. Elige una pestaña (Jugadores, Calendario, Resultados, etc.), agrega o elimina.
3. Pulsa **⬇ Descargar db.json**.
4. Reemplaza `data/db.json` en tu repositorio de GitHub (o arrástralo a Netlify).
   El sitio se actualiza automáticamente. *(El panel no requiere servidor; tus
   cambios también quedan guardados en el navegador mientras editas.)*

## 🛒 Tienda + Stripe (sin servidor)
1. En Stripe → **Payment Links**, crea un enlace por producto.
2. En el panel admin → pestaña **Tienda**, pega cada URL en el campo *Enlace de pago*.
3. Listo: el botón “Comprar” lleva al pago seguro.

## 📩 Formulario de inscripción
El formulario de `contacto.html` usa **Netlify Forms** (`data-netlify="true"`).
Al desplegar en Netlify, los envíos aparecen en el panel de Netlify → Forms.

## 🌐 Personalizar
- WhatsApp, Instagram, Facebook y email: panel admin → pestaña **Club**.
- Colores: variables `:root` al inicio de `assets/styles.css`.
- Dominio configurado: **leonesfc.org**.

## 🚀 Publicar
- **Netlify:** conecta el repo de GitHub (*Import from Git*) o arrastra esta carpeta a `app.netlify.com/drop`.
- Sube **siempre la carpeta completa** (con `assets/` y `data/`).

Hecho con garra en Tabasco. 🇲🇽
