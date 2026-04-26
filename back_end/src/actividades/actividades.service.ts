
import { Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { EvmService } from '../evm/evm.service';

@Injectable()
export class ActividadesService {
  constructor(private readonly evmService: EvmService) {}

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
