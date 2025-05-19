import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeams = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("team")
      .filter((q) => q.eq(q.field("members"), [args.email]))
      .collect();

    return result;
  },
});

export const createTeam = mutation({
  args: {
    name: v.string(),
    members: v.array(v.string()),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("team", args);
    return result;
  },
});

export const addMembers = mutation({
  args: {
    id: v.id("team"),
    members: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, { members: args.members });
    return result;
  },
});
