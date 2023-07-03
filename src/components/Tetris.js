import React , {useState}from "react";
import {createStage, checkCollision} from "../helpers/gameHelpers";

//custom hooks
import {usePlayer, useStage, useInterval, useGameStatus} from "../hooks";

//components
import {Display, Stage, StartButton} from "./";
//styled components.
import { StyledTetrisWrapper, StyledTetris } from "./styles";



const Tetris = () => {
	const [droptime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);
	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);


	console.log('re-render');


	// moves player left and right, and checks for collision on the left or right of the stage to keep active tetromino within the bounds of the stage
	const movePlayer = (dir) => {
		if (!checkCollision(player, stage, {x: dir, y: 0})){
			updatePlayerPos({x: dir, y: 0});
		}
		
	}

	const startGame = () => {
		//Reset Everything
		setStage(createStage());
		setDropTime(1000)
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	}

	const drop = () => {
		// Increase Level when player has cleared 10 Rows
		if (rows > (level + 1) * 10){
			setLevel(prev => prev + 1);
			//also increase drop speed`
			setDropTime(1000 / (level + 1) + 200);
		}

		if (!checkCollision(player, stage, {x:0, y:1})) {
			updatePlayerPos({x: 0, y: 1, collided: false});
		} else {
			//Game Over
			if (player.pos.y < 1) {
				console.log('Game Over!');
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x:0,y:0, collided: true})
		}
		

	}

	//re-starts the drop interval after being stopped by user pressing the down key. Restarts when the downkey is released.
	const keyUp = ({keyCode}) => {
		if (!gameOver){
			if (keyCode === 40) {
				setDropTime(1000 / (level + 1) + 200);
			}
		}
	}

	//sets interval that the tetrominos automatically drop to zero as long as the player is holding the down key
	const dropPlayer = () => {
		setDropTime(null);
		drop();
	}


	// in the below function, 'keyCode' is destructured from an event/e. events have a keyCode property, and if destructured in the provided argument, we dont have to check e.keyCode, just "keyCode"

	const move = ({keyCode}) => {
		if (!gameOver){
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				dropPlayer();
			} else if (keyCode === 38) {
				playerRotate(stage, 1)
			}
		}
	};

useInterval(()=> {
	drop();
}, droptime)

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text={"Game Over"} />
					) : (
						<div>
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
						</div>
					)}

					<StartButton callback={startGame}/>
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
