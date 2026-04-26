import { Test, TestingModule } from '@nestjs/testing';
import { ProyectosService } from './proyectos.service';
import { EvmService } from '../evm/evm.service';

describe('ProyectosService', () => {
  let service: ProyectosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectosService, EvmService],
    }).compile();

    service = module.get<ProyectosService>(ProyectosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return safe zeros if no activities', async () => {
    const result = await service.getProjectSummary(999); // projectId sin actividades
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
    const result = await service.getProjectSummary(1); // projectId con actividades simuladas
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
