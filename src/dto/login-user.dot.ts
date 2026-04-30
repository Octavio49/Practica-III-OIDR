import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({ example: "Octavio@gamil.com", description: 'Correo del usuario' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!:string

    @ApiProperty({ example: "Contraseña", description: 'Contraseña del usuario' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!:string
}