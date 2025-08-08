import mongoose from "mongoose";

const connectDB = async () => {
    let dbURI = process.env.MONGO_URI;
    try {
        await mongoose.connect(dbURI);
        console.log("Database is Connected!");
    } catch (error) {
        console.error("Failed to Connect Database!", error.message);
        process.exit(1);
    };
}

export default connectDB;