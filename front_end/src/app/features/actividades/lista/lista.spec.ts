import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lista } from './lista';
import { ActividadService } from '../../../core/services/actividad';


describe('Lista', () => {
  let component: Lista;
  let fixture: ComponentFixture<Lista>;
  let actividadServiceSpy: jasmine.SpyObj<ActividadService>;

  beforeEach(async () => {
    actividadServiceSpy = jasmine.createSpyObj('ActividadService', ['getAll'], {
      actividades: () => [{ id: '1', nombre: 'Test', bac: 100, porcentajeAvancePlanificado: 50, porcentajeAvanceReal: 40, costoActual: 80, proyectoId: 'p1' }]
    });

    await TestBed.configureTestingModule({
      imports: [Lista],
      providers: [
        { provide: ActividadService, useValue: actividadServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Lista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar actividades', () => {
    expect(component.actividades().length).toBeGreaterThan(0);
    expect(component.actividades()[0].nombre).toBe('Test');
  });
});
