import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import GameLayout from "@/components/layout/game-layout";
import OpponentArea from "@/components/game/opponent-area";
import PlayerArea from "@/components/game/player-area";
import GameControls from "@/components/game/game-controls";
import { TutorialOverlay } from "@/components/game/tutorial-overlay";
import { RulesModal } from "@/components/game/rules-modal";
import { Card } from "@shared/schema";

export default function Game() {
  const { id } = useParams();
  const gameId = parseInt(id);
  const { toast } = useToast();

  // UI state
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isFaceUp, setIsFaceUp] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Get game state
  const { data: game, isLoading, error } = useQuery({
    queryKey: [`/api/games/${gameId}`],
    refetchInterval: 2000,  // Refresh every 2 seconds to get AI moves
  });

  // Draw cards mutation
  const drawMutation = useMutation({
    mutationFn: async (count: number) => {
      const res = await apiRequest("POST", `/api/games/${gameId}/draw`, { count });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/games/${gameId}`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to draw cards",
        variant: "destructive",
      });
    }
  });

  // Offer card mutation
  const offerMutation = useMutation({
    mutationFn: async ({ cardId, isFaceUp }: { cardId: number, isFaceUp: boolean }) => {
      const res = await apiRequest("POST", `/api/games/${gameId}/offer`, { cardId, isFaceUp });
      return res.json();
    },
    onSuccess: (data) => {
      // Show result of AI decision
      toast({
        title: data.aiTakesCard ? "Opponent took your card" : "Opponent declined your card",
        description: data.aiTakesCard 
          ? `The AI took the ${data.offeredCard.name} and you kept the ${data.keptCard.name}.` 
          : `The AI declined the ${data.offeredCard.name} and you kept it.`,
      });

      // If game is over
      if (data.game.gameOver) {
        const winner = data.game.winner;
        setTimeout(() => {
          toast({
            title: "Game Over!",
            description: winner === "player" 
              ? "Congratulations! You won!" 
              : winner === "ai" 
              ? "You lost! Better luck next time." 
              : "It's a tie!",
            variant: winner === "player" ? "default" : "destructive",
            duration: 5000,
          });
        }, 1000);
      }

      queryClient.invalidateQueries({ queryKey: [`/api/games/${gameId}`] });
      
      // Reset selection state
      setSelectedCardId(null);
      setIsFaceUp(true);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to offer card",
        variant: "destructive",
      });
    }
  });

  // Draw initial cards if player has no cards
  useEffect(() => {
    if (game && game.currentTurn === "player" && game.playerHand.length === 0 && game.deckCards.length >= 2) {
      drawMutation.mutate(2);
    }
  }, [game]);

  const handleCardSelect = (card: Card, faceUp: boolean) => {
    setSelectedCardId(card.id);
    setIsFaceUp(faceUp);
  };

  const handleConfirmSelection = () => {
    if (selectedCardId === null) {
      toast({
        title: "No card selected",
        description: "Please select a card to offer first",
        variant: "destructive",
      });
      return;
    }

    offerMutation.mutate({ cardId: selectedCardId, isFaceUp });
  };

  const startTutorial = () => {
    setShowTutorial(true);
    setShowRules(false);
    setTutorialStep(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading game...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error loading game</p>
      </div>
    );
  }

  return (
    <>
      <GameLayout
        game={game}
        onShowRules={() => setShowRules(true)}
        onRestart={() => {
          if (confirm("Are you sure you want to restart the game?")) {
            queryClient.invalidateQueries({ queryKey: [`/api/games/${gameId}`] });
            window.location.href = "/";
          }
        }}
      >
        <OpponentArea 
          score={game.aiScore} 
          handCount={game.aiHand.length} 
          collection={game.aiCollection} 
        />
        
        <GameControls
          currentTurn={game.currentTurn}
          playerHand={game.playerHand}
          selectedCardId={selectedCardId}
          isFaceUp={isFaceUp}
          onCardSelect={handleCardSelect}
          onConfirmSelection={handleConfirmSelection}
          isSelectionDisabled={game.gameOver || game.currentTurn !== "player" || game.playerHand.length === 0}
          isOfferPending={offerMutation.isPending}
        />
        
        <PlayerArea 
          score={game.playerScore} 
          handCount={game.playerHand.length} 
          collection={game.playerCollection} 
        />
      </GameLayout>

      <RulesModal 
        open={showRules} 
        onClose={() => setShowRules(false)} 
        onStartTutorial={startTutorial} 
      />
      
      <TutorialOverlay 
        open={showTutorial}
        step={tutorialStep}
        onNext={() => {
          if (tutorialStep < 3) {
            setTutorialStep(tutorialStep + 1);
          } else {
            setShowTutorial(false);
          }
        }}
        onPrevious={() => {
          if (tutorialStep > 0) {
            setTutorialStep(tutorialStep - 1);
          }
        }}
        onClose={() => setShowTutorial(false)}
      />
    </>
  );
}
