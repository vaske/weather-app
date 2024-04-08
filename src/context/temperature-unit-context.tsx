import React, { createContext, useContext, useState } from "react";
import { TemperatureUnit } from "../domain/temperature";

interface TemperatureUnitContextType {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: React.Dispatch<React.SetStateAction<TemperatureUnit>>;
}

const TemperatureUnitContext = createContext<
  TemperatureUnitContextType | undefined
>(undefined);

export const useTemperatureUnit = () => {
  const context = useContext(TemperatureUnitContext);
  if (!context) {
    throw new Error(
      "useTemperatureUnit must be used within a TemperatureUnitProvider"
    );
  }
  return context;
};

export const TemperatureUnitProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("international");

  return (
    <TemperatureUnitContext.Provider
      value={{ temperatureUnit, setTemperatureUnit }}
    >
      {children}
    </TemperatureUnitContext.Provider>
  );
};
