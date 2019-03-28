// @flow

import React from "react";
import styled from "styled-components";

import { Half, SectionTitle } from ".";

import type { TMove } from "../types";

// Styled components
const Bordered = styled.div`
  border: 1px solid ${props => props.theme.colors.blue};
  padding: ${props => props.theme.whiteSpace.s}
    ${props => props.theme.whiteSpace.m};
  margin-right: ${props => props.theme.whiteSpace.m};
  margin-bottom: ${props => props.theme.whiteSpace.s};
`;

const LearnMethod = styled.div`
  color: ${props => props.theme.colors.yellow};
  font-size: ${props => props.theme.fontSize.s};
  text-transform: uppercase;
`;

const Name = styled.div`
  color: ${props => props.theme.colors.blue};
  font-size: ${props => props.theme.fontSize.m};
`;

const SelectedMove = ({ move }: { move: TMove }) => (
  <Half>
    <Bordered>
      <LearnMethod>{move.learnMethod}</LearnMethod>
      <Name>{move.name}</Name>
    </Bordered>
  </Half>
);

export const SelectedMoves = ({ moves }: { moves: TMove[] }) =>
  moves.length > 0 && (
    <div>
      <SectionTitle>Selected moves</SectionTitle>

      {moves.map(move => (
        <SelectedMove key={move.name} move={move} />
      ))}
    </div>
  );
