import {IsString, IsEmail, MaxLength, IsOptional, IsNotEmpty} from 'class-validator';

export class SignUpUserDTO {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(150)
    email: string;

    @IsString()
    @IsNotEmpty()
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
