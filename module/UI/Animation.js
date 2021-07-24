import DrawingTools from "./DrawingTools.js";

class Animation { 
	constructor(appState) {
		this.appState = appState;
		this.playing = false;

	}
	play = ()=> {
		if(this.playing) {
			console.error("Already playing");
			return;
		} 
		this.trackerArr = new Array(this.appState.ants.length).fill(0);
		this.playing = true;
		this.controller();
	}
	controller = () => {
		console.log(this.trackerArr);
		console.log(this.appState.ants.length);
		this.trackerArr.forEach((tracker, index) => {
			console.log(typeof(tracker));
			if(typeof(tracker) == 'number') {
				clearInterval(tracker);
				let ant = this.appState.ants[index];
				this.trackerArr[index] = this.move(ant);
			}
		});
	}

	move = (ant) => {
		let currentPos = ant.currentPos;
		let destination = ant.destination();
		console.log('currentPos', currentPos);
		console.log('destination', destination);

	}
	
}
export default Animation;
