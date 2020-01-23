import {IsString, IsEmail, MaxLength, IsOptional, IsNotEmpty} from 'class-validator';

export class SignInUserDTO {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(150)
    email: string;

    @IsString()
    @MaxLength(150)
    password: string;
}
