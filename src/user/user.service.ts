import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { User } from '../entity/user/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { loginUserDTO } from 'src/dto/user/login-user.dto';
import { CHECK } from 'src/app.utils';

// entity 파일에서 BaseEntity 를 상속받아 사용하면 InjectRepository 를 사용하지 않아도 된다.
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async doUserRegistration(registerUserInfo: CreateUserDTO): Promise<User> {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // userRepositoy.create() 메소드를 통해 user = new User() 와 같은 기능을 한다.
      // Active Recore/Data Mapper 패턴과 같다.
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

  async doUserLogin(loginUserInfo: loginUserDTO): Promise<boolean> {
    try {
      const result = await this.usersRepository.find({
        where: { email: loginUserInfo.email },
      });
      return await CHECK.PASSWORD_COMPARE(
        loginUserInfo.password,
        result[0].password,
      );
    } catch (error) {
      throw new NotFoundException(`Failed Login ${error}`);
    }
  }
}
