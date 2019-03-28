// @flow

import React from "react";
import styled from "styled-components";
import { fill } from "lodash";

import { List } from ".";

import type { TSquadMember } from "../types";

// Styled components
const SectionTitle = styled.label`
  display: block;
  color: ${props => props.theme.colors.yellow};
  font-size: ${props => props.theme.fontSize.l};
  text-transform: uppercase;
  text-align: center;
`;

const Sixth = styled.div`
  width: ${100 / 6}%;
  display: inline-block;
  height: 270px;
`;

const SquadItems = styled.div`
  display: flex;
`;

const SquadItem = styled.div`
  align-items: center;
  background-color: ${props =>
    props.type === "EMPTY"
      ? props.theme.colors.grey
      : props.theme.backgrounds[props.type]};
  color: ${props => props.theme.colors.blue};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: ${props =>
    props.type === "EMPTY" ? "center" : "flex-start"};
  margin-right: ${props => props.theme.whiteSpace.m};
`;

const Item = styled.li`
  color: ${props => props.theme.colors.blue};
  font-size: ${props => props.theme.fontSize.m};
  display: block;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  padding: ${props => props.theme.whiteSpace.s}
    ${props => props.theme.whiteSpace.m};
  margin-bottom: ${props => props.theme.whiteSpace.s};
`;

const Name = styled.div`
  font-size: ${props => props.theme.fontSize.m};
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`;

export const Squad = ({ members }: { members: TSquadMember[] }) => {
  const empties = new Array(6 - members.length);
  fill(empties, undefined);
  return (
    members.length > 0 && (
      <div>
        <SectionTitle>Selected squad</SectionTitle>
        <SquadItems>
          {[...members, ...empties].map((member, index) =>
            member ? (
              <Sixth key={`squad-${index}`}>
                <SquadItem type={member.pokemon.types[0].name}>
                  <img alt={member.pokemon.name} src={member.pokemon.image} />
                  <Name>{member.pokemon.name}</Name>
                  <List>
                    {member.moves.map(move => (
                      <Item key={move.name}>{move.name}</Item>
                    ))}
                  </List>
                </SquadItem>
              </Sixth>
            ) : (
              <Sixth key={`squad-${index}`}>
                <SquadItem type="EMPTY">empty</SquadItem>
              </Sixth>
            )
          )}
        </SquadItems>
      </div>
    )
  );
};
