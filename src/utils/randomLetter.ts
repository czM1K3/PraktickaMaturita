export const randomLetter = () => {
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	var charactersLength = characters.length;
	return characters.charAt(Math.floor(Math.random() * charactersLength));
};
