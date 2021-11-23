import {
  EntityRepository,
  Repository,
  TransactionManager,
  EntityManager,
} from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async doUserRegistration(
    @TransactionManager() transactionManager: EntityManager,
    createUserInfo,
  ) {
    return await transactionManager.save(createUserInfo);
  }

  public async updateUserProfile(
      @TransactionManager() transactionManager: EntityManager,
      updateUserInfo,
  ) {
    return await transactionManager.save(updateUserInfo);
  }

}
