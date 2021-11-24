import { IsEmail, IsNumber, IsString, Length, Matches } from 'class-validator';
import { REGEX, MESSAGES } from 'src/config/app.utils';

// Matches 데코레이터를 통해 정규표현식 제어가 가능하고, message 를 통해 에러 문구를 제어할 수 있다.

export class CreateUserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 15)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  @Matches(REGEX.PHONE_NUMBER_RULE, {
    message: MESSAGES.PHONE_NUMBER_MESSAGE,
  })
  readonly phoneNumber: string;
}
