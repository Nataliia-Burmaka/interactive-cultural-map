import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { restrooms } from "../data/restrooms";
import { places } from "../data/places";

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

function createRestroomIcon(type) {
  const bg = type === "Free" ? "#d1fae5" : "#fef3c7";
  const border = type === "Free" ? "#059669" : "#d97706";

  return L.divIcon({
    className: "custom-restroom-icon",
    html: `
      <div style="
        background:${bg};
        border:2px solid ${border};
        border-radius:12px;
        width:34px;
        height:34px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:18px;
        box-shadow:0 6px 14px rgba(0,0,0,0.15);
      ">
        🚻
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function getCategoryColor(category) {
  switch (category) {
    case "Architectural DNA":
      return { stroke: "#c2415d", fill: "#fb7185" };
    case "Living Traditions":
      return { stroke: "#b45309", fill: "#f59e0b" };
    case "Contemporary City":
      return { stroke: "#7c3aed", fill: "#a78bfa" };
    case "Nature–Cultural Gems":
      return { stroke: "#047857", fill: "#34d399" };
    case "Sports Capital":
      return { stroke: "#1d4ed8", fill: "#60a5fa" };
    default:
      return { stroke: "#1f2937", fill: "#111827" };
  }
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

  const nearbySuggestions = useMemo(() => {
    if (!selectedRestroom) return [];

    return places
      .map((place) => ({
        ...place,
        nearbyDistance: getDistanceMeters(
          selectedRestroom.coordinates,
          place.coordinates,
        ),
      }))
      .sort((a, b) => a.nearbyDistance - b.nearbyDistance)
      .slice(0, 2);
  }, [selectedRestroom]);

  function handleNavigate(restroom) {
    if (!restroom?.coordinates) return;

    const [lat, lng] = restroom.coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  }

  function handleOpenPlace(placeId) {
    navigate(`/place/${placeId}`);
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

            {restroomsWithDistance.map((restroom) => (
              <Marker
                key={restroom.id}
                position={restroom.coordinates}
                icon={createRestroomIcon(restroom.type)}
                eventHandlers={{
                  click: () => setSelectedRestroomId(restroom.id),
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <div className="map-hover-hint">
                    <strong>{restroom.title}</strong>
                    <br />
                    {restroom.type} restroom
                    <br />
                    {restroom.accessible
                      ? "Accessible"
                      : "Not marked accessible"}
                  </div>
                </Tooltip>
              </Marker>
            ))}

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
                  <button
                    className="navigate-button"
                    onClick={() => handleNavigate(selectedRestroom)}
                  >
                    Open in Google Maps
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => setSelectedRestroomId(null)}
                  >
                    Close
                  </button>
                </div>

                {nearbySuggestions.length > 0 && (
                  <div className="restroom-nearby-box">
                    <p className="restroom-nearby-title">
                      While you&apos;re here…
                    </p>
                    <p className="restroom-nearby-text">
                      These cultural places are nearby too.
                    </p>

                    <div className="restroom-nearby-list">
                      {nearbySuggestions.map((place) => {
                        const colors = getCategoryColor(place.category);

                        return (
                          <button
                            key={place.id}
                            className="restroom-nearby-item"
                            onClick={() => handleOpenPlace(place.id)}
                          >
                            <div className="restroom-nearby-item-top">
                              <span className="restroom-nearby-name">
                                {place.title}
                              </span>
                              <span className="restroom-nearby-distance">
                                {formatDistance(place.nearbyDistance)}
                              </span>
                            </div>

                            <span className="restroom-nearby-category">
                              <span
                                className="restroom-nearby-color"
                                style={{
                                  backgroundColor: colors.fill,
                                  borderColor: colors.stroke,
                                }}
                              />
                              {place.category}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestroomsPage;
