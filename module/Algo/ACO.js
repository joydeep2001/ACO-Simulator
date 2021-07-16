import Utils from '../Utility/Utils.js';

class ACO {
	pheromoneMatrix;
	distanceMatrix;
	constructor(appState) {
		this.appState = appState;
		this.pheromoneMatrix = Utils.matrix(10, 10, 1);
		console.table(this.pheromoneMatrix);
		this.distanceMatrix = Utils.matrix(5, 5);
		console.table(this.distanceMatrix);

	}
	antMovement = () => {
		console.log(this.appState.ants);
	};
}
export default ACO;

