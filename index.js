const express = require("express");
const app = express();

app.use(express.json());
const adminrouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use("/admin",adminrouter);
app.use("/user",userRouter);

app.listen(3000);