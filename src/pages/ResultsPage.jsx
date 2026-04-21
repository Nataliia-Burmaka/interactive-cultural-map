import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResultsScreen from "../components/ResultsScreen";
import { places } from "../data/places";

function ResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedCategories = useMemo(() => {
    const raw = searchParams.get("categories");
    if (!raw) return [];
    return raw.split("|");
  }, [searchParams]);

  const filteredPlaces = places.filter((place) =>
    selectedCategories.includes(place.category),
  );

  function handleBack() {
    navigate("/");
  }

  return (
    <ResultsScreen
      selectedCategories={selectedCategories}
      filteredPlaces={filteredPlaces}
      onBack={handleBack}
    />
  );
}

export default ResultsPage;
