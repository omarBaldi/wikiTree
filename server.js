const express = require('express');
const cors = require('cors');
const { startScraping } = require('./scraping');

//Initialize application
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/api/links', async(req, res) => {

    const URL = 'https://en.wikipedia.org/wiki/Dog';

    try {
        const response = await startScraping(URL);
        console.log(response);
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//Running server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on localhost: ${port}`));