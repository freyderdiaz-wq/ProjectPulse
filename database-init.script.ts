/**
 * Script de Inicialización de Base de Datos para ProjectPulse
 * 
 * Ejecuta: npx ts-node database-init.script.ts
 * O desde npm: npm run db:seed
 * 
 * Este script crea datos de prueba para demostración del sistema EVM
 */

import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

interface CreateProjectDTO {
  nombre: string;
  descripcion: string;
}

interface CreateActivityDTO {
  nombre: string;
  bac: number;
  porcentajeAvancePlanificado: number;
  porcentajeAvanceReal: number;
  costoActual: number;
  proyectoId: string;
}

/**
 * Pausa la ejecución por X milisegundos
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Crea un proyecto de prueba
 */
async function createProject(data: CreateProjectDTO): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE}/projects`, data);
    console.log(`✓ Proyecto creado: ${data.nombre} (${response.data.id})`);
    return response.data.id;
  } catch (error) {
    console.error(`✗ Error creando proyecto: ${error}`);
    throw error;
  }
}

/**
 * Crea una actividad de prueba
 */
async function createActivity(data: CreateActivityDTO): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE}/activities`, data);
    console.log(`  ✓ Actividad: ${data.nombre}`);
    return response.data.id;
  } catch (error) {
    console.error(`  ✗ Error creando actividad: ${error}`);
    throw error;
  }
}

/**
 * Función principal - Ejecuta la inicialización
 */
async function initializeDatabase() {
  console.log('\n═════════════════════════════════════════');
  console.log('  🗄️  INICIALIZACIÓN DE BASE DE DATOS');
  console.log('═════════════════════════════════════════\n');

  try {
    // Verificar que la API está disponible
    console.log('Verificando conexión con API...');
    await axios.get(`${API_BASE}/projects`);
    console.log('✓ API disponible en http://localhost:3000\n');

    // ====================
    // PROYECTO 1: Sitio Web
    // ====================
    console.log('Creando PROYECTO 1: Desarrollo de Sitio Web');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const projectId1 = await createProject({
      nombre: 'Desarrollo de Sitio Web',
      descripcion: 'Desarrollo completo de sitio web corporativo con CMS'
    });
    
    await sleep(500);
    
    await createActivity({
      nombre: 'Diseño UI/UX',
      bac: 15000,
      porcentajeAvancePlanificado: 100,
      porcentajeAvanceReal: 95,
      costoActual: 14500,
      proyectoId: projectId1
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Desarrollo Frontend',
      bac: 25000,
      porcentajeAvancePlanificado: 75,
      porcentajeAvanceReal: 70,
      costoActual: 20000,
      proyectoId: projectId1
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Desarrollo Backend',
      bac: 30000,
      porcentajeAvancePlanificado: 60,
      porcentajeAvanceReal: 50,
      costoActual: 18000,
      proyectoId: projectId1
    });

    console.log('');

    // ====================
    // PROYECTO 2: App Móvil
    // ====================
    console.log('Creando PROYECTO 2: Aplicación Móvil');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const projectId2 = await createProject({
      nombre: 'Aplicación Móvil',
      descripcion: 'App móvil nativa iOS y Android con funcionalidades avanzadas'
    });
    
    await sleep(500);
    
    await createActivity({
      nombre: 'Arquitectura y Planning',
      bac: 10000,
      porcentajeAvancePlanificado: 100,
      porcentajeAvanceReal: 100,
      costoActual: 9500,
      proyectoId: projectId2
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Desarrollo iOS',
      bac: 20000,
      porcentajeAvancePlanificado: 50,
      porcentajeAvanceReal: 40,
      costoActual: 9000,
      proyectoId: projectId2
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Desarrollo Android',
      bac: 20000,
      porcentajeAvancePlanificado: 30,
      porcentajeAvanceReal: 20,
      costoActual: 5000,
      proyectoId: projectId2
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Testing y QA',
      bac: 15000,
      porcentajeAvancePlanificado: 20,
      porcentajeAvanceReal: 10,
      costoActual: 2000,
      proyectoId: projectId2
    });

    console.log('');

    // ====================
    // PROYECTO 3: Sistema ERP
    // ====================
    console.log('Creando PROYECTO 3: Implementación Sistema ERP');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const projectId3 = await createProject({
      nombre: 'Implementación Sistema ERP',
      descripcion: 'Implementación y customización de sistema ERP empresarial'
    });
    
    await sleep(500);
    
    await createActivity({
      nombre: 'Análisis de Requisitos',
      bac: 8000,
      porcentajeAvancePlanificado: 100,
      porcentajeAvanceReal: 100,
      costoActual: 8000,
      proyectoId: projectId3
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Configuración Base',
      bac: 25000,
      porcentajeAvancePlanificado: 80,
      porcentajeAvanceReal: 85,
      costoActual: 22000,
      proyectoId: projectId3
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Desarrollo Customizado',
      bac: 40000,
      porcentajeAvancePlanificado: 50,
      porcentajeAvanceReal: 55,
      costoActual: 25000,
      proyectoId: projectId3
    });
    
    await sleep(300);
    
    await createActivity({
      nombre: 'Capacitación',
      bac: 12000,
      porcentajeAvancePlanificado: 20,
      porcentajeAvanceReal: 25,
      costoActual: 3500,
      proyectoId: projectId3
    });

    console.log('\n═════════════════════════════════════════');
    console.log('  ✓ INICIALIZACIÓN COMPLETADA');
    console.log('═════════════════════════════════════════\n');
    
    console.log('📊 RESUMEN DE DATOS CREADOS:');
    console.log('  • 3 Proyectos');
    console.log('  • 11 Actividades totales');
    console.log('  • BAC total: $280,000\n');
    
    console.log('🚀 PRÓXIMOS PASOS:');
    console.log('  1. Abre http://localhost:4200/dashboard');
    console.log('  2. Selecciona un proyecto del dropdown');
    console.log('  3. Observa las métricas EVM calculadas\n');
    
    console.log('💡 EJEMPLOS DE PROYECTOS:');
    console.log('  • Proyecto 1: En buen camino (CPI > 1, SPI > 0.9)');
    console.log('  • Proyecto 2: Retrasado en planning (SPI < 1)');
    console.log('  • Proyecto 3: Proyecto grande con múltiples fases\n');

  } catch (error) {
    console.error('\n✗ Error durante inicialización:');
    console.error(error);
    process.exit(1);
  }
}

// Ejecutar
initializeDatabase();
