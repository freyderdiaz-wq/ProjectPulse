/**
 * Componente de lista de actividades. Permite ver, editar y eliminar actividades.
 * Lista todas las actividades registradas en el sistema, agrupadas por proyecto.
 * Aplicación de principios UX/UI de Steve Krug: agrupa lógicamente, no hagas pensar.
 */
import { Component, OnInit, signal, computed } from '@angular/core';
import { NgIf, NgForOf, DecimalPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActividadService } from '../../../core/services/actividad';
import { Actividad } from '../../../core/interfaces/actividad';
import { Proyecto } from '../../../core/interfaces/proyecto';

interface ActividadesAgrupadas {
  proyecto: Proyecto | null;
  actividades: Actividad[];
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NgForOf, NgIf, DecimalPipe, JsonPipe, RouterModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  loading = signal(false);
  error = signal<string | null>(null);

  actividades;

  // Signal calculado que agrupa actividades por proyecto
  actividadesAgrupadas = computed(() => {
    const activs = this.actividades();
    if (!activs || activs.length === 0) return [];

    const mapa = new Map<string | null, Actividad[]>();

    // Agrupar por ID de proyecto
    activs.forEach(actividad => {
      const proyectoId = actividad.proyecto?.id || null;
      if (!mapa.has(proyectoId)) {
        mapa.set(proyectoId, []);
      }
      mapa.get(proyectoId)!.push(actividad);
    });

    // Convertir a array de ActividadesAgrupadas, ordenado por nombre de proyecto
    return Array.from(mapa.entries())
      .map(([_, activs]) => ({
        proyecto: activs[0]?.proyecto || null,
        actividades: activs.sort((a, b) => a.nombre.localeCompare(b.nombre))
      }))
      .sort((a, b) => (a.proyecto?.nombre || '').localeCompare(b.proyecto?.nombre || ''));
  });

  constructor(
    private readonly actividadService: ActividadService,
    private readonly router: Router
  ) {
    this.actividades = this.actividadService.actividades;
  }

  async eliminar(id?: string) {
    if (!id) return;
    if (!confirm('¿Seguro que deseas eliminar esta actividad?')) return;
    this.loading.set(true);
    try {
      await this.actividadService.delete(id);
    } catch (e: any) {
      this.error.set(e?.message || 'Error al eliminar actividad');
    } finally {
      this.loading.set(false);
    }
  }

  editar(id?: string) {
    if (!id) return;
    this.router.navigate(['/actividades/editar', id]);
  }

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.actividadService.getAll()
      .catch(e => this.error.set(e?.message || 'Error al cargar actividades'))
      .finally(() => this.loading.set(false));
  }
}
