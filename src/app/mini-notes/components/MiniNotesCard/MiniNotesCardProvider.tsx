import React, { useEffect } from "react";
import { useMiniNotesCard } from "./MiniNotesCardContext";
import { useRefs } from "./hooks/useRefs";
import { useReplyEffects } from "./hooks/useReplyEffects";
import { CARD_ACTION } from "./MiniNotesCardReducer";

/**
 * Props for the MiniNotesCardProviderComponent.
 */
interface MiniNotesCardProviderComponentProps {
  children: React.ReactNode;
}

/**
 * Component for providing context and managing effects for MiniNotesCard.
 * It handles global key events and cleans up refs.
 *
 * @param {MiniNotesCardProviderComponentProps} props - The props for the component.
 * @returns {JSX.Element} The provider component with children.
 */
export const MiniNotesCardProviderComponent: React.FC<MiniNotesCardProviderComponentProps> = ({ 
  children 
}) => {
  const { replyingTo, replyText, cardDispatch } = useMiniNotesCard();
  const { refs } = useRefs();
  
  // Apply all UI effects
  useReplyEffects({ refs, replyingTo, replyText });
  
  /**
   * Effect to add a global escape key handler.
   */
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && replyingTo !== null) {
        cardDispatch({
          type: CARD_ACTION.RESET_REPLY
        });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [replyingTo, cardDispatch]);
  
  /**
   * Effect to clean up refs when the component unmounts.
   */
  useEffect(() => {
    return () => {
      // This effectively cleans up all refs on unmount
      Object.keys(refs).forEach(key => {
        const refMap = refs[key as keyof typeof refs];
        if (refMap) {
          Object.keys(refMap).forEach(id => {
            // @ts-ignore - we know this is safe
            refMap[id] = null;
          });
        }
      });
    };
  }, [refs]);

  /**
   * Renders the provider component with its children.
   */
  return <>{children}</>;
}; 