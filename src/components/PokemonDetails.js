// @flow

import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

import { Row, Stats, SelectedMoves, Moves, Wrap } from ".";

import type { TMove, TSquadMember, TPokemon } from "../types";

const Title = styled.div`
  font-size: ${props => props.theme.fontSize.l};
  color: ${props => props.theme.colors.blue};
  text-transform: uppercase;
`;

const Button = styled.div`
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.m};
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.whiteSpace.s}
    ${props => props.theme.whiteSpace.m};
  text-transform: uppercase;
  text-align: center;
`;

const GET_POKEMON_DETAIL = gql`
  query Pokemon($name: String!) {
    Pokemon(name: $name) {
      id
      name
      image
      types {
        name
      }
      abilities {
        name
      }
      moves {
        name
        type
        learnMethod
      }
      stats {
        name
        value
      }
    }
  }
`;

type TProps = {
  name: string,
  addSquadMember: (member: TSquadMember) => void
};

type TState = {
  selectedMoves: TMove[]
};

export class PokemonDetails extends React.Component<TProps, TState> {
  state = {
    selectedMoves: [],
    sqad: []
  };
  render = () => (
    <Query query={GET_POKEMON_DETAIL} variables={{ name: this.props.name }}>
      {({ loading, error, data }) => {
        const pokemon = data.Pokemon;
        if (!pokemon) return null;

        return (
          <div>
            <Row>
              <Wrap>
                <img alt={pokemon.name} src={pokemon.image} />
                <Title>{pokemon.name}</Title>
                <Button onClick={this.save(pokemon)}>Save Pokemon</Button>
              </Wrap>
              <div>
                <Stats stats={pokemon.stats} />
                <SelectedMoves moves={this.state.selectedMoves} />
              </div>
              <div>
                <Moves moves={pokemon.moves} toggleMove={this.toggleMove} />
              </div>
            </Row>
          </div>
        );
      }}
    </Query>
  );

  toggleMove = (move: TMove) => {
    const { selectedMoves } = this.state;

    const exists =
      selectedMoves.findIndex(
        selectedMove => selectedMove.name === move.name
      ) !== -1;

    if (exists) {
      this.setState({
        selectedMoves: selectedMoves.filter(
          selectedMove => selectedMove.name !== move.name
        )
      });
    } else {
      if (selectedMoves.length === 4) {
        console.warn("Max moves is 4");
      } else {
        this.setState({
          selectedMoves: [...selectedMoves, move]
        });
      }
    }
  };

  save = (pokemon: TPokemon) => () => {
    this.props.addSquadMember({ pokemon, moves: this.state.selectedMoves });
    this.setState({ selectedMoves: [] });
  };
}
