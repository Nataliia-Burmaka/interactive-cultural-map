import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResultsScreen({ selectedCategories, filteredPlaces, onBack }) {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
    setSavedPlaces(saved);
  }, []);

  function handleToggleSave(placeId) {
    const currentSaved = JSON.parse(
      localStorage.getItem("savedPlaces") || "[]",
    );

    let updated;

    if (currentSaved.includes(placeId)) {
      updated = currentSaved.filter((id) => id !== placeId);
    } else {
      updated = [...currentSaved, placeId];
    }

    localStorage.setItem("savedPlaces", JSON.stringify(updated));
    setSavedPlaces(updated);
  }

  return (
    <div className="container">
      <div className="top-row results-top-row">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <button
          className="saved-link-button"
          onClick={() => navigate("/saved")}
        >
          Saved places
        </button>
      </div>

      <h1 className="results-title">Selected categories</h1>

      <div className="selected-tags">
        {selectedCategories.map((cat) => (
          <span key={cat} className="tag">
            {cat}
          </span>
        ))}
      </div>

      <div className="results-list">
        {filteredPlaces.map((place) => {
          const isSaved = savedPlaces.includes(place.id);

          return (
            <div key={place.id} className="place-card">
              <div className="place-card-top">
                <h2>{place.title}</h2>
                <span
                  className={`saved-badge ${isSaved ? "saved-badge--active" : ""}`}
                >
                  {isSaved ? "Saved" : "Not saved"}
                </span>
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
                  onClick={() => handleToggleSave(place.id)}
                >
                  {isSaved ? "Saved" : "Save for later"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultsScreen;
