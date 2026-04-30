import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateUserDto{
    @ApiProperty({ example: "Octavio", description: 'Nombre del usuario' })
    @IsString()
    name!:string

    @ApiProperty({ example: "Octavio@gmail.com", description: 'Email del usuario' })
    @IsString()
    @IsEmail()
    email!:string

    @ApiProperty({ example: "Contraseña", description: 'Contraseña del ususario hasheada' })
    @IsString()
    @MinLength(8)
    password!:string
}