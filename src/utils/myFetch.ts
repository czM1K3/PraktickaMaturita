import { Methods } from "../enums/methods";

export const myFetch = async (url: string, method: Methods, body?: any) => {
	let newBody: FormData | undefined;
	if (body) {
		newBody = new FormData();
		if (body.token)
			newBody.append("token", body.token);
		if (body.encoded)
			newBody.append("encoded", body.encoded);
		if (body.decoded)
			newBody.append("decoded", body.decoded);
	}
	const response = await fetch(url, {
		method,
		body: newBody,
	});
	return await response.json();
}