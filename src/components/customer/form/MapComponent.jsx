import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const style = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 37.9838, // Latitude for Athens
  lng: 23.7275 // Longitude for Athens
};

function MapComponent({GlobalState}) {

  const {
    fromDestinationID, toDestinationID,
    setDuration, setDistance,
  } = GlobalState;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAXnJj6hrYttl9JupxitIIrElFG5idLNPY"
  })

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (fromDestinationID && toDestinationID) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { placeId: fromDestinationID },
          destination: { placeId: toDestinationID },
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            setDirections(response);
            const route = response.routes[0];
            const leg = route.legs[0];
            setDuration(leg.duration.text);
            setDistance(leg.distance.text);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  }, [fromDestinationID, toDestinationID]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={style}
      center={center}
      zoom={10}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default MapComponent;
