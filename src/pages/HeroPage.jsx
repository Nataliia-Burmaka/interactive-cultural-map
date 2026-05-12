import { useNavigate } from "react-router-dom";

function HeroPage() {
  const navigate = useNavigate();

  return (
    <main className="onboarding-page hero-page">
      <section className="hero-screen">
        <div className="brand-row">
          <img src="/images/bird.png" alt="" className="brand-bird" />
          <span>Jyväskylä Unique</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">City discovery companion</p>
            <h1>
              Discover what really defines the city calmly and at your own pace.
            </h1>

            <p className="hero-subtitle">
              Curated places, local stories and practical comfort — all in one
              lightweight city companion.
            </p>

            <button
              className="hero-cta"
              onClick={() => navigate("/how-it-works")}
            >
              Start exploring
            </button>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-glow" />
            <img src="/images/bird.png" alt="" className="hero-bird" />
            <div className="city-silhouette">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="floating-marker floating-marker--architecture">🏛️</div>
            <div className="floating-marker floating-marker--nature">🌿</div>
            <div className="floating-marker floating-marker--story">✦</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HeroPage;
