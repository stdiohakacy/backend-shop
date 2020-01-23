import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request: any, @Res() response: Response): Promise<any> {
        const auth = await this.authService.login(request.user);

        response.cookie('token', auth.accessToken, {
            expires: new Date(Date.now() + 3600),
            secure: false, // set to true if your using https
            httpOnly: true,
        });

        return response.json(auth);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() request: any) {
        return request.user;
    }
}
