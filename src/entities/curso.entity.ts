import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Curso {
    @ApiProperty({ example: 2, description: 'ID del curso' })
    @PrimaryGeneratedColumn()
    id!:number

    @ApiProperty({ example: "Matematicas", description: 'Nombre del curso' })
    @Column()
    name!:string

    @ApiProperty({ example: "Juan", description: 'Nombre del profesor' })
    @Column()
    professor!:string

    @ApiProperty({ example: 2, description: 'Numero de la clase' })
    @Column()
    class!:number

    @ApiProperty({ example: 4, description: 'Duracion del curso' })
    @Column()
    hours!:number

    @ApiProperty({ example: "Matematicas para la clase 2", description: 'Descripcion del curso' })
    @Column({ nullable: true})
    description!:string
}
