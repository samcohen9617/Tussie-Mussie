import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the game
  
  // Create a new game
  app.post("/api/games", async (req, res) => {
    try {
      const game = await storage.createGame();
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to create game" });
    }
  });

  // Get a game by ID
  app.get("/api/games/:id", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      if (isNaN(gameId)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }
      
      const game = await storage.getGame(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game" });
    }
  });

  // Draw cards from deck
  app.post("/api/games/:id/draw", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      if (isNaN(gameId)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }
      
      const count = z.number().min(1).max(2).parse(req.body.count || 2);
      
      const game = await storage.getGame(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      if (game.deckCards.length < count) {
        return res.status(400).json({ message: "Not enough cards in deck" });
      }
      
      // Draw cards from the deck
      const drawnCards = game.deckCards.slice(0, count);
      const remainingDeck = game.deckCards.slice(count);
      
      // Update the game state
      const updatedGame = await storage.updateGame(gameId, {
        deckCards: remainingDeck,
        playerHand: [...game.playerHand, ...drawnCards]
      });
      
      res.json({
        drawnCards,
        game: updatedGame
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to draw cards" });
    }
  });

  // Player selects a card to offer to opponent
  app.post("/api/games/:id/offer", async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      if (isNaN(gameId)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }
      
      const { cardId, isFaceUp } = req.body;
      if (!cardId) {
        return res.status(400).json({ message: "Card ID is required" });
      }
      
      const game = await storage.getGame(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      // Find the card in player's hand
      const cardIndex = game.playerHand.findIndex(card => card.id === cardId);
      if (cardIndex === -1) {
        return res.status(400).json({ message: "Card not found in player's hand" });
      }
      
      // Implement AI decision logic
      // For simplicity, AI takes offered card 70% of the time if face-up, 30% if face-down
      const aiTakesCard = Math.random() < (isFaceUp ? 0.7 : 0.3);
      
      const offeredCard = game.playerHand[cardIndex];
      const keptCard = game.playerHand.find(card => card.id !== cardId);
      
      if (!keptCard) {
        return res.status(400).json({ message: "No card to keep" });
      }
      
      // Update collections and clear player's hand
      let playerCollection = [...game.playerCollection];
      let aiCollection = [...game.aiCollection];
      
      if (aiTakesCard) {
        aiCollection = [...aiCollection, offeredCard];
        playerCollection = [...playerCollection, keptCard];
      } else {
        playerCollection = [...playerCollection, offeredCard];
        aiCollection = [...aiCollection, keptCard];
      }
      
      // Update game state
      const updatedGame = await storage.updateGame(gameId, {
        playerCollection,
        aiCollection,
        playerHand: [],
        currentTurn: "ai"
      });
      
      // If this was the last round, calculate final scores and set winner
      if (updatedGame && updatedGame.deckCards.length === 0) {
        // Simple scoring - just add card values
        const playerScore = playerCollection.reduce((sum, card) => sum + card.value, 0);
        const aiScore = aiCollection.reduce((sum, card) => sum + card.value, 0);
        
        const gameOver = true;
        const winner = playerScore > aiScore ? "player" : playerScore < aiScore ? "ai" : "tie";
        
        const finalGame = await storage.updateGame(gameId, {
          playerScore,
          aiScore,
          gameOver,
          winner
        });
        
        return res.json({
          aiTakesCard,
          offeredCard,
          keptCard,
          game: finalGame
        });
      }
      
      // Process AI turn
      if (updatedGame && updatedGame.deckCards.length >= 2) {
        // AI draws 2 cards
        const aiDrawnCards = updatedGame.deckCards.slice(0, 2);
        const newDeck = updatedGame.deckCards.slice(2);
        
        // AI offers a card to player (random decision for now)
        const aiOffers = Math.random() < 0.5 ? 0 : 1;
        const aiOfferedCard = aiDrawnCards[aiOffers];
        const aiKeptCard = aiDrawnCards[1 - aiOffers];
        
        // Player randomly takes or rejects AI's offer
        const playerTakesCard = Math.random() < 0.6;
        
        if (playerTakesCard) {
          playerCollection.push(aiOfferedCard);
          aiCollection.push(aiKeptCard);
        } else {
          playerCollection.push(aiKeptCard);
          aiCollection.push(aiOfferedCard);
        }
        
        // Update game state after AI's turn
        const finalUpdatedGame = await storage.updateGame(gameId, {
          playerCollection,
          aiCollection,
          deckCards: newDeck,
          currentTurn: "player"
        });
        
        return res.json({
          aiTakesCard,
          offeredCard,
          keptCard,
          aiOfferedCard,
          aiKeptCard,
          playerTakesCard,
          game: finalUpdatedGame
        });
      }
      
      res.json({
        aiTakesCard,
        offeredCard,
        keptCard,
        game: updatedGame
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process offer" });
    }
  });

  // Get all cards (for reference)
  app.get("/api/cards", async (req, res) => {
    try {
      const cards = await storage.getAllCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: "Failed to get cards" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
