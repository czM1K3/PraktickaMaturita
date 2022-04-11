import React, { FC, useEffect, useState } from "react";
import { Methods } from "../../enums/methods";
import { myFetch } from "../../utils/myFetch";
import Enumerable from "linq";

type ApiResponse = {
	skip: number;
	offset: number;
	encoded: string;
	token: string;
};

const SkipDecode: FC = () => {
	const [skip, setSkip] = useState<number>(-1);
	const [offset, setOffset] = useState<number>(-1);
	const [encoded, setEncoded] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);
	const [cypher, setCypher] = useState<string>("");

	const fetch = async () => {
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/skip/decode", Methods.Get);

		setSkip(data.skip);
		setOffset(data.offset);
		setEncoded(data.encoded);
		const newCypher = getCypher(data.encoded, data.skip, data.offset);
		setCypher(newCypher);

		const newIsValid: {success: boolean} = await myFetch("https://sifrovani.maturita.delta-www.cz/verify", Methods.Post, {
			token: data.token,
			decoded: newCypher,
		});
		setIsValid(newIsValid.success);
	};

	const getCypher = (text: string, skip: number, offset: number) => {
		const arr = Array.from(text);
		const newArr = Enumerable.from(arr).skip(offset).where((_, i) => i % (skip + 1) === 0).toArray();
		return newArr.join("");
	}

	return (
		<>
			<h1>Skip odkódování</h1>
			<button onClick={fetch}>Získat data</button>
			<p>Skip: {skip === -1 ? "Nejsou data": skip}</p>
			<p>Offset: {offset === -1 ? "Nejsou data": offset}</p>
			<p>Šifra: {encoded === "" ? "Nejsou data": encoded}</p>
			<p>Šifra je: {cypher === "" ? "Nejsou data": cypher}</p>
			<p>Je validní: {isValid ? "Ano":"Ne"}</p>
		</>
	);
};

export default SkipDecode;
