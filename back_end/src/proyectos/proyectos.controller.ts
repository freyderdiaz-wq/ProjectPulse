import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProyectosService } from './proyectos.service';
import { ProjectDashboardDTO } from './dto/project-dashboard.dto';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@ApiTags('projects')
@Controller('api/projects')
@UseInterceptors(ClassSerializerInterceptor)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiBody({ type: CreateProyectoDto })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente', type: ProjectDashboardDTO })
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectosService.create(createProyectoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos con su resumen de indicadores' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos con resumen', type: [ProjectDashboardDTO] })
  findAll() {
    // Aquí deberías retornar un array de ProjectDashboardDTO
    return this.proyectosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle de un proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Detalle del proyecto' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.proyectosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiBody({ type: UpdateProyectoDto })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado exitosamente' })
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectosService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado exitosamente' })
  remove(@Param('id') id: string) {
    return this.proyectosService.remove(id);
  }
}
