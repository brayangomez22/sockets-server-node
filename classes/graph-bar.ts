export class GraphBarData {
	private labels: string[] = ['Question one', 'Question two', 'Question three', 'Question four'];
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
