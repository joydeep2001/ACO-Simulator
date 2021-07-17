class DrawingTools {
	static canvas = document.getElementById("simulate");
	static ctx = this.canvas.getContext("2d");
	static drawPoint = (point) => {
		console.log('point drawn');
	} 
	static drawLine = (point1, point2) => {
		this.ctx.beginPath();
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}
	static drawCircle = (center, radius) => {
		this.ctx.beginPath();
		this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
	static drawGraph = (allPoints) => {
		let lastIdx = allPoints.length - 1;
		allPoints.forEach((point, idx) => {
			if(idx != lastIdx)
				this.drawLine(point, allPoints[lastIdx]);
		});
	}
}

export default DrawingTools;