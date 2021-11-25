import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CHECK } from '../app.utils';
import { User } from '../entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password);
    const user: User = await this.userService.findUserPassword(email);
    console.log(user);
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
