import useFetch from "@/hooks/useFetch";
import React, { useEffect, useReducer, useRef } from "react";

enum ACTION {
  SUBMIT_NOTE = "submit_note",
  TYPING = "typing",
}

type DispatchAction = {
  type: ACTION;
  payload: any;
};

interface State {
  value: string;
}

function reducer(state: State, action: DispatchAction): State {
  switch (action.type) {
    case ACTION.TYPING:
      return {
        ...state,
        value: action.payload,
      };

    case ACTION.SUBMIT_NOTE:
      return {
        ...state,
        value: "",
      };

    default:
      return state;
  }
}

const baseState: State = {
  value: "",
};

export default function MiniNotesInput() {
  const [state, dispatch] = useReducer(reducer, baseState);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const { fetchData } = useFetch();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: ACTION.TYPING, payload: event.target.value });
  }

  async function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();
    if (!state.value.trim()) return;

    try {
      await fetchData("/api/notes", "POST", { text: state.value });
      dispatch({ type: ACTION.SUBMIT_NOTE, payload: "" });
    } catch (err) {
      console.error("Error posting note:", err);
    } finally {
    }
  }

  useEffect(() => {
    if (placeholderRef.current) {
      if (state.value.length > 0) {
        placeholderRef.current.classList.add("hidden");
      } else {
        placeholderRef.current.classList.remove("hidden");
      }
    }
  }, [state.value]);

  return (
    <div className="p-4 rounded-xl note-card mb-4">
      <div className="flex">
        <div className="flex-grow">
          <div className="relative">
            <textarea
              className="w-full p-2 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer"
              onChange={handleChange}
              value={state.value}
            ></textarea>
            <div
              ref={placeholderRef}
              className="absolute top-2 left-2 pointer-events-none text-sm peer-focus:hidden"
            >
              <span className="text-zinc-400">Write your deepest thought</span>{" "}
              <span className="text-zinc-500">— begin with a whisper</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-400">
              {state.value.length} / 280
            </div>
            <button
              onClick={handleSubmit}
              className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50"
            >
              Take note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
