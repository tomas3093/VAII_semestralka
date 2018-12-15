import {AccessToken} from "../../_models";
import {Constants} from "./Constants";

/**
 * Trieda s pomocnymi statickymi triedami
 */
export class MyLib {

  /**
   * Aj je prihlaseny uzivatel, vrati jeho AccessToken inak null
   */
  public static getLoggedUserToken(): AccessToken {
    return JSON.parse(localStorage.getItem(Constants.USER_ACCESS_TOKEN_COOKIE_KEY));
  }
}
