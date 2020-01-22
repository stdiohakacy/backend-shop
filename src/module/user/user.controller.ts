import { CreateUserDTO } from './dto/create-user.dto';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import UserView from './view/user.view';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('signin')
    async signIn(@Body() createUserDTO: CreateUserDTO): Promise<UserView> {
        return await this.userService.signIn(createUserDTO);
    }
}
