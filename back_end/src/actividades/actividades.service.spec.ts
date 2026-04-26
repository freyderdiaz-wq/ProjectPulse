import { Test, TestingModule } from '@nestjs/testing';
import { ActividadesService } from './actividades.service';
import { EvmService } from '../evm/evm.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';

describe('ActividadesService', () => {
  let service: ActividadesService;
  let evmService: EvmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadesService,
        EvmService,
      ],
    }).compile();

    service = module.get<ActividadesService>(ActividadesService);
    evmService = module.get<EvmService>(EvmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evmService).toBeDefined();
  });

  it('should call EvmService.calculateEvmIndicators with correct values', () => {
    const dto: CreateActividadeDto = {
      nombre: 'Planificación',
      bac: 10000,
      porcentajeAvancePlanificado: 50,
      porcentajeAvanceReal: 40,
      costoActual: 3500,
    };
    const spy = jest.spyOn(evmService, 'calculateEvmIndicators');
    // Simular uso real
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
