import { createSignal, createContext, useContext as useCon } from "solid-js";
import { MatchDto } from "../../@types/valorant";

const Context = createContext(createSignal<MatchDto>());

export function useContext() { return useCon(Context) };
