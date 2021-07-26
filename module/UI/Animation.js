import DrawingTools from "./DrawingTools.js";
import Utils from "../Utility/Utils.js";

class Animation {
	constructor(appState) {
		this.appState = appState;
		this.playing = false;
		this.traversalComplete = false;
	}
	play = () => {
		if (this.playing) {
			console.error("Already playing");
			return;
		}
		this.trackerArr = new Array(this.appState.ants.length).fill(
			Promise.resolve(0)
		);
		console.log("tracker arrat", this.trackerArr);
		this.playing = true;
		this.controllerId = setInterval(() => {
			if (this.traversalComplete) {
				clearInterval(this.controllerId);
				console.log("traversalComplete");
				return;
			}
			console.log("controller running");
			this.controller();
		}, 50);
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
	takeStep = (currentPos, destination, reached, dDAUtils) => {
		if (dDAUtils.steps > 0) {
			currentPos.x += 5 * dDAUtils.xInc;
			currentPos.y += 5 * dDAUtils.yInc;
			dDAUtils.steps -= 5;
			this.render();
			return;
		}
		console.log("status true");
		reached.status = true;
	};

	render = () => {
		let ctx = Utils.ctx;
		let fullHeight = Utils.canvasHeight();
		let fullWidth = Utils.canvasWidth();
		ctx.clearRect(0, 0, fullHeight, fullWidth);
		let allPoints = Array();
		this.appState.points.forEach((point, index) => {
			DrawingTools.drawCircle(point, 30);
			DrawingTools.drawFilledCircle(
				this.appState.ants[index].currentPos,
				20
			);
			allPoints.push(point);
			if (allPoints.length > 1) DrawingTools.drawGraph(allPoints);
		});
	};
}
export default Animation;
