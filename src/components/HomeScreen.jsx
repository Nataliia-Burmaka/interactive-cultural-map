import { useNavigate } from "react-router-dom";
import { categories } from "../data/places";

function HomeScreen({ selectedCategories, onToggleCategory, onContinue }) {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      <div className="home-top-row">
        <button
  className="saved-link-button saved-link-button--primary"
  onClick={() => navigate("/saved")}
>
  ⭐ Saved places
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

        <section className="planning-section">
        <div className="planning-header">
          <div>
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
            Select one or more categories to continue — you can change them later while exploring.
          </p>
          
          <button className="continue continue--home" onClick={onContinue}>
            Continue
          </button>
        </div>
      </section>
      <section className="mode-section">
  <h2 className="mode-section-title">Or explore directly</h2>

  <div className="mode-grid">
    <button
      className="mode-card mode-card--explore"
      onClick={() => {
        localStorage.removeItem("selectedCategories");
        navigate("/map");
      }}
    >
      <div className="mode-icon">🧭</div>
      <h3>Explore the city</h3>
      <p>
        See nearby places with cultural impact and discover the city through
        meaning, atmosphere, and context.
      </p>
    </button>

    <button
      className="mode-card mode-card--quick"
      onClick={() => navigate("/restrooms")}
    >
      <div className="mode-icon">🚻</div>
      <h3>Solve a quick need</h3>
      <p>
        Find a restroom nearby fast, then continue exploring without breaking
        the experience.
      </p>
    </button>
  </div>
</section>
    </div>
  );
}

export default HomeScreen;
