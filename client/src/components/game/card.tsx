import { Card as CardType } from "@shared/schema";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  isFlipped?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({ card, isFlipped = false, isSelected = false, onClick, className }: CardProps) {
  const [flipped, setFlipped] = useState(isFlipped);

  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  // Get color based on card type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Flower":
        return "bg-[#97BC62]";
      case "Foliage":
        return "bg-[#4A7B4B]";
      case "Wildflower":
        return "bg-[#FF9505]";
      case "Keepsake":
        return "bg-[#737373]";
      default:
        return "bg-neutral-500";
    }
  };

  return (
    <div 
      className={cn(
        "relative perspective-1000 cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      <motion.div 
        className={cn(
          "relative h-40 w-28 md:h-48 md:w-32 transform-style-3d transition-transform duration-500",
          isSelected && "ring-2 ring-accent"
        )}
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Card Front */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-md border border-neutral-300",
            isSelected && "border-[#FF9505] border-2"
          )}
        >
          <div className="bg-white h-full w-full flex flex-col p-2">
            <div className="flex justify-between">
              <span className={`text-xs px-1 rounded-sm text-neutral-800 font-semibold bg-[#B2CF86]`}>
                {card.value}
              </span>
              <span className={`text-xs px-1 rounded-sm text-neutral-800 font-semibold ${getTypeColor(card.type)}`}>
                {card.type}
              </span>
            </div>
            <div className="my-2 text-center">
              <h4 className="font-['Crimson_Text'] font-semibold">{card.name}</h4>
            </div>
            <div className="mt-auto text-xs text-neutral-600 text-center pb-1 px-1 italic">
              "{card.effect}"
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-md transform rotate-y-180",
            isSelected && "border-[#FF9505] border-2"
          )}
        >
          <div 
            className="h-full w-full flex items-center justify-center" 
            style={{
              backgroundColor: "#2C5F2D",
              backgroundImage: `linear-gradient(135deg, #97BC62 25%, transparent 25%, transparent 50%, #97BC62 50%, #97BC62 75%, transparent 75%, transparent)`,
              backgroundSize: "20px 20px"
            }}
          >
            <span className="text-white font-['Crimson_Text'] text-xl transform rotate-45">TM</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface CardCollectionProps {
  cards: CardType[];
  className?: string;
}

export function CardCollection({ cards, className }: CardCollectionProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2", className)}>
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="aspect-[2/3] rounded-md bg-white shadow overflow-hidden relative border border-neutral-300"
        >
          <div className="absolute inset-0 flex flex-col p-2">
            <div className="flex justify-between">
              <span className="text-xs px-1 bg-[#B2CF86] rounded-sm text-neutral-800 font-semibold">
                {card.value}
              </span>
              <span className={`text-xs px-1 rounded-sm text-neutral-800 font-semibold ${card.type === "Flower" ? "bg-[#97BC62]" : card.type === "Foliage" ? "bg-[#4A7B4B]" : card.type === "Wildflower" ? "bg-[#FF9505]" : "bg-[#737373]"}`}>
                {card.type}
              </span>
            </div>
            <div className="my-2 text-center">
              <h4 className="font-['Crimson_Text'] font-semibold">{card.name}</h4>
            </div>
            <div className="mt-auto text-xs text-neutral-600 text-center pb-1 px-1 italic">
              "{card.effect}"
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
