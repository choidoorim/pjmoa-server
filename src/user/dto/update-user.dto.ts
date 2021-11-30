import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';
import { REGEX, MESSAGES } from 'src/app.utils';

export class UpdateUserDto {
  @IsEmail()
  private readonly _email: string;

  @IsString()
  private readonly _firstName: string;

  @IsString()
  private readonly _lastName: string;

  @IsNumber()
  private readonly _age: number;

  @IsString()
  @Matches(REGEX.PHONE_NUMBER_RULE, {
    message: MESSAGES.PHONE_NUMBER_MESSAGE,
  })
  private readonly _phoneNumber: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    phoneNumber: string,
  ) {
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
    this._phoneNumber = phoneNumber;
  }

  get email(): string {
    return this._email;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get age(): number {
    return this._age;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }
}
