// @flow

import React from "react";
import styled from "styled-components";

import { Half, Wrap, SectionTitle } from ".";

import type { TStat } from "../types";

// Styled Components
const Name = styled.div`
  font-size: ${props => props.theme.fontSize.s};
  color: ${props => props.theme.colors.yellow};
  text-transform: uppercase;
  text-align: right;
`;

const Value = styled.div`
  font-size: ${props => props.theme.fontSize.l};
  color: ${props => props.theme.colors.blue};
  text-transform: uppercase;
  text-align: right;
  margin-left: ${props => props.theme.whiteSpace.s};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

// Components
const Stat = ({ name, value }) => (
  <Half>
    <Row>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Row>
  </Half>
);

type TProps = {
  stats: TStat[]
};

export const Stats = ({ stats }: TProps) => (
  <Wrap>
    <SectionTitle>Stats</SectionTitle>
    <div>
      {stats.map(stat => (
        <Stat key={stat.name} name={stat.name} value={stat.value} />
      ))}
    </div>
  </Wrap>
);
