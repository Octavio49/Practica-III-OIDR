import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from 'src/dto/create-curso.dto';
import { UpdateCursoDto } from '../dto/update-curso.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'src/entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(@InjectRepository(Curso) private repoCurso:Repository<Curso>){
  }

  async create(createCursoDto: CreateCursoDto) : Promise<Curso> {
    const curso = this.repoCurso.create(createCursoDto)
    return this.repoCurso.save(curso)
  }

  async findAll() : Promise<Curso[]> {
    return this.repoCurso.find()
  }

  async findOne(id: number) : Promise<Curso | null> {
    return this.repoCurso.findOneBy({id})
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) : Promise<Curso | null> {
    await this.repoCurso.update(id, updateCursoDto)
    return this.findOne(id)
  }

  async remove(id: number) : Promise<void> {
    await this.repoCurso.delete(id)
  }
}
