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

    events: defineTable({
        title: v.string(),
        description: v.string(),
        slug:v.string(), // unique identifier for the event, used in URLs
        organizerId:v.id("users"), // reference to the user who created the event
        organizerName:v.string(), // denormalized for easy access

        // Classification
        category: v.string(),
        tags: v.optional(v.array(v.string())),

        // Schedule
        startDate: v.number(),
        endDate: v.number(),
        timezone: v.string(),

        // Location
        locationType: v.union(v.literal("online"), v.literal("physical")),
        venue: v.optional(v.string()), // required if locationType is in-person
        address: v.optional(v.string()),
        city:v.string(),
        state:v.optional(v.string()),
        country:v.string(),

        // Ticketing
        capacity: v.number(),
        ticketType: v.union(v.literal("free"), v.literal("paid")),
        ticketPrice: v.optional(v.number()), // required if ticketType is paid
        registrationCount:v.number(),

        //Customization
        coverImage:v.optional(v.string()),
        themeColor:v.optional(v.string()),

        // Timestamps
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_organizer", ["organizerId"])
      .index("by_slug", ["slug"])
      .index("by_category", ["category"])
      .index("by_start_date", ["startDate"])
      .searchIndex("search_title", {searchField: "title"}),

    registrations: defineTable({
         eventId: v.id("events"), // reference to the event
         userId: v.id("users"), // reference to the user who registered, if available

         attendeeName: v.string(),
         attendeeEmail: v.string(),

         qrCode: v.string(), // unique code for check-in

         checkedIn: v.boolean(), // whether the attendee has checked in
         checkedInAt: v.optional(v.number()), // timestamp of check-in

         status: v.union(v.literal("registered"), v.literal("cancelled")), // registration status
         registeredAt: v.number(), // timestamp of registration
    }).index("by_event", ["eventId"])
      .index("by_user", ["userId"])
      .index("by_qrCode", ["qrCode"])
      .index("by_event_user", ["eventId", "userId"]),
});