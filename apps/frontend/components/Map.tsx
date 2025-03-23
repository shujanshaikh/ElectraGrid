"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";


interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  status: string;
  powerOutput: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  stations: Station[];
}


const fixLeafletIcon = () => {
  
  if (typeof window !== "undefined") {

    
    L.Icon.Default.mergeOptions({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }
};

export default function Map({ stations }: MapProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setMapReady(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

 
  const stationIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: "station-marker" 
  });

  const userIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: "user-marker" 
  });

 
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  
  const mapCenter = stations.length > 0 
    ? { lat: stations[0].latitude, lng: stations[0].longitude }
    : (userLocation || defaultCenter);

  if (!mapReady) {
    return <div className="h-96 w-full bg-black/40 flex items-center justify-center text-green-400">Loading map...</div>;
  }

  return (
    <div className="rounded-lg overflow-hidden border border-green-500/20 shadow-lg shadow-green-500/10">
      <MapContainer
        center={mapCenter}
        zoom={stations.length > 0 ? 10 : 5}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={true}
        className="z-10"
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup className="custom-popup">
              <div className="font-semibold text-green-600">Your Location</div>
            </Popup>
          </Marker>
        )}
        
        {stations.map((station) => (
          <Marker 
            key={station.id} 
            position={[station.latitude, station.longitude]} 
            icon={stationIcon}
          >
            <Popup className="custom-popup">
              <div>
                <h3 className="font-bold text-green-600">{station.name}</h3>
                <p className="text-sm">{station.address}, {station.city}</p>
                <p className="text-sm">Power Output: {station.powerOutput} kWh</p>
                <p className="text-sm">Status: {station.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}