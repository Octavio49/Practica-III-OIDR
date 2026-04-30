import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @ApiProperty({ example: 2, description: 'ID del usuario' })
    @PrimaryGeneratedColumn()
    id!:number

    @ApiProperty({ example: "Octavio", description: 'Nombre del usuario' })
    @Column()
    name!:string

    @ApiProperty({ example: "octavio@gmail.com", description: 'Correo del usuario' })
    @Column()
    email!:string

    @ApiProperty({ example: "naHG&88...", description: 'Contraseña de usuario hasheada' })
    @Column()
    password!:string
}