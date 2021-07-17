class State {
	points;
	#finalPath;
	ants;
	constructor(height, width) {
		this.canvasHeight = height;
		this.canvaWidth = width;
		this.points = new Array();
		this.ants = new Array();
		this.animationPlaying = false;
		this.finalPath = new Array();
	}
	addNewCity = (point) => {
		this.points.push(point);
		console.log('new city added', this.points);
	}
	addNewAnt = () => {
		this.ants.push({
			sequence : new Array()
		});
		console.log('new ant added');
	}
	getPointCount = () => {
		return this.points.length;
	}
	
	renderState = () => {

	}
}
export default State;