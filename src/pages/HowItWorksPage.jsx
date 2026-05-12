import { useNavigate } from "react-router-dom";

function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <main className="onboarding-page how-page">
      <section className="how-screen">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="brand-row brand-row--center">
          <img src="/images/bird.png" alt="" className="brand-bird" />
          <span>Jyväskylä Unique</span>
        </div>

        <header className="how-header">
          <p className="hero-kicker">How it works</p>
          <h1>How Jyväskylä Unique works</h1>
          <p>
            Choose your interests, save places, open the cultural map and
            discover meaningful places nearby
          </p>
        </header>

        <div className="how-steps">
          <article className="how-step">
            <div className="step-number">1</div>
            <div className="step-copy">
              <h2>Choose interests</h2>
              <p>
                Select the themes you want to explore. Save places and the app
                will remind you about them.
              </p>
            </div>
            <div className="step-preview">
              <img src="/images/mockup1.jpg" alt="Choose interests preview" />
            </div>
          </article>

          <article className="how-step">
            <div className="step-number">2</div>
            <div className="step-copy">
              <h2>Open the map</h2>
              <p>
                See curated places connected to your interests instead of
                scrolling through everything. Less info - more meaning.
              </p>
            </div>
            <div className="step-preview">
              <img src="/images/mockup2.jpg" alt="Cultural map preview" />
            </div>
          </article>

          <article className="how-step">
            <div className="step-number">3</div>
            <div className="step-copy">
              <h2>Discover meaningful places nearby</h2>
              <p>
                Get gentle nearby prompts while walking through the city at your
                own pace. Choose Saved walk to get prompts only about selected
                places.
              </p>
            </div>
            <div className="step-preview">
              <img src="/images/mockup3.jpg" alt="Nearby alert preview" />
            </div>
          </article>
        </div>

        <button
          className="hero-cta how-cta"
          onClick={() => navigate("/interests")}
        >
          Continue
        </button>
      </section>
    </main>
  );
}

export default HowItWorksPage;
