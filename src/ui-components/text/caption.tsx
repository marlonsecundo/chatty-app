import styled from "styled-components/native";

export const Caption = styled.Text`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text};
`;
