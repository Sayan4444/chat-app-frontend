import mongoose from "mongoose"

mongoose.set('strictQuery', false);

const DB = process.env.MONGO_URI;

export default async function () {
    if (mongoose.connection.readyState) return;
    try {
        await mongoose.connect(DB)
        console.log("connected to mongoDB server");
    } catch (error) {
        console.log(error.message);
        console.log("not connected to mongo server")
    }
}
