/**
 * Created by kurpav on 1/24/16.
 */
const LEFT_ARROW_CODE = 37,
	RIGHT_ARROW_CODE = 39,
	UP_ARROW_CODE = 38,
	DOWN_ARROW_CODE = 40;

let init = function (gameBoard, stage) {
	document.onkeydown = function (e) {
		if (!e) {
			e = window.event;
		}

		e.preventDefault();

		let currentShape = gameBoard.currentShape;

		if (gameBoard.isGameOver !== true) {
			switch (e.keyCode) {
				case LEFT_ARROW_CODE:
					if (gameBoard.canMove(currentShape.x - 1, currentShape.y, currentShape.state)) {
						currentShape.moveLeft();
					}
					break;

				case RIGHT_ARROW_CODE:
					if (gameBoard.canMove(currentShape.x + 1, currentShape.y, currentShape.state)) {
						currentShape.moveRight();
					}
					break;

				case UP_ARROW_CODE:
					if (gameBoard.canMove(currentShape.x, currentShape.y, currentShape.nextState)) {
						currentShape.rotate();
					}
					break;

				case DOWN_ARROW_CODE:
					if (gameBoard.canMove(currentShape.x, currentShape.y + 1, currentShape.state)) {
						currentShape.moveDown()
					}
					break;
			}
		}
		else {
			gameBoard.initGame();
			stage.score = gameBoard.score;
			stage.drawShapePreview(gameBoard.nextShape);
			stage.hideGameOver();
			createjs.Ticker.paused = false;
		}
	}
};

module.exports = {
	init: init
};