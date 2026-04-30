import { Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dot';
import { AuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    //No protegida
    @ApiBody({type:CreateUserDto})
    @ApiCreatedResponse({type:User, description: "Creado correctamente"})
    @ApiBadRequestResponse({description: "Email no valido o contraseña con longitud menor a 8"})
    @ApiConflictResponse({description:"Correo duplicado"})
    @Post('/register')
    create(@Body() createUserDto:CreateUserDto){
        return this.authService.create(createUserDto);
    }

    //No protegida
    @ApiBody({type:LoginUserDto})
    @ApiCreatedResponse({
        description:"Acceso correcto",
        schema:{
            example:"hYBS/$dsa"
        }
    })
    @ApiNotFoundResponse({description:"No existe el usuario ingresado"})
    @ApiUnauthorizedResponse({description:"Cotraseña es incorrecta"})
    @Post('/login')
    login(@Body() loginUserDto: LoginUserDto){
        return this.authService.login(loginUserDto);
    }

    //Protegida
    @ApiBearerAuth('JWT')
    @ApiOkResponse({
        description:"Perfil de usuario autenticado",
        schema: {
            example:{
                sub: 1,
                name : "Octavio",
                email: "octavio@gmail.com"
            }
        }
    })
    @ApiUnauthorizedResponse({description: "Token invalido"})
    @UseGuards(AuthGuard)
    @Get('/profile')
    profile(@Request() req){
        return "El token fue valido, estas viendo un perfil protegido. " + req
    }



}
