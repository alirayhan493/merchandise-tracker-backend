const express = require('express');
const connectDB = require('./database');

const app = express();

connectDB();

//routes
app.get('/', (req, res) => {
    res.send('API Running');
});


const port = process.env.PORT || 5001;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});