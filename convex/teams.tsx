import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeams = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Collect all teams
    const allTeams = await ctx.db.query("team").collect();

    // Filter teams where the members array contains the user's email
    const userTeams = allTeams.filter((team) =>
      team.members?.includes(args.email)
    );

    return userTeams;
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
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Team not found");

    const currentMembers = existing.members || [];
    const newMembers = Array.from(new Set([...currentMembers, ...args.members])); // Avoid duplicates

    const result = await ctx.db.patch(args.id, { members: newMembers });
    return result;
  },
});