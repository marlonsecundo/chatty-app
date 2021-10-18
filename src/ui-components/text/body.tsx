import styled from "styled-components/native";

export const Body = styled.Text`
  font: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
`;

export const BodyMenu = styled.Text`
  font: ${({ theme }) => theme.fonts.bodyMenu};
  color: ${({ theme }) => theme.colors.text};
`;
