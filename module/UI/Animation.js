import DrawingTools from "./DrawingTools.js";
import Utils from "../Utility/Utils.js";
class Animation {
	constructor(appState) {
		this.appState = appState;
		this.playing = false;
	}
	play = () => {
		if (this.playing) {
			console.error("Already playing");
			return;
		}
		this.trackerArr = new Array(this.appState.ants.length).fill(Promise.resolve(0));
		this.playing = true;
		this.controller();
	};
	controller = () => {
		let count = 0;
		this.trackerArr.forEach((tracker, index) => {
			tracker.then(() => {
				clearInterval(tracker);
				let ant = this.appState.ants[index];
				let currentPos = ant.currentPos;
				let destination = ant.destination();
				if (destination == null) {
					console.log("null");
					count++;
				} else {
					this.trackerArr[index] = this.move(
						currentPos,
						destination,
						ant
					);
					console.log("not null");
				}
			});
		});
		if (count >= this.appState.ants.length) this.traversalComplete = true;
		else console.log("count", count);
	};

	move = (currentPos, destination, ant) => {
		return new Promise((resolve, reject) => {
			let reached = { status: false };
			let dDAUtils = Utils.DDA(currentPos, destination);
			let intervalId = setInterval(() => {
				if (reached.status) resolve(intervalId);
				else {
					console.log(reached.status);
					console.log(currentPos, destination);
					this.takeStep(currentPos, destination, reached, dDAUtils);
				}
			}, 100);
		});
	};
}
export default Animation;
