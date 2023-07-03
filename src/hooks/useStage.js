import { useState, useEffect } from 'react';
import { createStage } from '../helpers/gameHelpers';

export const useStage = (player, resetPlayer) => {

	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);

	useEffect(() => {

		setRowsCleared(0);

		//ack is accumulator (per mdn: the value resulting from the previous call to callbackFn). The reducer (user supplied callback fn) walks through the array element by element, at each step adding the current array value to the result from the previous step. The result is a running sum of all previous steps until there are no more elements to add.

		const sweepRows = newStage =>
		//we give our function our stage, and perform the reduce function on it. This will create a new array (the row for us to check), and if it contains any 0 values, this means that we have not filled up a complete row, and it is not ready to be cleared.
		newStage.reduce((ack, row) => {
			//findIndex will return -1 if it is unable to find a match for the specified test
			if(row.findIndex(cell => cell[0] === 0) === -1) {
				//if -1 is returned, meaning that there are no cells in the row that have a value of 0 (meaning all cells in a row are filled), then this row can be cleared and added to the rowsCleared. (for points!)
				setRowsCleared(prev => prev + 1);
				//removes a row(the array from the stage we had been checking) full of tetromino-filled cells and adds a new empty row to the 'top' of the array that makes up the stage. The new row is an array filled with cells of 0 value that are 'clear'.
				ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
				return ack;
			}
			ack.push(row);
			return ack;
		}, [])

		const updateStage = prevStage => {
			//first flush/clear stage from previous render
			const newStage = prevStage.map(row =>
				row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
				);

			// Then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`,
						];
					}
				});
			});
			//check if we have collided. If a tetromino has 'collided' with the stage, or a tetromino that has been merged with the stage, a new tetromino will need to spawn into play.
			if (player.collided){
				resetPlayer();
				return sweepRows(newStage);
			}

			return newStage;
		}
		setStage(prev => updateStage(prev));
	}, [player, resetPlayer]);

	return [stage, setStage, rowsCleared];
}