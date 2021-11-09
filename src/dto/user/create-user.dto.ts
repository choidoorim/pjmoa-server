import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsEmail()
    readonly email: string
    
    @IsString()
    readonly password: string

    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName: string

    @IsNumber()
    readonly age: number

    @IsString()
    readonly phoneNumber: string
}