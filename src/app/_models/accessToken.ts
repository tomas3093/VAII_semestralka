export class AccessToken {
  id: string;
  ttl: string;
  scopes: string[];
  created: Date;

  // FKs
  userId: number;
}
