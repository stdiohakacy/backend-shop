import { Controller, Get, Param, Query} from '@nestjs/common';
import { UserService } from './user.service';
import UserView from './view/user.view';
import { Pagination } from '../pagination/pagination';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    async findUsers(@Query('limit') limit: number, @Query('page') page: number): Promise<Pagination<UserView>> {
        return await this.userService.findUsers({
            limit: limit ? limit : 10,
            page: page ? page : 0,
        });
    }

    @Get(':id')
    async findUserById(@Param() id: number): Promise<UserView> {
        return await this.userService.findUserById(id);
    }
}
