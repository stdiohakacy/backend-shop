import { SignInUserDTO } from './../user/dto/signin-user-dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import UserView from '../user/view/user.view';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signInUser(@Body() signInUserDTO: SignInUserDTO): Promise<UserView> {
        console.log(signInUserDTO);
        return await this.authService.signInUser(signInUserDTO);
    }
}
