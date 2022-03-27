import { Marker } from './marker';

export class Map {
	private markers: { [key: string]: Marker } = {
		'1': {
			id: '1',
			name: 'Brayan',
			lng: -75.541664,
			lat: 6.292748,
			color: '#dd8fee',
		},
		'2': {
			id: '2',
			name: 'Amy',
			lng: -75.55205,
			lat: 6.292108,
			color: '#790af0',
		},
		'3': {
			id: '3',
			name: 'Pepe',
			lng: -75.54506,
			lat: 6.292813,
			color: '#19884b',
		},
	};

	constructor() {}

	public getMarkers() {
		return this.markers;
	}

	public addMarker(marker: Marker) {
		this.markers[marker.id] = marker;
	}

	public deleteMarker(id: string) {
		delete this.markers[id];
		return this.getMarkers();
	}

	public moveMarker(marker: Marker) {
		this.markers[marker.id].lng = marker.lng;
		this.markers[marker.id].lat = marker.lat;
	}
}
