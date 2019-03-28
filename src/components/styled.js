// @flow

import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Half = styled.div`
  display: inline-block;
  width: 50%;
`;

export const Wrap = styled.div`
  padding: ${props => props.theme.whiteSpace.m};
`;

export const List = styled.ul`
  padding-inline-start: 0;
`;

export const SectionTitle = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.blue};
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSize.m};
  font-weight: bold;
`;
