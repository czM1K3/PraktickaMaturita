import React, { FC, useState } from "react";
import { Methods } from "../../enums/methods";
import { myFetch } from "../../utils/myFetch";

type ApiResponse = {
	grid: number[][];
	encoded: string;
	token: string;
};

const GridSimpleDecode: FC = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [grid, setGrid] = useState<number[][] | null>(null);
	const [raw, setRaw] = useState<string>("");

	const fetch = async () => {
		setFetching(true);
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/grid-simple/decode", Methods.Get);
		setFetching(false);
		setGrid(data.grid);
		setRaw(data.encoded);
	};

	return (
		<>
			<h1>Mřížka dekódování - jednoduchá</h1>
			<button onClick={fetch} disabled={fetching}>Získat data</button>
			<p>Text: {raw === "" ? "Nejsou data" : raw}</p>
		</>
	);
};

export default GridSimpleDecode;
