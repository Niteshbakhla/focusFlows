import app from "./src/app";
import config from "./src/config/config";
import connectDB from "./src/config/db";
connectDB();


const PORT = config.PORT;
app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
})