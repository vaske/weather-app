import { MainView } from "../main-view";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Root } from "./App.styles";
import { CityDetails } from "../city-details";
import { TemperatureUnitProvider } from "../../context/temperature-unit-context";

export const App = () => {
  return (
    <Root>
      <h1>All cities</h1>
      <TemperatureUnitProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/city/:cityName/:unit" element={<CityDetails />} />
          </Routes>
        </Router>
      </TemperatureUnitProvider>
    </Root>
  );
};
