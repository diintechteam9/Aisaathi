const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const { checkClientAccess } = require("./middlewares/authmiddlewares");
const adminRoutes = require("./routes/admin");
const clientRoutes = require("./routes/client");
const userRoutes = require("./routes/user");

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/client",clientRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/clients/:clientId/user",
    checkClientAccess(),
    (req,res,next)=>{
        req.clientId = req.params.clientId;
        next();
    },
    userRoutes);

const PORT = 4000 || process.env.PORT;

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});