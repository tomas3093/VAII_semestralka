export class AccessToken {
  id: number;
  ttl: string;
  scopes: string[];
  created: Date;

  // FKs
  userId: number;
}
