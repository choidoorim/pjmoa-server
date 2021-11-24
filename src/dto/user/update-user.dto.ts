import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';
import { REGEX, MESSAGES } from 'src/config/app.utils';

export class UpdateUserDto {
  @IsEmail()
  readonly email: string;

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
