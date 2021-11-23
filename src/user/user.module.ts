import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../authentication/auth.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
