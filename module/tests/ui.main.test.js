import EventHandler from "../UI/EventHandler.js";
import State from "../state/State.js";
import TestUtils from './TestUtils.js';


const canvas = document.querySelector("#simulate");
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 700;
const appState = new State(canvas.height, canvas.width);
const { handleClick, handlePlay, handlePause } = new EventHandler(appState);

canvas.addEventListener("click", handleClick);
const playButton = document.querySelector("#play");
playButton.addEventListener("click", () => {
	TestUtils.fakeAlgo(appState);
	console.log(appState.ants);
	handlePlay();
});
const pauseButton = document.querySelector("#pause");
pauseButton.addEventListener("click", handlePause);
