import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Connection, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    private usersRepository: UserRepository,
  ) {}

  async doUserRegistration(registerUserInfo: CreateUserDTO): Promise<User> {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // create: Active Record 에서 entity 에 BaseEntity 를 상속해서 사용하지 않도록 한다.
      const createUserInfo: User = await this.usersRepository.create(
        registerUserInfo,
      );

      const result: User = await this.usersRepository.doUserRegistration(
        queryRunner.manager,
        createUserInfo,
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed SignUp ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async viewUserProfile(userIdx: number) {
    const [userProfileResult] = await this.usersRepository.find({
      select: [
        'email',
        'firstName',
        'lastName',
        'age',
        'phoneNumber',
        'imageUrl',
      ],
      where: { idx: userIdx, status: true },
    });

    return userProfileResult;
  }

  // update 는 find 와 save 조합을 이용.
  async findUser(userIdx: number): Promise<User> {
    return await this.usersRepository.findOne(userIdx);
  }

  async updateUserProfile(userInfo, userIdx) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const updateUserInfo: User = await this.findUser(userIdx);
      updateUserInfo.email = userInfo.email;
      updateUserInfo.firstName = userInfo.firstName;
      updateUserInfo.lastName = userInfo.lastName;
      updateUserInfo.age = userInfo.age;
      updateUserInfo.phoneNumber = userInfo.phoneNumber;

      const updateUserResult = await this.usersRepository.updateUserProfile(
        queryRunner.manager,
        updateUserInfo,
      );

      await queryRunner.commitTransaction();
      return updateUserResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed SignUp ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findUserPassword(email: string): Promise<User> {
    const [userPasswordResult] = await this.usersRepository.find({
      select: ['password'],
      where: { email: email, status: true },
    });
    return userPasswordResult;
  }
}
