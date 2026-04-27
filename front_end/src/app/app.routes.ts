import { Routes } from '@angular/router';
import { Lista } from './features/actividades/lista/lista';
import { Formulario } from './features/actividades/formulario/formulario';
import { Lista as ProyectosLista } from './features/proyectos/lista/lista';
import { Formulario as ProyectosFormulario } from './features/proyectos/formulario/formulario';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'actividades', component: Lista },
  { path: 'actividades/nueva', component: Formulario },
  { path: 'actividades/editar/:id', component: Formulario },
  { path: 'proyectos', component: ProyectosLista },
  { path: 'proyectos/nuevo', component: ProyectosFormulario },
  { path: 'proyectos/editar/:id', component: ProyectosFormulario },
];
