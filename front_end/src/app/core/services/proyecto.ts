/**
 * Servicio para gestionar proyectos: CRUD y estado reactivo.
 */

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

const BASE_URL = 'http://localhost:3000/api/projects';

@Injectable({ providedIn: 'root' })
export class ProyectoService {
  private readonly http = inject(HttpClient);
  proyectos = signal<Proyecto[]>([]);

  async getAll(): Promise<Proyecto[]> {
    const data = await firstValueFrom(this.http.get<Proyecto[]>(BASE_URL));
    this.proyectos.set(data);
    return data;
  }

  async getById(id: string): Promise<Proyecto> {
    return await firstValueFrom(this.http.get<Proyecto>(`${BASE_URL}/${id}`));
  }

  async create(dto: Omit<Proyecto, 'id'>): Promise<Proyecto> {
    const proyecto = await firstValueFrom(this.http.post<Proyecto>(BASE_URL, dto));
    this.proyectos.update(list => [...list, proyecto]);
    return proyecto;
  }

  async update(id: string, dto: Partial<Proyecto>): Promise<Proyecto> {
    const proyecto = await firstValueFrom(this.http.put<Proyecto>(`${BASE_URL}/${id}`, dto));
    this.proyectos.update(list =>
      list.map(p => (p.id === id ? { ...p, ...proyecto } : p))
    );
    return proyecto;
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${BASE_URL}/${id}`));
    this.proyectos.update(list => list.filter(p => p.id !== id));
  }
}
