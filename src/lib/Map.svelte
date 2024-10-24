<script lang="ts">
	import mapboxgl from "mapbox-gl";
	import { onMount, onDestroy } from "svelte";
	import "mapbox-gl/dist/mapbox-gl.css";

	let map: mapboxgl.Map;
	let mapContainer: HTMLElement;

	onMount(() => {
		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken:
				"pk.eyJ1IjoiaGV4YXNwb3QiLCJhIjoiY2xnbnN5cWk1MGl5MjNyb2VudWZpeXF1bSJ9.6TkZlxe23xYmU3bxyYsLvg", // Your Mapbox token
			style: "mapbox://styles/mapbox/dark-v11", // Using the dark style
			zoom: 2, // Initial zoom
			minZoom: 2, // Minimum zoom allowed
			maxZoom: 16, // Maximum zoom allowed
			center: [-40, 34], // Center coordinates
		});

		// Once the map is loaded, add the heatmap and point layers
		map.on("load", () => {
			// Add the source for the tileset
			map.addSource("locations", {
				type: "vector",
				tiles: ["https://tiles.wifind.xyz/data/locations/{z}/{x}/{y}.pbf"],
			});

			// Add the heatmap layer for smooth density visualization
			map.addLayer({
				id: "locations-heatmap",
				type: "heatmap",
				source: "locations",
				"source-layer": "locations",
				maxzoom: 15, // Heatmap visible up to zoom 15
				paint: {
					"heatmap-weight": [
						"interpolate",
						["linear"],
						["get", "point_count"],
						0,
						0,
						10,
						1,
					],
					"heatmap-intensity": [
						"interpolate",
						["linear"],
						["zoom"],
						2,
						1,
						16,
						3, // Higher intensity at higher zoom levels
					],
					"heatmap-color": [
						"interpolate",
						["linear"],
						["heatmap-density"],
						0,
						"rgba(33,102,172,0)",
						0.2,
						"rgba(103,169,207,0.6)",
						0.4,
						"rgba(209,229,240,0.8)",
						0.6,
						"rgba(253,219,199,0.6)",
						0.8,
						"rgba(239,138,98,0.8)",
						1,
						"rgba(178,24,43,0.9)",
					],
					"heatmap-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						2,
						15, // Smaller radius at lower zoom
						16,
						40, // Larger radius at higher zoom
					],
					"heatmap-opacity": [
						"interpolate",
						["linear"],
						["zoom"],
						2,
						1,
						16,
						0.5, // Reduce opacity at higher zoom
					],
				},
			});

			// Add a circle layer for individual points, visible from zoom 12 onwards
			map.addLayer({
				id: "locations-points",
				type: "circle",
				source: "locations",
				"source-layer": "locations",
				minzoom: 12, // Points appear at zoom 12
				maxzoom: 22, // Visible up to zoom 22
				paint: {
					"circle-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						12,
						4, // Smaller points at lower zoom
						22,
						10, // Larger points at higher zoom
					],
					"circle-color": "rgba(255,100,100,0.8)", // Color of the points
					"circle-stroke-width": 1,
					"circle-stroke-color": "white",
					"circle-opacity": [
						"interpolate",
						["linear"],
						["zoom"],
						12,
						0.6, // Slightly transparent at zoom 12
						22,
						1, // Fully opaque at zoom 22
					],
				},
			});

			// Ensure the points layer is placed above the heatmap layer
			map.moveLayer("locations-points");
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove(); // Clean up the map instance only if it exists
		}
	});
</script>

<div class="map w-full h-full" bind:this={mapContainer}></div>
