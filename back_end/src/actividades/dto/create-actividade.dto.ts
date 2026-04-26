import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateActividadeDto {
	@ApiProperty({ description: 'Nombre de la actividad', example: 'Planificación inicial' })
	@IsString()
	@IsNotEmpty()
	nombre!: string;

	@ApiProperty({ description: 'Budget at Completion (BAC) de la actividad', example: 10000 })
	@IsNumber()
	@Min(0)
	bac!: number;

	@ApiProperty({ description: 'Porcentaje de avance planificado', example: 50, minimum: 0, maximum: 100 })
	@IsNumber()
	@Min(0)
	@Max(100)
	porcentajeAvancePlanificado!: number;

	@ApiProperty({ description: 'Porcentaje de avance real', example: 40, minimum: 0, maximum: 100 })
	@IsNumber()
	@Min(0)
	@Max(100)
	porcentajeAvanceReal!: number;

	@ApiProperty({ description: 'Costo actual (AC) de la actividad', example: 5000 })
	@IsNumber()
	@Min(0)
	costoActual!: number;
}
