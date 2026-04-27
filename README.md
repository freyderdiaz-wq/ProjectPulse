# ProjectPulse - EVM Dashboard

Dashboard para gestión de proyectos usando Earned Value Management (EVM).

## ¿Qué es?

ProjectPulse permite registrar proyectos y actividades, calculando automáticamente métricas de desempeño:
- **BAC, PV, EV, AC** - Valores presupuestarios
- **CPI, SPI** - Índices de desempeño
- **SV, EAC, VAC** - Varianzas y estimaciones

## Requisitos

- Node.js v18+
- npm v9+
- PostgreSQL 12+ (opcional para desarrollo con SQLite)

## Instalación Rápida

```bash
# Clonar
git clone https://github.com/freyderdiaz-wq/ProjectPulse.git
cd ProjectPulse

# Instalar dependencias
npm install
```

## Ejecutar

### Opción 1: Servidores separados (recomendado)

**Terminal 1 - Backend:**
```bash
cd back_end
npm run start:dev
# Abierto en http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd front_end
ng serve
# Abierto en http://localhost:4200
```

### Opción 2: Desde raíz
```bash
npm run start:all
```

## Uso

1. Ve a http://localhost:4200
2. Crea un proyecto
3. Agrega actividades con:
   - BAC (presupuesto)
   - Avance planificado %
   - Avance real %
   - Costo actual
4. Las métricas se calculan automáticamente

## Estructura

```
ProjectPulse/
├── back_end/          # NestJS API
│   ├── src/
│   │   ├── app/
│   │   ├── evm/       # Lógica EVM
│   │   ├── proyecto/  # Proyectos CRUD
│   │   └── actividad/ # Actividades CRUD
│   └── package.json
├── front_end/         # Angular 21
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── proyectos/
│   │   │   │   └── actividades/
│   │   │   └── services/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Base de Datos

### SQLite (Desarrollo - Por defecto)
Automático, sin configuración.

### PostgreSQL (Producción)

1. Instala PostgreSQL
2. Crea base de datos:
```sql
CREATE DATABASE projectpulse;
CREATE USER projectpulse WITH PASSWORD 'password';
GRANT ALL ON DATABASE projectpulse TO projectpulse;
```

3. Configura variables de entorno en `back_end/.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=projectpulse
DB_PASSWORD=password
DB_DATABASE=projectpulse
```

4. Ejecuta migrations:
```bash
cd back_end
npm run migration:run
```

## API Endpoints

### Proyectos
```bash
# Listar proyectos
GET http://localhost:3000/api/projects

# Crear proyecto
POST http://localhost:3000/api/projects
Body: { "nombre": "Mi Proyecto", "descripción": "..." }

# Obtener proyecto con métricas
GET http://localhost:3000/api/projects/:id

# Actualizar proyecto
PATCH http://localhost:3000/api/projects/:id

# Eliminar proyecto
DELETE http://localhost:3000/api/projects/:id
```

### Actividades
```bash
# Crear actividad
POST http://localhost:3000/api/activities
Body: {
  "nombre": "Diseño",
  "bac": 5000,
  "plannedProgressPercent": 50,
  "actualProgressPercent": 60,
  "actualCost": 2800,
  "proyectoId": "uuid"
}

# Listar actividades de proyecto
GET http://localhost:3000/api/projects/:id/activities

# Actualizar actividad
PATCH http://localhost:3000/api/activities/:id

# Eliminar actividad
DELETE http://localhost:3000/api/activities/:id
```

## Métricas EVM

| Métrica | Fórmula | Significado |
|---------|---------|-------------|
| **PV** | BAC × (Avance Planificado %) | Valor que debería haberse ganado |
| **EV** | BAC × (Avance Real %) | Valor realmente ganado |
| **AC** | Costo Real | Dinero gastado |
| **CPI** | EV / AC | Eficiencia de costos (>1 = bueno) |
| **SPI** | EV / PV | Eficiencia de cronograma (>1 = adelantado) |
| **SV** | EV - PV | Varianza de cronograma |
| **EAC** | BAC / CPI | Costo total estimado |
| **VAC** | BAC - EAC | Varianza de presupuesto |

## Solucionar Problemas

### ng serve falla
```bash
# Limpiar cache
cd front_end
rm -rf .angular/cache node_modules
npm install
ng serve --poll 2000
```

### Backend no conecta
```bash
# Verificar puerto 3000
netstat -an | grep 3000

# Reinstalar dependencias
cd back_end
rm -rf node_modules
npm install
npm run start:dev
```

### Base de datos
```bash
# Crear tablas automáticamente
npm run migration:run

# Ver logs
npm run start:dev
```

## Stack Tecnológico

**Frontend:**
- Angular 21 + Signals API
- Tailwind CSS
- RxJS

**Backend:**
- NestJS 11
- TypeORM
- PostgreSQL / SQLite

**DevOps:**
- Git / GitHub
- npm

## Contacto

Email: freyderjapo@gmail.com
