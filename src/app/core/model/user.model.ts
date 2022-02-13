export class UserModel {
    id?: number;
    name!: string;
    mobile!: string;
    email!: string;
    password?: string;
    role?: string;
    status?: string;
    gender?: string;
}