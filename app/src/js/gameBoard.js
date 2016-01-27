/**
 * Created by kurpav on 1/22/16.
 */
import ShapeGenerator from "./shapeGenerator";

class GameBoard {
	constructor(rows, cols) {
		this._gameData = null;
		this._currentShape = null;
		this._nextShape = null;
		this._shapeGenerator = new ShapeGenerator();
		this._score = 0;
		this._isGameOver = false;
		this._rows = rows;
		this._cols = cols;
	}

	initGame() {
		if (this._gameData === null) {
			this._gameData = [];
			for (let r = 0; r < this._rows; r++) {
				this._gameData[r] = [];
				for (let c = 0; c < this._cols; c++) {
					this._gameData[r].push(0);
				}
			}
		} else {
			for (let r = 0; r < this._rows; r++) {
				this._gameData[r] = [];
				for (let c = 0; c < this._cols; c++) {
					this._gameData[r][c] = 0;
				}
			}
		}

		this._isGameOver = false;
		this._currentShape = this._shapeGenerator.getShape();
		this._nextShape = this._shapeGenerator.getShape();
		this._score = 0;
	}

	canMove(xPos, yPos, newState) {
		let result = true,
			newX = xPos,
			newY = yPos;

		for (let r = 0, len = newState.length; r < len; r++) {
			for (let c = 0, len2 = newState[r].length; c < len2; c++) {
				//check move left and right
				if (newX < 0 || newX > this._cols) {
					result = false;
					r = len;
					c = len2;
				}
				//check move down and rotation
				if (this._gameData[newY] !== undefined && this._gameData[newY][newX] !== 0
					&& newState[r] !== undefined && newState[r][c] !== 0) {
					result = false;
					r = len;
					c = len2;
				}

				newX += 1;
			}

			newX = xPos;
			newY += 1;

			if (newY > this._rows) {
				result = false;
				r = len;
			}
		}

		return result;
	}

	setNextShape() {
		this._currentShape = this._nextShape;
		this._nextShape = this._shapeGenerator.getShape();
	}

	attachShape(shape) {
		let row = null,
			cell = null,
			xPos = shape.x,
			yPos = shape.y;

		for (let r = 0, len = shape.state.length; r < len; r++) {
			row = shape.state[r];
			for (let c = 0, len2 = row.length; c < len2; c++) {
				cell = row[c];
				if (cell !== 0 && yPos >= 0) {
					this._gameData[yPos][xPos] = shape.color;
				}
				xPos += 1;
			}
			xPos = shape.x;
			yPos += 1;
		}

		this._checkLines();

		if (shape.y < 0) {
			this._isGameOver = true;
		}
	}

	_checkLines() {
		let fullRow = true,
			lineFound = false,
			r = this._rows - 1,
			c = this._cols - 1;

		while (r >= 0) {
			while (c >= 0) {
				if (this._gameData[r][c] === 0) {
					fullRow = false;
					c = -1;
				}
				c--;
			}

			if (fullRow) {
				this._clearRow(r);
				r++;
				lineFound = true;
				this._score += 10;
			}

			fullRow = true;
			c = this._cols - 1;
			r--;
		}
	}

	_clearRow(row) {
		let r = row,
			c = 0;

		while (r >= 0) {
			while (c < this._cols) {
				if (r > 0) {
					this._gameData[r][c] = this._gameData[r - 1][c];
				} else {
					this._gameData[r][c] = 0;
				}
				c++;
			}
			c = 0;
			r--;
		}
	}

	get gameData() {
		return this._gameData;
	}

	get currentShape() {
		return this._currentShape;
	}

	get isGameOver() {
		return this._isGameOver;
	}

	get score() {
		return this._score;
	}

	get nextShape() {
		return this._nextShape;
	}
}

export default GameBoard;