import { ApiProperty } from '@nestjs/swagger';

export class ProjectDashboardDTO {
  @ApiProperty({ description: 'Total Budget at Completion', example: 20000 })
  totalBac: number;

  @ApiProperty({ description: 'Total Planned Value', example: 12000 })
  totalPv: number;

  @ApiProperty({ description: 'Total Earned Value', example: 11000 })
  totalEv: number;

  @ApiProperty({ description: 'Total Actual Cost', example: 9000 })
  totalAc: number;

  @ApiProperty({ description: 'Cost Performance Index', example: 1.22 })
  cpi: number | null;

  @ApiProperty({ description: 'Schedule Performance Index', example: 0.95 })
  spi: number | null;

  @ApiProperty({ description: 'Estimate at Completion', example: 16393 })
  eac: number | null;

  @ApiProperty({ description: 'Variance at Completion', example: 3607 })
  vac: number | null;

  @ApiProperty({ description: 'CPI Interpretation', example: 'Under budget' })
  cpiInterpretation: string;

  @ApiProperty({ description: 'SPI Interpretation', example: 'Behind schedule' })
  spiInterpretation: string;

  @ApiProperty({ description: 'Project status interpretation', example: 'Project is on track' })
  projectStatus: string;
}
