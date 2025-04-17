import { Card as CardType } from "@shared/schema";
import { Card } from "@/components/game/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GameControlsProps {
  currentTurn: string;
  playerHand: CardType[];
  selectedCardId: number | null;
  isFaceUp: boolean;
  onCardSelect: (card: CardType, isFaceUp: boolean) => void;
  onConfirmSelection: () => void;
  isSelectionDisabled: boolean;
  isOfferPending: boolean;
}

export default function GameControls({
  currentTurn,
  playerHand,
  selectedCardId,
  isFaceUp,
  onCardSelect,
  onConfirmSelection,
  isSelectionDisabled,
  isOfferPending
}: GameControlsProps) {
  // Helper to check if a card is selected
  const isCardSelected = (card: CardType) => card.id === selectedCardId;

  return (
    <div className="game-controls w-full md:w-auto flex-grow flex flex-col items-center justify-center p-2 md:p-4">
      {/* Turn Indicator */}
      <motion.div 
        className={`turn-indicator mb-4 text-center ${currentTurn === "player" ? "bg-primary" : "bg-[#525252]"} text-white py-2 px-4 rounded-full shadow-md`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-semibold">
          {currentTurn === "player" ? "Your Turn" : "Opponent's Turn"}
        </span>
      </motion.div>

      {/* Card Selection Area */}
      <div className="card-selection-area w-full max-w-xl bg-neutral-100 rounded-lg shadow-lg p-4 mb-6">
        <h3 className="text-center font-['Crimson_Text'] text-lg mb-4">
          {isSelectionDisabled 
            ? currentTurn === "ai" 
              ? "Waiting for opponent..." 
              : "Game Over"
            : "Choose a Card"
          }
        </h3>

        {playerHand.length > 0 ? (
          <>
            {/* Card Options */}
            <div className="flex justify-center space-x-6 mb-4">
              {playerHand.map((card) => (
                <div key={card.id} className="flex flex-col items-center">
                  <Card
                    card={card}
                    isFlipped={false}
                    isSelected={isCardSelected(card) && isFaceUp}
                    onClick={() => !isSelectionDisabled && onCardSelect(card, true)}
                  />
                  <div className="text-center mt-2">
                    <span className="text-sm font-medium">Offer Face-up</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-6 mb-4">
              {playerHand.map((card) => (
                <div key={`${card.id}-down`} className="flex flex-col items-center">
                  <Card
                    card={card}
                    isFlipped={true}
                    isSelected={isCardSelected(card) && !isFaceUp}
                    onClick={() => !isSelectionDisabled && onCardSelect(card, false)}
                  />
                  <div className="text-center mt-2">
                    <span className="text-sm font-medium">Keep Face-down</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded shadow"
                onClick={onConfirmSelection}
                disabled={isSelectionDisabled || selectedCardId === null || isOfferPending}
              >
                {isOfferPending ? "Processing..." : "Confirm Selection"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-neutral-600">
            {currentTurn === "player" && !isSelectionDisabled
              ? "Drawing cards..."
              : currentTurn === "ai"
              ? "Waiting for opponent to make a move"
              : "Game is over!"}
          </div>
        )}
      </div>
    </div>
  );
}
