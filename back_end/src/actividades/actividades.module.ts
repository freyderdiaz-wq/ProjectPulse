import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';

import { EvmService } from '../evm/evm.service';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, EvmService],
  exports: [EvmService],
})
export class ActividadesModule {}
