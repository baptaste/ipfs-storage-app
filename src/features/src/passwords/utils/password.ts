import { IPassword, IPasswords } from "../types";

export function getPasswordsWithUtilityProps(passwords: IPasswords) {
  return JSON.parse(JSON.stringify(passwords)).map((password: IPassword) => {
    return { ...password, plaintext: null, visible: false };
  });
}
