// /app/reducers/rootReducer.ts

import {
    cardReducer,
    initialCardState,
  } from "@/reducers/cardReducer";
  
  import {
    miniNotesReducer,
    initialMiniNotesState
  } from "@/reducers/miniNotesReducer";
  
import { combineReducers } from "./combineReducers";
import { CardState, MiniNotesState } from "@/types/state";
import { CardAction, MiniNotesAction, CARD_ACTION, MINI_NOTES_ACTION } from "@/types/action";
  
  export interface RootState {
    card: CardState;
    miniNotes: MiniNotesState;
  }
  
  export const initialRootState: RootState = {
    card: initialCardState,
    miniNotes: initialMiniNotesState,
  };
  
  export type RootAction =  MiniNotesAction | CardAction;
  
  // Wrapper reducers that handle type safety
  const cardReducerWrapper = (state: CardState, action: RootAction): CardState => {
    // Only process the action if it's a CardAction
    if ('type' in action && Object.values(CARD_ACTION).includes(action.type as any)) {
      return cardReducer(state, action as CardAction);
    }
    return state;
  };
  
  const miniNotesReducerWrapper = (state: MiniNotesState, action: RootAction): MiniNotesState => {
    // Only process the action if it's a MiniNotesAction
    if ('type' in action && Object.values(MINI_NOTES_ACTION).includes(action.type as any)) {
      return miniNotesReducer(state, action as MiniNotesAction);
    }
    return state;
  };
  
  export const rootReducer = combineReducers<RootState, RootAction>({
    card: cardReducerWrapper,
    miniNotes: miniNotesReducerWrapper,
  });
  