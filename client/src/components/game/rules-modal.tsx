import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
  onStartTutorial?: () => void;
}

export function RulesModal({ open, onClose, onStartTutorial }: RulesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-neutral-200 py-4 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-['Crimson_Text'] font-semibold">
              Tussie Mussie Rules
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-4">
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Game Overview</h3>
            <p className="text-neutral-700">
              Tussie Mussie is a card drafting game where players build
              collections of Victorian-era flowers, each with its own meaning and
              game effect.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">How to Play</h3>
            <ol className="list-decimal list-inside space-y-2 text-neutral-700">
              <li>On your turn, draw two cards from the deck.</li>
              <li>Look at both cards secretly.</li>
              <li>
                Offer one card face-up to your opponent and keep the other
                face-down.
              </li>
              <li>
                Your opponent must choose one of these cards to add to their
                collection.
              </li>
              <li>You add the remaining card to your collection.</li>
              <li>Play passes to your opponent.</li>
            </ol>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Card Types</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li>
                <span className="font-medium">Flowers</span> - Typically trigger
                immediate effects
              </li>
              <li>
                <span className="font-medium">Foliage</span> - Usually provide
                end-game scoring bonuses
              </li>
              <li>
                <span className="font-medium">Wildflowers</span> - Versatile
                cards with special abilities
              </li>
              <li>
                <span className="font-medium">Keepsakes</span> - Special cards
                with unique effects
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Game End</h3>
            <p className="text-neutral-700">
              The game ends when the deck is empty. Calculate scores based on the
              point values and special abilities of the cards in your collection.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Winning</h3>
            <p className="text-neutral-700">
              The player with the highest total score wins the game!
            </p>
          </div>
        </div>

        {onStartTutorial && (
          <DialogFooter className="border-t border-neutral-200 px-6 py-4 bg-neutral-50">
            <Button
              onClick={onStartTutorial}
              className="px-4 py-2 bg-[#FF9505] hover:bg-[#FF9505]/90 text-white"
            >
              Start Tutorial
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
