/**
 * Created by kurpav on 1/21/16.
 */
import Shape from "./shape";


const STATE_1 = [
	[1, 1, 0],
	[0, 1, 1]
];
const STATE_2 = [
	[0, 1],
	[1, 1],
	[1, 0]
];

class ZShape extends Shape{
	constructor() {
		super();
		this._states = [STATE_1, STATE_2];
		this._currentState = Math.floor(Math.random() * this._states.length);
		this._color = 6;
		this._x = 4;
		this._y = -1 * this._states[this._currentState].length;
	}
}
export default ZShape;