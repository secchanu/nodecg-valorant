import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { useContext } from "../../../replicant/valorant";
import type { AgentDto, PlayerDto } from "../../../../@types/valorant";

import Team from "./Team";

import styles from "../css/Teams.module.css";

import { sortPlayers } from "../script/calc";
import { getAgents } from "../script/api";
import Player from "./Player";


const Teams: Component = () => {

  const [getResult, _] = useContext();

  const [getPlayers, setPlayers] = createSignal<PlayerDto[][]>();
  const [getAgentsData, setAgentsData] = createSignal<AgentDto[]>();

  createEffect(() => {
    const result = getResult();
    if (!result) return;
    const sorted = sortPlayers(result);
    setPlayers(sorted);
    (async () => {
      const agents = await getAgents();
      setAgentsData(agents);
    })();
  });

  return (
    <Show when={getResult()}>
      <div class={styles.flex}>
        <Show when={getPlayers() && getAgentsData()}>
          {(agentsData) => {
            return (
              <For each={getPlayers()}>
                {(players) => <Team players={players} agents={agentsData} />}
              </For>
            )
          }}
        </Show>
      </div>
    </Show>
  );
};

export default Teams;
