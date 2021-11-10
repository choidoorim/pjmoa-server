import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { User } from '../entity/user/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) {}

    async doUserRegistration(user: CreateUserDTO) {
        const queryRunner = await getConnection().createQueryRunner();
        await queryRunner.startTransaction()
        try {
            const result:User = await this.usersRepository.save(user);
            return result; 
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new NotFoundException(`Failed SignUp ${error}`);
        } finally {
            await queryRunner.release();
        }
    };
}
