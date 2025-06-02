import express from 'express';
import cors from "cors";
import userRoute from "../exp-backend/routes/userroute.js";
import loginRoute from "../exp-backend/routes/loginroute.js";


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", loginRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

