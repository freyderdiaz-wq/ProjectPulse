import { ApiProperty } from '@nestjs/swagger';
import { ResponseActividadeDto } from '../../actividades/dto/response-actividade.dto';

export class ResponseProyectoDto {
  @ApiProperty({ description: 'ID del proyecto', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
  id!: string;

  @ApiProperty({ description: 'Nombre del proyecto', example: 'Sistema de Gestión de Proyectos' })
  nombre!: string;

  @ApiProperty({ description: 'Descripción del proyecto', example: 'Proyecto para gestionar actividades y recursos.' })
  descripcion!: string;

  @ApiProperty({
    description: 'Lista de actividades asociadas al proyecto, cada una con métricas EVM',
    type: [ResponseActividadeDto],
  })
  actividades!: ResponseActividadeDto[];

  @ApiProperty({ description: 'Costo total del proyecto (suma de AC de todas las actividades)', example: 15000 })
  costoTotal!: number;

  @ApiProperty({ description: 'Budget at Completion (BAC) total del proyecto', example: 20000 })
  bacTotal!: number;

  @ApiProperty({ description: 'Earned Value (EV) total del proyecto', example: 12000 })
  evTotal!: number;

  @ApiProperty({ description: 'Planned Value (PV) total del proyecto', example: 14000 })
  pvTotal!: number;

  @ApiProperty({ description: 'Cost Performance Index (CPI) total', example: 0.85 })
  cpiTotal!: number;

  @ApiProperty({ description: 'Schedule Performance Index (SPI) total', example: 0.92 })
  spiTotal!: number;

  @ApiProperty({ description: 'Estimate at Completion (EAC) total', example: 17647 })
  eacTotal!: number;

  @ApiProperty({ description: 'Variance at Completion (VAC) total', example: 2353 })
  vacTotal!: number;
}
