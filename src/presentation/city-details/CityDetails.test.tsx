import axios from "axios";
import { CityDetails } from "./CityDetails";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing
import { act, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { useTemperatureUnit } from "../../context/temperature-unit-context";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Use the actual module for all other exports
  useParams: jest.fn(), // Mock the useParams hook
}));

// Mock the useTemperatureUnit hook
jest.mock("../../context/temperature-unit-context", () => ({
  ...jest.requireActual("../../context/temperature-unit-context"),
  useTemperatureUnit: jest.fn(),
}));

describe("CityDetails", () => {
  beforeEach(() => {
    (useTemperatureUnit as jest.Mock).mockReset();
  });

  it("should render city name and weather data when fetched successfully", async () => {
    // Mock axios get method
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        location: {
          name: "City Name",
        },
        current: {
          condition: {
            text: "Cloudy",
            icon: "cloudy.png",
          },
          temp_c: 20,
          temp_f: 68,
        },
      },
    });

    (useParams as jest.Mock).mockReturnValue({ cityName: "City Name" });

    (useTemperatureUnit as jest.Mock).mockReturnValue({
      temperatureUnit: "imperial",
      setTemperatureUnit: jest.fn(), // You can provide a mock function for setTemperatureUnit if needed
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <MemoryRouter>
          <CityDetails />
        </MemoryRouter>
      );
    });

    // Wait for weather data to be fetched
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Assert city name and weather data are rendered correctly
    expect(screen.getByText("City Name")).toBeInTheDocument();
    expect(screen.getByText("Condition: Cloudy")).toBeInTheDocument();
    expect(screen.getByAltText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 68 °F")).toBeInTheDocument();
  });

  // Handles null weather data state and does not render weather data
  it("should handle null weather data state and not render weather data", async () => {
    // Mock axios get method to return null weather data
    jest.spyOn(axios, "get").mockResolvedValue({
      data: null,
    });

    (useParams as jest.Mock).mockReturnValue({ cityName: "City Name" });

    (useTemperatureUnit as jest.Mock).mockReturnValue({
      temperatureUnit: "imperial",
      setTemperatureUnit: jest.fn(),
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <MemoryRouter>
          <CityDetails />
        </MemoryRouter>
      );
    });

    // Wait for weather data to be fetched
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Assert city name is rendered
    expect(screen.getByText("City Name")).toBeInTheDocument();
    // Assert weather data is not rendered
    expect(screen.queryByText("Condition: Cloudy")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Cloudy")).not.toBeInTheDocument();
    expect(screen.queryByText("Temperature: 68 °F")).not.toBeInTheDocument();
  });
});
