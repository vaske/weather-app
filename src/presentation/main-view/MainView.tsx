import { useEffect, useState } from "react";
import { CitySquare } from "../../components/CitySquare";
import { City } from "../../domain/city";
import allCities from "../../data/data.json";
import { useTemperatureUnit } from "../../context/temperature-unit-context";
import {
  Commands,
  Container,
  GridContainer,
  LinkStyled,
} from "./MainView.styles";
import { TemperatureUnit } from "../../domain/temperature";

export const MainView = () => {
  const { temperatureUnit, setTemperatureUnit } = useTemperatureUnit();
  const [cities, setCities] = useState<City[]>([]); // State to hold list of cities
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortCriteria, setSortCriteria] = useState("name"); // State for sorting criteria

  const handleChangeTemperatureUnit = (newUnit: TemperatureUnit) => {
    setTemperatureUnit(newUnit);
  };

  useEffect(() => {
    // Fetch cities data from API
    const uniqueAndActiveCities = allCities.cities.filter(
      (city, index, self) =>
        index === self.findIndex((t) => t.name === city.name) && city.active
    );

    setCities(uniqueAndActiveCities);
  }, []);

  // Function to filter cities based on search term
  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to sort cities based on criteria
  const sortedCities = filteredCities.sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else {
      // Sorting by distance to a specified location (e.g., Tel Aviv) can be implemented here
      return 0; // Placeholder for sorting by distance
    }
  });

  return (
    <Container>
      <Commands>
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Dropdown for sorting criteria */}
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="distance">Sort by Distance</option>
        </select>

        {/* Dropdown for temperature units */}
        <select
          value={temperatureUnit}
          onChange={(e) =>
            handleChangeTemperatureUnit(e.target.value as TemperatureUnit)
          }
        >
          <option value="international">International Units</option>
          <option value="imperial">Imperial Units</option>
        </select>
      </Commands>

      <GridContainer>
        {sortedCities.length > 0 ? (
          sortedCities.map((city) => (
            <LinkStyled
              to={`/city/${city.name}/${temperatureUnit}`}
              key={city.name}
            >
              <CitySquare city={city} />
            </LinkStyled>
          ))
        ) : (
          <p>No results found</p>
        )}
      </GridContainer>
    </Container>
  );
};
