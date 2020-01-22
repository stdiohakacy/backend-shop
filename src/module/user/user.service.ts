import { SignInUserDTO } from './dto/signin-user.dto';
import { Injectable, ConflictException, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import UserView from './view/user.view';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async findUserById(id: number): Promise<UserView> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }

        return new UserView(user);
    }

    async signInUser(signInUserDTO: SignInUserDTO): Promise<UserView> {
        const findedUser = await this.userRepository.findOne({
            where: {
                email: signInUserDTO.email,
            },
        });
        
        if (findedUser) {
            throw new ConflictException();
        }

        const user = new User();
        user.email = signInUserDTO.email;
        user.password = signInUserDTO.password;
        user.firstName = signInUserDTO.firstName;
        user.lastName = signInUserDTO.lastName;
        user.avatar = signInUserDTO.avatar;

        const userSignIn = await this.userRepository.save(user);

        if (!userSignIn) {
            throw new UnprocessableEntityException();
        }

        return new UserView(userSignIn);
    }
}
