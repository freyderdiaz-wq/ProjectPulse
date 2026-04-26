import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity('actividades')
export class Actividade {
	@ApiProperty({ description: 'Identificador único de la actividad', format: 'uuid' })
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ApiProperty({ description: 'Nombre de la actividad', example: 'Planificación inicial' })
	@Column({ type: 'varchar', length: 100 })
	nombre!: string;

	@ApiProperty({ description: 'Budget at Completion (BAC) de la actividad', example: 10000 })
	@Column({ type: 'decimal', precision: 12, scale: 2 })
	bac!: number;

	@ApiProperty({ description: 'Porcentaje de avance planificado', example: 50 })
	@Column({ type: 'float' })
	porcentajeAvancePlanificado!: number;

	@ApiProperty({ description: 'Porcentaje de avance real', example: 40 })
	@Column({ type: 'float' })
	porcentajeAvanceReal!: number;

	@ApiProperty({ description: 'Costo actual (AC) de la actividad', example: 5000 })
	@Column({ type: 'decimal', precision: 12, scale: 2 })
	costoActual!: number;

	@ManyToOne(() => Proyecto, proyecto => proyecto.actividades, { onDelete: 'CASCADE' })
	@ApiProperty({ type: () => Proyecto, description: 'Proyecto al que pertenece la actividad' })
	proyecto!: Proyecto;
}
