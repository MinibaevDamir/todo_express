const express = require('express')
const cors = require("cors");

const app = express();


app.use(express.json())

app.use(express.urlencoded({extended: true}));

const db = require("./models")

app.use(cors());

app.get("/health", (req, res) => {
    res.json({ message: "Welcome to  application." });
});

require("./routes/todo.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
try{
app.listen(PORT, () => {console.log(`App has been started ${PORT}`)}); } catch(e) {
    process.exit(1)
    console.log(e)
}


