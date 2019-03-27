// @flow

import React from "react";
import { groupBy } from "lodash";
import styled from "styled-components";

import { List, Wrap } from ".";

import type { TMove } from "../types";

// Styled components
const TabItem = styled.li`
  color: ${props => props.theme.colors.yellow};
  cursor: pointer;
  text-decoration: ${props => (props.isActive ? "underline" : "none")};
  text-transform: uppercase;
  display: inline-block;
  margin-right: ${props => props.theme.whiteSpace.s};
`;

const Item = styled.li`
  color: ${props => props.theme.colors.blue};
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.m};
  display: block;
`;

// Components
const TabList = ({ names, activeTab, onClick }) => (
  <List>
    {names.map(name => (
      <TabItem isActive={activeTab === name} key={name} onClick={onClick(name)}>
        {name}
      </TabItem>
    ))}
  </List>
);

type TProps = {
  moves: TMove[],
  toggleMove: (move: TMove) => void
};

type TState = {
  activeTab: string
};

export class Moves extends React.Component<TProps, TState> {
  state = {
    activeTab: ""
  };

  componentDidMount = () => {
    const { moves } = this.props;
    const { activeTab } = this.state;

    const movesByLearnMethod = groupBy(moves, "learnMethod");
    const learnMethods = Object.keys(movesByLearnMethod);

    // Set initial tab
    if (!activeTab && learnMethods[0])
      this.setState({ activeTab: learnMethods[0] });
  };

  render = () => {
    const { moves, toggleMove } = this.props;
    const { activeTab } = this.state;

    const movesByLearnMethod = groupBy(moves, "learnMethod");
    const learnMethods = Object.keys(movesByLearnMethod);

    return (
      <Wrap>
        <TabList
          activeTab={activeTab}
          onClick={this.onClick}
          names={learnMethods}
        />
        <List>
          {activeTab &&
            movesByLearnMethod[activeTab].map(move => (
              <Item key={move.name} onClick={() => toggleMove(move)}>
                {move.name}
              </Item>
            ))}
        </List>
      </Wrap>
    );
  };

  onClick = (learnMethod: string) => () =>
    this.setState({ activeTab: learnMethod });
}
