import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"
import "./map.scss"

const MapboxMap = () => {
	const token = import.meta.env.VITE_API_MAPBOX_API_KEY
	mapboxgl.accessToken = token

	const mapContainer = useRef(null)
	const map = useRef(null)
	const [lng, setLng] = useState(5.3977)
	const [lat, setLat] = useState(43.3018)
	const [zoom, setZoom] = useState(15)

	useEffect(() => {
		if (map.current) return

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		})

		new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current)

		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4))
			setLat(map.current.getCenter().lat.toFixed(4))
			setZoom(map.current.getZoom().toFixed(2))
		})
	}, [])

	return (
		<>
			<div className="sidebar">
				Longitude: {lng} - Latitude: {lat} - Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</>
	)
}

export default MapboxMap

