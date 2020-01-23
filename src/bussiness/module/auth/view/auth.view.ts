import UserView from "../../user/view/user.view";

export class AuthView {
    id: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    accessToken: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: UserView, jwt: string) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.avatar = user.avatar;
        this.accessToken = jwt;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
