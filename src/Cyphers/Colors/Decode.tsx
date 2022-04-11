import React, { FC, useState } from "react";
import { Methods } from "../../enums/methods";
import { getColors } from "../../utils/getColor";
import { myFetch } from "../../utils/myFetch";

type ApiResponse = {
	encoded: string;
	token: string;
};

const ColorsDecode: FC = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [raw, setRaw] = useState<string>("");
	const [grid, setGrid] = useState<string[][] | null>(null);

	const fetch = async () => {
		setFetching(true);
		const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/color-simple/decode", Methods.Get);
		setFetching(false);
		setRaw(data.encoded);
		const splited = data.encoded.split("\n").map((x) => x.split(""));
		setGrid(splited);
		console.log(splited);
	};

	return (
		<>
			<h1>Barvy dekódování</h1>
			<button onClick={fetch} disabled={fetching}>Získat data</button>
			<p>Text: {raw === "" ? "Nejsou data" : raw}</p>
			<ShowGrid grid={grid} />
		</>
	);
};

export default ColorsDecode;

type GridProps = {grid: string[][] | null};
const ShowGrid: FC<GridProps> = ({ grid }) => !grid ? <>Nelze zobrazit tabulku</>: (
	<div style={{display: "flex", flexDirection: "column"}}>
		{grid.map((row, y) => (
			<div style={{
				display: "flex",
			}} key={y}>
				{row.map((cell, x) => (
					<div key={x} style={{
						backgroundColor: getColors(cell),
						width: "10px",
						height: "10px",
						border: "grey 1px solid"
					}} />
				))}
			</div>
		))}
	</div>
);
