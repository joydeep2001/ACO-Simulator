class TestUtils {
	static addPointsInappState = (appState, points) => {
		points.forEach(point => {
			appState.addNewCity(point);
			appState.addNewAnt();
		});
	}
}
export default TestUtils;