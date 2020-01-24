import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTConstants } from 'src/common/config/jwt-constants';
import UserView from '../user/view/user.view';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWTConstants.secret,
        });
    }

    async validate(payload: any): Promise<UserView>{
        return payload.user;
    }
}
