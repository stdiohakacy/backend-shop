import { SignInUserDTO } from './dto/signin-user-dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { Injectable, ConflictException, UnprocessableEntityException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, IsNull, getRepository } from 'typeorm';
import UserView from './view/user.view';
import { IPaginationOptions } from '../pagination/pagination-options.interface';
import { Pagination } from '../pagination/pagination';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async findUsers(options: IPaginationOptions): Promise<Pagination<UserView>> {
        const [users, total] = await this.userRepository.findAndCount({
            order: {createdAt: 'DESC'},
            where: {deletedAt: IsNull()},
            take: options.limit,
            skip: options.page * options.limit,
        });

        if (!users) {
            throw new NotFoundException();
        }

        const data = UserView.transform(users);
        return new Pagination<UserView>({ data, total });
}

    async findUserById(id: number): Promise<UserView> {
        const user = await getRepository(User)
            .createQueryBuilder('user')
            .whereInIds([id])
            .andWhere('user.deletedAt IS NULL')
            .getOne();

        if (!user) {
            throw new NotFoundException();
        }

        return new UserView(user);
    }

    async findUserByEmail(email: string): Promise<UserView> {
        const user = await this.userRepository.findOne({where: {email, deletedAt: IsNull()}});
        if (!user) {
            throw new NotFoundException();
        }

        return new UserView(user);
    }

    async signUpUser(signUpUserDTO: SignUpUserDTO): Promise<UserView> {
        const findedUser = await this.userRepository.findOne({
            where: {
                email: signUpUserDTO.email,
            },
        });
        
        if (findedUser) {
            throw new ConflictException();
        }

        const user = new User();
        user.email = signUpUserDTO.email;
        user.password = signUpUserDTO.password;
        user.firstName = signUpUserDTO.firstName;
        user.lastName = signUpUserDTO.lastName;
        user.avatar = signUpUserDTO.avatar;

        const userSignUp = await this.userRepository.save(user);

        if (!userSignUp) {
            throw new UnprocessableEntityException();
        }

        return new UserView(userSignUp);
    }

    async signInUser(signInUserDTO: SignInUserDTO): Promise<UserView> {
        const user = await this.userRepository.findOne({where: {
            email: signInUserDTO.email,
            password: crypto.createHmac('sha256', signInUserDTO.password).digest('hex'),
        }});
        if (!user) {
            throw new UnauthorizedException();
        }

        return new UserView(user);
    }
}
