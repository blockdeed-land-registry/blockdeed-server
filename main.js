const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

require("./config/db");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the BlockDeed Server!');
});


app.use("/api/auth",require("./routes/auth.routes"));
app.use("/api/land", require("./routes/land.routes"));



app.listen(port,()=>{
    console.log(`BlockDeed Server is running at http://localhost:${port}`);
})