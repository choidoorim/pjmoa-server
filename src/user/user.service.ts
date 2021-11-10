import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { User } from '../entity/user/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

// entity 파일에서 BaseEntity 를 상속받아 사용하면 InjectRepository 를 사용하지 않아도 된다.
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async doUserRegistration(registerUserInfo: CreateUserDTO): Promise<User> {
        const queryRunner = await getConnection().createQueryRunner();
        await queryRunner.startTransaction()
        try {
            console.log(registerUserInfo)
            const user = new User();
            user.email = registerUserInfo.email;
            user.password = registerUserInfo.password;
            user.firstName = registerUserInfo.firstName;
            user.lastName = registerUserInfo.lastName;
            user.age = registerUserInfo.age;
            user.phoneNumber = registerUserInfo.phoneNumber;

            return await user.save(); 
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new NotFoundException(`Failed SignUp ${error}`);
        } finally {
            await queryRunner.release();
        }
    };
}
