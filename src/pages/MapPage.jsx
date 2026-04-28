import { useEffect, useMemo, useState } from "react";
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
import { places } from "../data/places";
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

function createPlaceIcon(category, isActive = false) {
  const colors = getCategoryColor(category);

  return L.divIcon({
    className: "custom-place-icon",
    html: `
      <div style="
        width:${isActive ? 24 : 20}px;
        height:${isActive ? 24 : 20}px;
        transform: rotate(45deg);
        background:${colors.fill};
        border:2px solid ${isActive ? "#0f172a" : colors.stroke};
        border-radius:5px;
        box-shadow:${isActive ? "0 0 0 4px rgba(15,23,42,0.12), 0 6px 14px rgba(0,0,0,0.18)" : "0 6px 14px rgba(0,0,0,0.14)"};
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <div style="
          width:6px;
          height:6px;
          border-radius:999px;
          background:white;
          transform: rotate(-45deg);
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function createRestroomIcon(type) {
  const isFree = type?.toLowerCase().includes("free");
  const isPaid = type?.toLowerCase().includes("paid");

  const bg = isFree ? "#d1fae5" : isPaid ? "#fef3c7" : "#f3f4f6";
  const border = isFree ? "#059669" : isPaid ? "#d97706" : "#6b7280";

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

const legendItems = [
  "Architectural DNA",
  "Living Traditions",
  "Contemporary City",
  "Nature–Cultural Gems",
  "Sports Capital",
];

function MapPage() {
  const navigate = useNavigate();

  const fallbackPosition = [62.2398, 25.7462];

  const [userPosition, setUserPosition] = useState(fallbackPosition);
  const [locationStatus, setLocationStatus] = useState("loading");
  const [dismissedAlert, setDismissedAlert] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [selectedRestroomId, setSelectedRestroomId] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [hasInteractedWithMap, setHasInteractedWithMap] = useState(false);
  const [showRestrooms, setShowRestrooms] = useState(false);

  const [savedWalkMode, setSavedWalkMode] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [savedWalkAlertPlace, setSavedWalkAlertPlace] = useState(null);
  const [dismissedSavedWalkIds, setDismissedSavedWalkIds] = useState([]);
  const [savedWalkSnoozed, setSavedWalkSnoozed] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMode, setViewMode] = useState("all");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        setLocationStatus("granted");
      },
      () => {
        setLocationStatus("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  useEffect(() => {
    const savedWalk = JSON.parse(
      localStorage.getItem("savedWalkMode") || "false"
    );
    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
    const storedCategories = JSON.parse(
      localStorage.getItem("selectedCategories") || "[]"
    );

    setSavedWalkMode(savedWalk);
    setSavedIds(savedPlaces);
    setSelectedCategories(storedCategories);

    if (savedWalk) {
      setViewMode("saved");
    }
  }, []);

  const placesWithDistance = useMemo(() => {
    return places
      .map((place) => ({
        ...place,
        distanceMeters: getDistanceMeters(userPosition, place.coordinates),
      }))
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [userPosition]);

  const filteredPlaces = useMemo(() => {
    if (viewMode === "all") return placesWithDistance;

    if (viewMode === "interests") {
      if (selectedCategories.length === 0) return placesWithDistance;

      return placesWithDistance.filter((place) =>
        selectedCategories.includes(place.category)
      );
    }

    if (viewMode === "saved") {
      return placesWithDistance.filter((place) => savedIds.includes(place.id));
    }

    return placesWithDistance;
  }, [placesWithDistance, selectedCategories, viewMode, savedIds]);

  const nearestPlace = useMemo(() => {
    if (!filteredPlaces.length) return null;
    return filteredPlaces[0];
  }, [filteredPlaces]);

  const selectedPlace = useMemo(() => {
    return (
      placesWithDistance.find((place) => place.id === selectedPlaceId) || null
    );
  }, [placesWithDistance, selectedPlaceId]);

  const savedPlacesNearby = useMemo(() => {
    return placesWithDistance
      .filter((place) => savedIds.includes(place.id))
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [placesWithDistance, savedIds]);

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
        (restroom) => restroom.id === selectedRestroomId
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
          place.coordinates
        ),
      }))
      .sort((a, b) => a.nearbyDistance - b.nearbyDistance)
      .slice(0, 2);
  }, [selectedRestroom]);

 const isSoftMode = viewMode === "all";
 
  const showNearbyAlert =
    nearestPlace !== null &&
    nearestPlace.distanceMeters <= (isSoftMode ? 200 : 400) &&
    !dismissedAlert &&
    !selectedPlace &&
    !selectedRestroom &&
    !hasInteractedWithMap &&
    !savedWalkAlertPlace &&
    viewMode !== "saved";

  useEffect(() => {
    if (showNearbyAlert) {
      const timer = setTimeout(() => {
        setAlertVisible(true);
      }, 250);

      return () => clearTimeout(timer);
    }

    setAlertVisible(false);
  }, [showNearbyAlert]);

  useEffect(() => {
    if (savedWalkSnoozed || !savedWalkMode || savedPlacesNearby.length === 0) {
      setSavedWalkAlertPlace(null);
      return;
    }

    const nearestSaved = savedPlacesNearby.find(
      (place) => !dismissedSavedWalkIds.includes(String(place.id))
    );

    if (!nearestSaved) {
      setSavedWalkAlertPlace(null);
      return;
    }

    if (
      nearestSaved.distanceMeters <= 250 &&
      !selectedPlace &&
      !selectedRestroom
    ) {
      if (savedWalkAlertPlace?.id !== nearestSaved.id) {
        const audio = new Audio("/ping.mp3");
        audio.volume = 0.4;
        audio.play().catch(() => {});
        navigator.vibrate?.(200);
      }

      setSavedWalkAlertPlace(nearestSaved);
    } else {
      setSavedWalkAlertPlace(null);
    }
  }, [
    savedWalkSnoozed,
    savedWalkMode,
    savedPlacesNearby,
    selectedPlace,
    selectedRestroom,
    savedWalkAlertPlace,
    dismissedSavedWalkIds,
  ]);

  function handleOpenNearestCard() {
    if (!nearestPlace) return;
    setSelectedPlaceId(nearestPlace.id);
    setSelectedRestroomId(null);
    setHasInteractedWithMap(true);
    setAlertVisible(false);
  }

  function handleLater() {
    setDismissedAlert(true);
    setHasInteractedWithMap(true);
    setAlertVisible(false);
  }

  function handleSelectPlace(placeId) {
    setSelectedPlaceId(placeId);
    setSelectedRestroomId(null);
    setDismissedAlert(true);
    setHasInteractedWithMap(true);
    setAlertVisible(false);
    setSavedWalkAlertPlace(null);
  }

  function handleSelectRestroom(restroomId) {
    setSelectedRestroomId(restroomId);
    setSelectedPlaceId(null);
    setDismissedAlert(true);
    setHasInteractedWithMap(true);
    setAlertVisible(false);
  }

  function handleClosePlaceCard() {
    setSelectedPlaceId(null);
  }

  function handleCloseRestroomCard() {
    setSelectedRestroomId(null);
  }

  function handleToggleRestrooms() {
    setShowRestrooms((prev) => !prev);
    setHasInteractedWithMap(true);
    setDismissedAlert(true);
    setAlertVisible(false);
    setSelectedRestroomId(null);
  }

  function handleNavigate() {
    if (!selectedRestroom?.coordinates) return;

    const [lat, lng] = selectedRestroom.coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  }

  function handleSetAllMode() {
    setViewMode("all");
    setSavedWalkMode(false);
    localStorage.setItem("savedWalkMode", JSON.stringify(false));
    setSavedWalkAlertPlace(null);
    setSavedWalkSnoozed(false);
    setDismissedSavedWalkIds([]);
    setDismissedAlert(false);          
  setHasInteractedWithMap(false);
  }
  
  function handleSetInterestsMode() {
    setViewMode("interests");
    setSavedWalkMode(false);
    localStorage.setItem("savedWalkMode", JSON.stringify(false));
    setSavedWalkAlertPlace(null);
    setSavedWalkSnoozed(false);
    setDismissedAlert(false);
    setHasInteractedWithMap(false);
  }

  function handleSetSavedWalkMode() {
    setViewMode("saved");
    setSavedWalkMode(true);
    localStorage.setItem("savedWalkMode", JSON.stringify(true));
    setSavedWalkSnoozed(false);
    setDismissedSavedWalkIds([]);
  }

  function handleShowAllPlaces() {
    localStorage.removeItem("selectedCategories");
    setSelectedCategories([]);
    setViewMode("all");
    setSavedWalkMode(false);
    localStorage.setItem("savedWalkMode", JSON.stringify(false));
    setSavedWalkAlertPlace(null);
    setSavedWalkSnoozed(false);
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
              onClick={() => navigate("/saved")}
            >
              Saved places
            </button>
          </div>
        </div>

        <div className="map-header">
          <h1 className="map-title">Explore nearby</h1>
          <p className="map-subtitle">
            Discover places with cultural impact around you
          </p>

          <div className="map-view-modes">
            <button
              className={`map-view-mode ${
                viewMode === "all" ? "map-view-mode--active" : ""
              }`}
              onClick={handleSetAllMode}
            >
              All places
            </button>

            <button
              className={`map-view-mode ${
                viewMode === "interests" ? "map-view-mode--active" : ""
              }`}
              onClick={handleSetInterestsMode}
            >
              My interests
            </button>

            <button
              className={`map-view-mode ${
                viewMode === "saved" ? "map-view-mode--active" : ""
              }`}
              onClick={handleSetSavedWalkMode}
            >
              Saved walk
            </button>
          </div>

          {viewMode === "interests" && selectedCategories.length > 0 && (
            <div className="map-active-filters-row">
              <p className="map-active-filters">
                🧭 Showing: {selectedCategories.join(" + ")}
              </p>

              <button
                className="map-clear-filters"
                onClick={handleShowAllPlaces}
              >
                Show all places
              </button>
            </div>
          )}

          {viewMode === "interests" && selectedCategories.length === 0 && (
            <p className="map-active-filters">
              No interests selected yet. Showing all places.
            </p>
          )}

          {viewMode === "saved" && savedIds.length === 0 && (
            <p className="map-active-filters">
              No saved places yet. Save places first to use Saved walk.
            </p>
          )}

          {viewMode === "saved" && savedIds.length > 0 && (
            <p className="map-active-filters">
              Saved walk is active: showing your saved places only.
            </p>
          )}

          {locationStatus === "loading" && (
            <p className="location-note">Getting your location…</p>
          )}

          {locationStatus === "denied" && (
            <p className="location-note">
              Location access was denied. Showing demo position instead.
            </p>
          )}

          {locationStatus === "unsupported" && (
            <p className="location-note">
              Geolocation is not supported in this browser. Showing demo
              position instead.
            </p>
          )}
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

            {filteredPlaces.map((place) => {
              const isActive = place.id === selectedPlaceId;

              return (
                <Marker
                  key={place.id}
                  position={place.coordinates}
                  icon={createPlaceIcon(place.category, isActive)}
                  eventHandlers={{
                    click: () => handleSelectPlace(place.id),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="map-hover-hint">
                      <strong>{place.title}</strong>
                      <br />
                      {place.category}
                      <br />
                      DNA {place.dna}
                    </div>
                  </Tooltip>
                </Marker>
              );
            })}

            {showRestrooms &&
              restroomsWithDistance.map((restroom) => (
                <Marker
                  key={`restroom-${restroom.id}`}
                  position={restroom.coordinates}
                  icon={createRestroomIcon(restroom.type)}
                  eventHandlers={{
                    click: () => handleSelectRestroom(restroom.id),
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

          <div className="map-legend map-legend--compact">
            <button
              className="map-legend-title map-legend-title--static"
              type="button"
            >
              Cultural layers
            </button>

            <div className="map-legend-items">
              {legendItems.map((item) => {
                const colors = getCategoryColor(item);

                return (
                  <div key={item} className="map-legend-item">
                    <span
                      className="map-legend-dot"
                      style={{
                        backgroundColor: colors.fill,
                        borderColor: colors.stroke,
                      }}
                    />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className={`map-quick-toggle ${
              showRestrooms ? "map-quick-toggle--active" : ""
            }`}
            onClick={handleToggleRestrooms}
            title="Show restrooms"
            aria-label="Toggle restrooms layer"
          >
            <span className="map-quick-toggle-icon">🚻</span>
          </button>

          {showNearbyAlert && (
            <div
              className={`nearby-alert nearby-alert--top ${
                alertVisible ? "nearby-alert--visible" : ""
              }`}
            >
              <div className="nearby-alert-badge">Nearby cultural signal</div>

              <p className="nearby-alert-title">
                {isSoftMode
                  ? `Something interesting is ${formatDistance(
                      nearestPlace.distanceMeters
                    )} away`
                  : `You are ${formatDistance(
                      nearestPlace.distanceMeters
                    )} from a place with high cultural impact`}
              </p>

              <p className="nearby-alert-text">
                {isSoftMode
                  ? `${nearestPlace.title} is nearby. Explore if you're curious.`
                  : `${nearestPlace.title} is nearby. Want to discover it?`}
              </p>

              <p className="nearby-alert-microcopy">
                Open card or keep exploring.
              </p>

              <div className="nearby-alert-actions">
                <button
                  className="primary-button"
                  onClick={handleOpenNearestCard}
                >
                  Open card
                </button>

                <button className="secondary-button" onClick={handleLater}>
                  Later
                </button>
              </div>
            </div>
          )}

          {savedWalkAlertPlace && (
            <div className="saved-walk-alert">
              <div className="saved-walk-alert-badge">Saved walk</div>

              <p className="saved-walk-alert-title">You saved this place</p>

              <p className="saved-walk-alert-text">
                {savedWalkAlertPlace.title} is{" "}
                {formatDistance(savedWalkAlertPlace.distanceMeters)} away.
              </p>

              <div className="saved-walk-alert-actions">
                <button
                  className="primary-button"
                  onClick={() => {
                    const id = String(savedWalkAlertPlace.id);

                    setDismissedSavedWalkIds((prev) =>
                      prev.includes(id) ? prev : [...prev, id]
                    );

                    handleSelectPlace(savedWalkAlertPlace.id);
                  }}
                >
                  Open saved place
                </button>

                <button
                  className="secondary-button"
                  onClick={() => {
                    setSavedWalkSnoozed(true);
                    setSavedWalkAlertPlace(null);
                  }}
                >
                  Later
                </button>
              </div>
            </div>
          )}

          {selectedPlace && (
            <div className="map-bottom-sheet map-bottom-sheet--compact">
              <div className="map-bottom-sheet-handle" />

              <div className="map-bottom-sheet-content map-bottom-sheet-content--compact">
                <div className="map-bottom-sheet-layout">
                  <div className="map-bottom-sheet-main">
                    <div className="map-bottom-sheet-top">
                      <div>
                        <h2>{selectedPlace.title}</h2>
                        <div className="map-bottom-sheet-meta">
                          <span className="pill">{selectedPlace.category}</span>
                          <span className="dna">DNA {selectedPlace.dna}</span>
                          <span className="map-distance">
                            {formatDistance(selectedPlace.distanceMeters)} away
                          </span>
                        </div>
                      </div>

                      <button
                        className="close-button close-button--light"
                        onClick={handleClosePlaceCard}
                      >
                        ×
                      </button>
                    </div>

                    <p className="map-preview-description map-preview-description--compact">
                      {selectedPlace.description}
                    </p>

                    <div className="map-preview-actions">
                      <button
                        className="primary-button"
                        onClick={() => navigate(`/place/${selectedPlace.id}`)}
                      >
                        View details
                      </button>

                      <button
                        className="secondary-button"
                        onClick={handleClosePlaceCard}
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="map-bottom-sheet-image-wrap">
                    <img
                      src={selectedPlace.image}
                      alt={selectedPlace.title}
                      className="map-bottom-sheet-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    onClick={handleCloseRestroomCard}
                  >
                    ×
                  </button>
                </div>

                <p className="map-preview-description map-preview-description--compact">
                  {selectedRestroom.description}
                </p>

                <div className="map-preview-actions">
                  <button className="navigate-button" onClick={handleNavigate}>
                    📍 Open in Google Maps
                  </button>

                  <button
                    className="secondary-button"
                    onClick={handleCloseRestroomCard}
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
                      {nearbySuggestions.map((place) => (
                        <button
                          key={place.id}
                          className="restroom-nearby-item"
                          onClick={() => handleSelectPlace(place.id)}
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
                            {place.category}
                          </span>
                        </button>
                      ))}
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

export default MapPage;