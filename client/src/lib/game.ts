import { Card, CardType } from "@shared/schema";

// Helper functions for game logic

// Calculate the total score of a collection
export function calculateScore(collection: Card[]): number {
  // Basic score is sum of card values
  let score = collection.reduce((sum, card) => sum + card.value, 0);
  
  // Process card effects - simplified for basic implementation
  // In a real implementation, we'd need more complex rules
  
  // Count card types
  const flowers = collection.filter(card => card.type === CardType.FLOWER);
  const foliage = collection.filter(card => card.type === CardType.FOLIAGE);
  const wildflowers = collection.filter(card => card.type === CardType.WILDFLOWER);
  const keepsakes = collection.filter(card => card.type === CardType.KEEPSAKE);
  
  // Calculate unique types
  const uniqueTypes = new Set(collection.map(card => card.type)).size;
  
  // Add bonuses based on card effects
  collection.forEach(card => {
    if (card.name === "Fern" && flowers.length > 0) {
      // +1 for each flower
      score += flowers.length;
    } else if (card.name === "Ivy") {
      // +1 for each different type
      score += uniqueTypes;
    } else if (card.name === "Sunflower") {
      // +1 for each flower
      score += flowers.length;
    } else if (card.name === "Orchid" && keepsakes.length > 0) {
      // +2 for each keepsake
      score += keepsakes.length * 2;
    } else if (card.name === "Holly" && foliage.length >= 3) {
      // +3 if at least 3 foliage
      score += 3;
    } else if (card.name === "Bluebell") {
      // +1 for each wildflower
      score += wildflowers.length;
    } else if (card.name === "Buttercup" && flowers.length === 0) {
      // +4 if no flowers
      score += 4;
    }
  });
  
  return score;
}

// Handle AI decision making - returns true if AI takes the offered card
export function aiDecidesTakeCard(card: Card, isFaceUp: boolean): boolean {
  // Simple AI logic for decision making
  if (isFaceUp) {
    // AI sees the card, makes better decision
    // High value cards (3+) are more likely to be taken
    if (card.value >= 3) {
      return Math.random() < 0.8; // 80% chance to take high value
    } else {
      return Math.random() < 0.5; // 50% chance to take low value
    }
  } else {
    // AI doesn't see the card, more random decision
    return Math.random() < 0.4; // 40% chance to take unknown card
  }
}

// AI selects a card to offer to the player
export function aiSelectCardToOffer(cards: Card[]): {
  selectedCard: Card;
  isFaceUp: boolean;
} {
  if (cards.length < 2) {
    throw new Error("AI needs at least 2 cards to make an offer");
  }
  
  // Sort cards by value (descending)
  const sortedCards = [...cards].sort((a, b) => b.value - a.value);
  
  // AI strategy: offer a lower value card 70% of the time
  const offerLowValue = Math.random() < 0.7;
  
  // Card to offer - lower value usually
  const selectedCard = offerLowValue ? sortedCards[1] : sortedCards[0];
  
  // Face up or face down decision
  // Higher value cards are more likely to be offered face down
  const isFaceUp = selectedCard.value <= 2 || Math.random() < 0.3;
  
  return { selectedCard, isFaceUp };
}
