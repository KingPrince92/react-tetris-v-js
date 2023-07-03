//Components are all imported to the index.ts file, and then exported. When importing a component from another file, the source path will just be able to be pointed to the comonents folder. This is so that imports will be cleaner.

import Cell from "./Cell";
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";
import Tetris from "./Tetris";

export {Cell, Display, Stage, StartButton, Tetris};
