import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import UserView from '../user/view/user.view';
import { AuthView } from './view/auth.view';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<UserView> {
        return await this.userService.signInUser(email, password);
    }

    async login(user: UserView): Promise<AuthView> {
        const payload = {email: user.email, id: user.id};
        const token = this.jwtService.sign(payload);

        return new AuthView(user, token);
    }
}
