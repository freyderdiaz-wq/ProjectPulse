import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProyectoDto {
	@ApiProperty({ description: 'Nombre del proyecto', example: 'Sistema de Gestión de Proyectos' })
	@IsString()
	@IsNotEmpty()
	nombre!: string;

	@ApiProperty({ description: 'Descripción del proyecto', example: 'Proyecto para gestionar actividades y recursos.' })
	@IsString()
	descripcion!: string;
}
