import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { places } from "../data/places";

function getCategoryClass(category) {
  return `category-pill category-pill--${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
}

function SavedPage() {
  const navigate = useNavigate();

  const [savedIds, setSavedIds] = useState([]);
  const [savedWalkMode, setSavedWalkMode] = useState(false);

  useEffect(() => {
    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
    setSavedIds(savedPlaces);

    const savedWalk = JSON.parse(
      localStorage.getItem("savedWalkMode") || "false",
    );
    setSavedWalkMode(savedWalk);
  }, []);

  const savedPlaces = useMemo(() => {
    return places.filter((place) => savedIds.includes(place.id));
  }, [savedIds]);

  function handleRemove(id) {
    const updated = savedIds.filter((itemId) => itemId !== id);
    setSavedIds(updated);
    localStorage.setItem("savedPlaces", JSON.stringify(updated));

    if (updated.length === 0) {
      setSavedWalkMode(false);
      localStorage.setItem("savedWalkMode", JSON.stringify(false));
    }
  }

  function handleToggleSavedWalk() {
    const nextValue = !savedWalkMode;
    setSavedWalkMode(nextValue);
    localStorage.setItem("savedWalkMode", JSON.stringify(nextValue));
  }

  return (
    <div className="container">
      <div className="saved-top-row">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="results-top-actions">
          <button
            className="saved-link-button"
            onClick={() => navigate("/map")}
          >
            🧭 Open cultural map
          </button>
        </div>
      </div>

      <h1 className="results-title">Saved places</h1>
      <p className="saved-subtitle">
        Keep track of the places you want to explore.
      </p>

      {savedPlaces.length > 0 && (
        <div className="saved-walk-panel">
          <div className="saved-walk-panel-text">
            <h2>Walking alerts</h2>
            <p>Get notified when you are near places you saved.</p>
          </div>

          <button
            className={`saved-walk-button ${
              savedWalkMode ? "saved-walk-button--active" : ""
            }`}
            onClick={handleToggleSavedWalk}
          >
            {savedWalkMode ? "Stop saved walk" : "Start saved walk"}
          </button>
        </div>
      )}

      {savedPlaces.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">☆</div>
          <h2>No saved places yet</h2>
          <p>Save places from the map or details page to find them here.</p>
        </div>
      ) : (
        <div className="results-list">
          {savedPlaces.map((place) => (
            <article key={place.id} className="place-card">
              <img
                src={place.image}
                alt={place.title}
                className="place-image"
              />

              <div className="place-content">
                <div className="place-topline">
                  <span className={getCategoryClass(place.category)}>
                    {place.category}
                  </span>
                  <span className="saved-inline saved-inline--active">
                    Saved
                  </span>
                  <span className="dna">DNA {place.dna}</span>
                </div>

                <h2>{place.title}</h2>
                <p className="place-description">{place.description}</p>

                <div className="place-actions">
                  <button
                    className="primary-button"
                    onClick={() => navigate(`/place/${place.id}`)}
                  >
                    View details
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => handleRemove(place.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <button
        className="floating-map-button"
        onClick={() => navigate("/map")}
        aria-label="Open cultural map"
        title="Open cultural map"
      >
        🧭
      </button>
    </div>
  );
}

export default SavedPage;
