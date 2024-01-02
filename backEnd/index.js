const express = require('express');
const app = express();

const userAuthRouter = require('./routes/userAuthRoute');

require('dotenv').config();
const PORT = process.env.PORT;


app.use(express.json());

// Routes files
app.use('/userauth', userAuthRouter)


app.listen(PORT, () => {
    console.log('listening on ' + PORT);
})

