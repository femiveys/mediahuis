// @flow

import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Query } from "react-apollo";
import Downshift from "downshift";

import { PokemonDetails, Row, Wrap, List } from ".";

import type { TSquadMember } from "../types";

// Styled components
const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.yellow};
  font-size: ${props => props.theme.fontSize.l};
  text-transform: uppercase;
`;

const Input = styled.input`
  border: ${props => `2px solid ${props.theme.colors.blue}`};
  display: block;
  font-size: ${props => props.theme.fontSize.m};
  padding: ${props => props.theme.whiteSpace.s};
  text-transform: uppercase;
`;

const Item = styled.li`
  background-color: ${props =>
    props.isSelected ? props.theme.colors.yellow : props.theme.colors.blue};
    border: 2px solid ${props =>
      props.isHighlighted ? props.theme.colors.yellow : "transparent"}
  border-radius: 5px;
  color: ${props =>
    props.isSelected ? props.theme.colors.blue : props.theme.colors.yellow};
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.m};
  padding: ${props => props.theme.whiteSpace.s}
    ${props => props.theme.whiteSpace.m};
  text-transform: uppercase;
  margin-bottom: ${props => props.theme.whiteSpace.s};
  display: block;
`;

const GET_POKEMONS = gql`
  {
    Pokemons(first: 151) {
      id
      name
    }
  }
`;

type TProps = {
  addSquadMember: (member: TSquadMember) => void
};

export const SelectPokemon = (props: TProps) => {
  return (
    <Query query={GET_POKEMONS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return "An error occurred.";
        const items = data.Pokemons;

        return (
          <div>
            <Downshift
              // onChange={selection => alert(`You selected ${selection.name}`)}
              itemToString={item => (item ? item.name : "")}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
              }) => (
                <div>
                  <Row>
                    <Wrap>
                      <Label {...getLabelProps()}>Select a Pokemon</Label>
                      <Input
                        {...getInputProps()}
                        placeholder="type to filter"
                      />
                      <List {...getMenuProps()}>
                        {items
                          .filter(
                            item =>
                              !inputValue || item.name.includes(inputValue)
                          )
                          .map((item, index) => (
                            <Item
                              isSelected={selectedItem === item}
                              isHighlighted={highlightedIndex === index}
                              {...getItemProps({
                                key: item.id,
                                index,
                                item
                              })}
                            >
                              {item.name}
                            </Item>
                          ))}
                      </List>
                    </Wrap>
                    {selectedItem && (
                      <PokemonDetails
                        name={selectedItem.name}
                        addSquadMember={props.addSquadMember}
                      />
                    )}
                  </Row>
                </div>
              )}
            </Downshift>
          </div>
        );
      }}
    </Query>
  );
};
