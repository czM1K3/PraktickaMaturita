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

const SkipDecode: FC = () => {
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

	const getCypher = (text: string, skip: number, offset: number) => {
		const arr = Array.from(text);
		const newArr = Enumerable.from(arr).skip(offset).where((_, i) => i % (skip + 1) === 0).toArray();
		return newArr.join("");
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

export default SkipDecode;
