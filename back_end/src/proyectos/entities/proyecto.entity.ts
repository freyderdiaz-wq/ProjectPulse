import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Actividade } from '../../actividades/entities/actividade.entity';

@Entity('proyectos')
export class Proyecto {
	@ApiProperty({ description: 'Identificador único del proyecto', format: 'uuid' })
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ApiProperty({ description: 'Nombre del proyecto', example: 'Sistema de Gestión de Proyectos' })
	@Column({ type: 'varchar', length: 100 })
	nombre!: string;

	@ApiProperty({ description: 'Descripción del proyecto', example: 'Proyecto para gestionar actividades y recursos.' })
	@Column({ type: 'text', nullable: true })
	descripcion!: string;

	@OneToMany(() => Actividade, actividad => actividad.proyecto)
	actividades!: Actividade[];
}
