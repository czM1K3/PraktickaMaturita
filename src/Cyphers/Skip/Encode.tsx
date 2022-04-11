import React, { FC, useEffect, useState } from "react";
import { Methods } from "../../enums/methods";
import { myFetch } from "../../utils/myFetch";
import Enumerable from "linq";

type ApiResponse = {
	skip: number;
	offset: number;
	text: string;
	token: string;
};

const SkipEncode: FC = () => {
	const [skip, setSkip] = useState<number>(-1);
	const [offset, setOffset] = useState<number>(-1);
	const [text, setText] = useState<string>("");
	const [token, setToken] = useState<string>("");
	const [cypher, setCypher] = useState<string>("");

	const fetch = async () => {
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/skip/encode", Methods.Get, {});
		setSkip(data.skip);
		setOffset(data.offset);
		setText(data.text);
		setToken(data.token);
		setCypher(getCypher(data.text, data.skip, data.offset));
		console.log(data.token);
	};

	const randomLetter = () => {
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
		var charactersLength = characters.length;
		return characters.charAt(Math.floor(Math.random() * 
	 charactersLength));
	}

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
			<button onClick={fetch}>Získat data</button>
			<p>Skip: {skip === -1 ? "Nejsou data": skip}</p>
			<p>Offset: {offset === -1 ? "Nejsou data": offset}</p>
			<p>Text: {text === "" ? "Nejsou data": text}</p>
			<p>Šifra je: {cypher === "" ? "Nejsou data": cypher}</p>
		</>
	);
};

export default SkipEncode;
