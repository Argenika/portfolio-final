# Portfolio · Angelina Lepeshko
## Instrucciones de uso

### Estructura de archivos
```
portfolio-final/
├── index.html          ← Archivo principal (abre este en el navegador)
├── css/
│   └── style.css       ← Todos los estilos
├── js/
│   └── main.js         ← Interactividad (menú, idiomas, formulario)
└── assets/
    ├── foto.jpg        ← TU FOTO (añade aquí, nombre exacto)
    └── cv-angelina-lepeshko.pdf  ← TU CV (añade aquí)
```

---

### ✅ Cómo añadir tu foto

1. Guarda tu foto como `assets/foto.jpg`
2. En `index.html`, busca este bloque:
```html
<div class="hero-photo-placeholder">
  <span class="photo-initials">AL</span>
  <span class="photo-hint">Tu foto aquí</span>
</div>
```
3. Reemplázalo con:
```html
<img src="assets/foto.jpg" alt="Angelina Lepeshko">
```

---

### ✅ Cómo añadir tu CV

1. Exporta tu CV como PDF
2. Guárdalo como `assets/cv-angelina-lepeshko.pdf`
3. El botón "Descargar CV" funcionará automáticamente

---

### ✅ Cómo subir a hosting (Vercel — gratis)

1. Crea cuenta en https://vercel.com
2. Sube la carpeta `portfolio-final` a un repo de GitHub
3. En Vercel: "New Project" → importa el repo → Deploy
4. ¡Listo! Te da un dominio gratuito como `angelina-lepeshko.vercel.app`

---

### ✅ Cómo conectar un dominio propio

Si compras un dominio (ej. en Namecheap o Google Domains):
1. En Vercel: Settings → Domains → Add domain
2. Añade los DNS que te indica Vercel en tu proveedor de dominio
3. Tarda ~24h en propagarse

---

### ✅ Personalizar colores

Abre `css/style.css` y edita las variables al inicio:
```css
:root {
  --blue:    #3B6EF5;  ← Color principal
  --indigo:  #5B4FD8;  ← Color gradiente
}
```

---

### ✅ Añadir nuevo proyecto

En `index.html`, busca la sección `id="proyectos"` y copia uno de los bloques `.proj-card` existentes.

---

### 📧 Formulario de contacto

El formulario actual muestra un mensaje de confirmación visual. Para que envíe emails reales necesitas conectar un servicio como:
- **Formspree** (gratis): https://formspree.io
- **EmailJS** (gratis): https://emailjs.com

Con Formspree solo cambia el `action` del formulario:
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

---

Cualquier duda → angelalepeshko560@gmail.com
