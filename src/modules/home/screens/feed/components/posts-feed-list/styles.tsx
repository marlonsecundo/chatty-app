import { Post } from "@/src/models/post";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { FlatList } from "react-native";
import styled from "styled-components/native";

export const FeedWrapper = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  transform: translateY(-10px);
  padding-top: ${rfValuePX(20)};
  flex: 1;
`;

export const StyledFlatList = styled.FlatList<Post>`
  flex: 1;
`;
