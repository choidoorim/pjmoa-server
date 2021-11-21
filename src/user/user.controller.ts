import {
  Get,
  Post,
  Body,
  Controller,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async doTest(@Request() req) {
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async doUserLogin(@Request() req) {
    const loginResult = await this.authService.login(req.user);
    return {
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'login-User Success',
      access_token: loginResult,
    };
  }
}
