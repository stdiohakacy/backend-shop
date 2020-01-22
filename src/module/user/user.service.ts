import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import UserView from './view/user.view';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async signIn(createUserDTO: CreateUserDTO): Promise<UserView> {
        const user = await this.userRepository.findOne({
            where: {
                email: createUserDTO.email,
            },
        });
        
        if (user) {
            throw new ConflictException();
        }

        const userSignIn = await this.userRepository.save(createUserDTO);

        if (!userSignIn) {
            throw new UnprocessableEntityException();
        }

        return new UserView(userSignIn);
    }
}
