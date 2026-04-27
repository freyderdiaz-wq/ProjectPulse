/**
 * Servicio para gestionar actividades: CRUD y estado reactivo.
 */
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Actividad } from '../interfaces/actividad';
const BASE_URL = 'http://localhost:3000/api/activities';

@Injectable({
  providedIn: 'root' 
})
export class ActividadService {
  private readonly http = inject(HttpClient);

  actividades = signal<Actividad[]>([]);

  private normalizeActividad(a: any): Actividad {
    return {
      ...a,
      bac: Number(a.bac) || 0,
      porcentajeAvancePlanificado: Number(a.porcentajeAvancePlanificado) || 0,
      porcentajeAvanceReal: Number(a.porcentajeAvanceReal) || 0,
      costoActual: Number(a.costoActual) || 0,
      proyectoId: a.proyecto?.id || a.proyectoId
    };
  }

  async getAll(): Promise<Actividad[]> {
    const data = await firstValueFrom(this.http.get<any[]>(BASE_URL));
    const mapped = data.map(a => this.normalizeActividad(a));
    this.actividades.set(mapped);
    return mapped;
  }

  async getById(id: string): Promise<Actividad> {
    const data = await firstValueFrom(this.http.get<any>(`${BASE_URL}/${id}`));
    return this.normalizeActividad(data);
  }

  async create(dto: Omit<Actividad, 'id'>): Promise<Actividad> {
    const actividad = await firstValueFrom(this.http.post<any>(BASE_URL, dto));
    return this.normalizeActividad(actividad);
  }

  async update(id: string, dto: Partial<Actividad>): Promise<Actividad> {
    const actividad = await firstValueFrom(this.http.patch<any>(`${BASE_URL}/${id}`, dto));
    const mapped = this.normalizeActividad(actividad);
    this.actividades.update((list: Actividad[]) =>
      list.map((a: Actividad) => (a.id === id ? { ...a, ...mapped } : a))
    );
    return mapped;
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${BASE_URL}/${id}`));
    this.actividades.update((list: Actividad[]) => list.filter((a: Actividad) => a.id !== id));
  }
}
