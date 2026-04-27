/**
 * Componente de formulario de proyectos. Permite crear y editar proyectos.
 */
import { Component, signal, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../core/services/proyecto';
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements OnInit {
  form: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  isEditing = signal(false);
  id: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly proyectoService: ProyectoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEditing.set(true);
      this.proyectoService.getById(this.id)
        .then(proyecto => this.form.patchValue(proyecto))
        .catch(() => this.error.set('No se pudo cargar el proyecto'));
    }
  }

  cancel(): void {
    this.router.navigate(['/proyectos']);
  }

  async submit() {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);
    if (this.form.invalid) {
      this.error.set('Formulario inválido. Revisa los campos.');
      this.loading.set(false);
      return;
    }
    try {
      if (this.id) {
        await this.proyectoService.update(this.id, this.form.value);
        this.success.set('Proyecto actualizado correctamente');
      } else {
        await this.proyectoService.create(this.form.value);
        this.success.set('Proyecto creado correctamente');
        this.form.reset();
      }
      setTimeout(() => this.router.navigate(['/proyectos']), 1000);
    } catch (e: any) {
      this.error.set(e?.message || (this.id ? 'Error al actualizar proyecto' : 'Error al crear proyecto'));
    } finally {
      this.loading.set(false);
    }
  }
}
