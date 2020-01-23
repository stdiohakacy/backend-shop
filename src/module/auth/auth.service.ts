import { SignInUserDTO } from './../user/dto/signin-user-dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import UserView from '../user/view/user.view';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async signInUser(signInUserDTO: SignInUserDTO): Promise<UserView> {
        const user = await this.userService.signInUser(signInUserDTO);
        return user;
    }
}
