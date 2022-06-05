import { Component, createEffect, createSignal, Show } from "solid-js";
import { useContext } from "../../../replicant/valorant";
import type { MapDto, TeamDto } from "../../../../@types/valorant";

import MapCom from "./MapCom";
import Point from "./Point";

import styles from "../css/Header.module.css";

import { getMap } from "../script/api";


const Header: Component = () => {

  const [getResult, _] = useContext();

  const [getTeams, setTeams] = createSignal<TeamDto[]>();
  const [getMapData, setMapData] = createSignal<MapDto>();

  createEffect(() => {
    const result = getResult();
    if (!result) return;
    const teams = result.teams;
    teams.sort((a, b) => {
      return (a.won > b.won) ? -1 : 1;
    });
    setTeams(teams);
    (async () => {
      const map = await getMap(result.matchInfo.mapId);
      setMapData(map);
    })();
  });

  return (
    <Show when={getResult()}>
      <div class={styles.wrapper}>
        <Show when={getTeams()}>
          {(teams) => <Point team={teams[0]} />}
        </Show>
        <Show when={getMapData()}>
          {(map) => <MapCom map={map} />}
        </Show>
        <Show when={getTeams()}>
          {(teams) => <Point team={teams[1]} />}
        </Show>
      </div>
    </Show>
  );
};

export default Header;
