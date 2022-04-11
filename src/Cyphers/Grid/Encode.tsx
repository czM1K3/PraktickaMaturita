import React, { FC, useState } from "react";
import { Methods } from "../../enums/methods";
import { myFetch } from "../../utils/myFetch";
import { randomLetter } from "../../utils/randomLetter";

type ApiResponse = {
	grid: number[][];
	text: string;
	token: string;
};

const GridSimpleEncode: FC = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [rawGrid, setRawGrid] = useState<boolean[][] | null>(null);
	const [grid, setGrid] = useState<string[][] | null>(null);
	const [text, setText] = useState<string>("");
	const [cypher, setCypher] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);

	const fetch = async () => {
		setFetching(true);
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/grid-simple/encode", Methods.Post);
		setFetching(false);

		setText(data.text);
		const arraySize = data.grid.length;
		const newRawGrid = Array.from(new Array(arraySize), (_, y) => Array.from(new Array(arraySize), (_, x) => data.grid[y].includes(x)));
		setRawGrid(newRawGrid);

		let currentIndex = 0;
		const newGrid = Array.from(new Array(arraySize), (_, y) => Array.from(new Array(arraySize), (_, x) => newRawGrid[y][x] ? data.text[currentIndex++] : randomLetter()));
		setGrid(newGrid);

		const newCypher = newGrid.map(row => row.join("")).join("");
		setCypher(newCypher);

		const newIsValid: { success: boolean } = await myFetch("https://sifrovani.maturita.delta-www.cz/verify", Methods.Post, {
			token: data.token,
			encoded: newCypher,
		});
		setIsValid(newIsValid.success);
	};

	return (
		<>
			<h1>Mřížka zakódování - jednoduchá</h1>
			<button onClick={fetch} disabled={fetching}>Získat data</button>
			<p>Text: {text === "" ? "Nejsou data" : text}</p>
			<RawGrid grid={rawGrid} />
			<DataGrid grid={grid} rawGrid={rawGrid} />
			<p>Šifra: {cypher === "" ? "Nejsou data" : cypher}</p>
			<p>Je validní: {isValid ? "Ano" : "Ne"}</p>
		</>
	);
};

export default GridSimpleEncode;

type RawGrid = { grid: boolean[][] | null }
const RawGrid: FC<RawGrid> = ({ grid }) => !grid ? <>Nelze zobrazit tabulku</> : (
	<>
		<p>Základní tabulka</p>
		<div style={{ display: "flex", flexDirection: "column" }}>
			{grid!.map((row, i) => (
				<div style={{ display: "flex" }} key={`i${i}`}>
					{row.map((cell, j) => (
						<div style={{
							width: "30px",
							height: "30px",
							backgroundColor: cell ? "white" : "black",
							border: "red 1px solid",
							textAlign: "center",
						}} key={`j${j}`}></div>
					))}
				</div>
			))}
		</div>
	</>
);

type DataGrid = { grid: string[][] | null, rawGrid: boolean[][] | null }
const DataGrid: FC<DataGrid> = ({ grid, rawGrid }) => !grid || !rawGrid ? <>Nelze zobrazit tabulku</> : (
	<>
		<p>Vyplněná tabulka</p>
		<div style={{ display: "flex", flexDirection: "column" }}>
			{grid!.map((row, i) => (
				<div style={{ display: "flex" }} key={`i${i}`}>
					{row.map((cell, j) => {
						const a = rawGrid![i];
						const b = a ? a[j] ?? false : false;
						return (
							<div style={{
								width: "30px",
								height: "30px",
								backgroundColor: b ? "yellow" : "white",
								border: "red 1px solid",
								textAlign: "center",
							}} key={`j${j}`}>{cell}</div>
						)
					})}
				</div>
			))}
		</div>
	</>
);
