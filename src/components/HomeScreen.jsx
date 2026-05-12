import { useNavigate } from "react-router-dom";
import { categories } from "../data/places";

function HomeScreen({ selectedCategories, onToggleCategory, onContinue }) {
  const navigate = useNavigate();

  return (
    <div className="interests-page">
      <div className="container home-container interests-container">
        <div className="interests-brand-row">
          <img src="/images/bird.png" alt="" className="brand-bird" />
          <span>Jyväskylä Unique</span>
        </div>

        <section className="home-hero interests-hero">
          <p className="home-eyebrow">
            <span className="eyebrow-dot" />
            Step 3 · Choose your interests
          </p>
          <h1>My interests</h1>
          <p className="subtitle subtitle--hero">
            Select one or more themes and get a curated shortlist of places that
            help you read the city through meaning, identity and atmosphere.
          </p>
        </section>

        <section className="planning-section interests-section">
          <div className="planning-header">
            <div>
              <p className="planning-kicker">Cultural discovery</p>
              <h3>What would you like to explore?</h3>
            </div>
            <p>
              You can change your interests later on the map.
            </p>
          </div>

          <div className="grid category-grid interests-category-grid">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat);

              return (
                <button
                  key={cat}
                  className={`card category-card category-card--${cat
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")} ${
                    isSelected ? "card--selected" : ""
                  }`}
                  onClick={() => onToggleCategory(cat)}
                >
                  <span className="category-card-label">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="planning-footer">
            <p className="planning-note">
              Choose at least one category to continue.
            </p>

            <button className="continue continue--home" onClick={onContinue}>
              Show selected places
            </button>
          </div>
        </section>

        <section className="practical-comfort-card">
          <div>
            <p className="practical-label">Practical comfort</p>
            <h2>Need a restroom nearby?</h2>
            <p>
              Open a separate restroom map first. Cultural suggestions will appear
              only after you choose a restroom.
            </p>
          </div>

          <button
            className="secondary-button practical-button"
            onClick={() => navigate("/restrooms")}
          >
            🚻 Open restroom map
          </button>
        </section>
      </div>
    </div>
  );
}

export default HomeScreen;
