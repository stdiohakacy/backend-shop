import { User } from 'src/entities/user.entity';

export default class UserView {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.avatar = user.avatar;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    static transform(users: User[]): UserView[] {
        return users.map(user => new UserView(user));
    }
}
