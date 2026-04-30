import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/dto/login-user.dot';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { //se inyecta el repositorio de usuario, entity
  }

  async create(createUserDto:CreateUserDto){
    const salt = 10
    const {email, password} = createUserDto

    const emailExist = await this.userRepository.findOneBy({email})
    if(emailExist){
        const error={
            'statusCode':409,
            'error': 'conflict',
            'message': ["El email ya existe"]
        }
        throw new ConflictException("Usuario duplicado")
    }

    const hashPassword = await bcrypt.hash(password, salt)
    createUserDto.password = hashPassword
    return this.userRepository.save(createUserDto)
  }

  async login(loginUserDto:LoginUserDto){
    const {email,password} = loginUserDto;
    const emailExist = await this.userRepository.findOneBy({email})
    if(!emailExist){
        const error={
            'statusCode': 404,
            'error': 'conflict',
            'message': ["El usuario no existe"]
        }
        throw new NotFoundException(error)
    }

    const matchPassword = await bcrypt.compare(password, emailExist.password)
    if(!matchPassword){
        const error = {
        'statusCode': 401,
        'error': 'conflict',
        'message': ["La contraseña no coincide"]
      }
      throw new UnauthorizedException(error)
    }

    const payload = {
        sub : emailExist.id,
        name : emailExist.name,
        email : emailExist.email
    }
    console.log('payload:', payload) // ← revisa la terminal de NestJS
    const token = await this.jwtService.signAsync(payload)
    return { token };
  }
    
}
