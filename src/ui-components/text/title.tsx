import styled from "styled-components/native";

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.text};
`;
