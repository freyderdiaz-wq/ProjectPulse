import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { Actividade } from './entities/actividade.entity';
import { EvmService } from '../evm/evm.service';
import { Proyecto } from '../proyectos/entities/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividade, Proyecto])],
  controllers: [ActividadesController],
  providers: [ActividadesService, EvmService],
  exports: [EvmService],
})
export class ActividadesModule {}
