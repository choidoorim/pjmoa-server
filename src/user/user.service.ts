import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async doUserRegistration(registerUserInfo: CreateUserDTO): Promise<User> {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // create: Active Record 에서 entity 에 BaseEntity 를 상속해서 사용하지 않도록 한다.
      const user: User = await this.usersRepository.create(registerUserInfo);

      const result: User = await this.usersRepository.save(user);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed SignUp ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async viewUserProfile(email: string) {
    const [userProfileResult] = await this.usersRepository.find({
      select: [
        'email',
        'firstName',
        'lastName',
        'age',
        'phoneNumber',
        'imageUrl',
      ],
      where: { email: email, status: true },
    });

    return userProfileResult;
  }

  async findUserPassword(email: string): Promise<User> {
    const [userPasswordResult] = await this.usersRepository.find({
      select: ['password'],
      where: { email: email, status: true },
    });
    return userPasswordResult;
  }
}
