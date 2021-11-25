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

  @Post('register')
  async doUserRegistration(
    @Body() registerUserInfo: CreateUserDTO,
  ): Promise<User> {
    const doUserRegistration = await this.userService.doUserRegistration(
      registerUserInfo,
    );

    return Object.assign(
      response_format.SUCCESS(baseResponse.CREATE_USER_SUCCESS, {
        ...doUserRegistration,
      }),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async doUserLogin(@Request() req) {
    const jwtToken = await this.authService.doUserLogin(req.user);
    return Object.assign(
      response_format.SUCCESS(baseResponse.USER_LOGIN_SUCCESS, jwtToken),
    );
  }

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

    return Object.assign(
      response_format.SUCCESS(baseResponse.USER_PROFILE_UPDATE_SUCCESS, {
        ...updateUserProfileResult,
      }),
    );
  }
}
