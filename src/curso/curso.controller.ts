import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from 'src/dto/create-curso.dto';
import { UpdateCursoDto } from '../dto/update-curso.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Curso } from 'src/entities/curso.entity';

@ApiTags('curso')
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @ApiBearerAuth('JWT')
  @ApiBody({type:CreateCursoDto})
  @ApiCreatedResponse({type: Curso, description:"Creado con exito"})
  @ApiBadRequestResponse({description: "Tipo de dato incorrecto o datos faltantes"})
  @ApiUnauthorizedResponse({description:"Token invalido o no recibido"})
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @ApiBearerAuth('JWT')
  @ApiOkResponse({type:Curso, isArray:true, description:"Verificacion correcta",})
  @ApiUnauthorizedResponse({description:"Token invalido o no recibido"})
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @ApiBearerAuth('JWT')
  @ApiParam({name:'id', type:'number', description:'id del curso buscado' })
  @ApiOkResponse({type:Curso, description:"Verificacion correcta"})
  @ApiBadRequestResponse({description:"Tipo de dato incorrecto"})
  @ApiUnauthorizedResponse({description:"Token invalido o no recibido"})
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cursoService.findOne(id);
  }

  @ApiBearerAuth('JWT')
  @ApiBody({type:UpdateCursoDto})
  @ApiOkResponse({type:Curso, description:"Verificacion correcta"})
  @ApiBadRequestResponse({description:"Tipo de dato incorrecto"})
  @ApiUnauthorizedResponse({description:"Token invalido o no recibido"})
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(id, updateCursoDto);
  }

  @ApiBearerAuth('JWT')
  @ApiParam({name:'id', type:'number', description:'id del ususario a eliminar' })
  @ApiOkResponse({description:"Verificacion correcta y curso eliminado"})
  @ApiBadRequestResponse({description:"Tipo de dato incorrecto"})
  @ApiUnauthorizedResponse({description:"Token invalido o no recibido"})
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cursoService.remove(id);
  }
}
