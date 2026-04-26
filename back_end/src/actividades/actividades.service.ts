

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Actividade } from './entities/actividade.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { EvmService } from '../evm/evm.service';

@Injectable()
export class ActividadesService {
  constructor(
    private readonly evmService: EvmService,
    @InjectRepository(Actividade) private readonly actividadRepo: Repository<Actividade>,
    @InjectRepository(Proyecto) private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  /**
   * Retorna las actividades de un proyecto con sus métricas EVM individuales.
   * Simulación: reemplazar por consulta real a la base de datos.
   */
  async findByProject(projectId: string) {
    if (!projectId) throw new BadRequestException('El ID del proyecto es requerido');
    const actividades = await this.actividadRepo.find({ where: { proyecto: { id: projectId } }, relations: ['proyecto'] });
    if (!actividades || actividades.length === 0) throw new NotFoundException('No se encontraron actividades para el proyecto');
    return actividades;
  }

  async create(createActividadeDto: CreateActividadeDto) {
    if (!createActividadeDto.proyectoId) throw new BadRequestException('proyectoId es requerido');
    const proyecto = await this.proyectoRepo.findOne({ where: { id: createActividadeDto.proyectoId } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    const actividad = this.actividadRepo.create({ ...createActividadeDto, proyecto });
    return await this.actividadRepo.save(actividad);
  }

  async findAll() {
    return await this.actividadRepo.find({ relations: ['proyecto'] });
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('El ID de la actividad es requerido');
    const actividad = await this.actividadRepo.findOne({ where: { id }, relations: ['proyecto'] });
    if (!actividad) throw new NotFoundException('Actividad no encontrada');
    return actividad;
  }

  async update(id: string, updateActividadeDto: UpdateActividadeDto) {
    if (!id) throw new BadRequestException('El ID de la actividad es requerido');
    const result = await this.actividadRepo.update(id, updateActividadeDto);
    if (result.affected === 0) throw new NotFoundException('Actividad no encontrada');
    return this.findOne(id);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('El ID de la actividad es requerido');
    const result = await this.actividadRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Actividad no encontrada');
    return { deleted: true };
  }
}
