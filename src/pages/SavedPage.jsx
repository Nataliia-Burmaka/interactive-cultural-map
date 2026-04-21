import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { places } from "../data/places";

function SavedPage() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
    setSavedIds(saved);
  }, []);

  const savedPlaces = useMemo(() => {
    return places.filter((place) => savedIds.includes(place.id));
  }, [savedIds]);

  function handleRemove(placeId) {
    const updated = savedIds.filter((id) => id !== placeId);
    setSavedIds(updated);
    localStorage.setItem("savedPlaces", JSON.stringify(updated));
  }

  return (
    <div className="container">
      <div className="top-row saved-top-row">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="saved-actions-group">
          <button className="saved-link-button" onClick={() => navigate("/")}>
            Explore more
          </button>
          <button
            className="saved-link-button"
            onClick={() => navigate("/map")}
          >
            Open map
          </button>
        </div>
      </div>

      <h1 className="results-title">Saved places</h1>

      <p className="saved-subtitle">
        You saved {savedPlaces.length} place
        {savedPlaces.length !== 1 ? "s" : ""}
      </p>

      {savedPlaces.length > 1 && (
        <div className="saved-hint">You already have a route forming</div>
      )}

      {savedPlaces.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">☆</div>
          <h2>No saved places yet</h2>
          <p>
            Save places from the results or details page to build your personal
            city shortlist.
          </p>
          <button className="primary-button" onClick={() => navigate("/")}>
            Start exploring
          </button>
        </div>
      ) : (
        <>
          <h2 className="saved-section-title">Your city shortlist</h2>

          <div className="results-list">
            {savedPlaces.map((place) => (
              <div key={place.id} className="place-card">
                <div className="place-card-top">
                  <h2>{place.title}</h2>
                  <span className="saved-badge saved-badge--active">Saved</span>
                </div>

                <div className="place-meta">
                  <span className="pill">{place.category}</span>
                  <span className="dna">DNA {place.dna}</span>
                </div>

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
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SavedPage;
