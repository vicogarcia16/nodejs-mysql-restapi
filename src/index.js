import app from "./app.js";
import { config } from "dotenv";
config();

app.listen(process.env.NODE_DOCKER_PORT || 3000, () => {
    console.log("Server running on port " + process.env.NODE_DOCKER_PORT || 3000)
})