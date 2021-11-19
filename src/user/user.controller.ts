import {
  Get,
  Post,
  Param,
  Body,
  Controller,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async doTest(@Request() req) {
    console.log(req.user);
    return await this.userService.findUser(req.user.email);
  }

  @Post('register')
  async doUserRegistration(
    @Body() registerUserInfo: CreateUserDTO,
  ): Promise<User> {
    const doUserRegistration = await this.userService.doUserRegistration(
      registerUserInfo,
    );
    return Object.assign({
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'create-User Success',
      data: { ...doUserRegistration },
    });
  }

  // @Post('/login')
  // async doUserLogin(@Request() req, @Body() loginUserInfo: loginUserDTO) {
  //   const loginUserResult = await this.userService.doUserLogin(loginUserInfo);
  //   return Object.assign({
  //     isSuccess: true,
  //     statusCode: 201,
  //     statusMsg: 'login-User Success',
  //     data: { loginUserResult },
  //   });
  // }
}
