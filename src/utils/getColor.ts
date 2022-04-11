export const getColors = (character: string) => {
	switch (character) {
		case "R": return "red";
		case "G": return "green";
		case "B": return "blue";
		case "C": return "cyan";
		case "M": return "magenta";
		case "Y": return "yellow";
		case "W": return "white";
		case "K": return "black";
		default: return "black";
	}
};
