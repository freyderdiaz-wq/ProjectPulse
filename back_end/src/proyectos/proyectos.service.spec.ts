import { Test, TestingModule } from '@nestjs/testing';
import { ProyectosService } from './proyectos.service';
import { EvmService } from '../evm/evm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';

describe('ProyectosService', () => {
  let service: ProyectosService;
  let evmService: EvmService;
  let proyectoRepo: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectosService,
        EvmService,
        {
          provide: getRepositoryToken(Proyecto),
          useValue: {}, // mock repo, no se usa en estos tests
        },
      ],
    }).compile();

    service = module.get<ProyectosService>(ProyectosService);
    evmService = module.get<EvmService>(EvmService);
    proyectoRepo = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evmService).toBeDefined();
    expect(proyectoRepo).toBeDefined();
  });

  it('should return safe zeros if no activities', async () => {
    // Mockear getActivitiesByProjectId
    jest.spyOn<any, any>(service, 'getActivitiesByProjectId').mockResolvedValue([]);
    const result = await service.getProjectSummary(999);
    expect(result.totalBac).toBe(0);
    expect(result.totalPv).toBe(0);
    expect(result.totalEv).toBe(0);
    expect(result.totalAc).toBe(0);
    expect(result.cpi).toBeNull();
    expect(result.spi).toBeNull();
    expect(result.eac).toBeNull();
    expect(result.vac).toBeNull();
    expect(result.cpiInterpretation).toBe('No calculable');
    expect(result.spiInterpretation).toBe('No calculable');
    expect(result.projectStatus).toBe('No activities found');
  });

  it('should calculate consolidated metrics for a project', async () => {
    // Mockear getActivitiesByProjectId
    jest.spyOn<any, any>(service, 'getActivitiesByProjectId').mockResolvedValue([
      { bac: 10000, pv: 5000, ev: 4000, ac: 3500 },
      { bac: 5000, pv: 3000, ev: 2500, ac: 2000 },
    ]);
    const result = await service.getProjectSummary(1);
    expect(result.totalBac).toBe(15000);
    expect(result.totalPv).toBe(8000);
    expect(result.totalEv).toBe(6500);
    expect(result.totalAc).toBe(5500);
    expect(result.cpi).toBeCloseTo(6500 / 5500);
    expect(result.spi).toBeCloseTo(6500 / 8000);
    expect(result.eac).toBeCloseTo(15000 / (6500 / 5500));
    expect(result.vac).toBeCloseTo(15000 - (15000 / (6500 / 5500)));
    expect(result.cpiInterpretation).toBeDefined();
    expect(result.spiInterpretation).toBeDefined();
    expect(result.projectStatus).toBeDefined();
  });
});
