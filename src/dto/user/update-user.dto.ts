import { IsEmail, IsNumber, IsString, Length, Matches } from 'class-validator';
import { REGEX, MESSAGES } from 'src/app.utils';

export class UpdateUserDto {
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
