import {
  Get,
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { loginUserDTO } from './dto/user/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/user/login')
  async login(@Body() loginUserInfo: loginUserDTO, @Request() req) {
    return {
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'login-User Success',
      access_token: await this.authService.login(req.user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
