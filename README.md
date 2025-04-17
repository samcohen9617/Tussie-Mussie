# Tussie Mussie Card Game

A digital implementation of the Tussie Mussie card game with single-player gameplay against AI opponents.

## Game Overview

Tussie Mussie is a card drafting game where players build collections of Victorian-era flowers, each with its own meaning and game effect. Players take turns selecting cards to add to their collections, trying to maximize their score through strategic choices.

## Features

- Single-player gameplay against an AI opponent
- Card drafting and collection mechanics
- Victorian flower theme with card effects
- Score calculation based on card combinations
- Responsive design for desktop and mobile play

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express
- **State Management**: TanStack Query (React Query)
- **Routing**: wouter
- **Storage**: In-memory database (no persistence required)

## Development

### Prerequisites

- Node.js 18+ and npm

### Getting Started (Replit)

If you're using Replit, simply fork the project and run it. The application will start automatically.

### Local Development Setup

To develop locally with separate frontend and backend servers:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd tussie-mussie-game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.local.example .env.local
   ```

4. Start the development servers:
   ```
   # Option 1: Use the convenience script
   chmod +x run-local-dev.sh
   ./run-local-dev.sh
   
   # Option 2: Run in separate terminals
   # Terminal 1 (Backend API):
   npx tsx server/local-dev.ts
   
   # Terminal 2 (Frontend Vite):
   npx vite
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Environment Configuration

The application uses the following environment variables:

- `VITE_API_BASE_URL`: Base URL for API calls (empty for integrated servers, `http://localhost:5000` for separate servers)
- `VITE_GAME_REFRESH_INTERVAL`: Interval (ms) for refreshing game state (default: 2000)
- `VITE_ENABLE_TUTORIAL`: Enable tutorial overlay (default: true)
- `VITE_ENABLE_ANIMATIONS`: Enable animations (default: true)
- `VITE_ENABLE_DEBUG`: Enable debug features (default: false in production)

### Project Structure

- `/client`: Frontend React application
  - `/src/components`: UI components
  - `/src/pages`: Route pages
  - `/src/lib`: Utility functions and game logic
  - `/src/hooks`: Custom React hooks
- `/server`: Backend Express server
  - `index.ts`: Main server entry point
  - `routes.ts`: API route definitions
  - `storage.ts`: In-memory database
  - `local-dev.ts`: Local development server with CORS
- `/shared`: Shared types and schemas
  - `schema.ts`: Data models used by both client and server

## Game Rules

1. Each player starts with no cards in their collection.
2. On your turn, draw two cards from the deck.
3. Choose one card to offer face-up to your opponent and keep one face-down.
4. Your opponent must choose one of these cards to add to their collection.
5. You add the remaining card to your collection.
6. Play passes to your opponent who follows the same process.
7. The game ends when the deck is empty.
8. Calculate scores based on the point values and special abilities of the cards in your collection.
9. The player with the highest score wins!

## License

[Add license information here]