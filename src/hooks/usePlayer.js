import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../helpers/Tetrominos";
import { STAGE_WIDTH, checkCollision } from "../helpers/gameHelpers";


export const usePlayer = () => {
	const [player, setPlayer] = useState({
		pos: {x: 0, y: 0},
		tetromino: TETROMINOS[0].shape,
		collided: false,
	});

	const rotate = (matrix, dir) => {
//Make rows columns
const rotatedTetro = matrix.map((_, index) => 
		matrix.map(col => col[index]),
		);
		//Reverse each row to get a rotated matrix. Greater than 0 to rotate right, and less than to rotate left
		if (dir > 0) return rotatedTetro.map(row => row.reverse());
			return rotatedTetro.reverse();

	}

	const playerRotate = (stage, dir) => {
		//Copy of player so prev state is not mutated
			const clonedPlayer = JSON.parse(JSON.stringify(player));
			clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

			const pos = clonedPlayer.pos.x;
			let offset = 1;
			while(checkCollision(clonedPlayer,stage, {x: 0, y: 0})) {
				clonedPlayer.pos.x += offset;
				offset = -(offset + (offset > 0 ? 1 : -1));
				if (offset > clonedPlayer.tetromino[0].length) {
					rotate(clonedPlayer.tetromino, -dir);
					clonedPlayer.pos.x = pos;
					return;
				}
			}
			setPlayer(clonedPlayer)

	}


	// pos is position
const updatePlayerPos = ({x,y, collided}) => {
	setPlayer(prev => ({
		...prev,
		pos: {x:(prev.pos.x += x), y:(prev.pos.y += y)}, 
		collided,
	}))
}

const resetPlayer = useCallback(()=> {
	setPlayer({
		pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
		tetromino: randomTetromino().shape,
		collided: false,
	})

}, [])
	
	return [player, updatePlayerPos, resetPlayer, playerRotate];

	
}