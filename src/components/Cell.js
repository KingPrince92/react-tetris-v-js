import React from "react";
import { StyledCell } from "./styles";
import { TETROMINOS } from '../helpers/Tetrominos'

const Cell = ({type}) => {
	return <StyledCell type={type} color={TETROMINOS[type].color}/>
;
};

export default React.memo(Cell);
