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

  async getAll(): Promise<Actividad[]> {
    const data = await firstValueFrom(this.http.get<any[]>(BASE_URL));
    const mapped = data.map(a => ({
      ...a,
      proyectoId: a.proyecto?.id || a.proyectoId
    }));
    this.actividades.set(mapped);
    return mapped;
  }

  async getById(id: string): Promise<Actividad> {
    const data = await firstValueFrom(this.http.get<any>(`${BASE_URL}/${id}`));
    return {
      ...data,
      proyectoId: data.proyecto?.id || data.proyectoId
    };
  }

  async create(dto: Omit<Actividad, 'id'>): Promise<Actividad> {
    const actividad = await firstValueFrom(this.http.post<any>(BASE_URL, dto));
    const mapped = {
      ...actividad,
      proyectoId: actividad.proyecto?.id || actividad.proyectoId
    };
    this.actividades.update((list: Actividad[]) => [...list, mapped]);
    return mapped;
  }

  async update(id: string, dto: Partial<Actividad>): Promise<Actividad> {
    const actividad = await firstValueFrom(this.http.patch<any>(`${BASE_URL}/${id}`, dto));
    const mapped = {
      ...actividad,
      proyectoId: actividad.proyecto?.id || actividad.proyectoId
    };
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
