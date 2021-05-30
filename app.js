const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes/index"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/faceInfo", require("./routes/faceInfo"));
app.use("/visitorList", require("./routes/visitorList"));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});