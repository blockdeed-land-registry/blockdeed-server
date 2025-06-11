const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the BlockDeed Server!');
});


app.listen(port,()=>{
    console.log(`BlockDeed Server is running at http://localhost:${port}`);
})