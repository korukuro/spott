import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(), // clerk userId for auth
        email: v.string(),
        imageUrl: v.optional(v.string()),

        // Onboarding
        hasCompletedOnboarding: v.boolean(),

        location: v.optional(v.object({
            city: v.string(),
            state: v.optional(v.string()),
            country: v.string(),
        })),

        interests: v.optional(v.array(v.string())), // Min 3 categories
        
        freeEventCreated: v.number(), // number of free events created

        // Timestamps
        createdAt: v.number(),
        updatedAt: v.number(),

    }).index("by_token", ["tokenIdentifier"]),
});