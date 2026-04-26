import { EvmService, EvmInput, EvmResult } from './evm.service';

describe('EvmService', () => {
  let service: EvmService;
  beforeEach(() => {
    service = new EvmService();
  });

  it('should calculate all EVM indicators correctly', () => {
    const input: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 50,
      actualProgressPercent: 40,
      ac: 3500,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(5000);
    expect(result.ev).toBe(4000);
    expect(result.cv).toBe(4000 - 3500);
    expect(result.sv).toBe(4000 - 5000);
    expect(result.cpi).toBeCloseTo(4000 / 3500);
    expect(result.spi).toBeCloseTo(4000 / 5000);
    expect(result.eac).toBeCloseTo(10000 / (4000 / 3500));
    expect(result.vac).toBeCloseTo(10000 - (10000 / (4000 / 3500)));
    expect(result.cpiInterpretation).toBe('Under budget');
    expect(result.spiInterpretation).toBe('Behind schedule');
  });

  it('should handle AC = 0 (division by zero) gracefully', () => {
    const input: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 60,
      actualProgressPercent: 60,
      ac: 0,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.cpi).toBeNull();
    expect(result.eac).toBeNull();
    expect(result.vac).toBeNull();
    expect(result.cpiInterpretation).toBe('No calculable');
  });

  it('should handle PV = 0 (division by zero) gracefully', () => {
    const input: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 0,
      actualProgressPercent: 60,
      ac: 5000,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.spi).toBeNull();
    expect(result.spiInterpretation).toBe('No calculable');
  });

  it('should interpret CPI and SPI correctly', () => {
    const inputUnderBudget: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 50,
      actualProgressPercent: 60,
      ac: 4000,
    };
    const resultUnderBudget = service.calculateEvmIndicators(inputUnderBudget);
    expect(resultUnderBudget.cpiInterpretation).toBe('Under budget');
    expect(resultUnderBudget.spiInterpretation).toBe('Ahead of schedule');

    const inputOnBudget: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 50,
      actualProgressPercent: 50,
      ac: 5000,
    };
    const resultOnBudget = service.calculateEvmIndicators(inputOnBudget);
    expect(resultOnBudget.cpiInterpretation).toBe('On budget');
    expect(resultOnBudget.spiInterpretation).toBe('On schedule');
  });
});
