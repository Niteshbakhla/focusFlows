import { config } from "dotenv";
config();


const _config = {
            PORT: process.env.PORT,
            MONGO_URI: process.env.MONGO_URI,
            JWT_SECRET: process.env.JWT_SECRET,
            GROQ_API_KEY: process.env.GROQ_API_KEY,
            JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
            NODE_ENV: process.env.NODE_ENV
}

export default Object.freeze(_config);