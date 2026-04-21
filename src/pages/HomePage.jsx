import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeScreen from "../components/HomeScreen";

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  }

  function handleContinue() {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    const query = selectedCategories.join("|");
    navigate(`/results?categories=${encodeURIComponent(query)}`);
  }

  return (
    <HomeScreen
      selectedCategories={selectedCategories}
      onToggleCategory={toggleCategory}
      onContinue={handleContinue}
    />
  );
}

export default HomePage;
