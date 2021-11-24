import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CHECK } from '../config/app.utils';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findUserPassword(email);
    if (user && (await CHECK.PASSWORD_COMPARE(password, user.password))) {
      return { idx: user.idx, email: user.email };
    }
    return null;
  }

  async doUserLogin(user: any) {
    const payload = { email: user.email, sub: user.idx };
    return this.jwtService.sign(payload);
  }
}
