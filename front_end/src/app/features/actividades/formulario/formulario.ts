/**
 * Componente de formulario de actividades. Permite crear y editar actividades.
 */
import { Component, signal, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../core/services/actividad';
import { ProyectoService } from '../../../core/services/proyecto';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements OnInit {
  form: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  isEditing = signal(false);
  proyectos;

  id: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly actividadService: ActividadService,
    private readonly proyectoService: ProyectoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      bac: [0, [Validators.required, Validators.min(0)]],
      porcentajeAvancePlanificado: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      porcentajeAvanceReal: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      costoActual: [0, [Validators.required, Validators.min(0)]],
      proyectoId: ['', [Validators.required]]
    });
    this.proyectos = this.proyectoService.proyectos;
  }

  ngOnInit(): void {
    this.proyectoService.getAll()
      .then(() => {
        // Leer proyecto de query params si existe
        this.route.queryParams.subscribe(params => {
          if (params['proyecto']) {
            this.form.patchValue({ proyectoId: params['proyecto'] });
          }
        });
        
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
          this.isEditing.set(true);
          this.actividadService.getById(this.id)
            .then(actividad => this.form.patchValue(actividad))
            .catch(() => this.error.set('No se pudo cargar la actividad'));
        }
      })
      .catch(() => this.error.set('No se pudieron cargar los proyectos o la actividad'));
  }

  cancel(): void {
    this.router.navigate(['/actividades']);
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
        await this.actividadService.update(this.id, this.form.value);
        this.success.set('Actividad actualizada correctamente');
      } else {
        await this.actividadService.create(this.form.value);
        this.success.set('Actividad creada correctamente');
        this.form.reset();
      }
      setTimeout(() => this.router.navigate(['/actividades']), 1000);
    } catch (e: any) {
      this.error.set(e?.message || (this.id ? 'Error al actualizar actividad' : 'Error al crear actividad'));
    } finally {
      this.loading.set(false);
    }
  }
}
