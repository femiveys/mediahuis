// @flow

export type TMove = {
  learnMethod: string,
  name: string,
  type: string
};

export type TStat = {
  name: string,
  value: string
};

export type TPokemon = {
  id: string,
  name: string,
  image: string,
  types: {
    name: string
  }[],
  abilities: {
    name: string
  }[],
  moves: TMove[],
  stats: TStat[]
};

export type TSquadMember = {
  pokemon: TPokemon,
  moves: TMove[]
};
