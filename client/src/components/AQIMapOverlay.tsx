import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';

const { BaseLayer, Overlay } = LayersControl;

const AQIMapOverlay: FC = () => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <LayersControl position="topright">
          {/* Base map */}
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </BaseLayer>

          {/* Bhuvan WMS Overlay - Example */}
          <Overlay checked name="ISRO Bhuvan AQI Layer">
            <TileLayer
              url="https://bhuvan-tiles.nrsc.gov.in/arcgis/services/air_quality/MapServer/WMSServer?"
              attribution="&copy; ISRO Bhuvan"
              // WMS parameters
              params={{
                layers: '0',
                format: 'image/png',
                transparent: true,
              }}
            />
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default AQIMapOverlay; 