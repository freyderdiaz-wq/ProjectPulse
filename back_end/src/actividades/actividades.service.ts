

import { Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { EvmService } from '../evm/evm.service';

@Injectable()
export class ActividadesService {
  constructor(private readonly evmService: EvmService) {}

  /**
   * Retorna las actividades de un proyecto con sus métricas EVM individuales.
   * Simulación: reemplazar por consulta real a la base de datos.
   */
  findByProject(projectId: number) {
    // Simulación: actividades de ejemplo
    if (projectId === 1) {
      return [
        {
          id: 'a1',
          nombre: 'Planificación',
          bac: 10000,
          porcentajeAvancePlanificado: 50,
          porcentajeAvanceReal: 40,
          costoActual: 5000,
          pv: 5000,
          ev: 4000,
          cpi: 0.8,
          spi: 0.8,
          eac: 12500,
          vac: -2500,
          sv: -1000,
          cv: -1000,
        },
        {
          id: 'a2',
          nombre: 'Ejecución',
          bac: 5000,
          porcentajeAvancePlanificado: 60,
          porcentajeAvanceReal: 60,
          costoActual: 3000,
          pv: 3000,
          ev: 3000,
          cpi: 1.0,
          spi: 1.0,
          eac: 5000,
          vac: 0,
          sv: 0,
          cv: 0,
        },
      ];
    }
    return [];
  }

  create(createActividadeDto: CreateActividadeDto) {
    // Ejemplo de uso:
    // const evmResult = this.evmService.calculateEvmIndicators({
    //   bac: createActividadeDto.bac,
    //   plannedProgressPercent: createActividadeDto.porcentajeAvancePlanificado,
    //   actualProgressPercent: createActividadeDto.porcentajeAvanceReal,
    //   ac: createActividadeDto.costoActual,
    // });
    return 'This action adds a new actividade';
  }

  findAll() {
    return `This action returns all actividades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actividade`;
  }

  update(id: number, updateActividadeDto: UpdateActividadeDto) {
    return `This action updates a #${id} actividade`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }
}
