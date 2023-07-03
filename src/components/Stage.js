import React from "react";
import {Cell} from ".";
import { StyledStage } from "./styles";


const Stage = ({stage}) => {
	return (
		// This takes the stage array from the helper function and maps through it to create rows, and then the rows are mapped through to create individual cell components. The key is x, and the type is the first value in the cell array. When first rendered, the stage is clean.

		<StyledStage width={stage[0].length} height={stage.length}>
			{stage.map((row) =>
				row.map((cell, x) => <Cell key={x} type={cell[0]} />)
			)}
		</StyledStage>
	);
};

export default Stage;
