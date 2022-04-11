import React, { FC } from "react";

type ApiResponse = {

};

const ColorsEncode: FC = () => {
	
	const fetch = async () => {
		// const data: ApiResponse = await myFetch("https://sifrovani.maturita.delta-www.cz/skip/decode", Methods.Get);
	};
	
	return (
		<>
			<h1>Barvy zakódování</h1>
			<button onClick={fetch}>Získat data</button>
		</>
	);
};

export default ColorsEncode;
