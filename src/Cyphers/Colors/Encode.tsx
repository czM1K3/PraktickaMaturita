import React, { FC, useState } from "react";
import { Methods } from "../../enums/methods";
import { myFetch } from "../../utils/myFetch";

type ApiResponse = {
	text: string;
	token: string;
};

type Alphabet = number[][];

const ColorsEncode: FC = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [grid, setGrid] = useState<boolean[][] | null>(null);
	const [text, setText] = useState<string>("");
	
	const fetch = async () => {
		setFetching(true);
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/color-simple/encode", Methods.Get);
		const aplhabet: Alphabet[] = await myFetch("https://sifrovani.maturita.delta-www.cz/color/alphabet", Methods.Get);
		setFetching(false);
		setText(data.text);
		
		const cypher = getCypher(data.text, aplhabet);
		setGrid(cypher);
	};

	const getCypher = (text: string, alphabet: any) => {
		
		const letterHeight = 5, letterWidth = 3;
		
		const arr = Array.from(new Array(letterHeight), (_, y) => Array.from(new Array(letterWidth * text.length), (_, x) => {
			const index = Math.floor(x / letterWidth);
			const letterX = x % letterWidth;
			const letter = text[index];
			const letterInAlphabet: number[][] = alphabet[letter];
			return letterInAlphabet[y][letterX] === 1;
		}));
		return arr;
	};
	
	return (
		<>
			<h1>Barvy zakódování</h1>
			<button onClick={fetch} disabled={fetching}>Získat data</button>
			<p>Text: {text === "" ? "Nejsou data" : text}</p>
			<p>Řetězec: {grid === null ? "Nejsou data": grid.flat().map((x) => x ? "W":"K").join("")}</p>
			<ShowGrid grid={grid} />
		</>
	);
};

export default ColorsEncode;

type GridProps = {grid: boolean[][] | null};
const ShowGrid: FC<GridProps> = ({ grid }) => !grid ? <>Nelze zobrazit tabulku</>: (
	<div style={{display: "flex", flexDirection: "column"}}>
		{grid.map((row, y) => (
			<div style={{
				display: "flex",
			}} key={y}>
				{row.map((cell, x) => (
					<div key={x} style={{
						backgroundColor: !cell ? "black" : "white",
						width: "10px",
						height: "10px",
						border: "grey 1px solid"
					}} />
				))}
			</div>
		))}
	</div>
);
