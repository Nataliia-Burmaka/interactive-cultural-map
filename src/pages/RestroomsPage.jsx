import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { restrooms } from "../data/restrooms";

function getDistanceMeters([lat1, lng1], [lat2, lng2]) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371000;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function formatDistance(meters) {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function getRestroomColors(type) {
  if (type === "Free") {
    return {
      stroke: "#059669",
      fill: "#34d399",
    };
  }

  return {
    stroke: "#d97706",
    fill: "#fbbf24",
  };
}

function RestroomsPage() {
  const navigate = useNavigate();

  const fallbackPosition = [62.2398, 25.7462];
  const [userPosition] = useState(fallbackPosition);
  const [selectedRestroomId, setSelectedRestroomId] = useState(null);

  const restroomsWithDistance = useMemo(() => {
    return restrooms
      .map((restroom) => ({
        ...restroom,
        distanceMeters: getDistanceMeters(userPosition, restroom.coordinates),
      }))
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [userPosition]);

  const selectedRestroom = useMemo(() => {
    return (
      restroomsWithDistance.find(
        (restroom) => restroom.id === selectedRestroomId,
      ) || null
    );
  }, [restroomsWithDistance, selectedRestroomId]);

  function handleNavigate() {
    alert("Navigation will be connected in a later step.");
  }

  return (
    <div className="map-page">
      <div className="map-shell">
        <div className="map-topbar">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="map-top-actions">
            <button
              className="saved-link-button"
              onClick={() => navigate("/map")}
            >
              Cultural map
            </button>
          </div>
        </div>

        <div className="map-header">
          <h1 className="map-title">Quick needs</h1>
          <p className="map-subtitle">
            Find a restroom nearby without leaving the city experience
          </p>
        </div>

        <div className="real-map-wrap">
          <MapContainer
            center={userPosition}
            zoom={14}
            scrollWheelZoom={true}
            className="real-map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {restroomsWithDistance.map((restroom) => {
              const colors = getRestroomColors(restroom.type);
              const isActive = restroom.id === selectedRestroomId;

              return (
                <CircleMarker
                  key={restroom.id}
                  center={restroom.coordinates}
                  radius={isActive ? 12 : 10}
                  pathOptions={{
                    color: isActive ? "#0f172a" : colors.stroke,
                    fillColor: colors.fill,
                    fillOpacity: 0.95,
                    weight: isActive ? 3 : 2,
                  }}
                  eventHandlers={{
                    click: () => setSelectedRestroomId(restroom.id),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                    {restroom.title}
                  </Tooltip>

                  <Popup>
                    <strong>{restroom.title}</strong>
                    <br />
                    {restroom.type} restroom
                  </Popup>
                </CircleMarker>
              );
            })}

            <CircleMarker
              center={userPosition}
              radius={11}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#2563eb",
                fillOpacity: 1,
                weight: 4,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                You are here
              </Tooltip>
            </CircleMarker>
          </MapContainer>

          <div className="map-legend quick-needs-legend">
            <p className="map-legend-title">Restroom types</p>
            <div className="map-legend-items">
              <div className="map-legend-item">
                <span
                  className="map-legend-dot"
                  style={{
                    backgroundColor: "#34d399",
                    borderColor: "#059669",
                  }}
                />
                <span>Free</span>
              </div>

              <div className="map-legend-item">
                <span
                  className="map-legend-dot"
                  style={{
                    backgroundColor: "#fbbf24",
                    borderColor: "#d97706",
                  }}
                />
                <span>Paid</span>
              </div>
            </div>
          </div>

          {selectedRestroom && (
            <div className="map-bottom-sheet map-bottom-sheet--compact">
              <div className="map-bottom-sheet-handle" />

              <div className="map-bottom-sheet-content map-bottom-sheet-content--compact">
                <div className="map-bottom-sheet-top">
                  <div>
                    <h2>{selectedRestroom.title}</h2>
                    <div className="map-bottom-sheet-meta">
                      <span
                        className={`quick-pill ${
                          selectedRestroom.type === "Free"
                            ? "quick-pill--free"
                            : "quick-pill--paid"
                        }`}
                      >
                        {selectedRestroom.type}
                      </span>

                      <span className="map-distance">
                        {formatDistance(selectedRestroom.distanceMeters)} away
                      </span>

                      {selectedRestroom.accessible && (
                        <span className="quick-accessible">♿ Accessible</span>
                      )}
                    </div>
                  </div>

                  <button
                    className="close-button close-button--light"
                    onClick={() => setSelectedRestroomId(null)}
                  >
                    ×
                  </button>
                </div>

                <p className="map-preview-description map-preview-description--compact">
                  {selectedRestroom.description}
                </p>

                <div className="map-preview-actions">
                  <button className="navigate-button" onClick={handleNavigate}>
                    Navigate
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => setSelectedRestroomId(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestroomsPage;
