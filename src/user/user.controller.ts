import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { loginUserDTO } from 'src/dto/user/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // transaction 처리는 queryRunner(수동) 와 EntityManger(자동) 를 통해 수행할 수 있다.
  @Post('/register')
  async doUserRegistration(
    @Body() registerUserInfo: CreateUserDTO,
  ): Promise<User> {
    const createUserResult = await this.userService.doUserRegistration(
      registerUserInfo,
    );
    return Object.assign({
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'create-User Success',
      data: { ...createUserResult },
    });
  }

  @Post('/login')
  async doUserLogin(@Body() loginUserInfo: loginUserDTO) {
    const loginUserResult = await this.userService.doUserLogin(loginUserInfo);
    return Object.assign({
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'login-User Success',
      data: { loginUserResult },
    });
  }
}
