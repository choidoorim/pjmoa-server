import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { User } from '../entities/user/user.entity';
import { Injectable } from '@nestjs/common';

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
    userInfo,
    userIdx,
  ) {
    const updateUserInfo: User = await this.findUser(userIdx);
    updateUserInfo.email = userInfo.email;
    updateUserInfo.firstName = userInfo.firstName;
    updateUserInfo.lastName = userInfo.lastName;
    updateUserInfo.age = userInfo.age;
    updateUserInfo.phoneNumber = userInfo.phoneNumber;

    return await transactionManager.save(updateUserInfo);
  }

  public async viewUserProfile(userIdx: number) {
    const [userProfileResult] = await this.find({
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

  public async findUser(userIdx: number) {
    return await this.findOne(userIdx);
  }

  public async findUserPassword(email: string) {
    const [userPasswordResult] = await this.find({
      select: ['idx', 'email', 'password'],
      where: { email: email, status: true },
    });

    return userPasswordResult;
  }
}
