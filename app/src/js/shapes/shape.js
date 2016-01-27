/**
 * Created by kurpav on 1/23/16.
 */
class Shape {
	constructor(){
		this._states = [];
		this._currentState = 0;
		this._color = 0;
		this._x = 0;
		this._y = 0;
	}

	moveDown(){
		this._y += 1;
	}

	moveLeft(){
		this._x -= 1;
	}

	moveRight() {
		this._x += 1;
	}

	rotate() {
		this._currentState -= 1;
		if(this._currentState < 0) {
			this._currentState = this._states.length - 1;
		}
	}

	get nextState() {
		let nextState = this._currentState - 1;
		if(nextState < 0) {
			nextState = this._states.length - 1;
		}
		return this._states[nextState];
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get color() {
		return this._color;
	}

	get state() {
		return this._states[this._currentState];
	}
}

export default Shape;