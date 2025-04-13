import React, { useEffect } from "react";
import { useMiniNotesCard } from "./MiniNotesCardContext";
import { useRefs } from "./hooks/useRefs";
import { useReplyEffects } from "./hooks/useReplyEffects";
import { CARD_ACTION } from "./MiniNotesCardReducer";

interface MiniNotesCardProviderComponentProps {
  children: React.ReactNode;
}

export const MiniNotesCardProviderComponent: React.FC<MiniNotesCardProviderComponentProps> = ({ 
  children 
}) => {
  const { replyingTo, replyText, cardDispatch } = useMiniNotesCard();
  const { refs } = useRefs();
  
  // Apply all UI effects
  useReplyEffects({ refs, replyingTo, replyText });
  
  // Add global escape key handler to ensure we can always cancel
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
  
  // Clean up refs when component changes
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

  return <>{children}</>;
}; 