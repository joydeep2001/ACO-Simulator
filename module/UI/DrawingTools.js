class DrawingTools {
	constructor(appState) {
		this.appState = appState;
	}
	drawPoint = () => {
		console.log('point drawn');
	} 
	drawLine = (point1, point2) => {
		console.log('line drawn');
	}
	drawCircle = () => {
		console.log('circle drawn');
	}
	drawGraph = () => {
		console.log('graph drawn');
	}
}

export default DrawingTools;