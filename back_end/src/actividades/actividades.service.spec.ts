import { Test, TestingModule } from '@nestjs/testing';
import { ActividadesService } from './actividades.service';
import { EvmService } from '../evm/evm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Repository } from 'typeorm';
import { CreateActividadeDto } from './dto/create-actividade.dto';

describe('ActividadesService', () => {
  let service: ActividadesService;
  let evmService: EvmService;
  let actividadRepo: Repository<Actividade>;
  let proyectoRepo: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadesService,
        EvmService,
        {
          provide: getRepositoryToken(Actividade),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Proyecto),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ActividadesService>(ActividadesService);
    evmService = module.get<EvmService>(EvmService);
    actividadRepo = module.get<Repository<Actividade>>(getRepositoryToken(Actividade));
    proyectoRepo = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evmService).toBeDefined();
    expect(actividadRepo).toBeDefined();
    expect(proyectoRepo).toBeDefined();
  });

  it('should call EvmService.calculateEvmIndicators with correct values', () => {
    const dto: CreateActividadeDto = {
      nombre: 'Planificación',
      bac: 10000,
      porcentajeAvancePlanificado: 50,
      porcentajeAvanceReal: 40,
      costoActual: 3500,
      proyectoId: 'uuid-proyecto',
    };
    const spy = jest.spyOn(evmService, 'calculateEvmIndicators');
    service['evmService'].calculateEvmIndicators({
      bac: dto.bac,
      plannedProgressPercent: dto.porcentajeAvancePlanificado,
      actualProgressPercent: dto.porcentajeAvanceReal,
      ac: dto.costoActual,
    });
    expect(spy).toHaveBeenCalledWith({
      bac: 10000,
      plannedProgressPercent: 50,
      actualProgressPercent: 40,
      ac: 3500,
    });
  });
});
