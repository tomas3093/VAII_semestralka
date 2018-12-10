import {Constants} from "./miscellaneous";

export class User {
    id: number;
    realm: string;
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;
    verificationToken: string;

    // Custom attributes
    role: number;


    isAdmin(): boolean {
      return this.role === Constants.USER_ROLE_ADMIN;
    }
}
