import React, { FC, useEffect } from "react";

const ColorsDecode: FC = () => {

	const fetch = async () => {
		alert("test")
	};

	return (
		<>
			<h1>Barvy dekódování</h1>
			<button onClick={fetch}>Získat data</button>
		</>
	);
};

export default ColorsDecode;
