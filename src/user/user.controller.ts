import {
  Get,
  Post,
  Put,
  Body,
  Controller,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { AuthService } from '../authentication/auth.service';
import { LocalAuthGuard } from '../authentication/local-auth.guard';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get(':userIdx/profile')
  async viewUserProfile(
    @Request() req,
    @Param('userIdx') userIdx: number,
  ): Promise<User> {
    if (req.user.idx !== userIdx) {
      return Object.assign({
        isSuccess: false,
        statusCode: 401,
        statusMsg: 'The token ID and user ID are not matched',
      });
    }
    const viewUserProfile = await this.userService.viewUserProfile(userIdx);

    return Object.assign({
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'view User Profile Success',
      data: { ...viewUserProfile },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userIdx/profile')
  async updateUserProfile(
    @Body() userInfo: UpdateUserDto,
    @Param('userIdx') userIdx: number,
  ) {
    const updateUserProfileResult = await this.userService.updateUserProfile(
      userInfo,
      userIdx,
    );

    return Object.assign({
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'update User Profile Success',
      data: { ...updateUserProfileResult },
    });
  }
}
