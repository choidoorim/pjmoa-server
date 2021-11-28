import {
  Get,
  Post,
  Put,
  Body,
  Controller,
  UseGuards,
  Request,
  Param,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user/user.entity';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { AuthService } from '../authentication/auth.service';
import { LocalAuthGuard } from '../authentication/local-auth.guard';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response_format } from '../app.utils';
import { baseResponse } from '../config/baseResponse';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    this.userService = userService;
    this.authService = authService;
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async doTest(@Request() req) {
    return await this.userService.findUserPassword(req.user.email);
  }

  @HttpCode(201)
  @Post('register')
  async doUserRegistration(
    @Body() registerUserInfo: CreateUserDTO,
  ): Promise<User> {
    try {
      const doUserRegistration = await this.userService.doUserRegistration(
        registerUserInfo,
      );

      return Object.assign(
        response_format.SUCCESS(baseResponse.CREATE_USER_SUCCESS, {
          ...doUserRegistration,
        }),
      );
    } catch (e) {
      console.log(`doUserRegistration - ${e}`);
      return e.message;
    }
  }

  @HttpCode(201)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async doUserLogin(@Request() req) {
    try {
      const jwtToken = await this.authService.doUserLogin(req.user);
      return Object.assign(
        response_format.SUCCESS(baseResponse.USER_LOGIN_SUCCESS, jwtToken),
      );
    } catch (e) {
      console.log(`doUserLogin - ${e}`);
      return e.message;
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':userIdx/profile')
  async viewUserProfile(
    @Request() req,
    @Param('userIdx') userIdx: number,
  ): Promise<User> {
    if (req.user.idx !== userIdx) {
      return Object.assign(response_format.ERROR(baseResponse.TOKEN_NOT_MATCH));
    }
    const viewUserProfile = await this.userService.viewUserProfile(userIdx);

    return Object.assign(
      response_format.SUCCESS(baseResponse.USER_PROFILE_LOOKUP_SUCCESS, {
        ...viewUserProfile,
      }),
    );
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put(':userIdx/profile')
  async updateUserProfile(
    @Body() userInfo: UpdateUserDto,
    @Param('userIdx') userIdx: number,
  ) {
    try {
      const updateUserProfileResult = await this.userService.updateUserProfile(
        userInfo,
        userIdx,
      );

      return Object.assign(
        response_format.SUCCESS(baseResponse.USER_PROFILE_UPDATE_SUCCESS, {
          ...updateUserProfileResult,
        }),
      );
    } catch (e) {
      console.log(`updateUserProfile - ${e}`);
      return e.message;
    }
  }
}
