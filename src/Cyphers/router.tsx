import React, { FC } from "react";
import { Pages } from "../enums/pages";
import ColorsDecode from "./Colors/Decode";
import ColorsEncode from "./Colors/Encode";
import GridSimpleDecode from "./Grid/GridSimpleDecode";
import GridSimpleEncode from "./Grid/GridSimpleEncode";
import SkipDecode from "./Skip/Decode";
import SkipEncode from "./Skip/Encode";

type RouterProps = {
	page: Pages;
};

const Router: FC<RouterProps> = ({ page }) => {
	switch (page) {
		case Pages.SkipEncode:
			return <SkipEncode />;
		case Pages.SkipDecode:
			return <SkipDecode />;
		case Pages.ColorsEncode:
			return <ColorsEncode />;
		case Pages.ColorsDecode:
			return <ColorsDecode />;
		case Pages.GridDecode:
			return <></>;
		case Pages.GridEncode:
			return <></>;
		case Pages.GridDecodeSimple:
			return <GridSimpleDecode />;
		case Pages.GridEncodeSimple:
			return <GridSimpleEncode />;
	}
};

export default Router;
