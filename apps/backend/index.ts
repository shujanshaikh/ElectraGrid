import express from "express";
import { router } from "./v1/routes";
import { adminRouter } from "./v1/routes/admin";
import { chatRouter } from "./v1/routes/chat";
import { vehicleRouter } from "./v1/routes/vehicle";
import cors from "cors";

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors()) 
app.use("/api/v1", router)
app.use("/api/v1", adminRouter)
app.use("/api/v1", chatRouter)
app.use("/api/v1", vehicleRouter)
app.use("/api/v1", chatRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});