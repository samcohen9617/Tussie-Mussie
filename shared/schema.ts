import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Card types
export enum CardType {
  FLOWER = "Flower",
  FOLIAGE = "Foliage",
  WILDFLOWER = "Wildflower",
  KEEPSAKE = "Keepsake"
}

// Card schema
export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull().$type<CardType>(),
  value: integer("value").notNull(),
  effect: text("effect").notNull(),
});

export const insertCardSchema = createInsertSchema(cards);
export type Card = typeof cards.$inferSelect;
export type InsertCard = z.infer<typeof insertCardSchema>;

// Game state schema
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  playerScore: integer("player_score").default(0),
  aiScore: integer("ai_score").default(0),
  currentTurn: text("current_turn").default("player"),
  deckCards: jsonb("deck_cards").notNull().$type<Card[]>(),
  playerCollection: jsonb("player_collection").notNull().$type<Card[]>(),
  aiCollection: jsonb("ai_collection").notNull().$type<Card[]>(),
  playerHand: jsonb("player_hand").notNull().$type<Card[]>(),
  aiHand: jsonb("ai_hand").notNull().$type<Card[]>(),
  gameOver: boolean("game_over").default(false),
  winner: text("winner").default(""),
});

export const insertGameSchema = createInsertSchema(games).omit({ id: true });
export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

// User schema (kept from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
