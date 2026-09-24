import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recordHistory = mutation({
  args: {
    winner: v.union(v.literal("X"), v.literal("O"), v.literal("DRAW")),
    board: v.array(v.union(v.string(), v.null())),
    winningCombination: v.optional(v.array(v.number())),
  },
  handler: async (ctx, args) => {
    const gameId = await ctx.db.insert("gameHistory", {
      winner: args.winner,
      board: args.board,
      winnerCombination: args.winningCombination,
      createdAt: Date.now(),
    });

    return gameId;
  },
});

export const getHistory = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("gameHistory")
      .withIndex("by_creation")
      .order("desc")
      .take(32);
  },
});

export const deleteHistory = mutation({
  args: { id: v.id("gameHistory") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);

    return { success: true };
  },
});

export const clearHistory = mutation({
  handler: async (ctx) => {
    const allHistory = await ctx.db.query("gameHistory").collect();

    for (const item of allHistory) {
      await ctx.db.delete(item._id);
    }

    return { success: true };
  },
});
