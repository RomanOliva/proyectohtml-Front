# Basura Ki'teer – Tienda Warframe (Frontend)

Aplicación web de una tienda de productos de Warframe, construida con React 19, Vite, React Router y React Bootstrap. Se conecta por REST a un backend Spring Boot (base de datos en Neon, desplegado en Render).

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base del backend, incluyendo la versión de la API | `https://mi-backend.onrender.com/api/v1` |
| `VITE_USE_MOCK` | `true` usa datos locales de demostración, sin backend | `true` |

Si `VITE_API_URL` está vacía o `VITE_USE_MOCK=true`, la tienda funciona en **modo demostración** y muestra un aviso en la página de productos. Para conectar con el backend real:

```env
VITE_API_URL=https://mi-backend.onrender.com/api/v1
VITE_USE_MOCK=false
```

## Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Análisis estático con Oxlint |
| `npm test` | Pruebas unitarias con Karma + Jasmine |

## Estructura

```
src/
  components/   atoms, molecules y organisms (Atomic Design)
  pages/        vistas enrutadas
  services/     comunicación con la API (api.js, productoService.js)
  hooks/        lógica reutilizable (useProductos)
  utils/        funciones puras (carrito, productos, ruta)
  data/         datos locales del modo demostración
```

## Endpoints consumidos

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/productos` | Lista de productos | Público |
| GET | `/productos/{id}` | Detalle de un producto | Público |

Se irán agregando a medida que avance la integración (autenticación, boletas, administración).
