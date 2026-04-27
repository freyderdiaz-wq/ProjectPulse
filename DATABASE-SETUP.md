# 🗄️ Configuración de Base de Datos - ProjectPulse

## Descripción General

ProjectPulse actualmente utiliza **SQLite en memoria** para desarrollo. Esta configuración es ideal para:

- ✅ Desarrollo rápido sin dependencias externas
- ✅ Testing y demostración
- ✅ Prototipado
- ✅ Eliminación automática de datos en cada reinicio

## Configuración Actual

### Tecnología
- **Base de Datos**: SQLite (TypeORM)
- **Almacenamiento**: En memoria (`:memory:`)
- **Ubicación del código**: `back_end/src/app.module.ts`
- **Reinicio**: Cada vez que inicia el servidor

### Estructura de Entidades

```typescript
// Entidad: Proyecto
{
  id: UUID
  nombre: string (requerido)
  descripcion: string
  actividades: Actividad[]
  createdAt: timestamp
  updatedAt: timestamp
}

// Entidad: Actividad
{
  id: UUID
  nombre: string (requerido)
  bac: number (Presupuesto Autorizado)
  porcentajeAvancePlanificado: number (0-100)
  porcentajeAvanceReal: number (0-100)
  costoActual: number
  proyecto: Proyecto (FK)
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Inicializar la Base de Datos

### Opción 1: Inicialización Automática (Recomendado)

La base de datos se crea y inicializa **automáticamente** al iniciar el servidor:

```bash
cd back_end
npm run start:dev
```

El servidor hará:
1. Crear las tablas si no existen
2. Sincronizar el esquema con las entidades
3. Estar listo para recibir peticiones

**Salida esperada:**
```
[TypeOrmModule] Connecting to the database with name 'default'
[TypeOrmModule] Database connected
[Nest] Nest application successfully started
Listening on port 3000
```

### Opción 2: Cargar Datos de Prueba

Una vez que el servidor está corriendo, puedes cargar datos de ejemplo:

```bash
# En una nueva terminal desde back_end
npm run db:seed
```

Esto cargará:
- 3 proyectos de ejemplo
- 11 actividades distribuidas
- Datos realistas de EVM para demostración

**Salida esperada:**
```
═════════════════════════════════════════
  🗄️  INICIALIZACIÓN DE BASE DE DATOS
═════════════════════════════════════════

Verificando conexión con API...
✓ API disponible en http://localhost:3000

Creando PROYECTO 1: Desarrollo de Sitio Web
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Proyecto creado: Desarrollo de Sitio Web
  ✓ Actividad: Diseño UI/UX
  ✓ Actividad: Desarrollo Frontend
  ✓ Actividad: Desarrollo Backend

[... más proyectos ...]

═════════════════════════════════════════
  ✓ INICIALIZACIÓN COMPLETADA
═════════════════════════════════════════
```

### Opción 3: Cargar Datos Manualmente vía API

Puedes crear datos directamente usando la API:

```bash
# Crear un proyecto
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Mi Proyecto",
    "descripcion": "Descripción opcional"
  }'

# Respuesta
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nombre": "Mi Proyecto",
  "descripcion": "Descripción opcional"
}
```

Guarda el `id` y úsalo para crear actividades:

```bash
curl -X POST http://localhost:3000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tarea 1",
    "bac": 10000,
    "porcentajeAvancePlanificado": 50,
    "porcentajeAvanceReal": 45,
    "costoActual": 4200,
    "proyectoId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

## Resetear la Base de Datos

### Reiniciar el Servidor

Como la BD está en memoria, simplemente detén y reinicia:

```bash
# En la terminal donde corre el servidor
Ctrl+C

# Reinicia
npm run start:dev
```

**Efecto**: 
- ✅ Todas las tablas se crean de nuevo
- ✅ Todos los datos previos se eliminan
- ✅ Schema está sincronizado con entidades

### Limpiar y Recargar Datos

```bash
# Terminal 1: Backend corriendo con npm run start:dev

# Terminal 2: Ejecutar seed para cargar datos
cd back_end
npm run db:seed
```

## Migrar a Base de Datos Persistente

Si necesitas datos que persistan entre reinicios, migra a PostgreSQL o MySQL:

### Paso 1: Instalar dependencias

```bash
cd back_end

# Para PostgreSQL
npm install pg

# O para MySQL
npm install mysql2
```

### Paso 2: Configurar en `app.module.ts`

**Busca:**
```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: ':memory:',
  // ...
})
```

**Reemplaza por PostgreSQL:**
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'projectpulse',
  synchronize: true,
  logging: false,
  entities: [Proyecto, Actividad],
})
```

**O para MySQL:**
```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'projectpulse',
  synchronize: true,
  logging: false,
  entities: [Proyecto, Actividad],
})
```

### Paso 3: Variables de Entorno

Crea `.env` en `back_end/`:

```env
# PostgreSQL
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mypassword
DB_NAME=projectpulse

# MySQL
# DB_TYPE=mysql
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=root
# DB_PASSWORD=mypassword
# DB_NAME=projectpulse
```

### Paso 4: Crear la base de datos

**PostgreSQL:**
```bash
createdb projectpulse
```

**MySQL:**
```bash
mysql -u root -p
> CREATE DATABASE projectpulse;
```

### Paso 5: Iniciar el servidor

```bash
npm run start:dev
```

TypeORM sincronizará automáticamente el schema.

## Exportar/Importar Datos

### Exportar a JSON

```bash
# Obtener todos los proyectos
curl -X GET http://localhost:3000/api/projects > proyectos.json

# Obtener todas las actividades
curl -X GET http://localhost:3000/api/activities > actividades.json
```

### Importar desde JSON

```bash
# Script Node.js para importar
const fs = require('fs');
const axios = require('axios');

const proyectos = JSON.parse(fs.readFileSync('proyectos.json'));
for (const p of proyectos) {
  axios.post('http://localhost:3000/api/projects', p);
}
```

## Troubleshooting

### Error: "SQLITE_CANTOPEN"

**Causa**: La base de datos no se puede crear

**Solución**:
```bash
# Verifica permisos de carpeta
ls -la back_end/

# Reinicia el servidor
npm run start:dev
```

### Error: "relation does not exist"

**Causa**: Las tablas no se crearon correctamente

**Solución**:
1. Detén el servidor
2. Verifica `synchronize: true` en `app.module.ts`
3. Reinicia: `npm run start:dev`

### Datos se perdieron después de reiniciar

**Esperado**: Con SQLite en memoria, esto es normal

**Soluciones**:
- Si necesitas persistencia, migra a PostgreSQL/MySQL
- O ejecuta `npm run db:seed` después de cada reinicio

### Puerto 3000 está en uso

```bash
# Windows
netstat -ano | findstr ":3000"
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

## Comandos Útiles

```bash
# Iniciar backend
npm run start:dev

# Cargar datos de prueba
npm run db:seed

# Compilar TypeScript
npm run build

# Ver documentación Swagger
curl http://localhost:3000/api-docs

# Listar proyectos
curl http://localhost:3000/api/projects | jq

# Listar actividades
curl http://localhost:3000/api/activities | jq
```

## Recursos Adicionales

- [TypeORM Documentation](https://typeorm.io/)
- [NestJS Database Guide](https://docs.nestjs.com/techniques/database)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [MySQL Docs](https://dev.mysql.com/doc/)

## Soporte

Para issues con la base de datos:
1. Revisa los logs en la terminal
2. Verifica la conexión: `curl http://localhost:3000/api/projects`
3. Consulta las soluciones arriba
4. Abre un issue en GitHub

---

**Última actualización**: Abril 27, 2026
**Versión**: 1.0.0
