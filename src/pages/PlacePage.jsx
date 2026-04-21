import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { places } from "../data/places";

function IndicatorRow({ label, value }) {
  return (
    <div className="indicator-row">
      <span>{label}</span>
      <div className="dots">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`dot ${dot <= value ? "dot--filled" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureIcons({ features }) {
  const items = [
    {
      show: features.busAccess,
      icon: "🚌",
      label: "Bus access",
    },
    {
      show: features.paidEntry,
      icon: "💳",
      label: "Paid entry",
    },
    {
      show: features.accessible,
      icon: "♿",
      label: "Accessible",
    },
  ];

  return (
    <div className="feature-chips">
      {items
        .filter((item) => item.show)
        .map((item) => (
          <span key={item.label} className="feature-chip" title={item.label}>
            <span className="feature-chip-icon">{item.icon}</span>
            <span>{item.label}</span>
          </span>
        ))}
    </div>
  );
}

function PlacePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [storyOpen, setStoryOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const place = useMemo(
    () => places.find((item) => String(item.id) === String(id)),
    [id],
  );

  useEffect(() => {
    if (!place) return;

    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
    setSaved(savedPlaces.includes(place.id));
  }, [place]);

  function handleSaveToggle() {
    if (!place) return;

    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces") || "[]");

    let updated;

    if (savedPlaces.includes(place.id)) {
      updated = savedPlaces.filter((itemId) => itemId !== place.id);
      setSaved(false);
    } else {
      updated = [...savedPlaces, place.id];
      setSaved(true);
    }

    localStorage.setItem("savedPlaces", JSON.stringify(updated));
  }

  function handleNavigate() {
    if (!place?.coordinates) return;

    const [lat, lng] = place.coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  }

  if (!place) {
    return (
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="results-title">Place not found</h1>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-panel">
        <img src={place.image} alt={place.title} className="details-image" />

        <div className="details-header">
          <div>
            <button
              className="back-button back-button--light"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h1 className="details-title">{place.title}</h1>
          </div>

          <button className="close-button" onClick={() => navigate(-1)}>
            ×
          </button>
        </div>

        <div className="details-meta-row">
          <span className="pill pill--gold">{place.category}</span>
          <span
            className={`saved-inline ${saved ? "saved-inline--active" : ""}`}
          >
            {saved ? "Saved" : "Not saved"}
          </span>
        </div>

        <FeatureIcons features={place.features} />

        <div className="score-card">
          <div>
            <p className="score-label">CULTURAL DNA SCORE</p>
            <p className="score-note">{place.shortImpact}</p>
          </div>

          <div className="score-value-block">
            <div className="score-value">{place.dna}</div>
            <div className="score-out-of">out of 5.0</div>
          </div>
        </div>

        <p className="details-description">{place.description}</p>

        <section className="details-section">
          <button
            className="accordion-button"
            onClick={() => setEventsOpen((prev) => !prev)}
          >
            <span>Live events this week</span>
            <span className="accordion-meta">
              {eventsOpen ? "Hide" : `${place.liveEvents.length} events`}
            </span>
          </button>

          {eventsOpen && (
            <div className="accordion-content">
              <div className="events-cards">
                {place.liveEvents.map((event) => (
                  <div key={event} className="event-card">
                    {event}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="details-section">
          <h2>CULTURAL DNA INDICATORS</h2>
          <div className="indicator-list">
            {place.indicators.map((indicator) => (
              <IndicatorRow
                key={indicator.label}
                label={indicator.label}
                value={indicator.value}
              />
            ))}
          </div>
        </section>

        <section className="details-section">
          <h2>IMPACT SIGNALS</h2>
          <ul className="impact-list">
            {place.impactSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </section>

        <div className="details-actions">
          <button
            className="story-button"
            onClick={() => setStoryOpen((prev) => !prev)}
          >
            {storyOpen ? "Hide story" : "Read the story"}
          </button>

          {storyOpen && (
            <section className="details-section story-panel">
              <h2>STORY</h2>
              <p className="story-text">{place.story}</p>
            </section>
          )}

          <div className="navigate-block">
            <button className="navigate-button" onClick={handleNavigate}>
              Open in Maps
            </button>
            <p className="navigate-note">
              Navigate from your current location or open this place later on
              the map.
            </p>
          </div>

          <button className="save-button" onClick={handleSaveToggle}>
            {saved ? "Remove from saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
