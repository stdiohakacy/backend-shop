import { SignInUserDTO } from './dto/signin-user.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import UserView from './view/user.view';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get(':id')
    async findUserById(@Param() id: number): Promise<UserView> {
        return await this.userService.findUserById(id);
    }

    @Post('signin')
    async signInUser(@Body() signInUserDTO: SignInUserDTO): Promise<UserView> {
        return await this.userService.signInUser(signInUserDTO);
    }
}
