interface CityCoords {
  lat: number;
  lng: number;
}

export interface City {
  name: string;
  continent: string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: CityCoords;
}

export interface CitiesData {
  cities: City[];
}
