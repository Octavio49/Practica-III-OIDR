import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCursoDto {
    @ApiProperty({ example: "Matematicas", description: 'Nombre del curso' })
    @IsString()
    name!:string

    @ApiProperty({ example: "Juan", description: 'Nombre del profesor' })
    @IsString()
    professor!:string

    @ApiProperty({ example: "2", description: 'Numero de la clase' })
    @IsNumber()
    class!:number

    @ApiProperty({ example: "4", description: 'Horas de duracion' })
    @IsNumber()
    hours!:number

    @ApiProperty({ example: "Curso de matematicas para la clase 2", description: 'Descripcion del curso' })
    @IsOptional()
    @IsString()
    description!:string
}
