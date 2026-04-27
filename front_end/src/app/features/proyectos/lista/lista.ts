/**
 * Componente de lista de proyectos. Permite ver, editar y eliminar proyectos.
 */
import { Component, OnInit, signal } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProyectoService } from '../../../core/services/proyecto';
@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NgForOf, NgIf, RouterModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  loading = signal(false);
  error = signal<string | null>(null);

  proyectos;

  constructor(
    private readonly proyectoService: ProyectoService,
    private readonly router: Router
  ) {
    this.proyectos = this.proyectoService.proyectos;
  }

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.proyectoService.getAll()
      .catch(e => this.error.set(e?.message || 'Error al cargar proyectos'))
      .finally(() => this.loading.set(false));
  }

  async eliminar(id?: string) {
    if (!id) return;
    if (!confirm('¿Seguro que deseas eliminar este proyecto?')) return;
    this.loading.set(true);
    try {
      await this.proyectoService.delete(id);
    } catch (e: any) {
      this.error.set(e?.message || 'Error al eliminar proyecto');
    } finally {
      this.loading.set(false);
    }
  }

  editar(id?: string) {
    if (!id) return;
    this.router.navigate(['/proyectos/editar', id]);
  }
}
