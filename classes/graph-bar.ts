export class GraphBarData {
	private labels: string[] = ['question one', 'question two', 'question three', 'question four'];
	private data: number[] = [0, 0, 0, 0];
	private label = 'Questions';

	constructor() {}

	public getGraphBarData() {
		return {
			labels: this.labels,
			datasets: [
				{
					data: this.data,
					label: this.label,
				},
			],
		};
	}

	public increaseValueGraphBar(option: number, value: number) {
		this.data[option] += value;
		return this.getGraphBarData();
	}
}
