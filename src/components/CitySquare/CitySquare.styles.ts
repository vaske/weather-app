import styled from "styled-components";

export const SquareContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
`;

export const CityImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 120px;
  min-height: 120px;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-size: cover;
  background-position: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const CityDetails = styled.div`
  padding: 10px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;
