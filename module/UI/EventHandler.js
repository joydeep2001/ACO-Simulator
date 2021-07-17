import DrawingTools from "./DrawingTools.js";
class EventHandler {
	animationPlaying;
	constructor(appState) {
		this.appState = appState;
	}
	handleClick = (e) => {
		const point = {x : e.offsetX, y : e.offsetY};
		this.appState.addNewCity(point);
		this.appState.addNewAnt();
		DrawingTools.drawCircle(point, 10);
		if(this.appState.getPointCount() > 1) 
			DrawingTools.drawGraph(this.appState.points);
	}
	handlePlay = () => {
		if(this.animationPlaying) {
			console.log("animation already playing");
		}
		else {
			console.log("animation started");
			this.animationPlaying = true;
		}
	}
	handlePause = () => {
		if(this.animationPlaying) {
			console.log("animation paused");
			this.animationPlaying = false;
		}
		else {
			console.log("animation not playing");
		}
	}
}
export default EventHandler;