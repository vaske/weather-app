import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Commands = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 8px;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
`;
