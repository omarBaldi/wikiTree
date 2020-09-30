const express = require('express');
const cors = require('cors');

//Initialize application
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Running server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on localhost: ${port}`));