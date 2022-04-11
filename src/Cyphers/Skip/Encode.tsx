import React, { FC, useEffect, useState } from "react";
import { Methods } from "../../enums/methods";
import { myFetch } from "../../utils/myFetch";
import Enumerable from "linq";
import { randomLetter } from "../../utils/randomLetter";

type ApiResponse = {
	skip: number;
	offset: number;
	text: string;
	token: string;
};

const SkipEncode: FC = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [skip, setSkip] = useState<number>(-1);
	const [offset, setOffset] = useState<number>(-1);
	const [text, setText] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);
	const [cypher, setCypher] = useState<string>("");

	const fetch = async () => {
		setFetching(true);
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/skip/encode", Methods.Get);
		setFetching(false);

		setSkip(data.skip);
		setOffset(data.offset);
		setText(data.text);
		const newCypher = getCypher(data.text, data.skip, data.offset);
		setCypher(newCypher);
		console.log(data.token);

		const newIsValid: {success: boolean} = await myFetch("https://sifrovani.maturita.delta-www.cz/verify", Methods.Post, {
			token: data.token,
			encoded: newCypher,
		});
		setIsValid(newIsValid.success);
	};

	

	const getCypher = (text: string, skip: number, offset: number) => {
		const arr = Array.from(text);
		let currentIndex = 0;
		let newString = "";
		const length = skip + (text.length * (offset + 1));
		for (let i = 0; i < length; i++) {
			if (i < skip) {
				newString += randomLetter();
				// newString += "1"
			}
			else if ((i - skip) % (offset + 1) === 0) {
				newString += arr[currentIndex++];
				// newString += "2"
			}
			else {
				newString += randomLetter();
				// newString += "3";
			}
		}
		return newString;
	}

	return (
		<>
			<h1>Skip zakódování</h1>
			<button onClick={fetch} disabled={fetching}>Získat data</button>
			<p>Skip: {skip === -1 ? "Nejsou data": skip}</p>
			<p>Offset: {offset === -1 ? "Nejsou data": offset}</p>
			<p>Text: {text === "" ? "Nejsou data": text}</p>
			<p>Šifra je: {cypher === "" ? "Nejsou data": cypher}</p>
			<p>Je validní: {isValid ? "Ano":"Ne"}</p>
		</>
	);
};

export default SkipEncode;
