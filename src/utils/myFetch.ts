import { Methods } from "../enums/methods";

export const myFetch = async (url: string, method: Methods, body: any) => {
	const response = await fetch(url, {
		method,
		body: method === Methods.Post ? JSON.stringify(body): undefined,
	});
	return await response.json();
}