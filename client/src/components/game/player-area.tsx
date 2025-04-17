import { Card } from "@shared/schema";
import { CardCollection } from "@/components/game/card";

interface PlayerAreaProps {
  score: number;
  handCount: number;
  collection: Card[];
}

export default function PlayerArea({ score, handCount, collection }: PlayerAreaProps) {
  return (
    <div className="player-area md:w-1/2 p-2 md:p-4">
      <div className="bg-neutral-100 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FF9505] flex items-center justify-center text-white font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">You</h2>
            <span className="text-sm text-neutral-600">Score: {score}</span>
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-sm text-neutral-600 mr-2">Hand: {handCount}</span>
            <div className="relative w-6 h-8 bg-primary rounded-sm"></div>
          </div>
        </div>

        {/* Player's Collection */}
        <div className="collection-area">
          <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
            Your Collection
          </h3>
          {collection.length > 0 ? (
            <CardCollection cards={collection} />
          ) : (
            <div className="text-center py-8 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-neutral-500">No cards in your collection yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
