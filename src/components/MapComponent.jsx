import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude, setLatitude, setLongitude, zoomLevel, setZoomLevel }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [latitude, longitude],
      zoom: zoomLevel,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const marker = L.marker([latitude, longitude], { draggable: true }).addTo(mapRef.current);
    marker.on("dragend", (e) => {
      const newLatLng = e.target.getLatLng();
      setLatitude(newLatLng.lat);
      setLongitude(newLatLng.lng);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [latitude, longitude, zoomLevel, setLatitude, setLongitude]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], zoomLevel);
    }
  }, [latitude, longitude, zoomLevel]);

  return <div id="map" style={{ height: "400px" }} />;
};

export default MapComponent;
