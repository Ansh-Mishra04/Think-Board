import {v} from 'convex/values'
import { mutation, query } from "./_generated/server";

export const getFiles = query({
    args: {
        teamId:v.string()
    },
    handler: async (ctx, args) => {
       const result = await ctx.db.query("file").filter((q) => q.eq(q.field("teamId"), args.teamId)).filter((q) => q.eq(q.field("archive"), false))
       .order('desc')
       .collect();
        return result;
    }
})


export const createFile = mutation({
    args: {
        teamId: v.string(),
        name: v.string(),
        createdBy: v.string(),
        document: v.string(),
        canvas: v.string(),
        archive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("file", args);
        return result;
    }
})


export const updateDocument = mutation({
    args: {
        _id: v.id("file"),
        document: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, { document: args.document });
        return result;
    }
})

export const updateCanvas = mutation({
    args: {
        _id: v.id("file"),
        canvas: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, { canvas: args.canvas });
        return result;
    }
})

export const getFileById = query({
    args: {
        _id: v.id("file"),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args._id);
        return result;
    }
})

export const archiveFile = mutation({
    args: {
        _id: v.id("file"),
        archive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, { archive: args.archive });
        return result;
    }
})

export const deleteFile = mutation({
    args: {
        _id: v.id("file"),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.delete(args._id);
        return result;
    }
})

export const archived = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx,args) => {
        const result = await ctx.db.query("file").filter((q) => q.eq(q.field("createdBy"), args.email)).filter((q) => q.eq(q.field("archive"), true)).collect();
        return result;
    }
})