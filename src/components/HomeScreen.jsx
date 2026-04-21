import { useNavigate } from "react-router-dom";
import { categories } from "../data/places";

function HomeScreen({ selectedCategories, onToggleCategory, onContinue }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="home-top-row">
        <button
          className="saved-link-button"
          onClick={() => navigate("/saved")}
        >
          Saved places
        </button>
      </div>

      <section className="home-hero">
        <h1>Jyväskylä Unique</h1>
        <p className="subtitle subtitle--hero">
          A lightweight city companion that helps visitors discover what defines
          the city — and solve practical needs along the way.
        </p>
      </section>

      <section className="mode-section">
        <div className="mode-grid">
          <button className="mode-card" onClick={() => navigate("/map")}>
            <div className="mode-card-icon">✦</div>
            <h2>Explore the city</h2>
            <p>
              See nearby places with cultural impact and discover the city
              through meaning, atmosphere, and context.
            </p>
          </button>

          <button className="mode-card" onClick={() => navigate("/restrooms")}>
            <div className="mode-card-icon">⌘</div>
            <h2>Solve a quick need</h2>
            <p>
              Find a restroom nearby fast, then continue exploring without
              breaking the experience.
            </p>
          </button>
        </div>
      </section>

      <section className="planning-section">
        <div className="planning-header">
          <h3>Plan by interest</h3>
          <p>
            Choose what matters to you and get a curated shortlist of places to
            explore.
          </p>
        </div>

        <div className="grid">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);

            return (
              <button
                key={cat}
                className={`card ${isSelected ? "card--selected" : ""}`}
                onClick={() => onToggleCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button className="continue" onClick={onContinue}>
          Continue
        </button>
      </section>
    </div>
  );
}

export default HomeScreen;
