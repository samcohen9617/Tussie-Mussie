import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb, X } from "lucide-react";

interface TutorialOverlayProps {
  open: boolean;
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: "Choose Your Card",
    description:
      "You've drawn two cards. You must offer one face-up to your opponent and keep one face-down. Click on a card to select it for your opponent.",
  },
  {
    title: "Confirm Your Selection",
    description:
      "After selecting a card, confirm your choice by clicking the 'Confirm Selection' button. The other card will automatically be added to your collection.",
  },
  {
    title: "Building Your Collection",
    description:
      "Cards in your collection provide points and special abilities. Pay attention to card types and their synergies to maximize your score.",
  },
  {
    title: "Game End",
    description:
      "The game ends when the deck is empty. Calculate your score based on card values and abilities. The player with the highest score wins!",
  },
];

export function TutorialOverlay({ open, step, onNext, onPrevious, onClose }: TutorialOverlayProps) {
  if (!open) return null;

  const currentStep = tutorialSteps[step];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute bottom-16 left-1/2 max-w-md bg-white rounded-lg shadow-xl p-5"
            initial={{ y: 50, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FF9505] flex items-center justify-center text-white">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{currentStep.title}</h3>
                <p className="text-neutral-600 text-sm mt-1">
                  {currentStep.description}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                disabled={step === 0}
                className={cn(
                  "px-3 py-1 text-neutral-600 hover:text-neutral-800",
                  step === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                onClick={onNext}
                size="sm"
                className="px-3 py-1 bg-[#FF9505] hover:bg-[#FFB04F] text-white rounded"
              >
                {step === tutorialSteps.length - 1 ? "Finish" : "Next"}{" "}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
