import { loadChartJs } from './chartjs-loader';
import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { NgIf, NgForOf, DecimalPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Proyecto } from '../../core/interfaces/proyecto';
import { Actividad } from '../../core/interfaces/actividad';
import { ProyectoService } from '../../core/services/proyecto';
import { ActividadService } from '../../core/services/actividad';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgForOf, DecimalPipe, NgClass, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  loading = signal(false);
  error = signal<string | null>(null);
  proyectos = signal<Proyecto[]>([]);
  proyecto = signal<Proyecto | null>(null);
  actividades = signal<Actividad[]>([]);
  indicadores = signal<any>(null);
  chartReady = signal(false);

  constructor(
    private readonly proyectoService: ProyectoService,
    private readonly actividadService: ActividadService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['proyecto']) {
        // Cargar el proyecto específico de los query params
        this.proyectoService.getById(params['proyecto']).then(proyecto => {
          this.cargarDatos(proyecto);
        }).catch(() => {
          this.cargarDatos();
        });
      } else {
        this.cargarDatos();
      }
    });
  }

  cargarDatos(proyectoInicial?: Proyecto): void {
    this.loading.set(true);
    this.proyectoService.getAll().then(proyectos => {
      this.proyectos.set(proyectos);
      // Si viene un proyecto en los query params, usarlo; si no, usar el primero
      const proyectoSeleccionado = proyectoInicial || (proyectos && proyectos.length > 0 ? proyectos[0] : null);
      this.proyecto.set(proyectoSeleccionado);
      if (proyectoSeleccionado?.id) {
        return this.actividadService.getAll().then(acts => {
          const filtered = acts.filter(a => a.proyectoId === proyectoSeleccionado!.id);
          this.actividades.set(filtered);
          this.indicadores.set(this.calcularIndicadores(filtered));
          // Renderizar gráfica después de cargar datos
          setTimeout(() => this.renderChart(), 100);
        });
      }
      this.indicadores.set(this.calcularIndicadores([]));
      return Promise.resolve();
    }).catch((err) => {
      console.error('Error cargando dashboard:', err);
      this.error.set('No se pudo cargar el dashboard');
    }).finally(() => {
      this.loading.set(false);
    });
  }

  seleccionarProyecto(proyectoId: string): void {
    const proyecto = this.proyectos().find(p => p.id === proyectoId);
    if (proyecto) {
      this.proyecto.set(proyecto);
      this.actividadService.getAll().then(acts => {
        const filtered = acts.filter(a => a.proyectoId === proyectoId);
        this.actividades.set(filtered);
        this.indicadores.set(this.calcularIndicadores(filtered));
        setTimeout(() => this.renderChart(), 100);
      });
    }
  }

  obtenerURLCrearActividad(): string {
    return `/actividades/nueva?proyecto=${this.proyecto()?.id || ''}`;
  }

  ngAfterViewInit(): void {
    loadChartJs().then(() => {
      this.chartReady.set(true);
      // Renderizar gráfica después de que Chart.js esté disponible
      setTimeout(() => this.renderChart(), 100);
    }).catch(err => {
      console.error('Error loading Chart.js:', err);
      this.error.set('No se pudo cargar la librería de gráficos');
    });
  }

  calcularIndicadores(actividades: Actividad[]) {
    let bac = 0, pv = 0, ev = 0, ac = 0;
    actividades.forEach(a => {
      bac += a.bac;
      pv += a.bac * (a.porcentajeAvancePlanificado / 100);
      ev += a.bac * (a.porcentajeAvanceReal / 100);
      ac += a.costoActual;
    });
    const cpi = ev && ac ? ev / ac : null;
    const spi = ev && pv ? ev / pv : null;
    const sv = ev - pv;
    const eac = cpi && cpi !== 0 ? bac / cpi : null;
    const vac = eac !== null ? bac - eac : null;
    return { bac, pv, ev, ac, cpi, spi, sv, eac, vac };
  }

  renderChart() {
    if (!(globalThis as any).Chart) return;
    const acts = this.actividades();
    if (acts.length === 0) return;
    
    const ctx = document.getElementById('grafica-canvas') as HTMLCanvasElement;
    if (!ctx) return;

    // Destruir gráfica anterior si existe
    const existingChart = (ctx as any).chart;
    if (existingChart) {
      existingChart.destroy();
    }

    // Crear nueva gráfica - Curva S mejorada
    const chart = new (globalThis as any).Chart(ctx, {
      type: 'line',
      data: {
        labels: acts.map(a => a.nombre),
        datasets: [
          {
            label: 'PV (Valor Planificado)',
            data: acts.map(a => a.bac * (a.porcentajeAvancePlanificado / 100)),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 8
          },
          {
            label: 'EV (Valor Ganado)',
            data: acts.map(a => a.bac * (a.porcentajeAvanceReal / 100)),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 8
          },
          {
            label: 'AC (Costo Real)',
            data: acts.map(a => a.costoActual),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { size: 12, weight: 'bold' }
            }
          },
          title: {
            display: true,
            text: 'Curva S - PV, EV y AC por Actividad',
            font: { size: 16, weight: 'bold' },
            padding: 20
          },
          filler: {
            propagate: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value: any) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    // Guardar referencia a la gráfica en el canvas
    (ctx as any).chart = chart;
  }
}
