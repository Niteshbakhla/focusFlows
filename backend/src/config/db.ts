import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
            try {
                        const connect = await mongoose.connect(config.MONGO_URI as string);
                        if (connect.connection.readyState === 1) {
                                    console.log("Database is connected!")
                        } else {
                                    console.log("Database is not connected")
                        }
            } catch (error) {
                        console.log(error)
            }
}

export default connectDB;