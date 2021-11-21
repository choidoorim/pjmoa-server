import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CHECK } from '../app.utils';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findUser(email);
    if (user && (await CHECK.PASSWORD_COMPARE(password, user.password))) {
      console.log(user.idx, user.email);
      return { idx: user.idx, email: user.email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.idx };
    return this.jwtService.sign(payload);
  }
}
