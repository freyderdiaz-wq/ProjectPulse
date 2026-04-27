# ProjectPulse - EVM Dashboard

Sistema de gestión de Valor Ganado (Earned Value Management) para monitoreo integral de proyectos.

## 📋 Descripción

ProjectPulse es una solución web para el seguimiento y análisis de proyectos utilizando metodología EVM (Earned Value Management). Permite a los gestores de proyectos:

- ✅ Registrar proyectos y actividades
- 📊 Calcular métricas EVM automáticamente (BAC, PV, EV, AC, CPI, SPI, SV, EAC, VAC)
- 📈 Visualizar gráficas de desempeño (curva S)
- 🎯 Monitorear estado del proyecto en tiempo real
- ⚠️ Recibir alertas sobre desviaciones

## 🛠️ Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Git**: Para control de versiones

Verifica tu instalación:
```bash
node --version
npm --version
git --version
```

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/freyderdiaz-wq/ProjectPulse.git
cd ProjectPulse
```

### 2. Instalar dependencias

#### Backend (NestJS)
```bash
cd back_end
npm install
```

#### Frontend (Angular)
```bash
cd ../front_end
npm install
```

## 🚀 Ejecutar el Proyecto

### Opción 1: Servidores Separados (Recomendado)

#### Terminal 1 - Backend (Puerto 3000)
```bash
cd back_end
npm run start:dev
```

Esperado:
```
[Nest] 12345 - 04/27/2026, 2:54:42 a. m.     LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 04/27/2026, 2:54:43 a. m.     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345 - 04/27/2026, 2:54:43 a. m.     LOG [NestApplication] Nest application successfully started
Listening on port 3000
```

#### Terminal 2 - Frontend (Puerto 4200)
```bash
cd front_end
ng serve --poll 2000
```

Esperado:
```
✔ Compiled successfully.
✔ Compiled successfully.
Application bundle generation complete. [3.245 seconds]
Initial Chunk Files | Names         |  Raw Size
polyfills.js        | polyfills     |  90.20 kB |
styles.css          | styles        |  57.93 kB |
main.js             | main          | 456.25 kB |
A browser window should open automatically...
```

### Opción 2: Desde la raíz (Scripts automatizados)

```bash
# Instala dependencias de ambos proyectos
npm install

# Inicia backend y frontend en paralelo
npm run start:all
```

## 📱 Acceder a la Aplicación

- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)
- **Documentación Swagger**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🗄️ Base de Datos

### Configuración Actual

ProjectPulse utiliza **SQLite en memoria** para desarrollo.

**Características:**
- Base de datos automática (sin instalación extra)
- Datos se reinician al reiniciar el servidor
- Ideal para desarrollo y testing

### Inicializar la Base de Datos

La base de datos se inicializa automáticamente al iniciar el backend. Para resetear los datos:

```bash
# Detén el servidor (Ctrl+C)
# Reinicia el backend
cd back_end
npm run start:dev
```

## 📝 Ejemplo: Crear Datos de Prueba

### 1. Crear un Proyecto

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Mi Primer Proyecto",
    "descripcion": "Proyecto de prueba para EVM"
  }'
```

Respuesta:
```json
{
  "id": "771e2cef-5024-4000-9868-25b385c2d883",
  "nombre": "Mi Primer Proyecto",
  "descripcion": "Proyecto de prueba para EVM"
}
```

### 2. Crear una Actividad

```bash
curl -X POST http://localhost:3000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Análisis de Requisitos",
    "bac": 10000,
    "porcentajeAvancePlanificado": 50,
    "porcentajeAvanceReal": 45,
    "costoActual": 4200,
    "proyectoId": "771e2cef-5024-4000-9868-25b385c2d883"
  }'
```

### 3. Ver el Dashboard

Abre [http://localhost:4200/dashboard](http://localhost:4200/dashboard) y selecciona tu proyecto del dropdown.

## 📊 Métricas EVM Incluidas

| Métrica | Descripción | Fórmula |
|---------|-------------|---------|
| **BAC** | Presupuesto Autorizado | Valor del contrato |
| **PV** | Valor Planificado | BAC × (% Avance Planificado) |
| **EV** | Valor Ganado | BAC × (% Avance Real) |
| **AC** | Costo Real | Gasto actual |
| **CPI** | Índice Costo | EV / AC (> 1 = bajo presupuesto) |
| **SPI** | Índice Cronograma | EV / PV (> 1 = adelanto) |
| **SV** | Varianza Cronograma | EV - PV (positivo = adelanto) |
| **EAC** | Estimado al Completar | BAC / CPI |
| **VAC** | Varianza al Completar | BAC - EAC |

## 🏗️ Estructura del Proyecto

```
ProjectPulse/
├── back_end/                    # NestJS API
│   ├── src/
│   │   ├── main.ts             # Punto de entrada
│   │   ├── app.module.ts        # Módulo principal
│   │   ├── proyectos/           # Controlador/Servicio de proyectos
│   │   ├── actividades/         # Controlador/Servicio de actividades
│   │   └── evm/                 # Servicio de cálculos EVM
│   ├── test/                    # Tests E2E
│   └── package.json
│
├── front_end/                   # Angular 21 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   ├── dashboard/   # Dashboard con métricas
│   │   │   │   ├── proyectos/   # CRUD de proyectos
│   │   │   │   └── actividades/ # CRUD de actividades
│   │   │   ├── core/            # Servicios reutilizables
│   │   │   └── shared/          # Componentes compartidos
│   │   ├── styles.css           # Estilos globales (Tailwind)
│   │   └── main.ts
│   └── package.json
│
└── README.md                    # Este archivo
```

## 🔗 Rutas Principales

### Frontend
- `/` - Dashboard principal
- `/proyectos` - Listado de proyectos
- `/proyectos/nueva` - Crear nuevo proyecto
- `/proyectos/editar/:id` - Editar proyecto
- `/actividades` - Listado de actividades
- `/actividades/nueva` - Crear actividad
- `/actividades/editar/:id` - Editar actividad
- `/dashboard` - Dashboard con EVM

### Backend API
- `POST /api/projects` - Crear proyecto
- `GET /api/projects` - Listar proyectos
- `GET /api/projects/:id` - Obtener proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto
- `POST /api/activities` - Crear actividad
- `GET /api/activities` - Listar actividades
- `GET /api/activities/project/:projectId` - Actividades por proyecto
- `PATCH /api/activities/:id` - Actualizar actividad
- `DELETE /api/activities/:id` - Eliminar actividad

## 🧪 Tests

### Backend
```bash
cd back_end

# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Cobertura
npm run test:cov
```

### Frontend
```bash
cd front_end

# Tests
ng test

# Cobertura
ng test --code-coverage
```

## 🔧 Comandos Útiles

### Backend
```bash
# Desarrollo con hot reload
npm run start:dev

# Compilación TypeScript
npm run build

# Producción
npm run start

# Linting
npm run lint
```

### Frontend
```bash
# Desarrollo
ng serve

# Build de producción
ng build --configuration production

# Linting
ng lint
```

## 📖 Documentación API

La API incluye documentación interactiva Swagger disponible en:
```
http://localhost:3000/api-docs
```

## ⚙️ Configuración

### Variables de Entorno (Backend)

Crea `.env` en `back_end/`:
```env
NODE_ENV=development
PORT=3000
```

### CORS

Por defecto, CORS está habilitado para `http://localhost:4200`.

Para cambiar, edita `back_end/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://tu-dominio.com',
  credentials: true,
});
```

## 🐛 Troubleshooting

### Puerto 3000 o 4200 en uso

```bash
# Windows - Encontrar proceso en puerto
netstat -ano | findstr ":3000"

# Matar proceso (reemplaza PID)
taskkill /PID <PID> /F
```

### Errores CORS

Verifica que el backend está corriendo y CORS está habilitado:
```bash
curl -X GET http://localhost:3000/api/projects -v
```

Debe mostrar header: `Access-Control-Allow-Origin: http://localhost:4200`

### Base de datos no se reinicia

La BD en memoria se reinicia cada vez que inicia el servidor. Si necesitas datos persistentes:

1. Configura PostgreSQL o MySQL
2. Actualiza `ormconfig.ts` en backend
3. Ejecuta migraciones

### Angular no compila

```bash
# Limpia cache
rm -rf node_modules package-lock.json
npm install

# Reinicia servidor
ng serve --poll 2000
```

## 📚 Tecnologías

### Backend
- **NestJS** 11.x - Framework enterprise Node.js
- **TypeORM** 0.3.x - ORM para TypeScript
- **SQLite** - Base de datos en memoria
- **Swagger** - Documentación API

### Frontend
- **Angular** 21 - Framework SPA moderno
- **Standalone Components** - Nueva arquitectura
- **Signals API** - Reactividad
- **Tailwind CSS** - Estilos
- **Chart.js** - Gráficas

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Commit cambios: `git commit -m "feat: descripción"`
3. Push: `git push origin feature/mi-feature`
4. Abre Pull Request

## 📞 Soporte

Para reportar issues o sugerencias:
- GitHub Issues: [Crear issue](https://github.com/freyderdiaz-wq/ProjectPulse/issues)
- Email: freyderjapo@gmail.com

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## ✨ Hoja de Ruta

- [ ] Autenticación y autorización
- [ ] Integración con bases de datos reales
- [ ] Gráficas adicionales
- [ ] Exportar reportes (PDF, Excel)
- [ ] Notificaciones en tiempo real
- [ ] App móvil
- [ ] Dark mode

---

**Última actualización**: Abril 27, 2026
**Versión**: 1.0.0
