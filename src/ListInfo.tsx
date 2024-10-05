import React from 'react';
//import { ShipData } from './App';  // Importing ShipData as a named export

interface ListInfoProps {
  value: object;
  // Removed the commented out line as it's no longer needed
  selectedId: string | null;
}

const ListInfo: React.FC<ListInfoProps> = ({ value, selectedId }) => {
  console.log("ListInfo - selectedId:", selectedId);
  console.log("ListInfo - value:", value);

  const selectedShip = Array.isArray(value) ? value.find(ship => ship.id === selectedId) : null;
  console.log("ListInfo - selectedShip:", selectedShip);

  return (
    <>
      {selectedShip ? (
        <h3>Selected Ship Feature Type: {selectedShip.feature_type}</h3>
      ) : (
        <h3>No ship selected</h3>
      )}
    </>
  );
};

export default ListInfo;