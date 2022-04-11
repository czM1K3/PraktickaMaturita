import React, { FC, useEffect } from "react";

const GridSimpleDecode: FC = () => {

	const fetch = async () => {
		alert("test")
	};

	return (
		<>
			<h1>Mřížka dekódování - jednoduchá</h1>
			<button onClick={fetch}>Získat data</button>
		</>
	);
};

export default GridSimpleDecode;
