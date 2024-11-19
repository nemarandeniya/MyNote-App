import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

console.log("MONGODB_URI:", process.env.MONGODB_URI);
const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database");
    } catch (error) {
        console.log("Can't connect to Database", error.message);
    }
}

export default connectMongoDb;