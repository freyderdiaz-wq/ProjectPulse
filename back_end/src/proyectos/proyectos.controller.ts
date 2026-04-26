import { Controller, Get, Param, UseInterceptors, ClassSerializerInterceptor, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProyectosService } from './proyectos.service';
import { ProjectDashboardDTO } from './dto/project-dashboard.dto';

@ApiTags('projects')
@Controller('api/projects')
@UseInterceptors(ClassSerializerInterceptor)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos con su resumen de indicadores' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos con resumen', type: [ProjectDashboardDTO] })
  findAll() {
    // Aquí deberías retornar un array de ProjectDashboardDTO
    return this.proyectosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle de un proyecto con indicadores consolidados' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Detalle del proyecto con dashboard', type: ProjectDashboardDTO })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findOne(@Param('id') id: string) {
    // Devuelve el dashboard consolidado del proyecto
    return this.proyectosService.getProjectSummary(+id);
  }
}
