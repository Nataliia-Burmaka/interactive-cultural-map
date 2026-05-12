import { useNavigate } from "react-router-dom";

function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <main className="onboarding-page how-page">
      <section className="how-screen">
        <div className="brand-row brand-row--center">
          <img src="/images/bird.png" alt="" className="brand-bird" />
          <span>Jyväskylä Unique</span>
        </div>

        <header className="how-header">
          <p className="hero-kicker">How it works</p>
          <h1>Explore the city in three calm steps.</h1>
          <p>
            Choose your interests, open the cultural map and discover meaningful
            places nearby.
          </p>
        </header>

        <div className="how-steps">
          <article className="how-step">
            <div className="step-number">1</div>
            <div className="step-copy">
              <h2>Choose interests</h2>
              <p>Select the themes that match your mood and curiosity.</p>
            </div>
            <div className="step-mockup step-mockup--cards">
              <span>Architecture</span>
              <span>Nature</span>
              <span>Traditions</span>
            </div>
          </article>

          <article className="how-step">
            <div className="step-number">2</div>
            <div className="step-copy">
              <h2>Open the map</h2>
              <p>See curated places instead of scrolling through everything.</p>
            </div>
            <div className="step-mockup step-mockup--map">
              <span className="map-dot map-dot--one" />
              <span className="map-dot map-dot--two" />
              <span className="map-dot map-dot--three" />
            </div>
          </article>

          <article className="how-step">
            <div className="step-number">3</div>
            <div className="step-copy">
              <h2>Discover nearby</h2>
              <p>Get gentle prompts when meaningful places are close to you.</p>
            </div>
            <div className="step-mockup step-mockup--card">
              <strong>Nearby place</strong>
              <span>300 m from you</span>
            </div>
          </article>
        </div>

        <button className="hero-cta how-cta" onClick={() => navigate("/interests")}>
          Continue
        </button>
      </section>
    </main>
  );
}

export default HowItWorksPage;
