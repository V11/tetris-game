/**
 * Created by kurpav on 1/21/16.
 */
import Shape from "./shape";

const STATE_1 = [
	[1, 1, 1],
	[0, 1, 0]
];
const STATE_2 = [
	[1, 0],
	[1, 1],
	[1, 0]
];
const STATE_3 = [
	[0, 1, 0],
	[1, 1, 1]
];
const STATE_4 = [
	[0, 1],
	[1, 1],
	[0, 1]
];

class TShape extends Shape {
	constructor() {
		super();
		this._states = [STATE_1, STATE_2, STATE_3, STATE_4];
		this._currentState = Math.floor(Math.random() * this._states.length);
		this._color = 5;
		this._x = 4;
		this._y = -1 * this._states[this._currentState].length;
	}
}
export default TShape;