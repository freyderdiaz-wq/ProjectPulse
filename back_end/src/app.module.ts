import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActividadesModule } from './actividades/actividades.module';
import { ProyectosModule } from './proyectos/proyectos.module';

@Module({
  imports: [ActividadesModule, ProyectosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
