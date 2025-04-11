import MiniNotesContext from "./MiniNotesContext";


interface MiniNotesProps {
    state: any; 
}

function MiniNotes({ state }: MiniNotesProps) {
    return (
        <MiniNotesContext.Provider value={state}>
            
        </MiniNotesContext.Provider>
    );
}