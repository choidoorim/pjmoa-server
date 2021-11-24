import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { REGEX, MESSAGES } from 'src/config/app.utils';

export class loginUserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 15)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  readonly password: string;
}
