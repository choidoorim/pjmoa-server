import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
  UpdateResult,
} from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { Injectable } from '@nestjs/common';
import {UpdateUserDto} from "../dto/update-user.dto";

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async doUserRegistration(
    @TransactionManager() transactionManager: EntityManager,
    registerUserInfo,
  ) {
    const createUserInfo: User[] = this.create(registerUserInfo);

    return await transactionManager.save(createUserInfo);
  }

  public async updateUserProfile(
    @TransactionManager() transactionManager: EntityManager,
    userInfo: UpdateUserDto,
    userIdx,
  ): Promise<UpdateResult> {
    const updateUserInfo: UpdateResult = await transactionManager
      .createQueryBuilder()
      .update(User)
      .set({
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        age: userInfo.age,
        phoneNumber: userInfo.phoneNumber,
      })
      .where('idx = :userIdx', { userIdx: userIdx })
      .execute();
    // const updateUserInfo: User = await this.findUser(userIdx);
    // updateUserInfo.email = userInfo.email;
    // updateUserInfo.firstName = userInfo.firstName;
    // updateUserInfo.lastName = userInfo.lastName;
    // updateUserInfo.age = userInfo.age;
    // updateUserInfo.phoneNumber = userInfo.phoneNumber;

    return updateUserInfo;
  }

  public async viewUserProfile(userIdx: number) {
    return await this.createQueryBuilder()
      .select('user.email')
      .addSelect([
        'user.firstName',
        'user.lastName',
        'user.age',
        'user.phoneNumber',
        'user.imageUrl',
      ])
      .from(User, 'user')
      .where('user.idx = :idx', { idx: userIdx })
      .andWhere('user.status = :status', { status: true })
      .getOne();
  }

  public async findUser(userIdx: number) {
    return await this.findOne(userIdx);
  }

  public async findUserPassword(email: string) {
    return await this.createQueryBuilder()
      .select('user.idx')
      .addSelect(['user.email', 'user.password'])
      .from(User, 'user')
      .where('user.email = :email', { email: email })
      .andWhere('user.status = :status', { status: true })
      .getOne();
  }
}
