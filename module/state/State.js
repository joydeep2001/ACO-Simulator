class State {
	#selectedPoints;
	#finalPath;
	ants;
	constructor() {
		this.selectedPoints = new Array();
		this.ants = new Array();
		this.animationPlaying = false;
		this.finalPath = new Array();
	}
	addNewCity = (point) => {
		this.selectedPoints.push(point);
		console.log('new city added', this.selectedPoints);
	}
	addNewAnt = () => {
		this.ants.push({
			sequence : new Array()
		});
		console.log('new ant added');
	}
	getPointCount = () => {
		return this.selectedPoints.length;
	}
	
	renderState = () => {

	}
}
export default State;