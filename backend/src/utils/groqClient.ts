import Groq from "groq-sdk";
import config from "../config/config";

const groqClient = new Groq({
            apiKey: config.GROQ_API_KEY as string,
});

export default groqClient;
