import { useEffect, useRef } from "react";
import useUI from "../context/UIContext";

export function useNoteVisibility() {
  const ui = useUI();
  const replyFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const editFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyNoteRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyEditFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const noteContentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const repliesSectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Effect to handle visibility of reply forms
  useEffect(() => {
    Object.values(replyFormRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "none";
    });

    if (ui.noteCard.replyingTo !== null) {
      const activeFormRef = replyFormRefs.current[ui.noteCard.replyingTo];
      if (activeFormRef) activeFormRef.style.display = "block";
    }
  }, [ui.noteCard.replyingTo]);

  // Effect to handle visibility of edit forms and note content
  useEffect(() => {
    Object.values(noteContentRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "block";
    });

    Object.values(editFormRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "none";
    });

    if (ui.noteCard.editingNoteId !== null) {
      const noteContentRef = noteContentRefs.current[ui.noteCard.editingNoteId];
      const editFormRef = editFormRefs.current[ui.noteCard.editingNoteId];

      if (noteContentRef) noteContentRef.style.display = "none";
      if (editFormRef) editFormRef.style.display = "block";
    }
  }, [ui.noteCard.editingNoteId]);

  // Effect to handle visibility of reply notes and their edit forms
  useEffect(() => {
    Object.values(replyNoteRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "block";
    });

    Object.values(replyEditFormRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "none";
    });

    if (ui.noteCard.editingNoteId !== null) {
      const replyNoteRef = replyNoteRefs.current[ui.noteCard.editingNoteId];
      const replyEditFormRef = replyEditFormRefs.current[ui.noteCard.editingNoteId];

      if (replyNoteRef) replyNoteRef.style.display = "none";
      if (replyEditFormRef) replyEditFormRef.style.display = "block";
    }
  }, [ui.noteCard.editingNoteId]);

  // Effect to handle visibility of replies sections based on expanded state
  useEffect(() => {
    Object.entries(repliesSectionRefs.current).forEach(([noteId, ref]) => {
      if (ref) {
        const expanded = ui.noteCard.expandedCards[Number(noteId)];
        ref.style.display = expanded ? "block" : "none";
      }
    });
  }, [ui.noteCard.expandedCards]);

  const setReplyFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    replyFormRefs.current[noteId] = el;
  };

  const setEditFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    editFormRefs.current[noteId] = el;
  };

  const setReplyNoteRef = (noteId: number) => (el: HTMLDivElement | null) => {
    replyNoteRefs.current[noteId] = el;
  };

  const setReplyEditFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    replyEditFormRefs.current[noteId] = el;
  };

  const setNoteContentRef = (noteId: number) => (el: HTMLDivElement | null) => {
    noteContentRefs.current[noteId] = el;
  };

  const setRepliesSectionRef = (noteId: number) => (el: HTMLDivElement | null) => {
    repliesSectionRefs.current[noteId] = el;
  };

  return {
    setReplyFormRef,
    setEditFormRef,
    setReplyNoteRef,
    setReplyEditFormRef,
    setNoteContentRef,
    setRepliesSectionRef
  };
}