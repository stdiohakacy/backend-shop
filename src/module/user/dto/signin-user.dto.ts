import {IsNotEmpty, IsString, IsEmail, MaxLength, IsOptional} from 'class-validator';

export class SignInUserDTO {
    @IsEmail()
    @IsOptional()
    @MaxLength(150)
    email: string;

    @IsString()
    @MaxLength(150)
    password: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    avatar?: string;
}
