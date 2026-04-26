export interface EvmInput {
  bac: number; // Budget at Completion
  plannedProgressPercent: number; // Planned Progress (%)
  actualProgressPercent: number; // Actual Progress (%)
  ac: number; // Actual Cost
}

export interface EvmResult {
  pv: number; // Planned Value
  ev: number; // Earned Value
  cv: number; // Cost Variance
  sv: number; // Schedule Variance
  cpi: number | null; // Cost Performance Index
  spi: number | null; // Schedule Performance Index
  eac: number | null; // Estimate at Completion
  vac: number | null; // Variance at Completion
  cpiInterpretation: string;
  spiInterpretation: string;
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class EvmService {
  private static readonly PERCENT_FACTOR = 0.01;

  calculateEvmIndicators(input: EvmInput): EvmResult {
    const { bac, plannedProgressPercent, actualProgressPercent, ac } = input;

    // Planned Value (PV)
    const pv = bac * plannedProgressPercent * EvmService.PERCENT_FACTOR;
    // Earned Value (EV)
    const ev = bac * actualProgressPercent * EvmService.PERCENT_FACTOR;
    // Cost Variance (CV)
    const cv = ev - ac;
    // Schedule Variance (SV)
    const sv = ev - pv;

    // Cost Performance Index (CPI)
    const cpi = ac !== 0 ? ev / ac : null;
    // Schedule Performance Index (SPI)
    const spi = pv !== 0 ? ev / pv : null;
    // Estimate at Completion (EAC)
    const eac = cpi && cpi !== 0 ? bac / cpi : null;
    // Variance at Completion (VAC)
    const vac = eac !== null ? bac - eac : null;

    // Interpretations
    const cpiInterpretation =
      cpi === null ? 'No calculable' : cpi > 1 ? 'Under budget' : cpi < 1 ? 'Over budget' : 'On budget';
    const spiInterpretation =
      spi === null ? 'No calculable' : spi > 1 ? 'Ahead of schedule' : spi < 1 ? 'Behind schedule' : 'On schedule';

    return {
      pv,
      ev,
      cv,
      sv,
      cpi,
      spi,
      eac,
      vac,
      cpiInterpretation,
      spiInterpretation,
    };
  }
}
