# MercApp

Aplicacion web para gestion y venta de productos

**Estudiante:** Mateo Carranza
**Carrera:** Ingenieria en Software
**Materia:** Aplicaciones Web
**Repositorio:** [github.com/wildmaster18/MercApp-deploy](https://github.com/wildmaster18/MercApp-deploy)

---

## Que es MercApp

MercApp es una tienda en linea compuesta por dos partes que trabajan juntas. La primera es una API REST hecha con Node.js, Express y MongoDB que almacena los productos, categorias y usuarios. La segunda es una SPA (Single Page Application) hecha con Vue 3 que se conecta a esa API y presenta toda la interfaz al usuario sin recargar la pagina.

El sistema incluye autenticacion de usuarios, gestion CRUD de productos con imagenes, filtrado por categorias, busqueda por nombre, carrito de compras con descuento de stock y un chat en tiempo real con Socket.io.

---

## Enlaces del proyecto desplegado

| Componente                | URL                                                |
| ------------------------- | -------------------------------------------------- |
| Frontend (Netlify)        | https://iridescent-profiterole-b5ffbd.netlify.app  |
| API REST (Railway)        | https://mercapp-api-production-56c5.up.railway.app |
| Micrositio (GitHub Pages) | https://wildmaster18.github.io/MercApp-deploy/     |

---

## Funcionalidades implementadas

- Catalogo de productos con vista de tarjetas
- Detalle individual de cada producto
- Crear, editar y eliminar productos con imagenes
- Filtro por categoria y busqueda por nombre
- Carrito de compras con cantidades y descuento de stock
- Registro e inicio de sesion de usuarios
- Chat en tiempo real con Socket.io
- Endpoint de salud (/api/health)
- Cabeceras de seguridad con Helmet
- Rate limiting en rutas del API
- CORS restringido por dominio

---

## Como ejecutar el proyecto en local

### Requisitos

Se necesita tener instalado Node.js v18+ y MongoDB.

### Backend

```
cd backend
npm install
npm run seed
npm run dev
```

El seed crea 5 categorias, 12 productos y un usuario de prueba. El servidor queda disponible en `http://localhost:3000`.

**Credenciales de prueba:** usuario `admin`, contrasena `admin`.

Crear un archivo `.env` en la carpeta backend (ver `.env.example`):

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/mercapp
SESSION_SECRET=claveSecretaMercApp2026
FRONTEND_URL=http://localhost:5173
NETLIFY_URL=
```

### Frontend

En otra terminal:

```
cd frontend
npm install
npm run dev
```

La SPA queda disponible en `http://localhost:5173`.

Para produccion, crear un `.env` con:

```
VITE_API_URL=https://tu-api.up.railway.app
```

### Build de produccion del frontend

```
cd frontend
npm run build
npm run preview
```

---

## Estructura del proyecto

```
MercApp/
├── backend/
│   ├── config/          # Conexion a BD y configuracion de Multer
│   ├── controllers/     # Logica de autenticacion y productos (Handlebars)
│   ├── middlewares/      # Verificacion de sesion
│   ├── models/           # Esquemas Mongoose (Producto, Categoria, Usuario)
│   ├── public/           # Archivos estaticos del backend
│   ├── routes/           # Rutas API REST, auth, productos, chat
│   ├── uploads/          # Imagenes subidas por Multer
│   ├── views/            # Plantillas Handlebars
│   ├── app.js            # Servidor principal
│   ├── seed.js           # Script de datos iniciales
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/           # Archivos estaticos y _redirects para Netlify
│   ├── src/
│   │   ├── components/   # NavBar, ProductCard, CartItem, LoadingFallback
│   │   ├── composables/  # useFetch, useProducts, useCart
│   │   ├── router/       # Configuracion de Vue Router
│   │   ├── views/        # Home, Detalle, Form, Carrito, Chat, Login, etc
│   │   ├── config.js     # URL base del API centralizada
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── package.json
│   └── .env.example
├── docs/                 # Micrositio para GitHub Pages
│   ├── index.html
│   └── style.css
└── README.md
```

---

## Despliegue

### MongoDB Atlas

- Cluster M0 gratuito en region cercana
- Usuario de BD con rol readWrite
- IP allowlist configurada
- TLS activo verificado con Compass

### Railway (Backend)

- Repositorio conectado desde GitHub
- Build automatico con Nixpacks
- Variables de entorno configuradas: MONGODB_URI, SESSION_SECRET, FRONTEND_URL, NETLIFY_URL, NODE_ENV (el puerto lo asigna Railway automaticamente)
- Dominio publico generado con HTTPS

### Netlify (Frontend)

- Carpeta dist/ publicada manualmente
- Variable de build: VITE_API_URL apuntando a Railway
- Archivo \_redirects para SPA fallback
- HTTPS activo por defecto
- Credenciales de la app desplegada: usuario `admin`, contrasena `admin123`

### GitHub Pages (Micrositio)

- Carpeta /docs con documentacion del proyecto
- Tabla de endpoints, arquitectura y enlaces
- HTTPS activo

---

## Tecnologias

Node.js, Express 5, MongoDB, Mongoose, Vue 3, Vue Router, Pinia, Vite, Socket.io, Multer, Bcrypt, Helmet, express-rate-limit, Handlebars
