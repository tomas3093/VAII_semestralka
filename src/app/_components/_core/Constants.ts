export class Constants {

  // 30 minutes TTL
  public static readonly USER_LOGIN_DEFAULT_TTL = 60 * 30;

  public static readonly USER_ACCESS_TOKEN_COOKIE_KEY = 'currentUserToken';


  // Form validation
  private static readonly FORM_USER_EMAIL_MAX_LENGTH = 50;
  private static readonly FORM_USER_USERNAME_MAX_LENGTH = 50;
  private static readonly FORM_USER_USERNAME_MIN_LENGTH = 4;
  private static readonly FORM_USER_PASSWORD_MIN_LENGTH = 6;

  get FORM_USER_EMAIL_MAX_LENGTH() { return Constants.FORM_USER_EMAIL_MAX_LENGTH; }
  get FORM_USER_USERNAME_MAX_LENGTH() { return Constants.FORM_USER_USERNAME_MAX_LENGTH; }
  get FORM_USER_USERNAME_MIN_LENGTH() { return Constants.FORM_USER_USERNAME_MIN_LENGTH; }
  get FORM_USER_PASSWORD_MIN_LENGTH() { return Constants.FORM_USER_PASSWORD_MIN_LENGTH; }
}
