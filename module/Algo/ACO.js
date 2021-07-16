class ACO {
	pheromoneMatrix;
	distanceMatrix;
	constructor(appState) {
		this.appState = appState;
	}
	antMovement = () => {
		console.log(this.appState.ants);
	}
}
export default ACO;
