import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { WeatherData } from "../../domain/weather-data";
import { BackButton, CityDetailsContainer } from "./CityDetails.styles";
import { useTemperatureUnit } from "../../context/temperature-unit-context";
import { configuration } from "../../configuration";

export const CityDetails = () => {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const { temperatureUnit } = useTemperatureUnit();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `${configuration.API_URL}?key=${configuration.API_KEY}&q=${cityName}&aqi=no`
        );

        const weatherData: WeatherData = response.data;
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <CityDetailsContainer>
      <BackButton onClick={handleBackClick}>Back</BackButton>
      <h2>{cityName}</h2>
      {weatherData && (
        <div>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>
            Temperature:{" "}
            {temperatureUnit === "imperial"
              ? weatherData.current.temp_f
              : weatherData.current.temp_c}{" "}
            °{temperatureUnit === "imperial" ? "F" : "C"}
          </p>
        </div>
      )}
    </CityDetailsContainer>
  );
};
