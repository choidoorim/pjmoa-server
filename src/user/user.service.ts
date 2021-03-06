import { Injectable, NotFoundException } from '@nestjs/common';
import { getConnection, QueryRunner, UpdateResult } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { UserRepository } from './repository/user.repository';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async doUserRegistration(registerUserInfo: CreateUserDTO): Promise<User[]> {
    const queryRunner: QueryRunner = await getConnection().createQueryRunner();
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
      throw new NotFoundException(
        `Failed SignUp - ${process.env.NODE_ENV == 'dev' ? error : null}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async viewUserProfile(userIdx: number) {
    return await this.usersRepository.viewUserProfile(userIdx);
  }

  async updateUserProfile(
    userInfo: UpdateUserDto,
    userIdx,
  ): Promise<UpdateResult> {
    const queryRunner: QueryRunner = await getConnection().createQueryRunner();
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
