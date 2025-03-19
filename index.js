const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const crypto = require("crypto");
const route = require("./routes/route");
require("dotenv").config();

const PORT = process.env.PORT;

const cors_options = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(cors_options));
app.use(express.json());

// Configure bodyparser to handle post requests
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

