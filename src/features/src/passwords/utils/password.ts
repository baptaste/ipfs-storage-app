import { IPassword, IPasswords } from "../types";

// export function getPasswordName(password: IPassword) {
// 	let name = '';
// 	if (password.title) name = password.title;
// 	else if (password.website_url) name = password.website_url;
// 	return name;
// }

export function getPasswordsWithUtilityProps(passwords: IPasswords) {
	return JSON.parse(JSON.stringify(passwords)).map((password: IPassword) => {
		// const name = getPasswordName(password);
		return { ...password, plaintext: null, visible: false };
	});
}
