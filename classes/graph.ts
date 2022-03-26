export class GraphData {
	private data: number[] = [0, 0, 0, 0];
	private label = 'Sales';
	private backgroundColor = 'rgba(255,0,0,0.3)';
	private borderColor = 'red';
	private pointBackgroundColor = 'rgba(148,159,177,1)';
	private pointBorderColor = '#fff';
	private pointHoverBackgroundColor = '#fff';
	private pointHoverBorderColor = 'rgba(148,159,177,0.8)';
	private fill = 'origin';
	private labels: string[] = ['january', 'february', 'march', 'april'];

	constructor() {}

	public getGraphData() {
		return {
			datasets: [
				{
					data: this.data,
					label: this.label,
					backgroundColor: this.backgroundColor,
					borderColor: this.borderColor,
					pointBackgroundColor: this.pointBackgroundColor,
					pointBorderColor: this.pointBorderColor,
					pointHoverBackgroundColor: this.pointHoverBackgroundColor,
					pointHoverBorderColor: this.pointHoverBorderColor,
					fill: this.fill,
				},
			],
			labels: this.labels,
		};
	}

	public increaseValue(label: string, value: number) {
		label = label.toLowerCase().trim();

		for (let i in this.labels) {
			if (this.labels[i] === label) {
				this.data[i] += value;
			}
		}

		return this.getGraphData();
	}
}
