import { City } from "../../domain/city";
import {
  CityDetails,
  CityImage,
  SquareContainer,
  Title,
} from "./CitySquare.styles";

type Props = {
  city: City;
};

export const CitySquare = ({ city }: Props) => {
  return (
    <SquareContainer>
      <CityImage $imageUrl={city.image} />
      <CityDetails>
        <Title>{city.name}</Title>
        <p>{city.country}</p>
        <p>{city.description}</p>
      </CityDetails>
    </SquareContainer>
  );
};
