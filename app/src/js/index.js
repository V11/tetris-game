/**
 * Created by kurpav on 1/21/16.
 */
import Stage from "./stage";
import GameBoard from "./gameBoard";
import InputHandler from "./inputHandler";

let stage = new Stage(),
	gameBoard = new GameBoard(Tetris.config.rowsCount, Tetris.config.colsCount);

const SPEED_TIME = 500,
	FPS_RATE = 60;


Tetris.init = function () {
	stage.init(Tetris.config.rowsCount, Tetris.config.colsCount,
			Tetris.config.blockSize, Tetris.config.blocksUrl,
			Tetris.config.backgroundUrl, Tetris.stageReady);
};

Tetris.stageReady = function () {
	let previousTime = 0,
		updateTime = SPEED_TIME - Tetris.config.speed * 100 + 100;

	gameBoard.initGame();
	stage.drawShapePreview(gameBoard.nextShape);

	createjs.Ticker.setFPS(FPS_RATE);
	createjs.Ticker.addEventListener("tick", handleTick);

	function handleTick(event) {
		if(event.paused) {
			return;
		}

		let now = Date.now();

		if (now - previousTime > updateTime && !gameBoard.isGameOver) {
			let currentShape = gameBoard.currentShape;

			if (gameBoard.canMove(currentShape.x, currentShape.y + 1, currentShape.state)) {
				currentShape.moveDown();
			} else {
				gameBoard.attachShape(currentShape);
				gameBoard.setNextShape();
				stage.score = gameBoard.score;
				stage.drawShapePreview(gameBoard.nextShape);

			}

			previousTime = now;
		}

		stage.drawGameBoard(gameBoard.gameData);
		stage.drawShape(gameBoard.currentShape);

		stage.update();

		if(gameBoard.isGameOver) {
			Tetris.onGameOver();
		}
	}

	InputHandler.init(gameBoard, stage);
};

Tetris.onGameOver = function () {
	stage.showGameOver();
	stage.update();
	createjs.Ticker.paused = true;
};

window.onload = Tetris.init;