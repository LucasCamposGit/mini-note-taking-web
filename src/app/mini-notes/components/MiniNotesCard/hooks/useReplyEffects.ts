import { useEffect } from "react";
import { NoteRefs } from "./useRefs";

/**
 * Props for the useReplyEffects hook.
 */
interface UseReplyEffectsProps {
  refs: NoteRefs;
  replyingTo: number | null;
  replyText: string;
}

/**
 * Custom hook to manage UI effects for reply forms.
 * It handles visibility, focus, and global key events for reply forms.
 *
 * @param {UseReplyEffectsProps} props - The props for the hook.
 */
export const useReplyEffects = ({ refs, replyingTo, replyText }: UseReplyEffectsProps) => {
  /**
   * Effect to handle reply form visibility when replyingTo changes.
   */
  useEffect(() => {
    // Hide all reply forms first
    Object.keys(refs.replyFormRefs || {}).forEach((noteIdStr) => {
      const noteId = parseInt(noteIdStr);
      const formRef = refs.replyFormRefs[noteId];
      const escInstructionRef = refs.escInstructionRefs[noteId];

      if (formRef) {
        if (replyingTo === noteId) {
          // Show this form
          formRef.style.display = 'block';
          // Add a short delay to ensure display change is processed before setting opacity
          setTimeout(() => {
            if (formRef) formRef.style.opacity = '1';
          }, 10);

          // Show ESC instruction
          if (escInstructionRef) {
            escInstructionRef.style.opacity = '1';
          }

          // Focus the textarea
          const inputRef = refs.replyInputRefs[noteId];
          if (inputRef) {
            setTimeout(() => {
              inputRef.focus();
            }, 50);
          }
        } else {
          // Hide other forms
          formRef.style.opacity = '0';
          // Add a short delay to ensure opacity transition completes before hiding
          setTimeout(() => {
            if (formRef) formRef.style.display = 'none';
          }, 300); // Match transition duration

          // Hide ESC instruction
          if (escInstructionRef) {
            escInstructionRef.style.opacity = '0';
          }
        }
      }
    });
  }, [replyingTo, refs]);

  /**
   * Effect to update textarea value when replyText changes.
   */
  useEffect(() => {
    if (replyingTo !== null) {
      const inputRef = refs.replyInputRefs[replyingTo];
      if (inputRef) {
        inputRef.value = replyText;
      }
    }
  }, [replyText, replyingTo, refs]);

  /**
   * Effect to add a global escape key handler for better UX.
   */
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && replyingTo !== null) {
        // Just make sure to hide the form properly
        const formRef = refs.replyFormRefs[replyingTo];
        if (formRef) {
          formRef.style.opacity = '0';
          setTimeout(() => {
            if (formRef) formRef.style.display = 'none';
          }, 300);
        }
        // The actual state update will be handled by the component
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [replyingTo, refs]);
}; 