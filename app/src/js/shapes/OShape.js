/**
 * Created by kurpav on 1/21/16.
 */
import Shape from "./shape";

const STATE_1 = [
	[1, 1],
	[1, 1]
];

class OShape extends Shape {
	constructor() {
		super();
		this._currentState = 0;
		this._states = [STATE_1];
		this._color = 7;
		this._x = 4;
		this._y = -2;
	}
}
export default OShape;