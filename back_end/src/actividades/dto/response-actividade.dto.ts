import { ApiProperty } from '@nestjs/swagger';

export class ResponseActividadeDto {
  @ApiProperty({ description: 'ID de la actividad', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
  id: string;

  @ApiProperty({ description: 'Nombre de la actividad', example: 'Planificación inicial' })
  nombre: string;

  @ApiProperty({ description: 'Budget at Completion (BAC)', example: 10000 })
  bac: number;

  @ApiProperty({ description: 'Porcentaje de avance planificado', example: 50 })
  porcentajeAvancePlanificado: number;

  @ApiProperty({ description: 'Porcentaje de avance real', example: 40 })
  porcentajeAvanceReal: number;

  @ApiProperty({ description: 'Costo actual (AC)', example: 5000 })
  costoActual: number;

  // EVM Metrics
  @ApiProperty({ description: 'Planned Value (PV)', example: 5000 })
  pv: number;

  @ApiProperty({ description: 'Earned Value (EV)', example: 4000 })
  ev: number;

  @ApiProperty({ description: 'Cost Performance Index (CPI)', example: 0.8 })
  cpi: number;

  @ApiProperty({ description: 'Schedule Performance Index (SPI)', example: 0.8 })
  spi: number;

  @ApiProperty({ description: 'Estimate at Completion (EAC)', example: 12500 })
  eac: number;

  @ApiProperty({ description: 'Variance at Completion (VAC)', example: -2500 })
  vac: number;

  @ApiProperty({ description: 'Schedule Variance (SV)', example: -1000 })
  sv: number;

  @ApiProperty({ description: 'Cost Variance (CV)', example: -1000 })
  cv: number;
}
