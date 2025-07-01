import { MapContainer, TileLayer, LayersControl, AttributionControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';

const { BaseLayer, Overlay } = LayersControl;

const AQIMapOverlay: FC = () => {
  // Construct WMS URL with query parameters for the overlay
  const bhuvanWmsUrl =
    'https://bhuvan-tiles.nrsc.gov.in/arcgis/services/air_quality/MapServer/WMSServer?' +
    'service=WMS&request=GetMap&layers=0&styles=&format=image/png&transparent=true&version=1.1.1';

  return (
    // Map container with fixed height and width. Consider making these configurable via props for flexibility.
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl">
      <MapContainer
        // Centered on India's geographic center [latitude, longitude]
        center={[20.5937, 78.9629]}
        // Default zoom level for a country-wide view
        zoom={5} // 5 gives a good overview of India
        style={{ height: '100%', width: '100%' }}
      >
        <LayersControl>
          {/* Base map */}
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          {/* Bhuvan WMS Overlay - Example */}
          <Overlay checked name="ISRO Bhuvan AQI Layer">
            <TileLayer
              url={bhuvanWmsUrl}
            />
          </Overlay>
        </LayersControl>
        <AttributionControl position="bottomright" prefix={false} />
      </MapContainer>
    </div>
  );
};

export default AQIMapOverlay; 