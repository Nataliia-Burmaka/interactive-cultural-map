import { useNavigate } from "react-router-dom";
import { categories } from "../data/places";

function HomeScreen({ selectedCategories, onToggleCategory, onContinue }) {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      <div className="home-top-row">
        <button
          className="saved-link-button"
          onClick={() => navigate("/saved")}
        >
          Saved places
        </button>
      </div>

      <section className="home-hero">
        <p className="home-eyebrow">
          <span className="eyebrow-dot" />
          City discovery companion
        </p>
        <h1>Jyväskylä Unique</h1>
        <p className="subtitle subtitle--hero">
          A lightweight city companion that helps visitors discover what defines
          the city — and solve practical needs along the way.
        </p>
      </section>

      <section className="mode-section">
        <div className="mode-grid">
          <button
            className="mode-card mode-card--explore"
            onClick={() => navigate("/map")}
          >
            <div className="mode-card-icon mode-card-icon--explore">◈</div>
            <div className="mode-card-body">
              <h2>Explore the city</h2>
              <p>
                See nearby places with cultural impact and discover the city
                through meaning, atmosphere, and context.
              </p>
            </div>
          </button>

          <button
            className="mode-card mode-card--needs"
            onClick={() => navigate("/restrooms")}
          >
            <div className="mode-card-icon mode-card-icon--needs">🚻</div>
            <div className="mode-card-body">
              <h2>Solve a quick need</h2>
              <p>
                Find a restroom nearby fast, then continue exploring without
                breaking the experience.
              </p>
            </div>
          </button>
        </div>
      </section>

      <section className="planning-section">
        <div className="planning-header">
          <div>
            <p className="planning-kicker">Planning mode</p>
            <h3>Plan by interest</h3>
          </div>
          <p>
            Choose what matters to you and get a curated shortlist of places to
            explore.
          </p>
        </div>

        <div className="grid category-grid">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);

            return (
              <button
                key={cat}
                className={`card category-card category-card--${cat
                  .toLowerCase()
                  .replace(
                    /[^a-z0-9]+/g,
                    "-",
                  )} ${isSelected ? "card--selected" : ""}`}
                onClick={() => onToggleCategory(cat)}
              >
                <span className="category-card-label">{cat}</span>
              </button>
            );
          })}
        </div>

        <div className="planning-footer">
          <p className="planning-note">
            Select one or more categories to continue.
          </p>

          <button className="continue continue--home" onClick={onContinue}>
            Continue
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
