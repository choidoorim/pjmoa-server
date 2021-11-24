import { Injectable, NotFoundException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async doUserRegistration(registerUserInfo: CreateUserDTO): Promise<User[]> {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // create: Active Record 에서 entity 에 BaseEntity 를 상속해서 사용하지 않도록 한다.
      const result = await this.usersRepository.doUserRegistration(
        queryRunner.manager,
        registerUserInfo,
      );

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed SignUp - ${error}`);
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

  async updateUserProfile(userInfo, userIdx): Promise<User> {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const updateUserResult = await this.usersRepository.updateUserProfile(
        queryRunner.manager,
        userInfo,
        userIdx,
      );

      await queryRunner.commitTransaction();
      return updateUserResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Failed Update UserProfile - ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findUserPassword(email: string): Promise<User> {
    return await this.usersRepository.findUserPassword(email);
  }
}
