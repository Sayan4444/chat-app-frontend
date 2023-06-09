import mongoose from "mongoose"

mongoose.set('strictQuery', false);

const DB = process.env.MONGO_URI;

export default async function connectDB() {
    try {
        await mongoose.connect(DB)
        // console.log("connected to mongoDB server");
    } catch (error) {
        // console.log(err.message);
        // console.log("not connected to mongo server")
    }
}
