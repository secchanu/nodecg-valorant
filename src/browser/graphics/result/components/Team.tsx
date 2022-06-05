import { Component, For } from "solid-js";
import type { AgentDto, PlayerDto } from "../../../../@types/valorant";

import Player from "./Player";

import styles from "../css/Team.module.css";


type Props = {
  players: PlayerDto[];
  agents: AgentDto[];
}
const Team: Component<Props> = (props) => {
  const players = props.players;
  const agents = props.agents;

  const findAgent = (uuid: string) => agents.find(c => c.uuid === uuid);

  return (
    <div class={styles.grid}>
      <For each={players}>
        {(player, index) => <Player player={player} agent={findAgent(player.characterId)!} top={!index()} />}
      </For>
    </div>
  );
};

export default Team;
