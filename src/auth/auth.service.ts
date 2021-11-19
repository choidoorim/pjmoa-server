import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CHECK } from '../app.utils';
import { User } from '../entity/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User[] = await this.userService.findUser(email);
    if (user[0] && (await CHECK.PASSWORD_COMPARE(password, user[0].password))) {
      console.log(user[0].idx, user[0].email);
      return { idx: user[0].idx, email: user[0].email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.idx };
    return {
      isSuccess: true,
      statusCode: 201,
      statusMsg: 'login-User Success',
      access_token: this.jwtService.sign(payload),
    };
  }
}
