import { Card } from "@shared/schema";
import { CardCollection } from "@/components/game/card";

interface OpponentAreaProps {
  score: number;
  handCount: number;
  collection: Card[];
}

export default function OpponentArea({ score, handCount, collection }: OpponentAreaProps) {
  return (
    <div className="opponent-area md:w-1/2 p-2 md:p-4">
      <div className="bg-neutral-100 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">Opponent</h2>
            <span className="text-sm text-neutral-600">Score: {score}</span>
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-sm text-neutral-600 mr-2">Hand: {handCount}</span>
            <div className="relative w-6 h-8 bg-primary rounded-sm"></div>
          </div>
        </div>

        {/* Opponent's Collection */}
        <div className="collection-area">
          <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
            Collection
          </h3>
          {collection.length > 0 ? (
            <CardCollection cards={collection} />
          ) : (
            <div className="text-center py-8 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-neutral-500">No cards in opponent's collection yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
