import { useEffect, useRef } from "react";
import { useMiniNotesPageState } from "../context";

export function useNoteVisibility() {
  const state = useMiniNotesPageState();
  const replyFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const editFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyNoteRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyEditFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const noteContentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Effect to handle visibility of reply forms
  useEffect(() => {
    Object.values(replyFormRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "none";
    });

    if (state.ui.noteCard.replyingTo !== null) {
      const activeFormRef = replyFormRefs.current[state.ui.noteCard.replyingTo];
      if (activeFormRef) activeFormRef.style.display = "block";
    }
  }, [state.ui.noteCard.replyingTo]);

  // Effect to handle visibility of edit forms and note content
  useEffect(() => {
    Object.values(noteContentRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "block";
    });

    Object.values(editFormRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "none";
    });

    if (state.ui.noteCard.editingNoteId !== null) {
      const noteContentRef = noteContentRefs.current[state.ui.noteCard.editingNoteId];
      const editFormRef = editFormRefs.current[state.ui.noteCard.editingNoteId];

      if (noteContentRef) noteContentRef.style.display = "none";
      if (editFormRef) editFormRef.style.display = "block";
    }
  }, [state.ui.noteCard.editingNoteId]);

  // Effect to handle visibility of reply notes and their edit forms
  useEffect(() => {
    Object.values(replyNoteRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "block";
    });

    Object.values(replyEditFormRefs.current).forEach((ref) => {
      if (ref) ref.style.display = "none";
    });

    if (state.ui.noteCard.editingNoteId !== null) {
      const replyNoteRef = replyNoteRefs.current[state.ui.noteCard.editingNoteId];
      const replyEditFormRef = replyEditFormRefs.current[state.ui.noteCard.editingNoteId];

      if (replyNoteRef) replyNoteRef.style.display = "none";
      if (replyEditFormRef) replyEditFormRef.style.display = "block";
    }
  }, [state.ui.noteCard.editingNoteId]);

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

  return {
    setReplyFormRef,
    setEditFormRef,
    setReplyNoteRef,
    setReplyEditFormRef,
    setNoteContentRef
  };
}