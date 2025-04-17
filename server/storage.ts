import { games, cards, users, type Game, type InsertGame, type Card, type User, type InsertUser, CardType } from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game methods
  createGame(): Promise<Game>;
  getGame(id: number): Promise<Game | undefined>;
  updateGame(id: number, gameData: Partial<Game>): Promise<Game | undefined>;
  
  // Card methods
  getAllCards(): Promise<Card[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private cards: Card[];
  private currentUserId: number;
  private currentGameId: number;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.cards = [];
    this.currentUserId = 1;
    this.currentGameId = 1;
    
    // Initialize the deck of cards
    this.initializeCards();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Game methods
  async createGame(): Promise<Game> {
    const id = this.currentGameId++;
    
    // Shuffle cards for a new game
    const shuffledDeck = this.shuffleCards([...this.cards]);
    
    const game: Game = {
      id,
      playerScore: 0,
      aiScore: 0,
      currentTurn: "player",
      deckCards: shuffledDeck, 
      playerCollection: [],
      aiCollection: [],
      playerHand: [],
      aiHand: [],
      gameOver: false,
      winner: ""
    };
    
    this.games.set(id, game);
    return game;
  }

  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async updateGame(id: number, gameData: Partial<Game>): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame: Game = { ...game, ...gameData };
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  // Card methods
  async getAllCards(): Promise<Card[]> {
    return this.cards;
  }

  // Helper methods
  private initializeCards() {
    // Define the initial deck of cards for Tussie Mussie
    const initialCards: Card[] = [
      // Flower cards
      { id: 1, name: "Rose", type: CardType.FLOWER, value: 2, effect: "When collected: Draw a card" },
      { id: 2, name: "Tulip", type: CardType.FLOWER, value: 4, effect: "When collected: Look at top card" },
      { id: 3, name: "Daisy", type: CardType.FLOWER, value: 3, effect: "When collected: View 2 cards" },
      { id: 4, name: "Lily", type: CardType.FLOWER, value: 5, effect: "When collected: Swap a card" },
      { id: 5, name: "Orchid", type: CardType.FLOWER, value: 4, effect: "End game: +2 for each Keepsake" },
      { id: 6, name: "Sunflower", type: CardType.FLOWER, value: 3, effect: "End game: +1 for each Flower" },
      
      // Foliage cards
      { id: 7, name: "Fern", type: CardType.FOLIAGE, value: 3, effect: "End game: +1 for each Flower" },
      { id: 8, name: "Ivy", type: CardType.FOLIAGE, value: 1, effect: "End game: +1 for each different type" },
      { id: 9, name: "Mint", type: CardType.FOLIAGE, value: 1, effect: "End game: +2 if you have most Foliage" },
      { id: 10, name: "Eucalyptus", type: CardType.FOLIAGE, value: 2, effect: "End game: Double value of one card" },
      { id: 11, name: "Holly", type: CardType.FOLIAGE, value: 2, effect: "End game: +3 if you have at least 3 Foliage" },
      
      // Wildflower cards
      { id: 12, name: "Poppy", type: CardType.WILDFLOWER, value: 2, effect: "End game: Counts as any type" },
      { id: 13, name: "Bluebell", type: CardType.WILDFLOWER, value: 3, effect: "End game: +1 for each Wildflower" },
      { id: 14, name: "Buttercup", type: CardType.WILDFLOWER, value: 1, effect: "End game: +4 if you have no Flowers" },
      
      // Keepsake cards
      { id: 15, name: "Ribbon", type: CardType.KEEPSAKE, value: 1, effect: "End game: +2 if you have most cards" },
      { id: 16, name: "Locket", type: CardType.KEEPSAKE, value: 2, effect: "End game: +1 for each face-down card" },
    ];
    
    this.cards = initialCards;
  }

  private shuffleCards(cards: Card[]): Card[] {
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}

export const storage = new MemStorage();
