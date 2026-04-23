import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { places } from "../data/places";

function getCategoryClass(category) {
  return `category-pill category-pill--${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
}

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedCategories = params.get("categories")?.split("|") || [];

  const filteredPlaces = useMemo(() => {
    if (!selectedCategories.length) return [];
    return places.filter((place) =>
      selectedCategories.includes(place.category),
    );
  }, [selectedCategories]);

  function handleSave(placeId) {
    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces") || "[]");

    if (!savedPlaces.includes(placeId)) {
      localStorage.setItem(
        "savedPlaces",
        JSON.stringify([...savedPlaces, placeId]),
      );
    }
  }

  return (
    <div className="container">
      <div className="results-top-row">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="results-top-actions">
          <button
            className="saved-link-button"
            onClick={() => navigate("/saved")}
          >
            Saved places
          </button>
        </div>
      </div>

      <h1 className="results-title">Selected categories</h1>

      <div className="selected-tags">
        {selectedCategories.map((category) => (
          <span key={category} className={getCategoryClass(category)}>
            {category}
          </span>
        ))}
      </div>

      <div className="results-map-entry">
        <div className="results-map-entry-text">
          <h2>Explore on map</h2>
          <p>
            See these places in the city context and continue exploring nearby.
          </p>
        </div>

        <button className="primary-button" onClick={() => navigate("/map")}>
          🧭 Open cultural map
        </button>
      </div>

      <div className="results-list">
        {filteredPlaces.map((place) => (
          <article key={place.id} className="place-card">
            <img src={place.image} alt={place.title} className="place-image" />

            <div className="place-content">
              <div className="place-topline">
                <span className="saved-inline">Not saved</span>
                <span className={getCategoryClass(place.category)}>
                  {place.category}
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
                  onClick={() => handleSave(place.id)}
                >
                  Save for later
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
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

export default ResultsPage;
