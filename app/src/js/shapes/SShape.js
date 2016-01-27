/**
 * Created by kurpav on 1/21/16.
 */
import Shape from "./shape";

const STATE_1 = [
	[0, 1, 1],
	[1, 1, 0]
];
const STATE_2 = [
	[1, 0],
	[1, 1],
	[0, 1]
];

class SShape extends Shape {
	constructor() {
		super();
		this._states = [STATE_1, STATE_2];
		this._currentState = Math.floor(Math.random() * this._states.length);
		this._color = 3;
		this._x = 4;
		this._y = -1 * this._states[this._currentState].length;
	}
}
export default SShape;