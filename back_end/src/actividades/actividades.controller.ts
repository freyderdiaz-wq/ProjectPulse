import { Controller, Get, Post, Put, Body, Param, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { ResponseActividadeDto } from './dto/response-actividade.dto';

@ApiTags('activities')
@Controller('api/activities')
@UseInterceptors(ClassSerializerInterceptor)
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Get('/project/:projectId')
  @ApiOperation({ summary: 'Listar actividades de un proyecto con métricas EVM individuales' })
  @ApiParam({ name: 'projectId', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de actividades con métricas EVM', type: [ResponseActividadeDto] })
  findByProject(@Param('projectId') projectId: string) {
    // Llama al servicio para obtener actividades por proyecto
    return this.actividadesService.findByProject(projectId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiResponse({ status: 201, description: 'Actividad creada', type: ResponseActividadeDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createActividadeDto: CreateActividadeDto) {
    return this.actividadesService.create(createActividadeDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar una actividad existente' })
  @ApiParam({ name: 'id', description: 'ID de la actividad' })
  @ApiResponse({ status: 200, description: 'Actividad actualizada', type: ResponseActividadeDto })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateActividadeDto: UpdateActividadeDto) {
    return this.actividadesService.update(id, updateActividadeDto);
  }
}
