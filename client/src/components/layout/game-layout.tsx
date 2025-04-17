import { ReactNode } from "react";
import { Game } from "@shared/schema";

interface GameLayoutProps {
  children: ReactNode;
  game: Game;
  onShowRules: () => void;
  onRestart: () => void;
}

export default function GameLayout({ children, game, onShowRules, onRestart }: GameLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 font-['Poppins']">
      {/* Game Header */}
      <header className="bg-primary p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-['Crimson_Text'] font-bold">
            Tussie Mussie
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={onShowRules}
              className="px-3 py-1 bg-[#97BC62] rounded hover:bg-[#B2CF86] transition flex items-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Rules
            </button>
            <button
              onClick={onRestart}
              className="px-3 py-1 bg-neutral-700 rounded hover:bg-neutral-600 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
              </svg>
              Restart
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-grow flex flex-col md:flex-row p-2 md:p-4 bg-neutral-200 bg-opacity-50">
        {children}
      </main>

      {/* Game Footer */}
      <footer className="bg-neutral-800 text-white py-3 px-4 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="mr-2">Deck:</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-5 bg-primary rounded-sm"></div>
              <span>{game.deckCards.length}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href="/"
              className="text-neutral-300 hover:text-white flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="text-xs">Home</span>
            </a>
            <button
              onClick={onShowRules}
              className="text-neutral-300 hover:text-white flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span className="text-xs">Help</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
