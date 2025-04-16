import { useRef, useCallback } from "react";

/**
 * Interface for managing references to DOM elements related to notes.
 */
export interface NoteRefs {
  repliesRefs: { [key: number]: HTMLDivElement | null };
  buttonTextRefs: { [key: number]: HTMLSpanElement | null };
  replyFormRefs: { [key: number]: HTMLDivElement | null };
  replyInputRefs: { [key: number]: HTMLTextAreaElement | null };
  replyButtonRefs: { [key: number]: HTMLButtonElement | null };
  replyStatusRefs: { [key: number]: HTMLDivElement | null };
  escInstructionRefs: { [key: number]: HTMLDivElement | null };
}

/**
 * Custom hook to create and manage refs for note-related DOM elements.
 * It provides setters for various refs used in the application.
 *
 * @returns {Object} An object containing refs and their setters.
 */
export const useRefs = () => {
  const repliesRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const buttonTextRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
  const replyFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyInputRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>({});
  const replyButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const replyStatusRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const escInstructionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  /**
   * Sets the ref for the replies container of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setRepliesRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    repliesRefs.current[noteId] = element;
  }, []);

  /**
   * Sets the ref for the button text of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setButtonTextRef = useCallback((noteId: number) => (element: HTMLSpanElement | null) => {
    buttonTextRefs.current[noteId] = element;
  }, []);

  /**
   * Sets the ref for the reply form of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setReplyFormRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    replyFormRefs.current[noteId] = element;
  }, []);

  /**
   * Sets the ref for the reply input of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setReplyInputRef = useCallback((noteId: number) => (element: HTMLTextAreaElement | null) => {
    replyInputRefs.current[noteId] = element;
  }, []);

  /**
   * Sets the ref for the reply button of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setReplyButtonRef = useCallback((noteId: number) => (element: HTMLButtonElement | null) => {
    replyButtonRefs.current[noteId] = element;
  }, []);

  /**
   * Sets the ref for the reply status of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setReplyStatusRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    replyStatusRefs.current[noteId] = element;
  }, []);

  /**
   * Sets the ref for the escape instruction of a note.
   *
   * @param {number} noteId - The ID of the note.
   * @returns {Function} A function to set the ref.
   */
  const setEscInstructionRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    escInstructionRefs.current[noteId] = element;
  }, []);

  return {
    refs: {
      repliesRefs: repliesRefs.current,
      buttonTextRefs: buttonTextRefs.current,
      replyFormRefs: replyFormRefs.current,
      replyInputRefs: replyInputRefs.current,
      replyButtonRefs: replyButtonRefs.current,
      replyStatusRefs: replyStatusRefs.current,
      escInstructionRefs: escInstructionRefs.current,
    },
    setters: {
      setRepliesRef,
      setButtonTextRef,
      setReplyFormRef,
      setReplyInputRef,
      setReplyButtonRef,
      setReplyStatusRef,
      setEscInstructionRef,
    },
  };
}; 