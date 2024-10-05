import React, {createContext,useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/leaflet/dist/leaflet.css';
import ListInfo from './ListInfo';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from "prop-types";
//import { circle, marker } from 'leaflet';
import L from 'leaflet';
import { click } from '@testing-library/user-event/dist/click';
var myIcon = L.icon({
  iconUrl: 'https://img.icons8.com/?size=100&id=2008&format=png&color=000000',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

interface ShipData {
  id: string;
  recrd: string;
  vesslterms: string;
  feature_type: string;
  chart: string;
  latdec: number;
  londec: number;
  gp_quality: string;
  depth: string;
  sounding_type: string;
  history: string;
  quasou: string;
  watlev: string;
  coordinates: [number, number];
}

interface GetShipDataResponse {
  data: ShipData[];
}

async function getShipData(): Promise<ShipData[]> {
  try {
    console.log("Fetching ship data...");
    const response = await axios.get<ShipData[]>('http://localhost:8000/coords');
    console.log("API Response:", response);
    console.log("Response data:", response.data);
    
    // Eğer response.data doğrudan bir dizi ise
    if (Array.isArray(response.data)) {
      console.log("Ship data array length:", response.data.length);
      return response.data;
    } else {
      console.error("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching ship data:", error);
    return [];
  }
}

function setMapCenter(ships: ShipData[]) {
  let center_lat: number = 0;
  let center_lon: number = 0;
  ships.map((ship) => {
    center_lat = Number(center_lat.valueOf() + ship.latdec);
    center_lon = Number(center_lon.valueOf() + ship.londec);
  });
  center_lat = center_lat / ships.length;
  center_lon = center_lon / ships.length;

  return [center_lat, center_lon];
}

function App() {
  const [ships_last, setShips] = useState<ShipData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShipId, setSelectedShipId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getShipData()
      .then((data) => {
        console.log("Fetched ship data:", data);
        console.log("Fetched data length:", data.length);
        setShips(data);
      })
      .catch((err) => {
        console.error("Error in useEffect:", err);
        setError("Failed to fetch ship data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log("Current ships state:", ships_last);
  console.log("Current ships length:", ships_last.length);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (ships_last.length === 0) {
    return <div>No ship data available. (Length: {ships_last.length})</div>;
  }
  console.log(typeof(ships_last));
  return (
    <div className="App">
      <MapContainer
        center={setMapCenter(ships_last) as [number, number]}
        zoom={4}
        scrollWheelZoom={true}
        style={{
          height: "1000px",
          width: "1000px",
          backgroundColor: "red",
          marginTop: "80px",
          marginBottom: "90px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {ships_last.map((ship) => (
          <Marker 
            icon={myIcon}
            key={ship.id}
            position={[ship.latdec, ship.londec]}
            eventHandlers={{
              click: () => setSelectedShipId(ship.id)
            }}
          >
            <Popup>{ship.feature_type}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <ListInfo value={ships_last} selectedId={selectedShipId} />
    </div>
  );
}

export default App;