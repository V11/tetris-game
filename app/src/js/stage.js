/**
 * Created by kurpav on 1/22/16.
 */
const BLOCKS_NUM = 8,
	SCORE_TPL = "Score: {0}";

class Stage {
	constructor() {
		this._stage = new createjs.Stage(document.getElementById("game-stage"));
		this._blockAssets = null;
		this._blocks = [];
		this._blocksContainer = new createjs.Container();
		this._gameInfoContainer = new createjs.Container();
		this._previewContainer = new createjs.Container();
		this._scoreLabel = new createjs.Text("", "20px Arial", "white");
		this._gameOverScreen = new createjs.Container();
		this._rows = 0;
		this._cols = 0;
		this._blockSize = 0;
		this._bgImgPath = "";
		this._blocksSpritePath = "";
	}

	init(rows, cols, blockSize, blocksSpritePath, bgImgPath, callback) {
		this._bgImgPath = bgImgPath;
		this._blocksSpritePath = blocksSpritePath;
		this._blockSize = blockSize;
		this._rows = rows;
		this._cols = cols;

		this._loadSpritesheet(function () {
			this._initBlocks();
			this._drawBackground();
			this._drawGameInfo();
			this._stage.addChild(this._blocksContainer);
			this._drawGameOverScreen();
			callback();
		});
	}

	_initBlocks() {
		var blockBtmp = null;
		for (var i = 0; i < BLOCKS_NUM; i++) {
			blockBtmp = new createjs.Bitmap(createjs.SpriteSheetUtils.extractFrame(this._blockAssets, i));
			this._blocks.push(blockBtmp);
		}
	}

	_loadSpritesheet(callback) {
		this._blockAssets = new createjs.SpriteSheet({
			images: [this._blocksSpritePath],
			frames: {
				width: this._blockSize,
				height: this._blockSize,
				count: BLOCKS_NUM,
				regX: 0,
				regY: 0,
				spacing: 0,
				margin: 0
			}
		});

		this._blockAssets.addEventListener("error", function (e) {
			console.error("Blocks spritesheet isn't found in " + e.src);
		});

		if (!this._blockAssets.complete) {
			// not preloaded, listen for the complete event:
			this._blockAssets.addEventListener("complete", callback.bind(this));
		}
	}

	_drawGameInfo() {
		this._gameInfoContainer.setBounds(0, 0, 180, 640);
		this._gameInfoContainer.x = 320;
		this._stage.addChild(this._gameInfoContainer);

		let bkg = new createjs.Shape();
		bkg.setBounds(0, 0, 180, 640);
		bkg.graphics.setStrokeStyle(1).beginStroke("#ffffff").moveTo(1, 0).lineTo(1, 640);
		this._gameInfoContainer.addChild(bkg);

		let previewContainerLabel = new createjs.Text("Next shape:", "20px Arial", "white");
		previewContainerLabel.set({x: 25, y: 65});
		this._gameInfoContainer.addChild(previewContainerLabel);

		this._scoreLabel.text = "Score: 0";
		this._scoreLabel.set({x: 25, y: 30});
		this._gameInfoContainer.addChild(this._scoreLabel);

		this._previewContainer.set({x: 25, y: 115});
		this._gameInfoContainer.addChild(this._previewContainer);
	}

	_drawBackground() {
		let bkg = null,
			backdrop = new createjs.Shape();

		backdrop.setBounds(0, 0, this._stage.canvas.width, this._stage.canvas.height);
		backdrop.graphics.beginFill("0x000000")
			.drawRect(0, 0, this._stage.canvas.width, this._stage.canvas.height);

		if (this._bgImgPath !== "") {
			bkg = new createjs.Bitmap(this._bgImgPath);
		} else {
			bkg = new createjs.Container();

			let emptyBlock = this._blocks[0].clone(),
				currentBlock = null,
				curX = 0,
				curY = 0;

			for (let i = 0; i < this._rows; i++) {
				for (let j = 0; j < this._cols; j++) {
					currentBlock = emptyBlock.clone();
					currentBlock.x = curX;
					currentBlock.y = curY;
					bkg.addChild(currentBlock);

					curX += this._blockSize;
				}
				curX = 0;
				curY += this._blockSize;
			}
		}

		this._stage.addChildAt(backdrop, 0);
		this._stage.addChild(bkg);
		this._stage.update();
	}

	_drawGameOverScreen() {
		let w = this._stage.canvas.width,
			h = this._stage.canvas.height;

		this._gameOverScreen.setBounds(0, 0, w, h);

		let backdrop = new createjs.Shape();
		backdrop.setBounds(0, 0, w, h);
		backdrop.graphics.beginFill("0x000000").drawRect(0, 0, w, h);
		backdrop.alpha = 0.5;

		this._gameOverScreen.addChild(backdrop);

		let label = new createjs.Text("GAME OVER", "48px Arial", "white"),
			{ width: textWidth, height: textHeight} = label.getBounds();

		label.set({x: w / 2 - textWidth / 2, y: h / 2 - textHeight / 2});

		this._gameOverScreen.addChild(label);
		this._gameOverScreen.visible = false;
		this._stage.addChild(this._gameOverScreen);
	}

	showGameOver() {
		this._gameOverScreen.visible = true;
	}

	hideGameOver() {
		this._gameOverScreen.visible = false;
	}

	drawShape(shape) {
		let row = null,
			cell = null,
			block = null,
			drawX = shape.x,
			drawY = shape.y;

		for (let i = 0, len = shape.state.length; i < len; i++) {
			row = shape.state[i];
			for (let j = 0, len2 = row.length; j < len2; j++) {
				cell = row[j];
				if (cell !== 0 && drawY >= 0) {
					block = this._blocks[shape.color].clone();
					block.x = drawX * this._blockSize;
					block.y = drawY * this._blockSize;
					this._blocksContainer.addChild(block);
				}
				drawX += 1;
			}
			drawX = shape.x;
			drawY += 1;
		}
	}

	drawGameBoard(gameData) {
		let row = null,
			cell = null,
			block = null;

		this._blocksContainer.removeAllChildren();

		for (let i = 0, len = gameData.length; i < len; i++) {
			row = gameData[i];
			for (let j = 0, len2 = row.length; j < len2; j++) {
				cell = row[j];
				if (cell !== 0) {
					block = this._blocks[cell].clone();
					block.x = j * this._blockSize;
					block.y = i * this._blockSize;
					this._blocksContainer.addChild(block);
				}
			}
		}
	}

	drawShapePreview(shape) {
		let row = null,
			cell = null,
			block = null,
			drawX = 0,
			drawY = 0;

		this._previewContainer.removeAllChildren();

		for (let i = 0, len = shape.state.length; i < len; i++) {
			row = shape.state[i];
			for (let j = 0, len2 = row.length; j < len2; j++) {
				cell = row[j];
				if (cell !== 0 && drawY >= 0) {
					block = this._blocks[shape.color].clone();
					block.x = drawX * this._blockSize;
					block.y = drawY * this._blockSize;
					this._previewContainer.addChild(block);
				}
				drawX += 1;
			}
			drawX = 0;
			drawY += 1;
		}

		let { width: giWidth } = this._gameInfoContainer.getBounds(),
			{ width: pWidth } = this._previewContainer.getBounds();
		this._previewContainer.x = giWidth / 2 - pWidth / 2;
	}

	update() {
		this._stage.update();
	}

	set score(score) {
		this._scoreLabel.text = SCORE_TPL.replace("{0}", score.toString());
	}
}

export default Stage;
