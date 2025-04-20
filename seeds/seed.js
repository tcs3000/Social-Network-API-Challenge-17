// 

// Top-level static imports
import mongoose from 'mongoose';
import connection from '../config/connections.js';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

const seedUsers = [
    { username: "john_doe", email: "john@email.com" },
    { username: "jane_doe", email: "jane@email.com" },
    { username: "bill_smith", email: "bill@email.com" },
];

const seedThoughts = [
    { thoughtText: "This is my first thought!", username: "john_doe" },
    { thoughtText: "Hello world!", username: "jane_doe" },
    { thoughtText: "Happy to be here!", username: "bill_smith" },
];

const seedDatabase = async () => {
    try {
        await connection.dropDatabase(); // Clear existing data
        console.log("Database cleared!");

        const users = await User.insertMany(seedUsers);
        console.log("Users seeded!");

        const thoughtsWithUser = seedThoughts.map(thought => {
            const user = users.find(u => u.username === thought.username);
            return { ...thought, userId: user._id };
        });

        await Thought.insertMany(thoughtsWithUser);
        console.log("Thoughts seeded!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// Wait for connection to be open before seeding
connection.once('open', seedDatabase);
