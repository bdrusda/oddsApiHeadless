const slateInfo = require('./slateInfo');
var LedMatrix = require('easybotics-rpi-rgb-led-matrix');

let mainWindow = undefined;

const MAX_FPS = 30;

const tickerStart = 480;
const tickerHeight = 160;
const tickerWidth = 640;
var globalx = 500;
var vector = -1;
var interval = 120;
var fontsize = tickerHeight / 2;

// Main method
function main(deviceInfo) {
	const gameInfo = slateInfo.fetchGameDataAndSendToRenderer(mainWindow);
	createRenderer(deviceInfo, gameInfo);
}

function createRenderer(deviceInfo, gameInfo) {
	const width = deviceInfo.width;
	const height = deviceInfo.height;

	////////////////////////////////////////////////
	//init a 16 rows  by 16 cols led matrix
	//default hardware mapping is 'regular', could be 'adafruit-hat-pwm' ect
	var matrix = new LedMatrix(width, height);
	console.log(`created new matrix with dimensions ${width} ${height}`);
	while (true) {
		matrix.fill(81, 92, 108);
		console.log(`filled matrix with blue`);
		matrix.setPixel(0, 0, 0, 50, 255);
		console.log('set pixel');
		matrix.update();
		console.log('updated');
	}
	////////////////////////////////////////////////

	//setInterval(banner, 75 / interval, ctx, gameData, matrix);
}

function banner(ctx, games, matrix) {
	const text = games.join('\t|\t');
	console.log(`text is ${text}`);
	ctx.clearRect(0, tickerStart, tickerWidth, tickerHeight);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, tickerStart, tickerWidth, tickerHeight);

	ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
	ctx.font = fontsize + 'px Helvetica';
	ctx.textBaseline = 'top';
	//Get new data and restart
	if (globalx < 0 - ctx.measureText(text).width) {
		globalx = tickerWidth;
		console.log(`ticker info was ${games}`);
		updateTickerInfo();
		console.log(`ticker info now is ${games}`);
	}
	ctx.fillText(text, globalx, 640 - fontsize * 1.5);

	globalx += vector;

	////////////////////////////////////////////////////////
	matrix.fill(255, 50, 100);
	matrix.setPixel(0, 0, 0, 50, 255);
	matrix.update();
	///////////////////////////////////////////////////
}

main({ width: 64, height: 64 });
