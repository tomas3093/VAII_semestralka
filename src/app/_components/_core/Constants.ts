export class Constants {

  // 30 minutes TTL
  public static readonly USER_LOGIN_DEFAULT_TTL: number = 60 * 30 * 100;  // 50 h, kvoli debugu
  public static readonly USER_ACCESS_TOKEN_COOKIE_KEY: string = 'currentUserToken';

  public static readonly COLLECTOR_STATISTICS_UNDEFINED_VAL: number = -1;

  // Routes
  public static readonly ROUTE_IDENTIFIER_ROOT: string = '';
  public static readonly ROUTE_IDENTIFIER_MEASUREMENT: string = 'new-measurement';
  public static readonly ROUTE_IDENTIFIER_MEASUREMENT_DETAIL: string = 'measurement';
  public static readonly ROUTE_IDENTIFIER_AGENT_TYPE_EDITOR: string = 'type-edit';
  public static readonly ROUTE_IDENTIFIER_LOGIN: string = 'login';
  public static readonly ROUTE_IDENTIFIER_REGISTER: string = 'register';
  public static readonly ROUTE_IDENTIFIER_EDIT_PROFILE: string = 'profile';
  public static readonly ROUTE_IDENTIFIER_PASSWORD_CHANGE: string = 'pswd-change';
  public static readonly ROUTE_IDENTIFIER_DELETE_ACCOUNT: string = 'delete-account';
  public static readonly ROUTE_NOT_FOUND: string = '404';

  get ROUTE_IDENTIFIER_ROOT() { return Constants.ROUTE_IDENTIFIER_ROOT; }
  get ROUTE_IDENTIFIER_MEASUREMENT() { return Constants.ROUTE_IDENTIFIER_MEASUREMENT; }
  get ROUTE_IDENTIFIER_MEASUREMENT_DETAIL() { return Constants.ROUTE_IDENTIFIER_MEASUREMENT_DETAIL; }
  get ROUTE_IDENTIFIER_AGENT_TYPE_EDITOR() { return Constants.ROUTE_IDENTIFIER_AGENT_TYPE_EDITOR; }
  get ROUTE_IDENTIFIER_LOGIN() { return Constants.ROUTE_IDENTIFIER_LOGIN; }
  get ROUTE_IDENTIFIER_REGISTER() { return Constants.ROUTE_IDENTIFIER_REGISTER; }
  get ROUTE_IDENTIFIER_EDIT_PROFILE() { return Constants.ROUTE_IDENTIFIER_EDIT_PROFILE; }
  get ROUTE_IDENTIFIER_PASSWORD_CHANGE() { return Constants.ROUTE_IDENTIFIER_PASSWORD_CHANGE; }
  get ROUTE_IDENTIFIER_DELETE_ACCOUNT() { return Constants.ROUTE_IDENTIFIER_DELETE_ACCOUNT; }
  get ROUTE_NOT_FOUND() { return Constants.ROUTE_NOT_FOUND; }


  // Form validation
  private static readonly FORM_USER_EMAIL_MAX_LENGTH = 50;
  private static readonly FORM_USER_USERNAME_MAX_LENGTH = 50;
  private static readonly FORM_USER_USERNAME_MIN_LENGTH = 4;
  private static readonly FORM_USER_PASSWORD_MIN_LENGTH = 6;

  private static readonly FORM_AGENTTYPE_NAME_MIN_LENGTH = 3;
  private static readonly FORM_AGENTTYPE_NAME_MAX_LENGTH = 30;

  private static readonly FORM_MEASUREMENT_NAME_MIN_LENGTH = 3;
  private static readonly FORM_MEASUREMENT_NAME_MAX_LENGTH = 30;
  private static readonly FORM_MEASUREMENT_DESCRIPTION_MAX_LENGTH = 255;

  get FORM_USER_EMAIL_MAX_LENGTH() { return Constants.FORM_USER_EMAIL_MAX_LENGTH; }
  get FORM_USER_USERNAME_MAX_LENGTH() { return Constants.FORM_USER_USERNAME_MAX_LENGTH; }
  get FORM_USER_USERNAME_MIN_LENGTH() { return Constants.FORM_USER_USERNAME_MIN_LENGTH; }
  get FORM_USER_PASSWORD_MIN_LENGTH() { return Constants.FORM_USER_PASSWORD_MIN_LENGTH; }

  get FORM_AGENTTYPE_NAME_MIN_LENGTH() { return Constants.FORM_AGENTTYPE_NAME_MIN_LENGTH; }
  get FORM_AGENTTYPE_NAME_MAX_LENGTH() { return Constants.FORM_AGENTTYPE_NAME_MAX_LENGTH; }

  get FORM_MEASUREMENT_NAME_MIN_LENGTH() { return Constants.FORM_MEASUREMENT_NAME_MIN_LENGTH; }
  get FORM_MEASUREMENT_NAME_MAX_LENGTH() { return Constants.FORM_MEASUREMENT_NAME_MAX_LENGTH; }
  get FORM_MEASUREMENT_DESCRIPTION_MAX_LENGTH() { return Constants.FORM_MEASUREMENT_DESCRIPTION_MAX_LENGTH; }
}
