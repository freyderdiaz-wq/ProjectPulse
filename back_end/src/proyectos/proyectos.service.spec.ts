import { Test, TestingModule } from '@nestjs/testing';
import { ProyectosService } from './proyectos.service';
import { EvmService } from '../evm/evm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';

describe('ProyectosService - EVM Calculations', () => {
  let evmService: EvmService;

  beforeEach(async () => {
    evmService = new EvmService();
  });

  it('should be defined', () => {
    expect(evmService).toBeDefined();
  });

  it('should calculate consolidated EVM indicators correctly for two activities', () => {
    // Activity 1: BAC=10000, planned=50%, actual=40%, cost=3500
    const activity1EVM = evmService.calculateEvmIndicators({
      bac: 10000,
      plannedProgressPercent: 50,
      actualProgressPercent: 40,
      ac: 3500,
    });

    // Activity 2: BAC=5000, planned=60%, actual=50%, cost=2000
    const activity2EVM = evmService.calculateEvmIndicators({
      bac: 5000,
      plannedProgressPercent: 60,
      actualProgressPercent: 50,
      ac: 2000,
    });

    // Consolidated totals
    const totalBac = 10000 + 5000; // 15000
    const totalPv = activity1EVM.pv + activity2EVM.pv; // 5000 + 3000 = 8000
    const totalEv = activity1EVM.ev + activity2EVM.ev; // 4000 + 2500 = 6500
    const totalAc = activity1EVM.ev - activity1EVM.cv + activity2EVM.ev - activity2EVM.cv; // 3500 + 2000 = 5500

    expect(totalBac).toBe(15000);
    expect(totalPv).toBe(8000);
    expect(totalEv).toBe(6500);
    expect(totalAc).toBe(5500);

    // Consolidated CPI and SPI
    const consolidatedCPI = totalEv / totalAc;
    const consolidatedSPI = totalEv / totalPv;

    expect(consolidatedCPI).toBeCloseTo(6500 / 5500);
    expect(consolidatedSPI).toBeCloseTo(6500 / 8000);
  });

  it('should match actual Proyecto A data', () => {
    // Proyecto A: BAC=5000, planned=50%, actual=45%, cost=2500
    const result = evmService.calculateEvmIndicators({
      bac: 5000,
      plannedProgressPercent: 50,
      actualProgressPercent: 45,
      ac: 2500,
    });

    expect(result.pv).toBe(2500);
    expect(result.ev).toBe(2250);
    expect(result.cv).toBe(-250); // Over budget
    expect(result.sv).toBe(-250); // Behind schedule
    expect(result.cpi).toBeCloseTo(0.9);
    expect(result.spi).toBeCloseTo(0.9);
    expect(result.cpiInterpretation).toBe('Over budget');
    expect(result.spiInterpretation).toBe('Behind schedule');
  });

  it('should match actual Proyecto B data', () => {
    // Proyecto B: BAC=3000, planned=60%, actual=55%, cost=1800
    const result = evmService.calculateEvmIndicators({
      bac: 3000,
      plannedProgressPercent: 60,
      actualProgressPercent: 55,
      ac: 1800,
    });

    expect(result.pv).toBe(1800);
    expect(result.ev).toBe(1650);
    expect(result.cv).toBe(-150);
    expect(result.sv).toBe(-150);
    expect(result.cpi).toBeCloseTo(0.91666666, 5);
    expect(result.spi).toBeCloseTo(0.91666666, 5);
    expect(result.cpiInterpretation).toBe('Over budget');
    expect(result.spiInterpretation).toBe('Behind schedule');
  });
});
