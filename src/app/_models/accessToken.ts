/**
 * Pristupovy token pre login userov
 */
export class AccessToken {
  // samotny token
  id: string;

  // cas v sekundach kolko je token platny od vytvorenia
  ttl: number;

  //
  scopes: string;

  // datum vytvorenia tokenu
  created: string;

  // uzivatel ktoremu token patri (FK)
  userId: number;
}
