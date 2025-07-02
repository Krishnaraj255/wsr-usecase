import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectionDb = async () => {
    const mongo_url = process.env.MONGO_URL

    if (!mongo_url) {
        throw "Mongo url is not found"
    }
    mongoose.connect(mongo_url)
        .then(() => {
            console.log("MongoDb connected successfully")
        })
        .catch((err) => {
            console.error("Connection error ", err)
        })
}

export default connectionDb