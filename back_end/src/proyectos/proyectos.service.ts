import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { EvmService } from '../evm/evm.service';
import { ProjectDashboardDTO } from './dto/project-dashboard.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @Inject(EvmService) private readonly evmService: EvmService,
    @InjectRepository(Proyecto) private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  /**
   * Calcula el resumen EVM consolidado del proyecto.
   * @param projectId ID del proyecto
   */
  async getProjectSummary(projectId: number): Promise<ProjectDashboardDTO> {
    if (!projectId) throw new BadRequestException('El ID del proyecto es requerido');
    
    // Obtener el proyecto para tener id y nombre
    const proyecto = await this.proyectoRepo.findOne({ where: { id: projectId.toString() } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    
    const activities = await this.getActivitiesByProjectId(projectId);
    if (!activities || activities.length === 0) {
      throw new NotFoundException('No se encontraron actividades para el proyecto');
    }

    // Sumar totales
    let totalBac = 0;
    let totalPv = 0;
    let totalEv = 0;
    let totalAc = 0;
    for (const act of activities) {
      totalBac += act.bac;
      totalPv += act.pv;
      totalEv += act.ev;
      totalAc += act.ac;
    }

    // Calcular indicadores globales usando EvmService
    const evmResult = this.evmService.calculateEvmIndicators({
      bac: totalBac,
      plannedProgressPercent: totalPv / (totalBac || 1) * 100, // % global
      actualProgressPercent: totalEv / (totalBac || 1) * 100, // % global
      ac: totalAc,
    });

    // Interpretación global
    let projectStatus = 'Project is on track';
    if (evmResult.cpi !== null && evmResult.cpi < 1) projectStatus = 'Project is over budget';
    if (evmResult.spi !== null && evmResult.spi < 1) projectStatus = 'Project is behind schedule';
    if (evmResult.cpi !== null && evmResult.cpi > 1) projectStatus = 'Project is under budget';
    if (evmResult.spi !== null && evmResult.spi > 1) projectStatus = 'Project is ahead of schedule';

    return {
      id: proyecto.id.toString(),
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      totalBac,
      totalPv,
      totalEv,
      totalAc,
      sv: evmResult.sv,
      cpi: evmResult.cpi,
      spi: evmResult.spi,
      eac: evmResult.eac,
      vac: evmResult.vac,
      cpiInterpretation: evmResult.cpiInterpretation,
      spiInterpretation: evmResult.spiInterpretation,
      projectStatus,
    };
  }

  /**
   * Simulación: Recupera actividades asociadas a un proyecto.
   * En producción, reemplazar por consulta a la base de datos.
   */
  private async getActivitiesByProjectId(projectId: number): Promise<Array<{ bac: number; pv: number; ev: number; ac: number }>> {
    // Simulación de datos
    if (projectId === 1) {
      return [
        { bac: 10000, pv: 5000, ev: 4000, ac: 3500 },
        { bac: 5000, pv: 3000, ev: 2500, ac: 2000 },
      ];
    }
    return [];
  }

  // Métodos CRUD generados por NestJS

  async create(createProyectoDto: CreateProyectoDto) {
    if (!createProyectoDto.nombre) throw new BadRequestException('El nombre del proyecto es requerido');
    const proyecto = this.proyectoRepo.create(createProyectoDto);
    return await this.proyectoRepo.save(proyecto);
  }

  async findAll(): Promise<ProjectDashboardDTO[]> {
    const proyectos = await this.proyectoRepo.find({ relations: ['actividades'] });
    // Mapear cada proyecto a su dashboard consolidado
    return Promise.all(proyectos.map(async (proyecto) => {
      // Calcular métricas EVM a partir de las actividades
      let totalBac = 0, totalPv = 0, totalEv = 0, totalAc = 0;
      for (const act of proyecto.actividades || []) {
        totalBac += Number(act.bac);
        totalPv += Number(act.bac) * Number(act.porcentajeAvancePlanificado) * 0.01;
        totalEv += Number(act.bac) * Number(act.porcentajeAvanceReal) * 0.01;
        totalAc += Number(act.costoActual);
      }
      const evmResult = this.evmService.calculateEvmIndicators({
        bac: totalBac,
        plannedProgressPercent: totalBac ? (totalPv / totalBac) * 100 : 0,
        actualProgressPercent: totalBac ? (totalEv / totalBac) * 100 : 0,
        ac: totalAc,
      });
      let projectStatus = 'Project is on track';
      if (evmResult.cpi !== null && evmResult.cpi < 1) projectStatus = 'Project is over budget';
      if (evmResult.spi !== null && evmResult.spi < 1) projectStatus = 'Project is behind schedule';
      if (evmResult.cpi !== null && evmResult.cpi > 1) projectStatus = 'Project is under budget';
      if (evmResult.spi !== null && evmResult.spi > 1) projectStatus = 'Project is ahead of schedule';
      return {
        id: proyecto.id,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        totalBac,
        totalPv,
        totalEv,
        totalAc,
        sv: evmResult.sv,
        cpi: evmResult.cpi,
        spi: evmResult.spi,
        eac: evmResult.eac,
        vac: evmResult.vac,
        cpiInterpretation: evmResult.cpiInterpretation,
        spiInterpretation: evmResult.spiInterpretation,
        projectStatus,
      };
    }));
  }


  async findOne(id: string) {
    if (!id) throw new BadRequestException('El ID del proyecto es requerido');
    const proyecto = await this.proyectoRepo.findOne({ where: { id }, relations: ['actividades'] });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    return proyecto;
  }


  async update(id: string, updateProyectoDto: UpdateProyectoDto) {
    if (!id) throw new BadRequestException('El ID del proyecto es requerido');
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    Object.assign(proyecto, updateProyectoDto);
    return await this.proyectoRepo.save(proyecto);
  }
  


  async remove(id: string) {
    if (!id) throw new BadRequestException('El ID del proyecto es requerido');
    const result = await this.proyectoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Proyecto no encontrado');
    return { deleted: true };
  }
}
