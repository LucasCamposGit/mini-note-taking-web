import { useRef, useCallback } from "react";

export interface NoteRefs {
  repliesRefs: { [key: number]: HTMLDivElement | null };
  buttonTextRefs: { [key: number]: HTMLSpanElement | null };
  replyFormRefs: { [key: number]: HTMLDivElement | null };
  replyInputRefs: { [key: number]: HTMLTextAreaElement | null };
  replyButtonRefs: { [key: number]: HTMLButtonElement | null };
  replyStatusRefs: { [key: number]: HTMLDivElement | null };
  escInstructionRefs: { [key: number]: HTMLDivElement | null };
}

export const useRefs = () => {
  const repliesRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const buttonTextRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
  const replyFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyInputRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>({});
  const replyButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const replyStatusRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const escInstructionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const setRepliesRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    repliesRefs.current[noteId] = element;
  }, []);

  const setButtonTextRef = useCallback((noteId: number) => (element: HTMLSpanElement | null) => {
    buttonTextRefs.current[noteId] = element;
  }, []);

  const setReplyFormRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    replyFormRefs.current[noteId] = element;
  }, []);

  const setReplyInputRef = useCallback((noteId: number) => (element: HTMLTextAreaElement | null) => {
    replyInputRefs.current[noteId] = element;
  }, []);

  const setReplyButtonRef = useCallback((noteId: number) => (element: HTMLButtonElement | null) => {
    replyButtonRefs.current[noteId] = element;
  }, []);

  const setReplyStatusRef = useCallback((noteId: number) => (element: HTMLDivElement | null) => {
    replyStatusRefs.current[noteId] = element;
  }, []);

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