import {
  Get,
  Post,
  Body,
  Controller,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { AuthService } from '../authentication/auth.service';
import { LocalAuthGuard } from '../authentication/local-auth.guard';
import { string } from 'joi';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async doTest(@Request() req) {
    return await this.userService.findUserPassword(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userIdx/profile')
  async viewUserProfile(@Request() req, @Param('userIdx') userIdx: number) {
    if (req.user.idx !== userIdx) {
      return Object.assign({
        isSuccess: false,
        statusCode: 401,
        statusMsg: 'The token ID and user ID are not matched',
      });
    }
    const viewUserProfile = await this.userService.viewUserProfile(
      req.user.email,
    );

    return Object.assign({
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'view User Profile Success',
      data: { ...viewUserProfile },
    });
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
    const jwtToken = await this.authService.doUserLogin(req.user);
    return {
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'login-User Success',
      access_token: jwtToken,
    };
  }
}
