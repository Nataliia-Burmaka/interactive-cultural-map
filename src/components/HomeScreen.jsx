import { useNavigate } from "react-router-dom";
import { categories } from "../data/places";

function HomeScreen({ selectedCategories, onToggleCategory, onContinue }) {
  const navigate = useNavigate();

  return (
    <main className="onboarding-page interests-page">
      <section className="interests-screen">
        <button
          className="onboarding-back"
          onClick={() => navigate("/how-it-works")}
        >
          ← Back
        </button>

        <div className="brand-row brand-row--center interests-brand">
          <img src="/images/bird.png" alt="" className="brand-bird" />
          <span>Jyväskylä Unique</span>
        </div>

        <header className="interests-header">
          <h1>What would you like to explore?</h1>
          <p>
            Choose one or more themes. We’ll build a curated shortlist and open
            the map around your interests.
          </p>
        </header>

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

        <div className="interests-actions">
          <button className="hero-cta interests-main-cta" onClick={onContinue}>
            Open cultural map
          </button>
        </div>

        <section className="comfort-card">
          <div>
            <p className="comfort-kicker">Practical comfort</p>
            <h2>Need a restroom nearby?</h2>
            <p>
              Open a separate restroom map first. Cultural suggestions appear
              after you choose a restroom.
            </p>
          </div>

          <button
            className="comfort-button"
            onClick={() => navigate("/restrooms")}
          >
            🚻 Open restroom map
          </button>
        </section>
      </section>
    </main>
  );
}

export default HomeScreen;
