/**
 * Created by kurpav on 1/21/16.
 */
import LShape from "./shapes/lShape";
import JShape from "./shapes/jShape";
import SShape from "./shapes/sShape";
import ZShape from "./shapes/zShape";
import TShape from "./shapes/tShape";
import IShape from "./shapes/iShape";
import OShape from "./shapes/oShape";

let instance = null;
const SHAPES_NUM = 7;
const L_SHAPE = 0;
const J_SHAPE = 1;
const O_SHAPE = 2;
const I_SHAPE = 3;
const T_SHAPE = 4;
const Z_SHAPE = 5;

//Singleton class
class ShapeGenerator {
	constructor() {
		if (!instance) {
			instance = this;
		}

		return instance;
	}

	getShape() {
		let result = new SShape();
		let shape = Math.floor(Math.random() * SHAPES_NUM);

		switch (shape) {
			case L_SHAPE:
				result = new LShape();
				break;
			case J_SHAPE:
				result = new JShape();
				break;
			case O_SHAPE:
				result = new OShape();
				break;
			case I_SHAPE:
				result = new IShape();
				break;
			case T_SHAPE:
				result = new TShape();
				break;
			case Z_SHAPE:
				result = new ZShape();
				break;
		}

		return result;
	}
}

export default ShapeGenerator;
