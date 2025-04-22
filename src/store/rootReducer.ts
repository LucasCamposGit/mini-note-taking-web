import { MiniNotesPageAction } from "@/types/action";
import { notesReducer } from "./notes/notesReducer";
import { uiReducer } from "./ui/uiReducer";
import { initialMiniNotesPageState, MiniNotesPageState } from "@/types/state";

export const miniNotesPageReducer = (state: MiniNotesPageState = initialMiniNotesPageState, action: MiniNotesPageAction): MiniNotesPageState => {
  return {
    notes: notesReducer(state.notes, action as any),
    ui: uiReducer(state.ui, action as any),
  };
};