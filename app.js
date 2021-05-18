const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/visitor", require("./routes/visitor"));
app.get("/dashboard", (req, res) => {
  console.log("this is dashboard api");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
