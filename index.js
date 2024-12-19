const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

app.get('/' , (req,res) => {
    res.send('Welcome to the NASA API!')
});

const itemRoutes = require('./routes/items');

app.use('/api/items',itemRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then ( () => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});