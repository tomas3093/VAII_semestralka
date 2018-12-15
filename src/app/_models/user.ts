export class User {
  id: number;
  username: string;
  password: string;
  email: string;

  // Unused fields
  realm: string;
  emailVerified: boolean;
  verificationToken: string;
}
