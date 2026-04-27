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

  it('should calculate CV and SV correctly (variances)', () => {
    const input: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 50,
      actualProgressPercent: 40,
      ac: 3500,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    // CV = EV - AC = 4000 - 3500 = 500 (positive = under budget in cost)
    expect(result.cv).toBe(500);
    // SV = EV - PV = 4000 - 5000 = -1000 (negative = behind schedule)
    expect(result.sv).toBe(-1000);
  });

  it('should handle project with zero progress (all zeros)', () => {
    const input: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 0,
      actualProgressPercent: 0,
      ac: 0,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(0);
    expect(result.ev).toBe(0);
    expect(result.cpi).toBeNull();
    expect(result.spi).toBeNull();
    expect(result.cpiInterpretation).toBe('No calculable');
    expect(result.spiInterpretation).toBe('No calculable');
  });

  it('should handle project with 100% completion', () => {
    const input: EvmInput = {
      bac: 10000,
      plannedProgressPercent: 100,
      actualProgressPercent: 100,
      ac: 9500,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(10000);
    expect(result.ev).toBe(10000);
    expect(result.cv).toBe(500); // Under budget
    expect(result.sv).toBe(0); // On schedule
    expect(result.cpi).toBeCloseTo(10000 / 9500);
    expect(result.spi).toBe(1); // Perfect schedule
  });

  it('should handle project severely over budget', () => {
    const input: EvmInput = {
      bac: 5000,
      plannedProgressPercent: 50,
      actualProgressPercent: 30,
      ac: 3000,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(2500);
    expect(result.ev).toBe(1500);
    expect(result.cpi).toBeCloseTo(1500 / 3000); // 0.5 = 50% efficiency
    expect(result.cpiInterpretation).toBe('Over budget');
    expect(result.eac).toBeCloseTo(5000 / 0.5); // 10000
  });

  it('should handle project with very small BAC', () => {
    const input: EvmInput = {
      bac: 100,
      plannedProgressPercent: 50,
      actualProgressPercent: 40,
      ac: 35,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(50);
    expect(result.ev).toBe(40);
    expect(result.cpi).toBeCloseTo(40 / 35);
    expect(result.spi).toBeCloseTo(40 / 50);
  });

  it('should match actual project data (Proyecto A)', () => {
    // Real data from the application
    const input: EvmInput = {
      bac: 5000,
      plannedProgressPercent: 50,
      actualProgressPercent: 45,
      ac: 2500,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(2500);
    expect(result.ev).toBe(2250);
    expect(result.cv).toBe(-250); // Over budget by 250
    expect(result.sv).toBe(-250); // Behind schedule
    expect(result.cpi).toBeCloseTo(0.9);
    expect(result.spi).toBeCloseTo(0.9);
    expect(result.eac).toBeCloseTo(5555.56);
    expect(result.vac).toBeCloseTo(-555.56);
    expect(result.cpiInterpretation).toBe('Over budget');
    expect(result.spiInterpretation).toBe('Behind schedule');
  });

  it('should match actual project data (Proyecto B)', () => {
    // Real data from the application
    const input: EvmInput = {
      bac: 3000,
      plannedProgressPercent: 60,
      actualProgressPercent: 55,
      ac: 1800,
    };
    const result: EvmResult = service.calculateEvmIndicators(input);
    expect(result.pv).toBe(1800);
    expect(result.ev).toBe(1650);
    expect(result.cv).toBe(-150); // Over budget by 150
    expect(result.sv).toBe(-150); // Behind schedule
    expect(result.cpi).toBeCloseTo(0.9166666, 5);
    expect(result.spi).toBeCloseTo(0.9166666, 5);
    expect(result.eac).toBeCloseTo(3272.73, 1);
    expect(result.vac).toBeCloseTo(-272.73, 1);
    expect(result.cpiInterpretation).toBe('Over budget');
    expect(result.spiInterpretation).toBe('Behind schedule');
  });
});
