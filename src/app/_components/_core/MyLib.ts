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


  /**
   * Vrati string v tvare 'access_token={Access_token_id}'
   * @returns {string}
   */
  public static getTokenString(): string {
    return `access_token=${this.getLoggedUserToken().id}`;
  }


  /**
   * Vrati retazec s prvym velkym pismenom a ostatne male
   * @param {string} str
   * @returns {string}
   */
  public static capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
