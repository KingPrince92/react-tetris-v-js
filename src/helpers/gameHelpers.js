export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
	Array.from(Array(STAGE_HEIGHT), () =>
		new Array(STAGE_WIDTH).fill([0, "clear"])
	);

// Function that creates the game stage - which is a nested Array.
// Summary: An Array, Created from An Array(height) filled with another Array(width) filled with [0, 'clear']
// An Array is created(from the height array) which is then populated/filled by use of an inline function with a new Array created with the STAGE_WIDTH. This creates a grid.
// For each row we create a new array with the STAGE_WIDTH and fill it with another array.
// 0 = nothing in the cell on the grid..



//checkCollision is to check the tetrominos are within the stage/colliding with other tetrominos
export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
	for (let y = 0; y < player.tetromino.length; y += 1){
		
		for ( let x = 0; x < player.tetromino[y].length; x+=1){
			//1. check that the position/we're on an actual tetromino cell
			if (player.tetromino[y][x] !== 0){
				if (
					// 2. check that movement does not exceed the stage area's height (y)
				//We shouldn't go through the bottom of the play area.
				!stage[y + player.pos.y + moveY] ||
				//3. Check to make sure that movement does not exceed stage area's width (x)
				!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
				//4.Check that cell is not set to 'clear'. If it's clear, we're not colliding with anything 
				stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				){
					return true;
				}
			}
		}
	}
}