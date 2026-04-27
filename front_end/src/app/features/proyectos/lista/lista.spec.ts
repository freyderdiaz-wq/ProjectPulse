import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lista } from './lista';
import { ProyectoService } from '../../../core/services/proyecto';


describe('Lista', () => {
  let component: Lista;
  let fixture: ComponentFixture<Lista>;
  let proyectoServiceSpy: jasmine.SpyObj<ProyectoService>;

  beforeEach(async () => {
    proyectoServiceSpy = jasmine.createSpyObj('ProyectoService', ['getAll'], {
      proyectos: () => [{ id: '1', nombre: 'Proyecto Test', descripcion: 'Desc' }]
    });

    await TestBed.configureTestingModule({
      imports: [Lista],
      providers: [
        { provide: ProyectoService, useValue: proyectoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Lista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar proyectos', () => {
    expect(component.proyectos().length).toBeGreaterThan(0);
    expect(component.proyectos()[0].nombre).toBe('Proyecto Test');
  });
});


describe('Lista', () => {
  let component: Lista;
  let fixture: ComponentFixture<Lista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lista],
    }).compileComponents();

    fixture = TestBed.createComponent(Lista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
