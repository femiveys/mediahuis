// @flow

import React from "react";
import { ApolloProvider } from "react-apollo";
import styled, { ThemeProvider } from "styled-components";

import client from "./graphql";
import { SelectPokemon, Squad } from "./components";
import { theme } from "./theme";

import type { TSquadMember } from "./types";

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 200px;
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

type TState = {
  squadMembers: TSquadMember[]
};

class App extends React.Component<{}, TState> {
  state = {
    squadMembers: []
  };
  render() {
    const { squadMembers } = this.state;
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Container>
            <Logo src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554" />
            <div>
              <SelectPokemon addSquadMember={this.addSquadMember} />
              <Squad members={squadMembers} />
            </div>
          </Container>
        </ThemeProvider>
      </ApolloProvider>
    );
  }

  addSquadMember = (member: TSquadMember) => {
    this.setState({ squadMembers: [...this.state.squadMembers, member] });
    // Some other cleanup can be done here
  };
}

export default App;
