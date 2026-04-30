import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CursoModule } from './curso/curso.module';
import { User } from './entities/user.entity';
import { Curso } from './entities/curso.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Curso],
    synchronize: true,
    ssl: { rejectUnauthorized: false }
  }), CursoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
