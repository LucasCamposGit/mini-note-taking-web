import MiniNotesContext from "./MiniNotesContext";

interface MiniNotesProps {
  state: any;
  title: any;
  input: any;
  notes: any;
}

function MiniNotes({ state, title, input, notes }: MiniNotesProps) {
  return (
    <MiniNotesContext.Provider value={state}>
      {title}
      {input}
      {notes}
    </MiniNotesContext.Provider>
  );
}
